module Elioway.BallonFight {

	export class BallonFightGame extends Phaser.Game {

		constructor() {
			super(800, 480, Phaser.CANVAS, '', null, false, false);
	
			this.state.add('boot', Boot, false);
			this.state.add('preloader', Preloader, false);
			this.state.add('level1', Level1, false);

			this.state.start('boot');
		}

	}
}

