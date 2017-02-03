module Elioway.BallonFight{

    export class Pez extends Phaser.Sprite{

        jugadorASeguir:Phaser.Sprite;
        tweenElevar:Phaser.Tween;
        tweenDesender:Phaser.Tween;
        mandibula:Phaser.Sprite;
        jugadorAtrapado:boolean;
        atrapo:boolean;
        timer:Phaser.Timer;

        constructor(game:Phaser.Game, x:number, y:number){
            super(game,x,y,'gameAtlas','Pez/1');
            this.smoothed=false;
            this.anchor.set(0.5);
            this.animations.add('bocaAbierta',['Pez/3'],1,true);
            this.animations.add('mordiendo',['Pez/6'],1,true);
            this.animations.add('mordida',['Pez/3','Pez/2','Pez/1','Pez/2','Pez/3','Pez/4','Pez/5','Pez/6'],15,false).onComplete.add(this.mordidaCompleta,this);
            this.animations.add('abrirBoca',['Pez/6','Pez/5','Pez/4','Pez/3'],15,false).onComplete.add(this.abrirBocaCompleta,this);

            this.jugadorAtrapado=false;

            this.mandibula=this.game.add.sprite(this.x,this.y,'','');
            
            this.game.physics.p2.enable(this.mandibula,false);
            (<Phaser.Physics.P2.Body>this.mandibula.body).static=true;
            (<Phaser.Physics.P2.Body>this.mandibula.body).clearShapes();
            (<Phaser.Physics.P2.Body>this.mandibula.body).addRectangle(this.width/2,this.height/10,-this.width/4,0);
            (<Phaser.Physics.P2.Body>this.mandibula.body).setCollisionGroup(GestorGrupos.getInstancia(this.game).grupoColisionMandibulaPez);
            (<Phaser.Physics.P2.Body>this.mandibula.body).setMaterial(GestorMaterialesContacto.getInstancia(this.game).mandibulaPezMaterial);
            //(<Phaser.Physics.P2.Body>this.mandibula.body).data.shapes[0].sensor=true;
            (<Phaser.Physics.P2.Body>this.mandibula.body).onBeginContact.add(this.contactoConJugador,this);
            GestorGrupos.getInstancia(this.game).grupoPez.add(this.mandibula);

            this.tweenElevar=this.game.make.tween(this);
            this.tweenElevar.to({y:this.game.height-this.height},800,Phaser.Easing.Cubic.Out,false,0,0,false);
            this.tweenDesender=this.game.make.tween(this);
            this.tweenDesender.to({y:this.game.height+32},1000,Phaser.Easing.Linear.None,false,0,0,false);

            this.timer=this.game.time.create(false);
            this.ordenAtrapar();

            this.animations.play('bocaAbierta');
            this.game.add.existing(this);
            GestorGrupos.getInstancia(this.game).configurarColisionamiento(this.mandibula,'MandibulaPez');
            GestorGrupos.getInstancia(this.game).grupoPez.add(this);
        }

        private ordenAtrapar(){
            let numero=Math.round(this.numeroAleatorio(0,1));
            //alert(numero);
            if(numero==1){
                this.atrapo=true;
            }else{
                this.atrapo=false;                
            }
            this.timer.stop();
            this.timer.loop(this.numeroAleatorio(500,5000),this.ordenAtrapar,this);
            this.timer.start();
        }

         private numeroAleatorio(min:number, max:number):number{
            return Math.random()*(max-min)+min;
        }

        private contactoConJugador(){
            (<Phaser.Physics.P2.Body>this.jugadorASeguir.body).static=true;
            (<Phaser.Physics.P2.Body>this.jugadorASeguir.body).setZeroVelocity;
            this.jugadorAtrapado=true;
        }

        private mordidaCompleta(){
            this.animations.play('mordiendo');
        }
        private abrirBocaCompleta(){
            this.animations.play('bocaAbierta');
        }

        update(){

            if(this.jugadorAtrapado){
                (<Phaser.Physics.P2.Body>this.jugadorASeguir.body).velocity.x=0;
                this.jugadorASeguir.body.y=this.y-16;
                (<Jugador>this.jugadorASeguir).atrapar();
            }

            this.mandibula.body.x=this.x;
            this.mandibula.body.y=this.y;

            if(this.jugadorASeguir!=null&&!this.jugadorAtrapado){
                if(!this.tweenDesender.isRunning){
                    this.x=this.jugadorASeguir.x+this.jugadorASeguir.width/2;
                }

                if(this.jugadorASeguir.y>+this.game.height-(32*2.5)){
                    if(this.atrapo){
                    if(!this.tweenElevar.isRunning&&!this.tweenDesender.isRunning){
                        this.tweenElevar.start();
                        if(this.animations.currentAnim.name!='mordiendo'){
                            this.animations.play('mordida');
                        }
                    }
                    }
                }else{
                    if(!this.tweenDesender.isRunning&&!this.tweenElevar.isRunning){
                        this.tweenDesender.start();
                        this.animations.play('abrirBoca');
                    }
                }    
            }else if(this.jugadorAtrapado){
                if(!this.tweenDesender.isRunning&&!this.tweenElevar.isRunning){
                        this.tweenDesender.start();
                    }   
            }
        }

        seguirJugador(player:Phaser.Sprite){
            this.jugadorASeguir=player;
        }

    }

}