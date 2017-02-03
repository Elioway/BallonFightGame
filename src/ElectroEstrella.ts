module Elioway.BallonFight{

    export class ElectroEstrella extends Phaser.Sprite{
    
        constructor(game:Phaser.Game,x:number, y:number){
            super(game,x,y,'gameAtlas','Cielo/ElectroEstrella/1');
            this.name="ElectroEstrella";
            this.anchor.set(0.5,0.5);
            this.smoothed=false;
            this.animations.add('activa',['Cielo/ElectroEstrella/1','Cielo/ElectroEstrella/2','Cielo/ElectroEstrella/3',
            'Cielo/ElectroEstrella/4','Cielo/ElectroEstrella/5','Cielo/ElectroEstrella/6','Cielo/ElectroEstrella/5',
            'Cielo/ElectroEstrella/4','Cielo/ElectroEstrella/3','Cielo/ElectroEstrella/2'],20,true);
            this.animations.play('activa');
            this.game.physics.p2.enable(this);
            (<Phaser.Physics.P2.Body>this.body).clearShapes();
            (<Phaser.Physics.P2.Body>this.body).setCircle(this.width/2);
            (<Phaser.Physics.P2.Body>this.body).fixedRotation=true;
            (<Phaser.Physics.P2.Body>this.body).data.gravityScale=0;

            (<Phaser.Physics.P2.Body>this.body).setMaterial(GestorMaterialesContacto.getInstancia(this.game).electroEstrellaMaterial);

            (<Phaser.Physics.P2.Body>this.body).collideWorldBounds=true;
            (<Phaser.Physics.P2.Body>this.body).setCollisionGroup(GestorGrupos.getInstancia(this.game).grupoColisionElectroEstrella);
            GestorGrupos.getInstancia(this.game).configurarColisionamiento(this,"ElectroEstrella");
           
           this.game.add.existing(this);
           GestorGrupos.getInstancia(this.game).grupoElectroEstrella.add(this);

        }

        mover(velocidad:number):void{
           (<Phaser.Physics.P2.Body>this.body).velocity.x=this.numeroAleatorio(-velocidad,velocidad);
            (<Phaser.Physics.P2.Body>this.body).velocity.y=this.numeroAleatorio(10,velocidad);
        }

         private numeroAleatorio(min:number, max:number):number{
            return Math.random()*(max-min)+min;
        }

        update(){
            if(this.body.y>this.game.height){
                this.kill();
            }
        }

    }

}