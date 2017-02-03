module Elioway.BallonFight{

    export class Boot extends Phaser.State{

        preload(){
            this.load.image('preloadBar','assets/preloadBar.png');
        }

        create(){

            this.game.time.advancedTiming = true;

            this.input.maxPointers=3;
            this.game.physics.startSystem(Phaser.Physics.P2JS);
            
            this.game.physics.p2.applyDamping=false;
            this.game.physics.p2.gravity.y=100;
            
            if(this.game.device.desktop){
               this.scale.pageAlignHorizontally=true;
               this.scale.pageAlignVertically=true;
            }else{
                this.game.scale.forceLandscape=true;
            }

            this.game.state.start('preloader',true, false);

        }

    }

}