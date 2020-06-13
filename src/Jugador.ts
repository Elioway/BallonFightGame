module Elioway.BallonFight {

    export class Jugador extends Phaser.Sprite {

        gamepad: GamePad;

        globo1: Phaser.Sprite;
        globo2: Phaser.Sprite;

        cabeza: Phaser.Sprite;

        restriccionGlobo1: Phaser.Physics.P2.LockConstraint;
        restriccionGlobo2: Phaser.Physics.P2.LockConstraint;

        sensorSuelo: p2.Shape;

        velocidadMovimiento: number;
        fuerza: number;
        fuerzaLateral: number;
        velocidadMaxima: number;
        animacionActual: Phaser.Animation;
        tocandoSuelo: boolean;
        atrapado: boolean;

        colisionReventadorPie: any;
        idColisionReventadorPie: number;

        direccion: string;

        colisionGlobo: boolean;

        constructor(game: Phaser.Game, x: number, y: number) {
            super(game, x, y, 'gameAtlas', 'Player/Quieto/1');

            this.atrapado = false;

            //GamePad
            this.gamepad = GamePad.getInstancia(this.game);

            //Globos

            this.globo1 = this.game.add.sprite(this.x + this.width / 6, this.y - this.height / 1.5, 'gameAtlas', 'Globo/GloboReventando/Rojo/1', GestorGrupos.getInstancia(this.game).grupoJugador);
            this.globo1.animations.add('normal', ['Globo/GloboReventando/Rojo/1'], 1, true);
            this.globo1.animations.add('reventando', ['Globo/GloboReventando/Rojo/1', 'Globo/GloboReventando/Rojo/2', 'Globo/GloboReventando/Rojo/3',
                'Globo/GloboReventando/Rojo/4', 'Globo/GloboReventando/Rojo/5', 'Globo/GloboReventando/Rojo/6'], 10, true);
            this.globo1.anchor.set(0.5);
            this.globo1.smoothed = false;
            this.globo1.name = "Globo1";

            this.game.physics.p2.enable(this.globo1, false);
            (<Phaser.Physics.P2.Body>this.globo1.body).data.gravityScale = 0;
            (<Phaser.Physics.P2.Body>this.globo1.body).clearShapes();
            (<Phaser.Physics.P2.Body>this.globo1.body).addCircle(this.globo1.width / 4.5, 1.5, -2);
            (<Phaser.Physics.P2.Body>this.globo1.body).fixedRotation = true;
            (<Phaser.Physics.P2.Body>this.globo1.body).setMaterial(GestorMaterialesContacto.getInstancia(this.game).globoPlayerMaterial);
            (<Phaser.Physics.P2.Body>this.globo1.body).collideWorldBounds = true;
            (<Phaser.Physics.P2.Body>this.globo1.body).setCollisionGroup(GestorGrupos.getInstancia(this.game).grupoColisionGloboJugador);
            GestorGrupos.getInstancia(this.game).configurarColisionamiento(this.globo1, "GloboJugador");
            this.globo1.play('normal');

            this.globo2 = this.game.add.sprite(this.x - this.width / 6, this.y - this.height / 1.5, 'gameAtlas', 'Globo/GloboReventando/Rojo/1', GestorGrupos.getInstancia(this.game).grupoJugador);
            this.globo2.animations.add('normal', ['Globo/GloboReventando/Rojo/1'], 1, true);
            this.globo2.animations.add('reventando', ['Globo/GloboReventando/Rojo/1', 'Globo/GloboReventando/Rojo/2', 'Globo/GloboReventando/Rojo/3',
                'Globo/GloboReventando/Rojo/4', 'Globo/GloboReventando/Rojo/5', 'Globo/GloboReventando/Rojo/6'], 10, true);
            this.globo2.anchor.set(0.5);
            this.globo2.smoothed = false;
            this.globo2.name = "Globo2";

            this.game.physics.p2.enable(this.globo2, false);
            (<Phaser.Physics.P2.Body>this.globo2.body).data.gravityScale = 0;
            (<Phaser.Physics.P2.Body>this.globo2.body).clearShapes();
            (<Phaser.Physics.P2.Body>this.globo2.body).addCircle(this.globo2.width / 4.5, -1.3, -2);
            (<Phaser.Physics.P2.Body>this.globo2.body).fixedRotation = true;
            (<Phaser.Physics.P2.Body>this.globo2.body).setMaterial(GestorMaterialesContacto.getInstancia(this.game).globoPlayerMaterial);
            (<Phaser.Physics.P2.Body>this.globo2.body).collideWorldBounds = true;
            (<Phaser.Physics.P2.Body>this.globo2.body).setCollisionGroup(GestorGrupos.getInstancia(this.game).grupoColisionGloboJugador);
            GestorGrupos.getInstancia(this.game).configurarColisionamiento(this.globo2, "GloboJugador");
            this.globo2.play('normal');

            //Cabeza
            this.cabeza = new Phaser.Sprite(this.game, this.x, this.y, '', '');
            this.cabeza.anchor.set(0.5);
            this.cabeza.name = 'CabezaJugador';

            this.game.physics.p2.enable(this.cabeza, false);
            (<Phaser.Physics.P2.Body>this.cabeza.body).clearShapes();
            (<Phaser.Physics.P2.Body>this.cabeza.body).setCircle(this.width / 6, 0, -this.height / 8);
            (<Phaser.Physics.P2.Body>this.cabeza.body).fixedRotation = true;
            (<Phaser.Physics.P2.Body>this.cabeza.body).setCollisionGroup(GestorGrupos.getInstancia(this.game).grupoColisionCabeza);
            GestorGrupos.getInstancia(this.game).configurarColisionamiento(this.cabeza, 'Cabeza');

            this.game.add.existing(this.cabeza);
            GestorGrupos.getInstancia(this.game).grupoJugador.add(this.cabeza);

            //Player
            this.velocidadMovimiento = 100;
            this.fuerza = 150;
            this.velocidadMaxima = 100;
            this.fuerzaLateral = 100;

            this.outOfBoundsKill = true;
            this.name = 'Jugador';
            this.anchor.set(0.5);
            this.smoothed = false;
            this.animations.add('quieto', ['Player/Quieto/1', 'Player/Quieto/2', 'Player/Quieto/3', 'Player/Quieto/2'], 5, true);
            this.animations.add('corriendo', ['Player/Corriendo/1', 'Player/Corriendo/2', 'Player/Corriendo/3', 'Player/Corriendo/4', 'Player/Corriendo/5'], 20, true);
            this.animations.add('volando', ['Player/Volando/1', 'Player/Volando/2', 'Player/Volando/3', 'Player/Volando/4', 'Player/Volando/5', 'Player/Volando/4', 'Player/Volando/3', 'Player/Volando/2'], 38, true);
            this.animations.add('desenso', ['Player/Volando/1'], 1, true);
            this.animations.add('electrocutado', ['Player/Electrocutado/1', 'Player/Electrocutado/2', 'Player/Electrocutado/1', 'Player/Electrocutado/2', 'Player/Electrocutado/1',
                'Player/Electrocutado/2', 'Player/Electrocutado/1', 'Player/Electrocutado/2', 'Player/Electrocutado/1', 'Player/Electrocutado/2'
                , 'Player/Electrocutado/1', 'Player/Electrocutado/2'], 20, false).onComplete.add(this.finElectrocutado, this);
            this.animations.add('cayendo', ['Player/Cayendo/1', 'Player/Cayendo/2', 'Player/Cayendo/3'], 20, true);
            this.animations.add('tragado', ['Player/Tragado/1', 'Player/Tragado/2', 'Player/Tragado/3', 'Player/Tragado/4', 'Player/Tragado/5', 'Player/Tragado/4', 'Player/Tragado/3', 'Player/Tragado/2'],
                20, true);

            this.game.physics.p2.enable(this, false);
            (<Phaser.Physics.P2.Body>this.body).clearShapes();
            (<Phaser.Physics.P2.Body>this.body).setRectangle(this.width / 2, this.height, 0, 0);
            (<Phaser.Physics.P2.Body>this.body).fixedRotation = true;
            (<Phaser.Physics.P2.Body>this.body).mass = 10;

            (<Phaser.Physics.P2.Body>this.body).addRectangle(this.width / 2.1, this.height / 10, 0, this.height / 1.9);
            (<Phaser.Physics.P2.Body>this.body).data.shapes[1].sensor = true;
            this.sensorSuelo = (<Phaser.Physics.P2.Body>this.body).data.shapes[1];

            this.colisionReventadorPie = (<Phaser.Physics.P2.Body>this.body).addRectangle(5, 5, 5, 15);
            this.colisionReventadorPie.sensor = true;
            this.idColisionReventadorPie = this.colisionReventadorPie.id;

            (<Phaser.Physics.P2.Body>this.body).onBeginContact.add(this.triggerSensorSueloIn, this);
            (<Phaser.Physics.P2.Body>this.body).onEndContact.add(this.triggerSensorSueloOut, this);

            (<Phaser.Physics.P2.Body>this.body).collideWorldBounds = true;

            this.restriccionGlobo1 = this.game.physics.p2.createLockConstraint(this.body, this.globo1.body, [-this.width / 6, this.height / 1.2], 0);
            this.restriccionGlobo2 = this.game.physics.p2.createLockConstraint(this.body, this.globo2.body, [this.width / 6, this.height / 1.2], 0);
            this.game.physics.p2.createLockConstraint(this.body, this.cabeza.body, [0, this.height / 7], 0);

            (<Phaser.Physics.P2.Body>this.body).setMaterial(GestorMaterialesContacto.getInstancia(this.game).jugadorMaterial, (<Phaser.Physics.P2.Body>this.body).data.shapes[0]);
            (<Phaser.Physics.P2.Body>this.body).setCollisionGroup(GestorGrupos.getInstancia(this.game).grupoColisionJugador);
            GestorGrupos.getInstancia(this.game).configurarColisionamiento(this, "Jugador");

            this.game.add.existing(this);
            GestorGrupos.getInstancia(this.game).grupoJugador.add(this);

            this.animacionActual = this.play('quieto');


        }

        update() {

            this.gamepad.actualizarTeclado();

            if (!this.atrapado && !this.colisionGlobo) {

                if ((this.animations.currentAnim.name != 'electrocutado' && this.animations.currentAnim.name != 'cayendo')) {

                    if (this.gamepad.isUpDown()) {
                        if (this.animations.currentAnim.name != 'volando') {
                            this.animacionActual = this.play('volando');
                        }

                        (<Phaser.Physics.P2.Body>this.body).applyForce([0, this.fuerza], 0, 0);
                        if ((<Phaser.Physics.P2.Body>this.body).velocity.y < -this.velocidadMaxima) {
                            (<Phaser.Physics.P2.Body>this.body).velocity.y = -this.velocidadMaxima;
                        }
                    }
                    if (this.gamepad.isLeftDown()) {
                        this.setScaleMinMax(-1, 1, -1, 1);

                        if (this.direccion != "L") {
                            (<Phaser.Physics.P2.Body>this.body).removeShape(this.colisionReventadorPie);
                            this.colisionReventadorPie = (<Phaser.Physics.P2.Body>this.body).addRectangle(5, 5, -6, 16);
                            this.colisionReventadorPie.sensor = true;
                            this.idColisionReventadorPie = this.colisionReventadorPie.id;

                            (<Phaser.Physics.P2.Body>this.body).setMaterial(GestorMaterialesContacto.getInstancia(this.game).jugadorMaterial, (<Phaser.Physics.P2.Body>this.body).data.shapes[0]);
                            (<Phaser.Physics.P2.Body>this.body).setCollisionGroup(GestorGrupos.getInstancia(this.game).grupoColisionJugador);

                            this.direccion = "L";
                        }

                        (<Phaser.Physics.P2.Body>this.body).applyForce([this.fuerzaLateral, 0], 0, 0);
                        if ((<Phaser.Physics.P2.Body>this.body).velocity.x < -this.velocidadMaxima) {
                            (<Phaser.Physics.P2.Body>this.body).velocity.x = -this.velocidadMaxima;
                        }
                        if (this.tocandoSuelo) {
                            if (this.animations.currentAnim.name != 'corriendo' && !this.gamepad.isUpDown()) {
                                this.animacionActual = this.play('corriendo');
                            }
                        } else {
                            if (!this.gamepad.isUpDown()) {
                                this.animacionActual = this.play('desenso');
                            }
                        }
                    }
                    if (this.gamepad.isRightDown()) {
                        this.setScaleMinMax(1, 1, 1, 1);

                        if (this.direccion != "R") {
                            (<Phaser.Physics.P2.Body>this.body).removeShape(this.colisionReventadorPie);
                            this.colisionReventadorPie = (<Phaser.Physics.P2.Body>this.body).addRectangle(5, 5, 6, 16);
                            this.colisionReventadorPie.sensor = true;
                            this.idColisionReventadorPie = this.colisionReventadorPie.id;

                            (<Phaser.Physics.P2.Body>this.body).setMaterial(GestorMaterialesContacto.getInstancia(this.game).jugadorMaterial, (<Phaser.Physics.P2.Body>this.body).data.shapes[0]);
                            (<Phaser.Physics.P2.Body>this.body).setCollisionGroup(GestorGrupos.getInstancia(this.game).grupoColisionJugador);

                            this.direccion = "R";
                        }

                        (<Phaser.Physics.P2.Body>this.body).applyForce([-this.fuerzaLateral, 0], 0, 0);
                        if ((<Phaser.Physics.P2.Body>this.body).velocity.x > this.velocidadMaxima) {
                            (<Phaser.Physics.P2.Body>this.body).velocity.x = this.velocidadMaxima;
                        }
                        if (this.tocandoSuelo) {
                            if (this.animations.currentAnim.name != 'corriendo' && !this.gamepad.isUpDown()) {
                                this.animacionActual = this.play('corriendo');
                            }
                        } else {
                            if (!this.gamepad.isUpDown()) {
                                this.animacionActual = this.play('desenso');
                            }
                        }
                    }

                    if ((!this.gamepad.isRightDown() && !this.gamepad.isLeftDown() && !this.gamepad.isUpDown()) || (this.gamepad.isRightDown() && this.gamepad.isLeftDown())) {
                        if (this.tocandoSuelo) {
                            if (this.animations.currentAnim.name != 'quieto') {
                                this.animacionActual = this.play('quieto');
                            }
                            (<Phaser.Physics.P2.Body>this.body).velocity.x = 0;
                        } else {
                            this.animacionActual = this.play("desenso");
                        }
                    }
                }
            }
        }
        caer() {
            this.play('cayendo');
            (<Phaser.Physics.P2.Body>this.body).setZeroVelocity();
            (<Phaser.Physics.P2.Body>this.body).data.shapes[0].sensor = true;
        }

        electrocutar() {
            this.play('electrocutado');
            (<Phaser.Physics.P2.Body>this.body).setZeroVelocity();
            if (this.globo1 != null) {
                (<Phaser.Physics.P2.Body>this.globo1.body).setZeroVelocity();
            }
            if (this.globo2 != null) {
                (<Phaser.Physics.P2.Body>this.globo2.body).setZeroVelocity();
            }

            (<Phaser.Physics.P2.Body>this.body).data.shapes[0].sensor = true;

            this.reventarGlobos();
        }

        reventarGlobo(body: Phaser.Physics.P2.Body) {
            if (body != null) {
                if ((<Phaser.Physics.P2.Body>body).sprite.name == 'Globo1') {

                    this.game.physics.p2.removeConstraint<Phaser.Physics.P2.LockConstraint>(this.restriccionGlobo1);
                    this.restriccionGlobo1 = null;

                    if (this.globo2 != null) {
                        this.game.physics.p2.removeConstraint<Phaser.Physics.P2.LockConstraint>(this.restriccionGlobo2);
                        this.restriccionGlobo2 = this.game.physics.p2.createLockConstraint(this.body, this.globo2.body, [0, this.height / 1.2], 0);
                    }

                    (<Phaser.Physics.P2.Body>body).kinematic = true;
                    (<Phaser.Physics.P2.Body>body).data.shapes[0].sensor = true;

                } else if ((<Phaser.Physics.P2.Body>body).sprite.name == 'Globo2') {

                    this.game.physics.p2.removeConstraint<Phaser.Physics.P2.LockConstraint>(this.restriccionGlobo2);
                    this.restriccionGlobo2 = null;

                    if (this.globo1 != null) {
                        this.game.physics.p2.removeConstraint<Phaser.Physics.P2.LockConstraint>(this.restriccionGlobo1);
                        this.restriccionGlobo1 = this.game.physics.p2.createLockConstraint(this.body, this.globo1.body, [0, this.height / 1.2], 0);
                    }

                    (<Phaser.Physics.P2.Body>body).kinematic = true;
                    (<Phaser.Physics.P2.Body>body).data.shapes[0].sensor = true;
                }
                (<Phaser.Physics.P2.Body>body).sprite.play('reventando', 10, false, true);

                if ((<Phaser.Physics.P2.Body>body).sprite.name == 'Globo1') {
                    this.globo1 = null;
                } else {
                    this.globo2 = null;
                }
            }
        }

        reventarGlobos() {
            if (this.globo1 != null) {
                this.game.physics.p2.removeConstraint<Phaser.Physics.P2.LockConstraint>(this.restriccionGlobo1);
                (<Phaser.Physics.P2.Body>this.globo1.body).sprite.play('reventando', 10, false, true);
                (<Phaser.Physics.P2.Body>this.globo1.body).setZeroVelocity();
                this.globo1 = null;
            } if (this.globo2 != null) {
                this.game.physics.p2.removeConstraint<Phaser.Physics.P2.LockConstraint>(this.restriccionGlobo2);
                (<Phaser.Physics.P2.Body>this.globo2.body).sprite.play('reventando', 10, false, true);
                (<Phaser.Physics.P2.Body>this.globo2.body).setZeroVelocity();
                this.globo2 = null;
            }

        }

        private finElectrocutado() {
            this.play('cayendo');
        }

        triggerSensorSueloIn(body1, body2, shapeA, shapeB) {
            if (body1 != null) {
                if ((<Phaser.Physics.P2.Body>body1).sprite.name == "Terreno" && shapeA == this.sensorSuelo) {
                    this.tocandoSuelo = true;
                }
            }
        }

        triggerSensorSueloOut(body1, body2, shapeA, shapeB) {
            if (body1 != null) {
                if ((<Phaser.Physics.P2.Body>body1).sprite.name == "Terreno" && shapeA == this.sensorSuelo) {
                    this.tocandoSuelo = false;
                }
            }
        }

        atrapar() {
            this.atrapado = true;
            this.animations.play('tragado');
            this.setScaleMinMax(-1, 1, -1, 1);
        }

        establecerColisionGlobo() {
            this.colisionGlobo = true;

            let timer = this.game.time.create(true);

            timer.add(100, function () {
                this.colisionGlobo = false;
            }, this);

            timer.start();
        }
    }

}