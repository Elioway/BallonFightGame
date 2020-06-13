module Elioway.BallonFight {

    export class Boot extends Phaser.State {

        preload() {
            this.load.image('preloadBar', 'assets/preloadBar.png');
        }

        create() {

            this.game.time.advancedTiming = true;

            this.input.maxPointers = 6;
            this.game.physics.startSystem(Phaser.Physics.P2JS);

            this.game.physics.p2.applyDamping = false;
            this.game.physics.p2.gravity.y = 100;

            this.game.scale.forceLandscape = true;
            this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;

            this.game.scale.pageAlignHorizontally = true;
            this.game.scale.pageAlignVertically = true;
            this.game.scale.refresh();

            this.stage.smoothed = false;

            this.game.state.start('preloader', true, false);

        }

    }

}