module Elioway.BallonFight {

    export class IAEnemigo {

        game: Phaser.Game;
        enemigo: Enemigo;
        timerInflarGlobo: Phaser.Timer;
        timerVolarXNivel: Phaser.Timer;
        timerRetrasarVuelo: Phaser.Timer;
        timerZigZagCaida: Phaser.Timer;
        puedeVolar: Boolean;
        cayendoParacaidas: Boolean;
        dir = { dirX: 0, dirY: 0 };
        direccionZigZag: string = "R";


        constructor(game: Phaser.Game, enemigo: Enemigo) {

            this.game = game;
            this.enemigo = enemigo;
            this.puedeVolar = false;
            this.cayendoParacaidas = false;

            this.timerInflarGlobo = new Phaser.Timer(game, true);
            game.time.add(this.timerInflarGlobo);
            this.timerInflarGlobo.add(3000, enemigo.inflarGlobo, enemigo);
            this.timerInflarGlobo.start();

            this.timerZigZagCaida = new Phaser.Timer(game, false);
            game.time.add(this.timerZigZagCaida);
            this.timerZigZagCaida.loop(2000, this.zigZag, this);

            (<Phaser.Physics.P2.Body>this.enemigo.body).onBeginContact.add(this.contactoOtroBody, this);
            (<Phaser.Physics.P2.Body>this.enemigo.globo.body).onBeginContact.add(this.contactoGlobo, this);
            (<Phaser.Physics.P2.Body>this.enemigo.paracaidas.body).onBeginContact.add(this.contactoParacaidas, this);

        }

        update() {
            if (this.puedeVolar) {
                this.enemigo.volar(this.dir.dirX, this.dir.dirY);

                if (this.enemigo.body.y > this.game.height - 64 - 16) {
                    this.cambiarDireccionTop();
                }
            }
            if (this.cayendoParacaidas) {

                if ((<Phaser.Physics.P2.Body>this.enemigo.body).velocity.y > 20) {
                    (<Phaser.Physics.P2.Body>this.enemigo.body).velocity.y = 20;
                }

                if (this.enemigo.body.y > this.game.height - 64 - 16) {
                    (<Phaser.Physics.P2.Body>this.enemigo.body).data.shapes[0].sensor = true;
                }
            }
        }

        zigZag() {
            if (this.direccionZigZag == "R") {
                (<Phaser.Physics.P2.Body>this.enemigo.body).moveLeft(20);
                this.direccionZigZag = "L";
            } else {
                (<Phaser.Physics.P2.Body>this.enemigo.body).moveRight(20);
                this.direccionZigZag = "R";
            }
        }

        private numeroAleatorio(min: number, max: number): number {
            return Math.random() * (max - min) + min;
        }

        private cambiarDireccion() {

            this.dir.dirX = this.numeroAleatorio(-80, 80);
            this.dir.dirY = this.numeroAleatorio(-80, 80);
        }

        private empezarTimerVolar() {

            this.dir.dirX = 0;
            this.dir.dirY = 0;
            this.crearTimerVolar();
        }

        crearTimerVolar() {
            this.timerVolarXNivel = new Phaser.Timer(this.game, false);
            this.game.time.add(this.timerVolarXNivel);
            this.cambiarDireccion();
            this.cambiarDireccionTop();
            this.timerVolarXNivel.loop(this.numeroAleatorio(1000, 3000), this.cambiarDireccion, this);
            this.timerVolarXNivel.start();
        }

        retrasarVuelo() {
            this.timerRetrasarVuelo = new Phaser.Timer(this.game, false);
            this.game.time.add(this.timerRetrasarVuelo);
            this.timerRetrasarVuelo.add(100, this.empezarTimerVolar, this);
            this.timerRetrasarVuelo.start();
        }

        contactoGlobo(bodyA: Phaser.Physics.P2.Body, bodyB: Phaser.Physics.P2.Body, shapeA, shapeB) {

            if (this.puedeVolar) {

                if (bodyA) {
                    if (shapeB.id == this.enemigo.player.idColisionReventadorPie) {
                        this.enemigo.player.establecerColisionGlobo();
                        this.enemigo.reventarGlobo();
                        this.enemigo.caerParacaidas();
                        this.zigZag();
                        this.timerZigZagCaida.start();
                    }
                }
            }
        }

        contactoParacaidas(bodyA: Phaser.Physics.P2.Body, bodyB: Phaser.Physics.P2.Body, shapeA, shapeB) {
            if (!this.puedeVolar && this.cayendoParacaidas) {

                if (bodyA) {
                    if (shapeB.id == this.enemigo.player.idColisionReventadorPie) {
                        this.enemigo.body.mass = 10;
                        this.enemigo.paracaidas.visible = false;
                        this.enemigo.caer();
                    }
                }
            }
        }

        contactoOtroBody(bodyA: Phaser.Physics.P2.Body, bodyB: Phaser.Physics.P2.Body, shapeA, shapeB) {

            if (this.enemigo.animations.currentAnim.name == "quieto" || this.enemigo.animations.currentAnim.name == "inflandoGlobo") {
                if (bodyA && (bodyA.sprite.name == "Jugador" || bodyA.sprite.name == "Globo1") || bodyA.sprite.name == "Globo2") {
                    this.timerInflarGlobo.stop(false)

                    if (this.enemigo.animations.currentAnim.name == "inflandoGlobo"){
                        this.enemigo.reventarGlobo();
                    }

                    this.enemigo.body.mass = 10;
                    this.enemigo.caer();
                }
            }

            if (this.cayendoParacaidas) {

                if (bodyA) {
                    if (shapeA.id == this.enemigo.idSensorSuelo && bodyA.sprite.name == "Terreno") {
                        this.enemigo.animations.play("quieto");
                        this.cayendoParacaidas = false;
                        this.enemigo.paracaidas.visible = false;
                        this.timerZigZagCaida.stop();

                        (<Phaser.Physics.P2.Body>this.enemigo.body).velocity.x = 0;
                        (<Phaser.Physics.P2.Body>this.enemigo.paracaidas.body).velocity.x = 0;
                        (<Phaser.Physics.P2.Body>this.enemigo.body).mass = 10;

                        this.timerInflarGlobo = new Phaser.Timer(this.game, false);
                        this.game.time.add(this.timerInflarGlobo);
                        this.timerInflarGlobo.add(3000, this.enemigo.inflarGlobo, this.enemigo);
                        this.timerInflarGlobo.start();
                    }
                }
            }

            if (this.puedeVolar) {

                if (bodyA) {

                    if (shapeA.id == this.enemigo.idColisionRight && bodyA.sprite.name == "Terreno") {
                        this.cambiarDireccionLeft();
                    } else if (shapeA.id == this.enemigo.idColisionLeft && bodyA.sprite.name == "Terreno") {
                        this.cambiarDireccionRight();
                    } else if (shapeA.id == this.enemigo.idColisionBot && bodyA.sprite.name == "Terreno") {
                        this.cambiarDireccionTop();
                    } else if (shapeA.id == this.enemigo.idColisionTop && bodyA.sprite.name == "Terreno") {
                        this.cambiarDireccionBot();
                    } else if ((shapeA.id == this.enemigo.idColisionReventadorPico || shapeA.id == this.enemigo.idColisionReventadorPie) && (bodyA.sprite.name == "Globo1" || bodyA.sprite.name == "Globo2")) {

                        (<Phaser.Physics.P2.Body>bodyA).setZeroVelocity();

                        this.enemigo.player.reventarGlobo(bodyA);

                        if (this.enemigo.player.globo1 == null && this.enemigo.player.globo2 == null) {
                            this.enemigo.player.caer();
                        }

                    }

                } else {

                    if (shapeA.id == this.enemigo.idColisionRight) {
                        this.cambiarDireccionLeft();
                    } else if (shapeA.id == this.enemigo.idColisionLeft) {
                        this.cambiarDireccionRight();
                    } else if (shapeA.id == this.enemigo.idColisionBot) {
                        this.cambiarDireccionTop();
                    } else if (shapeA.id == this.enemigo.idColisionTop) {
                        this.cambiarDireccionBot();
                    }
                }
            }
        }

        cambiarDireccionLeft() {

            this.dir.dirX = this.numeroAleatorio(80, 50);

            this.timerVolarXNivel.stop(false);
            this.timerVolarXNivel.start(100);
        }

        cambiarDireccionRight() {

            this.dir.dirX = this.numeroAleatorio(-80, -50);

            this.timerVolarXNivel.stop(false);
            this.timerVolarXNivel.start(100);
        }

        cambiarDireccionTop() {

            this.dir.dirY = this.numeroAleatorio(80, 50);

            this.timerVolarXNivel.stop(false);
            this.timerVolarXNivel.start(100);
        }

        cambiarDireccionBot() {

            this.dir.dirY = this.numeroAleatorio(-80, -50);

            this.timerVolarXNivel.stop(false);
            this.timerVolarXNivel.start(100);
        }

    }

}