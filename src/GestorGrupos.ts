module Elioway.BallonFight{

    export class GestorGrupos{

        private static instancia:GestorGrupos;
        game:Phaser.Game;

        //Grupos
        grupoEstrellas:Phaser.Group;
        grupoOceanoInterior:Phaser.Group;
        grupoTerreno:Phaser.Group;
        grupoElectroEstrella:Phaser.Group;
        grupoNube:Phaser.Group;
        grupoJugador:Phaser.Group;
        grupoPez:Phaser.Group;
        grupoOceanoExterior:Phaser.Group;
        grupoSplash:Phaser.Group;
        

        //Grupos de Colisión.
        grupoColisionTerreno:Phaser.Physics.P2.CollisionGroup;
        grupoColisionElectroEstrella:Phaser.Physics.P2.CollisionGroup;
        grupoColisionOceano:Phaser.Physics.P2.CollisionGroup;
        grupoColisionJugador:Phaser.Physics.P2.CollisionGroup;
        grupoColisionGloboJugador:Phaser.Physics.P2.CollisionGroup;
        grupoColisionCabeza:Phaser.Physics.P2.CollisionGroup;
        grupoColisionMandibulaPez:Phaser.Physics.P2.CollisionGroup;

        constructor(game:Phaser.Game){
            this.game=game;

            //Orden de renderizado(Las primeras son las del fondo).
            
            this.grupoEstrellas=this.game.add.group();
            this.grupoOceanoInterior=this.game.add.group();
            this.grupoTerreno=this.game.add.group();
            this.grupoNube=this.game.add.group();
            this.grupoElectroEstrella=this.game.add.group();
            this.grupoJugador=this.game.add.group();
            this.grupoPez=this.game.add.group();
            this.grupoOceanoExterior=this.game.add.group();
            this.grupoSplash =this.game.add.group();

            this.grupoColisionCabeza=this.game.physics.p2.createCollisionGroup();
            this.grupoColisionTerreno=this.game.physics.p2.createCollisionGroup();
            this.grupoColisionElectroEstrella=this.game.physics.p2.createCollisionGroup();
            this.grupoColisionOceano=this.game.physics.p2.createCollisionGroup();
            this.grupoColisionGloboJugador=this.game.physics.p2.createCollisionGroup();
            this.grupoColisionJugador=this.game.physics.p2.createCollisionGroup();
            this.grupoColisionMandibulaPez=this.game.physics.p2.createCollisionGroup();
            

            this.game.physics.p2.updateBoundsCollisionGroup();
/*
            alert("Cabeza: "+this.grupoColisionCabeza.mask+
            "\nTerreno: "+this.grupoColisionTerreno.mask+
            "\nEstrella: "+this.grupoColisionElectroEstrella.mask+
            "\nOceano: "+this.grupoColisionOceano.mask+
            "\nGloboJugador: "+this.grupoColisionGloboJugador.mask+
            "\nJugador: "+this.grupoColisionJugador.mask.toPrecision());
*/
        }

        public static getInstancia(game:Phaser.Game):GestorGrupos{
            if(this.instancia==null){
                this.instancia=new GestorGrupos(game);
            }
            return this.instancia;
        }

        configurarColisionamiento(sprite:Phaser.Sprite, tipo:String):void{
            if(tipo=="Terreno"){

                (<Phaser.Physics.P2.Body>sprite.body).collides([this.grupoColisionElectroEstrella,this.grupoColisionJugador,this.grupoColisionGloboJugador]);

            }else if(tipo=="Oceano"){
                
                (<Phaser.Physics.P2.Body>sprite.body).collides([this.grupoColisionElectroEstrella,this.grupoColisionCabeza]);

            }else if(tipo=="ElectroEstrella"){

                (<Phaser.Physics.P2.Body>sprite.body).collides([this.grupoColisionTerreno,this.grupoColisionOceano,this.grupoColisionJugador]);

            }else if(tipo=="Jugador"){

                (<Phaser.Physics.P2.Body>sprite.body).collides([this.grupoColisionTerreno,this.grupoColisionElectroEstrella,this.grupoColisionMandibulaPez]);

            }else if(tipo=="GloboJugador"){

                (<Phaser.Physics.P2.Body>sprite.body).collides([this.grupoColisionTerreno]);

            }else if(tipo=='Cabeza'){

                (<Phaser.Physics.P2.Body>sprite.body).collides([this.grupoColisionOceano]);                

            }else if(tipo=='MandibulaPez'){
                (<Phaser.Physics.P2.Body>sprite.body).collides([this.grupoColisionJugador]);   
            }
        }

    }

}