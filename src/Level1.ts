/// <reference path="../tsDefinitions/phaser.d.ts" />
/// <reference path="../tsDefinitions/p2.d.ts" />
/// <reference path="../tsDefinitions/pixi.d.ts" />

module Elioway.BallonFight{

    export class Level1 extends Phaser.State{
        //Generadores
        constructorTerreno:ContructorTerreno;
        constructorOceano:ConstructorOceano;
        generadorEstrellas:GeneradorEstrellas;

        //Sprites
        nubes:Nube[];
        estrella:ElectroEstrella;
        jugador:Jugador;
        oceano:Phaser.Sprite;
        pez:Pez;

        //Cursores
        cursores:Phaser.CursorKeys;

        create(){
            this.game.physics.p2.setWorldMaterial(GestorMaterialesContacto.getInstancia(this.game).worldMaterial,true,true,true,true);

            this.constructorTerreno=new ContructorTerreno(this.game,false);
            this.constructorOceano=new ConstructorOceano(this.game,false);
            this.generadorEstrellas=new GeneradorEstrellas(this.game);
            this.cursores=this.game.input.keyboard.createCursorKeys();

            this.nubes=[];
 
            this.game.world.setBounds(0,0,800,480+32);

            this.generadorEstrellas.generarEstrellas(800,480-(32*2),50);
            this.nubes.push(new Nube(this.game,400,100,30*1000));
            this.constructorTerreno.crearTerrenoFlotante(9,new Phaser.Point(32*8,32*7));
            this.constructorTerreno.crearTerrenoFlotante(4,new Phaser.Point(32*2,32*3));
            this.constructorTerreno.crearTerrenoFlotante(5,new Phaser.Point(32*19,32*5));
            this.constructorOceano.crearOceanoInterior(13,new Phaser.Point(32*6,480-32),false);
            this.constructorOceano.crearOceanoInterior(13,new Phaser.Point(32*6,480-(32*2)),true);
            this.constructorTerreno.crearTerrenoSalienteDerecho(7,4,new Phaser.Point(0,480-(32*4)));
            this.constructorTerreno.crearTerrenoSalienteIzquierdo(7,4,new Phaser.Point(800-(32*7),480-(32*4)));
            this.jugador=new Jugador(this.game,100,480-(32*4)-16);
            (<Phaser.Physics.P2.Body>this.jugador.body).onBeginContact.add(this.colisionEntreJugadoryElectroEsrella,this);

            this.pez=new Pez(this.game,this.world.centerX,this.game.height+32);
            this.pez.seguirJugador(this.jugador);

            this.oceano=this.constructorOceano.crearOceanoExterior(25,new Phaser.Point(0,480-32));
            (<Phaser.Physics.P2.Body>this.oceano.body).onBeginContact.add(this.colisionEntreOceanoyOtro,this);
            
        }
        
        render(){
            this.game.debug.text(this.game.time.fps.toString()||'--',this.game.width-30,20);
        }
       
       colisionEntreOceanoyOtro(body1,body2){
            if((<Phaser.Physics.P2.Body>body1).sprite.name=='ElectroEstrella')
            {
                new Salipicadura(this.game,(<Phaser.Physics.P2.Body>body1).x,(<Phaser.Physics.P2.Body>body1).y-(<Phaser.Physics.P2.Body>body1).sprite.height*2);
                (<Phaser.Physics.P2.Body>body1).setZeroVelocity();
                (<Phaser.Physics.P2.Body>body1).velocity.y=10;
            }
                if((<Phaser.Physics.P2.Body>body1).sprite.name=='Cabeza')
                {
                    new Salipicadura(this.game,(<Phaser.Physics.P2.Body>body1).x,(<Phaser.Physics.P2.Body>body1).y-this.jugador.height);
                    (<Phaser.Physics.P2.Body>this.jugador.body).setZeroVelocity();
                    
                    if(this.jugador.animations.currentAnim.name!='cayendo'){
                        this.jugador.reventarGlobo(this.jugador.globo1.body);
                        this.jugador.reventarGlobo(this.jugador.globo2.body);
                        this.jugador.caer();
                    }
                    
                }

       }
        colisionEntreJugadoryElectroEsrella(body1,body2){
            if(body1!=null){
                if((<Phaser.Physics.P2.Body>body1).sprite.name=='ElectroEstrella')
                {
                    (<Phaser.Physics.P2.Body>body1).sprite.kill();
                    this.jugador.electrocutar();
                }
            }
       }
    }
}