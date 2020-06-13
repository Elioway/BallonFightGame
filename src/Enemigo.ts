
module Elioway.BallonFight {

    export class Enemigo extends Phaser.Sprite {

        player: Jugador;
        ia: IAEnemigo;
        globo: Phaser.Sprite;
        cabeza: Phaser.Sprite;
        paracaidas: Phaser.Sprite;
        restriccionGlobo: Phaser.Physics.P2.LockConstraint;
        idColisionRight: number;
        idColisionLeft: number;
        idColisionBot: number;
        idColisionTop: number;
        idColisionReventadorPico: number;
        idColisionReventadorPie: number;
        idSensorSuelo: number;
        ColiosionReventadorPico;
        ColiosionReventadorPie;
        sensorSuelo;
        direccion: String = "R";
        direccionActual: String = "R";
        velocidadMaxima: number = 80;
        twenParacaidas: Phaser.Tween;

        constructor(game: Phaser.Game, x: number, y: number, colorGlobo: string, jugador: Jugador) {
            super(game, x, y, 'gameAtlas', 'Enemigo/Quieto/1');

            this.player = jugador;

            this.smoothed = false;
            this.anchor.set(0.5);
            this.outOfBoundsKill = true;
            this.name = "Enemigo";

            this.cabeza = new Phaser.Sprite(this.game, this.x, this.y, '', '');
            this.cabeza.anchor.set(0.5);
            this.cabeza.name = 'CabezaEnemigo';

            this.game.physics.p2.enable(this.cabeza, false);
            (<Phaser.Physics.P2.Body>this.cabeza.body).clearShapes();
            (<Phaser.Physics.P2.Body>this.cabeza.body).setCircle(this.width / 6, 0, -this.height / 8);
            (<Phaser.Physics.P2.Body>this.cabeza.body).fixedRotation = true;
            (<Phaser.Physics.P2.Body>this.cabeza.body).setCollisionGroup(GestorGrupos.getInstancia(this.game).grupoColisionCabeza);
            GestorGrupos.getInstancia(this.game).configurarColisionamiento(this.cabeza, 'Cabeza');

            this.game.add.existing(this.cabeza);
            GestorGrupos.getInstancia(this.game).grupoEnemigo.add(this.cabeza);

            //Paracaidas

            this.paracaidas = new Phaser.Sprite(this.game, this.x, this.y - this.height / 2.5, 'gameAtlas', 'Globo/Paracaidas/1');
            this.paracaidas.name = "Paracaidas";
            this.paracaidas.anchor.setTo(0.5);
            this.paracaidas.smoothed = false;
            this.paracaidas.visible = false;

            this.game.physics.p2.enable(this.paracaidas, false);
            (<Phaser.Physics.P2.Body>this.paracaidas.body).data.gravityScale = 0;
            (<Phaser.Physics.P2.Body>this.paracaidas.body).clearShapes();
            (<Phaser.Physics.P2.Body>this.paracaidas.body).addRectangle(this.paracaidas.width / 2, this.paracaidas.height / 2, 0, 4);
            (<Phaser.Physics.P2.Body>this.paracaidas.body).data.shapes[0].sensor = true;
            (<Phaser.Physics.P2.Body>this.paracaidas.body).fixedRotation = true;
            (<Phaser.Physics.P2.Body>this.paracaidas.body).setMaterial(GestorMaterialesContacto.getInstancia(this.game).globoPlayerMaterial);
            (<Phaser.Physics.P2.Body>this.paracaidas.body).setCollisionGroup(GestorGrupos.getInstancia(this.game).grupoColisionEnemigo);
            GestorGrupos.getInstancia(this.game).configurarColisionamiento(this.paracaidas, "GloboEnemigo");

            this.game.add.existing(this.paracaidas);

            GestorGrupos.getInstancia(this.game).grupoParacaidas.add(this.paracaidas);

            this.twenParacaidas = this.game.tweens.create(this.paracaidas.scale);

            //Globo
            this.globo = new Phaser.Sprite(this.game, this.x, this.y - this.height / 1.2, 'gameAtlas', 'Globo/GloboReventando/' + colorGlobo + '/1');
            this.globo.anchor.set(0.5);
            this.globo.smoothed = false;
            this.globo.visible = false;

            this.globo.animations.add('normal', ['Globo/GloboReventando/' + colorGlobo + '/1'], 1, true);
            this.globo.animations.add('reventando', ['Globo/GloboReventando/' + colorGlobo + '/1', 'Globo/GloboReventando/' + colorGlobo + '/2', 'Globo/GloboReventando/' + colorGlobo + '/3', 'Globo/GloboReventando/' + colorGlobo + '/4', 'Globo/GloboReventando/' + colorGlobo + '/5', 'Globo/GloboReventando/' + colorGlobo + '/6'], 10, true);
            this.globo.animations.add('inflandose', ['Globo/GloboInflandose/' + colorGlobo + '/1', 'Globo/GloboInflandose/' + colorGlobo + '/2', 'Globo/GloboInflandose/' + colorGlobo + '/1', 'Globo/GloboInflandose/' + colorGlobo + '/2', 'Globo/GloboInflandose/' + colorGlobo + '/1', 'Globo/GloboInflandose/' + colorGlobo + '/2',
            'Globo/GloboInflandose/' + colorGlobo + '/3', 'Globo/GloboInflandose/' + colorGlobo + '/2', 'Globo/GloboInflandose/' + colorGlobo + '/3', 'Globo/GloboInflandose/' + colorGlobo + '/2', 'Globo/GloboInflandose/' + colorGlobo + '/3', 'Globo/GloboInflandose/' + colorGlobo + '/2',
            'Globo/GloboInflandose/' + colorGlobo + '/3', 'Globo/GloboInflandose/' + colorGlobo + '/4', 'Globo/GloboInflandose/' + colorGlobo + '/3', 'Globo/GloboInflandose/' + colorGlobo + '/4', 'Globo/GloboInflandose/' + colorGlobo + '/3', 'Globo/GloboInflandose/' + colorGlobo + '/4',
            'Globo/GloboInflandose/' + colorGlobo + '/5', 'Globo/GloboInflandose/' + colorGlobo + '/4', 'Globo/GloboInflandose/' + colorGlobo + '/5', 'Globo/GloboInflandose/' + colorGlobo + '/4', 'Globo/GloboInflandose/' + colorGlobo + '/5', 'Globo/GloboInflandose/' + colorGlobo + '/4',
            'Globo/GloboInflandose/' + colorGlobo + '/5', 'Globo/GloboInflandose/' + colorGlobo + '/6', 'Globo/GloboInflandose/' + colorGlobo + '/5', 'Globo/GloboInflandose/' + colorGlobo + '/6', 'Globo/GloboInflandose/' + colorGlobo + '/5', 'Globo/GloboInflandose/' + colorGlobo + '/6',], 8, false);

            this.game.physics.p2.enable(this.globo, false);
            (<Phaser.Physics.P2.Body>this.globo.body).data.gravityScale = 0;
            (<Phaser.Physics.P2.Body>this.globo.body).clearShapes();
            (<Phaser.Physics.P2.Body>this.globo.body).addCircle(this.globo.width / 4.5, 1.5, -2);
            (<Phaser.Physics.P2.Body>this.globo.body).fixedRotation = true;
            (<Phaser.Physics.P2.Body>this.globo.body).setMaterial(GestorMaterialesContacto.getInstancia(this.game).globoPlayerMaterial);
            (<Phaser.Physics.P2.Body>this.globo.body).collideWorldBounds = true;
            (<Phaser.Physics.P2.Body>this.globo.body).setCollisionGroup(GestorGrupos.getInstancia(this.game).grupoColisionEnemigo);
            GestorGrupos.getInstancia(this.game).configurarColisionamiento(this.globo, "GloboEnemigo");

            this.game.add.existing(this.globo);
            this.globo.animations.play('quieto');

            this.animations.add('quieto', ['Enemigo/Quieto/1', 'Enemigo/Quieto/2', 'Enemigo/Quieto/3', 'Enemigo/Quieto/2'], 5, true);
            this.animations.add('volando', ['Enemigo/Volando/1', 'Enemigo/Volando/2', 'Enemigo/Volando/3', 'Enemigo/Volando/4', 'Enemigo/Volando/5', 'Enemigo/Volando/4', 'Enemigo/Volando/3', 'Enemigo/Volando/2'], 38, true);
            this.animations.add('inflandoGlobo', ['Enemigo/InflandoGlobo/1', 'Enemigo/InflandoGlobo/2', 'Enemigo/InflandoGlobo/3'], 5, true);
            this.animations.add('cayendoParacaidas', ['Enemigo/CayendoParacaidas/1'], 1, true);
            this.animations.add('cayendo', ['Enemigo/Cayendo/1', 'Enemigo/Cayendo/2', 'Enemigo/Cayendo/3', 'Enemigo/Cayendo/4', 'Enemigo/Cayendo/5', 'Enemigo/Cayendo/4', 'Enemigo/Cayendo/3', 'Enemigo/Cayendo/2'], 25, true);

            let sensorColision = null;

            this.game.physics.p2.enable(this, false);
            (<Phaser.Physics.P2.Body>this.body).data.gravityScale = 0;
            (<Phaser.Physics.P2.Body>this.body).clearShapes();
            (<Phaser.Physics.P2.Body>this.body).setRectangle(this.width / 2, this.height);

            sensorColision = (<Phaser.Physics.P2.Body>this.body).addRectangle(10, this.height * 1.5, this.height / 1.5, -this.height / 3);
            sensorColision.sensor = true;
            this.idColisionRight = sensorColision.id;

            sensorColision = (<Phaser.Physics.P2.Body>this.body).addRectangle(10, this.height * 1.5, -this.height / 1.5, -this.height / 3);
            sensorColision.sensor = true;
            this.idColisionLeft = sensorColision.id;

            sensorColision = (<Phaser.Physics.P2.Body>this.body).addRectangle(this.width * 1.3, 10, 0, this.height / 1.5);
            sensorColision.sensor = true;
            this.idColisionBot = sensorColision.id;

            sensorColision = (<Phaser.Physics.P2.Body>this.body).addRectangle(this.width * 1.3, 10, 0, - this.height / 0.75);
            sensorColision.sensor = true;
            this.idColisionTop = sensorColision.id;

            this.ColiosionReventadorPico = (<Phaser.Physics.P2.Body>this.body).addRectangle(5, 2, 12, -5.4);
            this.ColiosionReventadorPico.sensor = true;
            this.idColisionReventadorPico = this.ColiosionReventadorPico.id;

            this.ColiosionReventadorPie = (<Phaser.Physics.P2.Body>this.body).addRectangle(5, 5, 5, 15);
            this.ColiosionReventadorPie.sensor = true;
            this.idColisionReventadorPie = this.ColiosionReventadorPie.id;

            this.sensorSuelo = (<Phaser.Physics.P2.Body>this.body).addRectangle(this.width / 2.5, 5, 0, 16);
            this.sensorSuelo.sensor = true;
            this.idSensorSuelo = this.sensorSuelo.id;

            (<Phaser.Physics.P2.Body>this.body).fixedRotation = true;
            (<Phaser.Physics.P2.Body>this.body).mass = 10;
            (<Phaser.Physics.P2.Body>this.body).setMaterial(GestorMaterialesContacto.getInstancia(this.game).enemigoMaterial);
            (<Phaser.Physics.P2.Body>this.body).setCollisionGroup(GestorGrupos.getInstancia(this.game).grupoColisionEnemigo);

            this.restriccionGlobo = this.game.physics.p2.createLockConstraint(this.body, this.globo.body, [0, this.height / 1.2], 0);
            this.game.physics.p2.createLockConstraint(this.body, this.paracaidas.body, [0, this.height / 2.5], 0);
            this.game.physics.p2.createLockConstraint(this.body, this.cabeza.body, [0, this.height / 7], 0);

            GestorGrupos.getInstancia(this.game).configurarColisionamiento(this, 'Enemigo');

            this.game.add.existing(this);
            GestorGrupos.getInstancia(this.game).grupoEnemigo.add(this);

            this.animations.play('quieto');

            this.ia = new IAEnemigo(this.game, this);

        }

        update() {
            this.ia.update();
        }

        inflarGlobo() {
            if (!this.globo.alive) {
                this.globo.revive();

                (<Phaser.Physics.P2.Body>this.globo.body).setZeroVelocity();
                (<Phaser.Physics.P2.Body>this.globo.body).x = this.x;
                (<Phaser.Physics.P2.Body>this.globo.body).y = this.y - 30;

                (<Phaser.Physics.P2.Body>this.globo.body).kinematic = false;
                (<Phaser.Physics.P2.Body>this.globo.body).static = false;
                this.restriccionGlobo = this.game.physics.p2.createLockConstraint(this.body, this.globo.body, [0, this.height / 1.2], 0);
                (<Phaser.Physics.P2.Body>this.globo.body).data.shapes[0].sensor = false;
            }

            this.globo.visible = true;
            this.play("inflandoGlobo");
            this.globo.animations.play('inflandose').onComplete.add(this.terminoInflarGlobo, this);
        }

        volar(dirX: number, dirY: number) {

            (<Phaser.Physics.P2.Body>this.body).applyForce([dirX, dirY], 0, 0);

            if ((<Phaser.Physics.P2.Body>this.body).velocity.x < 0) {

                if ((<Phaser.Physics.P2.Body>this.body).velocity.x < -this.velocidadMaxima) {
                    (<Phaser.Physics.P2.Body>this.body).velocity.x = -this.velocidadMaxima;
                }
            } else {

                if ((<Phaser.Physics.P2.Body>this.body).velocity.x > this.velocidadMaxima) {
                    (<Phaser.Physics.P2.Body>this.body).velocity.x = this.velocidadMaxima;
                }
            }

            if ((<Phaser.Physics.P2.Body>this.body).velocity.y < 0) {

                if ((<Phaser.Physics.P2.Body>this.body).velocity.y < -this.velocidadMaxima) {
                    (<Phaser.Physics.P2.Body>this.body).velocity.y = -this.velocidadMaxima;
                }

            } else {

                if ((<Phaser.Physics.P2.Body>this.body).velocity.y > this.velocidadMaxima) {
                    (<Phaser.Physics.P2.Body>this.body).velocity.y = this.velocidadMaxima;
                }

            }

            if (dirX > 0) {
                this.setScaleMinMax(-1, 1, -1, 1);
                this.direccionActual = "R";
            } else {
                this.setScaleMinMax(1, 1, 1, 1);
                this.direccionActual = "L";
            }

            if (this.direccionActual != this.direccion) {
                if (this.direccionActual == "R") {
                    (<Phaser.Physics.P2.Body>this.body).removeShape(this.ColiosionReventadorPico);
                    this.ColiosionReventadorPico = (<Phaser.Physics.P2.Body>this.body).addRectangle(5, 2, -12, -5.4);
                    this.ColiosionReventadorPico.sensor = true;
                    this.idColisionReventadorPico = this.ColiosionReventadorPico.id;

                    (<Phaser.Physics.P2.Body>this.body).removeShape(this.ColiosionReventadorPie);
                    this.ColiosionReventadorPie = (<Phaser.Physics.P2.Body>this.body).addRectangle(5, 5, -5, 15);
                    this.ColiosionReventadorPie.sensor = true;
                    this.idColisionReventadorPie = this.ColiosionReventadorPie.id;

                } else {
                    (<Phaser.Physics.P2.Body>this.body).removeShape(this.ColiosionReventadorPico);
                    this.ColiosionReventadorPico = (<Phaser.Physics.P2.Body>this.body).addRectangle(5, 2, 12, -5.4);
                    this.ColiosionReventadorPico.sensor = true;
                    this.idColisionReventadorPico = this.ColiosionReventadorPico.id;

                    (<Phaser.Physics.P2.Body>this.body).removeShape(this.ColiosionReventadorPie);
                    this.ColiosionReventadorPie = (<Phaser.Physics.P2.Body>this.body).addRectangle(5, 5, 5, 15);
                    this.ColiosionReventadorPie.sensor = true;
                    this.idColisionReventadorPie = this.ColiosionReventadorPie.id;
                }
                this.direccion = this.direccionActual;

                (<Phaser.Physics.P2.Body>this.body).setMaterial(GestorMaterialesContacto.getInstancia(this.game).enemigoMaterial);
                (<Phaser.Physics.P2.Body>this.body).setCollisionGroup(GestorGrupos.getInstancia(this.game).grupoColisionEnemigo);

            }

        }

        caerParacaidas() {
            this.ia.puedeVolar = false;
            this.ia.cayendoParacaidas = true;
            this.animations.play("cayendoParacaidas");
            this.paracaidas.scale.setTo(0);

            this.paracaidas.visible = true;
            this.twenParacaidas.to({ x: 1, y: 1 }, 1000, Phaser.Easing.Elastic.InOut, true);
            (<Phaser.Physics.P2.Body>this.body).mass = 500;

            (<Phaser.Physics.P2.Body>this.body).velocity.y = 0;

            (<Phaser.Physics.P2.Body>this.body).data.gravityScale = 0.2;
        }

        caer() {
            this.ia.puedeVolar = false;
            this.ia.cayendoParacaidas = false;
            this.animations.play("cayendo");

            (<Phaser.Physics.P2.Body>this.body).setZeroVelocity();

            (<Phaser.Physics.P2.Body>this.body).data.shapes[0].sensor = true;

            (<Phaser.Physics.P2.Body>this.body).data.gravityScale = 1;
        }

        reventarGlobo() {
            this.game.physics.p2.removeConstraint<Phaser.Physics.P2.LockConstraint>(this.restriccionGlobo);
            (<Phaser.Physics.P2.Body>this.globo.body).setZeroVelocity();
            (<Phaser.Physics.P2.Body>this.globo.body).static = true;
            (<Phaser.Physics.P2.Body>this.globo.body).data.shapes[0].sensor = true;
            this.globo.animations.play("reventando", 10, false, true);
        }

        terminoInflarGlobo() {
            if (this.animations.currentAnim.name != "cayendo") {
                this.globo.animations.play("normal");
                this.animations.play('volando');
                this.ia.puedeVolar = true;
                this.ia.retrasarVuelo();
            }
        }
    }
}