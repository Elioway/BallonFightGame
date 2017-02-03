module Elioway.BallonFight{

    export class Preloader extends Phaser.State{

        preloadBar : Phaser.Sprite;

        preload(){
            this.preloadBar=this.game.add.sprite(this.world.centerX,this.world.centerY,'preloadBar');
            this.preloadBar.anchor.set(0.5,0.5);
            this.load.setPreloadSprite(this.preloadBar);

            //Cargar los assets aqui.
            
            this.load.image('logo','assets/ds_logo.png');
            this.load.atlas('gameAtlas','assets/ballonFight.png','assets/ballonFight.json',Phaser.Loader.TEXTURE_ATLAS_JSON_HASH);
            
        }

        create(){
            this.game.state.start("level1", true, false);
        }
        
    }

}