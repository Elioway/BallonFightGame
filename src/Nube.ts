module Elioway.BallonFight {

    export class Nube extends Phaser.Sprite {

        private timer: Phaser.Timer;

        x: number;
        y: number;

        rayo: Phaser.Sprite;

        constructor(game: Phaser.Game, x: number, y: number, segundosEnAparecer: number) {
            super(game, x, y, 'gameAtlas', 'Cielo/Nube/1');
            this.timer = this.game.time.create(false);
            this.timer.loop(segundosEnAparecer, this.expulsarEstrella, this);
            this.timer.start();
            this.anchor.set(0.5, 0.5);
            this.smoothed = false;
            this.animations.add('trueno', ['Cielo/Nube/1', 'Cielo/Nube/2', 'Cielo/Nube/1', 'Cielo/Nube/2', 'Cielo/Nube/1', 'Cielo/Nube/2',
                'Cielo/Nube/1', 'Cielo/Nube/2', 'Cielo/Nube/1', 'Cielo/Nube/2', 'Cielo/Nube/1'], 20, false);
            this.animations.add('normal', ['Cielo/Nube/1'], 0, true);
            this.x = x;
            this.y = y;
            this.crearRayo();

            this.game.add.existing(this);
            GestorGrupos.getInstancia(this.game).grupoNube.add(this);
        }

        private crearRayo(): void {
            this.rayo = this.game.add.sprite(this.x + (this.width / 10), this.y, 'gameAtlas', 'Cielo/Rayo/1');
            GestorGrupos.getInstancia(this.game).grupoNube.add(this.rayo);
            this.rayo.smoothed = false;
            this.rayo.animations.add('flash', ['Cielo/Rayo/1', 'Cielo/Rayo/2', 'Cielo/Rayo/3', 'Cielo/Rayo/4', 'Cielo/Rayo/5',
                'Cielo/Rayo/6', 'Cielo/Rayo/7', 'Cielo/Rayo/8', 'Cielo/Rayo/9', 'Cielo/Rayo/10', 'Cielo/Rayo/11'], 20, false);
            this.rayo.animations.add('normal', ['Cielo/Rayo/1'], 1, true);
        }

        expulsarEstrella(): ElectroEstrella {
            this.animations.play('trueno');
            this.rayo.animations.play('flash');
            let estrella: ElectroEstrella = new ElectroEstrella(this.game, this.x + (this.width / 2), this.y + this.height / 4);
            estrella.mover(100);
            return estrella;
        }

    }

}