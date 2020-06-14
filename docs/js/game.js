var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
window.onload = function () {
    var game = new Elioway.BallonFight.BallonFightGame();
};
var Elioway;
(function (Elioway) {
    var BallonFight;
    (function (BallonFight) {
        var Boot = (function (_super) {
            __extends(Boot, _super);
            function Boot() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            Boot.prototype.preload = function () {
                this.load.image('preloadBar', 'assets/preloadBar.png');
            };
            Boot.prototype.create = function () {
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
            };
            return Boot;
        }(Phaser.State));
        BallonFight.Boot = Boot;
    })(BallonFight = Elioway.BallonFight || (Elioway.BallonFight = {}));
})(Elioway || (Elioway = {}));
var Elioway;
(function (Elioway) {
    var BallonFight;
    (function (BallonFight) {
        var ConstructorOceano = (function () {
            function ConstructorOceano(game, debug) {
                if (debug === void 0) { debug = false; }
                this.game = game;
                this.debug = debug;
            }
            ConstructorOceano.prototype.crearOceanoExterior = function (cantidadBloques, posicion) {
                var sprite = null;
                var spriteConCuerpo = null;
                for (var i = 1; i <= cantidadBloques; i++) {
                    if (i === 1) {
                        sprite = this.game.add.sprite(0, 0, 'gameAtlas', 'Mar/MarPunta/1');
                        BallonFight.GestorGrupos.getInstancia(this.game).grupoOceanoExterior.add(sprite);
                        sprite.smoothed = false;
                        sprite.animations.add('olas', ['Mar/MarPunta/1', 'Mar/MarPunta/2', 'Mar/MarPunta/3', 'Mar/MarPunta/4', 'Mar/MarPunta/5', 'Mar/MarPunta/6'], 8, true);
                        sprite.animations.play('olas');
                        sprite.position.set(posicion.x + (-sprite.width / 2) + (sprite.width * i), posicion.y + (sprite.height / 2));
                        this.game.physics.p2.enable(sprite, this.debug);
                        sprite.body.static = true;
                        sprite.body.clearShapes();
                        sprite.body.addLine(sprite.width * cantidadBloques * 2);
                        sprite.body.data.shapes[0].sensor = true;
                        sprite.body.setCollisionGroup(BallonFight.GestorGrupos.getInstancia(this.game).grupoColisionOceano);
                        BallonFight.GestorGrupos.getInstancia(this.game).configurarColisionamiento(sprite, "Oceano");
                        spriteConCuerpo = sprite;
                    }
                    else {
                        sprite = this.game.add.sprite(0, 0, 'gameAtlas', 'Mar/MarPunta/1');
                        BallonFight.GestorGrupos.getInstancia(this.game).grupoOceanoExterior.add(sprite);
                        sprite.smoothed = false;
                        sprite.position.set(posicion.x + (-sprite.width) + (sprite.width * i), posicion.y);
                        sprite.animations.add('olas', ['Mar/MarPunta/1', 'Mar/MarPunta/2', 'Mar/MarPunta/3', 'Mar/MarPunta/4', 'Mar/MarPunta/5', 'Mar/MarPunta/6'], 8, true);
                        sprite.animations.play('olas');
                    }
                }
                return spriteConCuerpo;
            };
            ConstructorOceano.prototype.crearOceanoInterior = function (cantidadBloques, posicion, isPunta) {
                var sprite = null;
                var spriteConCuerpo = null;
                for (var i = 1; i <= cantidadBloques; i++) {
                    if (isPunta) {
                        sprite = this.game.add.sprite(0, 0, 'gameAtlas', 'Mar/MarPunta/1');
                        BallonFight.GestorGrupos.getInstancia(this.game).grupoOceanoInterior.add(sprite);
                        sprite.smoothed = false;
                        sprite.animations.add('olas', ['Mar/MarPunta/1', 'Mar/MarPunta/2', 'Mar/MarPunta/3', 'Mar/MarPunta/4', 'Mar/MarPunta/5', 'Mar/MarPunta/6'], 8, true);
                    }
                    else {
                        sprite = this.game.add.sprite(0, 0, 'gameAtlas', 'Mar/MarCentro/1');
                        BallonFight.GestorGrupos.getInstancia(this.game).grupoOceanoInterior.add(sprite);
                        sprite.smoothed = false;
                        sprite.animations.add('olas', ['Mar/MarCentro/1', 'Mar/MarCentro/2', 'Mar/MarCentro/3', 'Mar/MarCentro/4', 'Mar/MarCentro/5', 'Mar/MarCentro/6'], 8, true);
                    }
                    sprite.position.set(posicion.x + (-sprite.width) + (sprite.width * i), posicion.y);
                    sprite.animations.play('olas');
                }
            };
            return ConstructorOceano;
        }());
        BallonFight.ConstructorOceano = ConstructorOceano;
    })(BallonFight = Elioway.BallonFight || (Elioway.BallonFight = {}));
})(Elioway || (Elioway = {}));
var Elioway;
(function (Elioway) {
    var BallonFight;
    (function (BallonFight) {
        var ContructorTerreno = (function () {
            function ContructorTerreno(game, debug) {
                if (debug === void 0) { debug = false; }
                this.game = game;
                this.debug = debug;
            }
            ContructorTerreno.prototype.crearTerrenoFlotante = function (cantidadBloques, posicion) {
                var sprite = null;
                var spriteConCuerpo = null;
                for (var i = 1; i <= cantidadBloques; i++) {
                    if (i === 1) {
                        sprite = this.game.add.sprite(0, 0, 'gameAtlas', 'Terreno/2');
                        sprite.name = "Terreno";
                        BallonFight.GestorGrupos.getInstancia(this.game).grupoTerreno.add(sprite);
                        sprite.smoothed = false;
                        sprite.position.set(posicion.x + (-sprite.width / 2) + (sprite.width * i), posicion.y + (sprite.height / 2));
                        this.game.physics.p2.enable(sprite, this.debug);
                        //(<Phaser.Physics.P2.Body>sprite.body).static = true;
                        sprite.body.kinematic = true;
                        sprite.body.clearShapes();
                        sprite.body.addRectangle(sprite.width * cantidadBloques, sprite.height / 1.5, (sprite.width * cantidadBloques) / 2 - (sprite.width / 2), -sprite.height / 9);
                        sprite.body.setMaterial(BallonFight.GestorMaterialesContacto.getInstancia(this.game).terrenoMaterial);
                        sprite.body.setCollisionGroup(BallonFight.GestorGrupos.getInstancia(this.game).grupoColisionTerreno);
                        BallonFight.GestorGrupos.getInstancia(this.game).configurarColisionamiento(sprite, "Terreno");
                        spriteConCuerpo = sprite;
                    }
                    else if (i === cantidadBloques) {
                        sprite = this.game.add.sprite(0, 0, 'gameAtlas', 'Terreno/7');
                        BallonFight.GestorGrupos.getInstancia(this.game).grupoTerreno.add(sprite);
                        sprite.smoothed = false;
                        sprite.position.set(posicion.x + (-sprite.width) + (sprite.width * i), posicion.y);
                    }
                    else {
                        sprite = this.game.add.sprite(0, 0, 'gameAtlas', 'Terreno/1');
                        BallonFight.GestorGrupos.getInstancia(this.game).grupoTerreno.add(sprite);
                        sprite.smoothed = false;
                        sprite.position.set(posicion.x + (-sprite.width) + (sprite.width * i), posicion.y);
                    }
                }
                return spriteConCuerpo;
            };
            ContructorTerreno.prototype.crearTerrenoSalienteDerecho = function (largo, ancho, posicion) {
                var sprite = null;
                var spriteConCuerpo = null;
                for (var i = 1; i <= largo; i++) {
                    for (var k = 1; k <= ancho; k++) {
                        if (i === 1 && k == 1) {
                            sprite = this.game.add.sprite(0, 0, 'gameAtlas', 'Terreno/9');
                            sprite.name = "Terreno";
                            BallonFight.GestorGrupos.getInstancia(this.game).grupoTerreno.add(sprite);
                            sprite.smoothed = false;
                            sprite.position.set(posicion.x + (-sprite.width / 2) + (sprite.width * i), posicion.y - (sprite.height / 2) + sprite.height * k);
                            this.game.physics.p2.enable(sprite, this.debug);
                            //(<Phaser.Physics.P2.Body>sprite.body).static = true;
                            sprite.body.kinematic = true;
                            sprite.body.clearShapes();
                            sprite.body.addRectangle(sprite.width * largo, sprite.height * ancho, (sprite.width * largo) / 2 - (sprite.width / 2), (sprite.height * ancho / 2) - (sprite.height / 2.5));
                            sprite.body.setMaterial(BallonFight.GestorMaterialesContacto.getInstancia(this.game).terrenoMaterial);
                            sprite.body.setCollisionGroup(BallonFight.GestorGrupos.getInstancia(this.game).grupoColisionTerreno);
                            BallonFight.GestorGrupos.getInstancia(this.game).configurarColisionamiento(sprite, "Terreno");
                            spriteConCuerpo = sprite;
                        }
                        else if (i < largo && k === 1) {
                            sprite = this.game.add.sprite(0, 0, 'gameAtlas', 'Terreno/9');
                            BallonFight.GestorGrupos.getInstancia(this.game).grupoTerreno.add(sprite);
                            sprite.smoothed = false;
                            sprite.position.set(posicion.x + (-sprite.width) + (sprite.width * i), posicion.y - (sprite.height) + sprite.height * k);
                        }
                        else if (i === largo && k === 1) {
                            sprite = this.game.add.sprite(0, 0, 'gameAtlas', 'Terreno/3');
                            BallonFight.GestorGrupos.getInstancia(this.game).grupoTerreno.add(sprite);
                            sprite.smoothed = false;
                            sprite.position.set(posicion.x + (-sprite.width) + (sprite.width * i), posicion.y - (sprite.height) + sprite.height * k);
                        }
                        else if (i === largo) {
                            sprite = this.game.add.sprite(0, 0, 'gameAtlas', 'Terreno/5');
                            BallonFight.GestorGrupos.getInstancia(this.game).grupoTerreno.add(sprite);
                            sprite.smoothed = false;
                            sprite.position.set(posicion.x + (-sprite.width) + (sprite.width * i), posicion.y - (sprite.height) + sprite.height * k);
                        }
                        else {
                            sprite = this.game.add.sprite(0, 0, 'gameAtlas', 'Terreno/8');
                            BallonFight.GestorGrupos.getInstancia(this.game).grupoTerreno.add(sprite);
                            sprite.smoothed = false;
                            sprite.position.set(posicion.x + (-sprite.width) + (sprite.width * i), posicion.y - (sprite.height) + sprite.height * k);
                        }
                    }
                }
                return spriteConCuerpo;
            };
            ContructorTerreno.prototype.crearTerrenoSalienteIzquierdo = function (largo, ancho, posicion) {
                var sprite = null;
                var spriteConCuerpo = null;
                for (var i = 1; i <= largo; i++) {
                    for (var k = 1; k <= ancho; k++) {
                        if (i === 1 && k == 1) {
                            sprite = this.game.add.sprite(0, 0, 'gameAtlas', 'Terreno/4');
                            sprite.name = "Terreno";
                            BallonFight.GestorGrupos.getInstancia(this.game).grupoTerreno.add(sprite);
                            sprite.smoothed = false;
                            sprite.position.set(posicion.x + (-sprite.width / 2) + (sprite.width * i), posicion.y - (sprite.height / 2) + sprite.height * k);
                            this.game.physics.p2.enable(sprite, this.debug);
                            //(<Phaser.Physics.P2.Body>sprite.body).static = true;
                            sprite.body.kinematic = true;
                            sprite.body.clearShapes();
                            sprite.body.addRectangle(sprite.width * largo, sprite.height * ancho, (sprite.width * largo) / 2 - (sprite.width / 2), (sprite.height * ancho / 2) - (sprite.height / 2.5));
                            sprite.body.setMaterial(BallonFight.GestorMaterialesContacto.getInstancia(this.game).terrenoMaterial);
                            sprite.body.setCollisionGroup(BallonFight.GestorGrupos.getInstancia(this.game).grupoColisionTerreno);
                            BallonFight.GestorGrupos.getInstancia(this.game).configurarColisionamiento(sprite, "Terreno");
                            spriteConCuerpo = sprite;
                        }
                        else if (i > 1 && k === 1) {
                            sprite = this.game.add.sprite(0, 0, 'gameAtlas', 'Terreno/9');
                            BallonFight.GestorGrupos.getInstancia(this.game).grupoTerreno.add(sprite);
                            sprite.smoothed = false;
                            sprite.position.set(posicion.x + (-sprite.width) + (sprite.width * i), posicion.y - (sprite.height) + sprite.height * k);
                        }
                        else if (i === 1 && k > 1) {
                            sprite = this.game.add.sprite(0, 0, 'gameAtlas', 'Terreno/6');
                            BallonFight.GestorGrupos.getInstancia(this.game).grupoTerreno.add(sprite);
                            sprite.smoothed = false;
                            sprite.position.set(posicion.x + (-sprite.width) + (sprite.width * i), posicion.y - (sprite.height) + sprite.height * k);
                        }
                        else {
                            sprite = this.game.add.sprite(0, 0, 'gameAtlas', 'Terreno/8');
                            BallonFight.GestorGrupos.getInstancia(this.game).grupoTerreno.add(sprite);
                            sprite.smoothed = false;
                            sprite.position.set(posicion.x + (-sprite.width) + (sprite.width * i), posicion.y - (sprite.height) + sprite.height * k);
                        }
                    }
                }
                return spriteConCuerpo;
            };
            return ContructorTerreno;
        }());
        BallonFight.ContructorTerreno = ContructorTerreno;
    })(BallonFight = Elioway.BallonFight || (Elioway.BallonFight = {}));
})(Elioway || (Elioway = {}));
var Elioway;
(function (Elioway) {
    var BallonFight;
    (function (BallonFight) {
        var ElectroEstrella = (function (_super) {
            __extends(ElectroEstrella, _super);
            function ElectroEstrella(game, x, y) {
                var _this = _super.call(this, game, x, y, 'gameAtlas', 'Cielo/ElectroEstrella/1') || this;
                _this.name = "ElectroEstrella";
                _this.anchor.set(0.5, 0.5);
                _this.smoothed = false;
                _this.animations.add('activa', ['Cielo/ElectroEstrella/1', 'Cielo/ElectroEstrella/2', 'Cielo/ElectroEstrella/3',
                    'Cielo/ElectroEstrella/4', 'Cielo/ElectroEstrella/5', 'Cielo/ElectroEstrella/6', 'Cielo/ElectroEstrella/5',
                    'Cielo/ElectroEstrella/4', 'Cielo/ElectroEstrella/3', 'Cielo/ElectroEstrella/2'], 20, true);
                _this.animations.play('activa');
                _this.game.physics.p2.enable(_this);
                _this.body.clearShapes();
                _this.body.setCircle(_this.width / 2);
                _this.body.fixedRotation = true;
                _this.body.data.gravityScale = 0;
                _this.body.setMaterial(BallonFight.GestorMaterialesContacto.getInstancia(_this.game).electroEstrellaMaterial);
                _this.body.collideWorldBounds = true;
                _this.body.setCollisionGroup(BallonFight.GestorGrupos.getInstancia(_this.game).grupoColisionElectroEstrella);
                BallonFight.GestorGrupos.getInstancia(_this.game).configurarColisionamiento(_this, "ElectroEstrella");
                _this.game.add.existing(_this);
                BallonFight.GestorGrupos.getInstancia(_this.game).grupoElectroEstrella.add(_this);
                return _this;
            }
            ElectroEstrella.prototype.mover = function (velocidad) {
                this.body.velocity.x = this.numeroAleatorio(-velocidad, velocidad);
                this.body.velocity.y = this.numeroAleatorio(10, velocidad);
            };
            ElectroEstrella.prototype.numeroAleatorio = function (min, max) {
                return Math.random() * (max - min) + min;
            };
            ElectroEstrella.prototype.update = function () {
                if (this.body.y > this.game.height) {
                    this.kill();
                }
            };
            return ElectroEstrella;
        }(Phaser.Sprite));
        BallonFight.ElectroEstrella = ElectroEstrella;
    })(BallonFight = Elioway.BallonFight || (Elioway.BallonFight = {}));
})(Elioway || (Elioway = {}));
var Elioway;
(function (Elioway) {
    var BallonFight;
    (function (BallonFight) {
        var Enemigo = (function (_super) {
            __extends(Enemigo, _super);
            function Enemigo(game, x, y, colorGlobo, jugador) {
                var _this = _super.call(this, game, x, y, 'gameAtlas', 'Enemigo/Quieto/1') || this;
                _this.direccion = "R";
                _this.direccionActual = "R";
                _this.velocidadMaxima = 80;
                _this.player = jugador;
                _this.smoothed = false;
                _this.anchor.set(0.5);
                _this.outOfBoundsKill = true;
                _this.name = "Enemigo";
                _this.cabeza = new Phaser.Sprite(_this.game, _this.x, _this.y, '', '');
                _this.cabeza.anchor.set(0.5);
                _this.cabeza.name = 'CabezaEnemigo';
                _this.game.physics.p2.enable(_this.cabeza, false);
                _this.cabeza.body.clearShapes();
                _this.cabeza.body.setCircle(_this.width / 6, 0, -_this.height / 8);
                _this.cabeza.body.fixedRotation = true;
                _this.cabeza.body.setCollisionGroup(BallonFight.GestorGrupos.getInstancia(_this.game).grupoColisionCabeza);
                BallonFight.GestorGrupos.getInstancia(_this.game).configurarColisionamiento(_this.cabeza, 'Cabeza');
                _this.game.add.existing(_this.cabeza);
                BallonFight.GestorGrupos.getInstancia(_this.game).grupoEnemigo.add(_this.cabeza);
                //Paracaidas
                _this.paracaidas = new Phaser.Sprite(_this.game, _this.x, _this.y - _this.height / 2.5, 'gameAtlas', 'Globo/Paracaidas/1');
                _this.paracaidas.name = "Paracaidas";
                _this.paracaidas.anchor.setTo(0.5);
                _this.paracaidas.smoothed = false;
                _this.paracaidas.visible = false;
                _this.game.physics.p2.enable(_this.paracaidas, false);
                _this.paracaidas.body.data.gravityScale = 0;
                _this.paracaidas.body.clearShapes();
                _this.paracaidas.body.addRectangle(_this.paracaidas.width / 2, _this.paracaidas.height / 2, 0, 4);
                _this.paracaidas.body.data.shapes[0].sensor = true;
                _this.paracaidas.body.fixedRotation = true;
                _this.paracaidas.body.setMaterial(BallonFight.GestorMaterialesContacto.getInstancia(_this.game).globoPlayerMaterial);
                _this.paracaidas.body.setCollisionGroup(BallonFight.GestorGrupos.getInstancia(_this.game).grupoColisionEnemigo);
                BallonFight.GestorGrupos.getInstancia(_this.game).configurarColisionamiento(_this.paracaidas, "GloboEnemigo");
                _this.game.add.existing(_this.paracaidas);
                BallonFight.GestorGrupos.getInstancia(_this.game).grupoParacaidas.add(_this.paracaidas);
                _this.twenParacaidas = _this.game.tweens.create(_this.paracaidas.scale);
                //Globo
                _this.globo = new Phaser.Sprite(_this.game, _this.x, _this.y - _this.height / 1.2, 'gameAtlas', 'Globo/GloboReventando/' + colorGlobo + '/1');
                _this.globo.anchor.set(0.5);
                _this.globo.smoothed = false;
                _this.globo.visible = false;
                _this.globo.animations.add('normal', ['Globo/GloboReventando/' + colorGlobo + '/1'], 1, true);
                _this.globo.animations.add('reventando', ['Globo/GloboReventando/' + colorGlobo + '/1', 'Globo/GloboReventando/' + colorGlobo + '/2', 'Globo/GloboReventando/' + colorGlobo + '/3', 'Globo/GloboReventando/' + colorGlobo + '/4', 'Globo/GloboReventando/' + colorGlobo + '/5', 'Globo/GloboReventando/' + colorGlobo + '/6'], 10, true);
                _this.globo.animations.add('inflandose', ['Globo/GloboInflandose/' + colorGlobo + '/1', 'Globo/GloboInflandose/' + colorGlobo + '/2', 'Globo/GloboInflandose/' + colorGlobo + '/1', 'Globo/GloboInflandose/' + colorGlobo + '/2', 'Globo/GloboInflandose/' + colorGlobo + '/1', 'Globo/GloboInflandose/' + colorGlobo + '/2',
                    'Globo/GloboInflandose/' + colorGlobo + '/3', 'Globo/GloboInflandose/' + colorGlobo + '/2', 'Globo/GloboInflandose/' + colorGlobo + '/3', 'Globo/GloboInflandose/' + colorGlobo + '/2', 'Globo/GloboInflandose/' + colorGlobo + '/3', 'Globo/GloboInflandose/' + colorGlobo + '/2',
                    'Globo/GloboInflandose/' + colorGlobo + '/3', 'Globo/GloboInflandose/' + colorGlobo + '/4', 'Globo/GloboInflandose/' + colorGlobo + '/3', 'Globo/GloboInflandose/' + colorGlobo + '/4', 'Globo/GloboInflandose/' + colorGlobo + '/3', 'Globo/GloboInflandose/' + colorGlobo + '/4',
                    'Globo/GloboInflandose/' + colorGlobo + '/5', 'Globo/GloboInflandose/' + colorGlobo + '/4', 'Globo/GloboInflandose/' + colorGlobo + '/5', 'Globo/GloboInflandose/' + colorGlobo + '/4', 'Globo/GloboInflandose/' + colorGlobo + '/5', 'Globo/GloboInflandose/' + colorGlobo + '/4',
                    'Globo/GloboInflandose/' + colorGlobo + '/5', 'Globo/GloboInflandose/' + colorGlobo + '/6', 'Globo/GloboInflandose/' + colorGlobo + '/5', 'Globo/GloboInflandose/' + colorGlobo + '/6', 'Globo/GloboInflandose/' + colorGlobo + '/5', 'Globo/GloboInflandose/' + colorGlobo + '/6',], 8, false);
                _this.game.physics.p2.enable(_this.globo, false);
                _this.globo.body.data.gravityScale = 0;
                _this.globo.body.clearShapes();
                _this.globo.body.addCircle(_this.globo.width / 4.5, 1.5, -2);
                _this.globo.body.fixedRotation = true;
                _this.globo.body.setMaterial(BallonFight.GestorMaterialesContacto.getInstancia(_this.game).globoPlayerMaterial);
                _this.globo.body.collideWorldBounds = true;
                _this.globo.body.setCollisionGroup(BallonFight.GestorGrupos.getInstancia(_this.game).grupoColisionEnemigo);
                BallonFight.GestorGrupos.getInstancia(_this.game).configurarColisionamiento(_this.globo, "GloboEnemigo");
                _this.game.add.existing(_this.globo);
                _this.globo.animations.play('quieto');
                _this.animations.add('quieto', ['Enemigo/Quieto/1', 'Enemigo/Quieto/2', 'Enemigo/Quieto/3', 'Enemigo/Quieto/2'], 5, true);
                _this.animations.add('volando', ['Enemigo/Volando/1', 'Enemigo/Volando/2', 'Enemigo/Volando/3', 'Enemigo/Volando/4', 'Enemigo/Volando/5', 'Enemigo/Volando/4', 'Enemigo/Volando/3', 'Enemigo/Volando/2'], 38, true);
                _this.animations.add('inflandoGlobo', ['Enemigo/InflandoGlobo/1', 'Enemigo/InflandoGlobo/2', 'Enemigo/InflandoGlobo/3'], 5, true);
                _this.animations.add('cayendoParacaidas', ['Enemigo/CayendoParacaidas/1'], 1, true);
                _this.animations.add('cayendo', ['Enemigo/Cayendo/1', 'Enemigo/Cayendo/2', 'Enemigo/Cayendo/3', 'Enemigo/Cayendo/4', 'Enemigo/Cayendo/5', 'Enemigo/Cayendo/4', 'Enemigo/Cayendo/3', 'Enemigo/Cayendo/2'], 25, true);
                var sensorColision = null;
                _this.game.physics.p2.enable(_this, false);
                _this.body.data.gravityScale = 0;
                _this.body.clearShapes();
                _this.body.setRectangle(_this.width / 2, _this.height);
                sensorColision = _this.body.addRectangle(10, _this.height * 1.5, _this.height / 1.5, -_this.height / 3);
                sensorColision.sensor = true;
                _this.idColisionRight = sensorColision.id;
                sensorColision = _this.body.addRectangle(10, _this.height * 1.5, -_this.height / 1.5, -_this.height / 3);
                sensorColision.sensor = true;
                _this.idColisionLeft = sensorColision.id;
                sensorColision = _this.body.addRectangle(_this.width * 1.3, 10, 0, _this.height / 1.5);
                sensorColision.sensor = true;
                _this.idColisionBot = sensorColision.id;
                sensorColision = _this.body.addRectangle(_this.width * 1.3, 10, 0, -_this.height / 0.75);
                sensorColision.sensor = true;
                _this.idColisionTop = sensorColision.id;
                _this.ColiosionReventadorPico = _this.body.addRectangle(5, 2, 12, -5.4);
                _this.ColiosionReventadorPico.sensor = true;
                _this.idColisionReventadorPico = _this.ColiosionReventadorPico.id;
                _this.ColiosionReventadorPie = _this.body.addRectangle(5, 5, 5, 15);
                _this.ColiosionReventadorPie.sensor = true;
                _this.idColisionReventadorPie = _this.ColiosionReventadorPie.id;
                _this.sensorSuelo = _this.body.addRectangle(_this.width / 2.5, 5, 0, 16);
                _this.sensorSuelo.sensor = true;
                _this.idSensorSuelo = _this.sensorSuelo.id;
                _this.body.fixedRotation = true;
                _this.body.mass = 10;
                _this.body.setMaterial(BallonFight.GestorMaterialesContacto.getInstancia(_this.game).enemigoMaterial);
                _this.body.setCollisionGroup(BallonFight.GestorGrupos.getInstancia(_this.game).grupoColisionEnemigo);
                _this.restriccionGlobo = _this.game.physics.p2.createLockConstraint(_this.body, _this.globo.body, [0, _this.height / 1.2], 0);
                _this.game.physics.p2.createLockConstraint(_this.body, _this.paracaidas.body, [0, _this.height / 2.5], 0);
                _this.game.physics.p2.createLockConstraint(_this.body, _this.cabeza.body, [0, _this.height / 7], 0);
                BallonFight.GestorGrupos.getInstancia(_this.game).configurarColisionamiento(_this, 'Enemigo');
                _this.game.add.existing(_this);
                BallonFight.GestorGrupos.getInstancia(_this.game).grupoEnemigo.add(_this);
                _this.animations.play('quieto');
                _this.ia = new BallonFight.IAEnemigo(_this.game, _this);
                return _this;
            }
            Enemigo.prototype.update = function () {
                this.ia.update();
            };
            Enemigo.prototype.inflarGlobo = function () {
                if (!this.globo.alive) {
                    this.globo.revive();
                    this.globo.body.setZeroVelocity();
                    this.globo.body.x = this.x;
                    this.globo.body.y = this.y - 30;
                    this.globo.body.kinematic = false;
                    this.globo.body.static = false;
                    this.restriccionGlobo = this.game.physics.p2.createLockConstraint(this.body, this.globo.body, [0, this.height / 1.2], 0);
                    this.globo.body.data.shapes[0].sensor = false;
                }
                this.globo.visible = true;
                this.play("inflandoGlobo");
                this.globo.animations.play('inflandose').onComplete.add(this.terminoInflarGlobo, this);
            };
            Enemigo.prototype.volar = function (dirX, dirY) {
                this.body.applyForce([dirX, dirY], 0, 0);
                if (this.body.velocity.x < 0) {
                    if (this.body.velocity.x < -this.velocidadMaxima) {
                        this.body.velocity.x = -this.velocidadMaxima;
                    }
                }
                else {
                    if (this.body.velocity.x > this.velocidadMaxima) {
                        this.body.velocity.x = this.velocidadMaxima;
                    }
                }
                if (this.body.velocity.y < 0) {
                    if (this.body.velocity.y < -this.velocidadMaxima) {
                        this.body.velocity.y = -this.velocidadMaxima;
                    }
                }
                else {
                    if (this.body.velocity.y > this.velocidadMaxima) {
                        this.body.velocity.y = this.velocidadMaxima;
                    }
                }
                if (dirX > 0) {
                    this.setScaleMinMax(-1, 1, -1, 1);
                    this.direccionActual = "R";
                }
                else {
                    this.setScaleMinMax(1, 1, 1, 1);
                    this.direccionActual = "L";
                }
                if (this.direccionActual != this.direccion) {
                    if (this.direccionActual == "R") {
                        this.body.removeShape(this.ColiosionReventadorPico);
                        this.ColiosionReventadorPico = this.body.addRectangle(5, 2, -12, -5.4);
                        this.ColiosionReventadorPico.sensor = true;
                        this.idColisionReventadorPico = this.ColiosionReventadorPico.id;
                        this.body.removeShape(this.ColiosionReventadorPie);
                        this.ColiosionReventadorPie = this.body.addRectangle(5, 5, -5, 15);
                        this.ColiosionReventadorPie.sensor = true;
                        this.idColisionReventadorPie = this.ColiosionReventadorPie.id;
                    }
                    else {
                        this.body.removeShape(this.ColiosionReventadorPico);
                        this.ColiosionReventadorPico = this.body.addRectangle(5, 2, 12, -5.4);
                        this.ColiosionReventadorPico.sensor = true;
                        this.idColisionReventadorPico = this.ColiosionReventadorPico.id;
                        this.body.removeShape(this.ColiosionReventadorPie);
                        this.ColiosionReventadorPie = this.body.addRectangle(5, 5, 5, 15);
                        this.ColiosionReventadorPie.sensor = true;
                        this.idColisionReventadorPie = this.ColiosionReventadorPie.id;
                    }
                    this.direccion = this.direccionActual;
                    this.body.setMaterial(BallonFight.GestorMaterialesContacto.getInstancia(this.game).enemigoMaterial);
                    this.body.setCollisionGroup(BallonFight.GestorGrupos.getInstancia(this.game).grupoColisionEnemigo);
                }
            };
            Enemigo.prototype.caerParacaidas = function () {
                this.ia.puedeVolar = false;
                this.ia.cayendoParacaidas = true;
                this.animations.play("cayendoParacaidas");
                this.paracaidas.scale.setTo(0);
                this.paracaidas.visible = true;
                this.twenParacaidas.to({ x: 1, y: 1 }, 1000, Phaser.Easing.Elastic.InOut, true);
                this.body.mass = 500;
                this.body.velocity.y = 0;
                this.body.data.gravityScale = 0.2;
            };
            Enemigo.prototype.caer = function () {
                this.ia.puedeVolar = false;
                this.ia.cayendoParacaidas = false;
                this.animations.play("cayendo");
                this.body.setZeroVelocity();
                this.body.data.shapes[0].sensor = true;
                this.body.data.gravityScale = 1;
            };
            Enemigo.prototype.reventarGlobo = function () {
                this.game.physics.p2.removeConstraint(this.restriccionGlobo);
                this.globo.body.setZeroVelocity();
                this.globo.body.static = true;
                this.globo.body.data.shapes[0].sensor = true;
                this.globo.animations.play("reventando", 10, false, true);
            };
            Enemigo.prototype.terminoInflarGlobo = function () {
                if (this.animations.currentAnim.name != "cayendo") {
                    this.globo.animations.play("normal");
                    this.animations.play('volando');
                    this.ia.puedeVolar = true;
                    this.ia.retrasarVuelo();
                }
            };
            return Enemigo;
        }(Phaser.Sprite));
        BallonFight.Enemigo = Enemigo;
    })(BallonFight = Elioway.BallonFight || (Elioway.BallonFight = {}));
})(Elioway || (Elioway = {}));
var Elioway;
(function (Elioway) {
    var BallonFight;
    (function (BallonFight) {
        var BallonFightGame = (function (_super) {
            __extends(BallonFightGame, _super);
            function BallonFightGame() {
                var _this = _super.call(this, 800, 480, Phaser.CANVAS, '', null, false, false) || this;
                _this.state.add('boot', BallonFight.Boot, false);
                _this.state.add('preloader', BallonFight.Preloader, false);
                _this.state.add('level1', BallonFight.Level1, false);
                _this.state.start('boot');
                return _this;
            }
            return BallonFightGame;
        }(Phaser.Game));
        BallonFight.BallonFightGame = BallonFightGame;
    })(BallonFight = Elioway.BallonFight || (Elioway.BallonFight = {}));
})(Elioway || (Elioway = {}));
var Elioway;
(function (Elioway) {
    var BallonFight;
    (function (BallonFight) {
        var GamePad = (function () {
            function GamePad(game) {
                this.game = game;
                this.cursores = this.game.input.keyboard.createCursorKeys();
                this.btnLeft = this.game.add.button(10, this.game.height - 64 - 32, 'gameAtlas', null, null, 'GamePad/2', 'GamePad/1', 'GamePad/2', 'GamePad/1');
                this.btnLeft.scale.set(2);
                this.btnLeft.alpha = 0.5;
                this.btnRight = this.game.add.button((64 * 2) + 10 + 5, this.game.height - 64 - 32, 'gameAtlas', null, null, 'GamePad/2', 'GamePad/1', 'GamePad/2', 'GamePad/1');
                this.btnRight.scale.set(-2, 2);
                this.btnRight.alpha = 0.5;
                this.btnUp = this.game.add.button(this.game.width - 64 - 10, this.game.height - 64 - 32, 'gameAtlas', null, null, 'GamePad/4', 'GamePad/3', 'GamePad/4', 'GamePad/3');
                this.btnUp.alpha = 0.5;
                this.btnUp.scale.set(2);
                this.btnLeft.onInputOver.add(this.btnLeftDown, this);
                this.btnLeft.onInputDown.add(this.btnLeftDown, this);
                this.btnLeft.onInputOut.add(this.btnLeftUp, this);
                this.btnLeft.onInputUp.add(this.btnLeftUp, this);
                this.btnRight.onInputOver.add(this.btnRightDown, this);
                this.btnRight.onInputDown.add(this.btnRightDown, this);
                this.btnRight.onInputOut.add(this.btnRightUp, this);
                this.btnRight.onInputUp.add(this.btnRightUp, this);
                this.btnUp.onInputOver.add(this.btnUpDown, this);
                this.btnUp.onInputDown.add(this.btnUpDown, this);
                this.btnUp.onInputOut.add(this.btnUpUp, this);
                this.btnUp.onInputUp.add(this.btnUpUp, this);
            }
            GamePad.getInstancia = function (game) {
                if (this.instancia == null) {
                    this.instancia = new GamePad(game);
                }
                return this.instancia;
            };
            GamePad.prototype.btnLeftDown = function () {
                this.leftDown = true;
            };
            GamePad.prototype.btnLeftUp = function () {
                this.leftDown = false;
            };
            GamePad.prototype.btnRightDown = function () {
                this.rightDown = true;
            };
            GamePad.prototype.btnRightUp = function () {
                this.rightDown = false;
            };
            GamePad.prototype.btnUpDown = function () {
                this.upDown = true;
            };
            GamePad.prototype.btnUpUp = function () {
                this.upDown = false;
            };
            GamePad.prototype.isLeftDown = function () {
                return this.leftDown;
            };
            GamePad.prototype.isRightDown = function () {
                return this.rightDown;
            };
            GamePad.prototype.isUpDown = function () {
                return this.upDown;
            };
            GamePad.prototype.actualizarTeclado = function () {
                if (this.cursores.up.isDown) {
                    this.upDown = true;
                }
                else {
                    this.upDown = false;
                }
                if (this.cursores.left.isDown) {
                    this.leftDown = true;
                }
                else {
                    this.leftDown = false;
                }
                if (this.cursores.right.isDown) {
                    this.rightDown = true;
                }
                else {
                    this.rightDown = false;
                }
            };
            return GamePad;
        }());
        BallonFight.GamePad = GamePad;
    })(BallonFight = Elioway.BallonFight || (Elioway.BallonFight = {}));
})(Elioway || (Elioway = {}));
var Elioway;
(function (Elioway) {
    var BallonFight;
    (function (BallonFight) {
        var GeneradorEstrellas = (function () {
            function GeneradorEstrellas(game) {
                this.game = game;
            }
            GeneradorEstrellas.prototype.generarEstrellas = function (largoZona, anchoZona, cantidad) {
                var sprite;
                for (var i = 0; i < cantidad; i++) {
                    sprite = this.game.add.sprite(this.numeroAleatorio(0, largoZona), this.numeroAleatorio(0, anchoZona), 'gameAtlas', 'Cielo/Estrellas1/1');
                    BallonFight.GestorGrupos.getInstancia(this.game).grupoEstrellas.add(sprite);
                    sprite.smoothed = false;
                    if (i % 2 === 0) {
                        sprite.animations.add('brillar1', ['Cielo/Estrellas1/1', 'Cielo/Estrellas1/2', 'Cielo/Estrellas1/3', 'Cielo/Estrellas1/4', 'Cielo/Estrellas1/5',
                            'Cielo/Estrellas1/6', 'Cielo/Estrellas1/7', 'Cielo/Estrellas1/8'], 8, true);
                        sprite.play('brillar1');
                    }
                    else {
                        sprite.animations.add('brillar2', ['Cielo/Estrellas2/1', 'Cielo/Estrellas2/2', 'Cielo/Estrellas2/3', 'Cielo/Estrellas2/4', 'Cielo/Estrellas2/5',
                            'Cielo/Estrellas2/6', 'Cielo/Estrellas2/7', 'Cielo/Estrellas2/8'], 8, true);
                        sprite.play('brillar2');
                    }
                }
            };
            GeneradorEstrellas.prototype.numeroAleatorio = function (min, max) {
                return Math.random() * (max - min) + min;
            };
            return GeneradorEstrellas;
        }());
        BallonFight.GeneradorEstrellas = GeneradorEstrellas;
    })(BallonFight = Elioway.BallonFight || (Elioway.BallonFight = {}));
})(Elioway || (Elioway = {}));
var Elioway;
(function (Elioway) {
    var BallonFight;
    (function (BallonFight) {
        var GestorGrupos = (function () {
            function GestorGrupos(game) {
                this.game = game;
                //Orden de renderizado(Las primeras son las del fondo).
                this.grupoEstrellas = this.game.add.group();
                this.grupoOceanoInterior = this.game.add.group();
                this.grupoTerreno = this.game.add.group();
                this.grupoNube = this.game.add.group();
                this.grupoElectroEstrella = this.game.add.group();
                this.grupoParacaidas = this.game.add.group();
                this.grupoEnemigo = this.game.add.group();
                this.grupoJugador = this.game.add.group();
                this.grupoPez = this.game.add.group();
                this.grupoOceanoExterior = this.game.add.group();
                this.grupoSplash = this.game.add.group();
                this.grupoColisionCabeza = this.game.physics.p2.createCollisionGroup();
                this.grupoColisionTerreno = this.game.physics.p2.createCollisionGroup();
                this.grupoColisionElectroEstrella = this.game.physics.p2.createCollisionGroup();
                this.grupoColisionOceano = this.game.physics.p2.createCollisionGroup();
                this.grupoColisionGloboJugador = this.game.physics.p2.createCollisionGroup();
                this.grupoColisionGloboEnemigo = this.game.physics.p2.createCollisionGroup();
                this.grupoColisionEnemigo = this.game.physics.p2.createCollisionGroup();
                this.grupoColisionJugador = this.game.physics.p2.createCollisionGroup();
                this.grupoColisionMandibulaPez = this.game.physics.p2.createCollisionGroup();
                this.game.physics.p2.updateBoundsCollisionGroup();
                /*
                            alert("Cabeza: "+this.grupoColisionCabeza.mask+
                            "\nTerreno: "+this.grupoColisionTerreno.mask+
                            "\nEstrella: "+this.grupoColisionElectroEstrella.mask+
                            "\nOceano: "+this.grupoColisionOceano.mask+
                            "\nGloboJugador: "+this.grupoColisionGloboJugador.mask+
                            "\nJugador: "+this.grupoColisionJugador.mask.toPrecision());
                */
            }
            GestorGrupos.getInstancia = function (game) {
                if (this.instancia == null) {
                    this.instancia = new GestorGrupos(game);
                }
                return this.instancia;
            };
            GestorGrupos.prototype.configurarColisionamiento = function (sprite, tipo) {
                if (tipo == "Terreno") {
                    sprite.body.collides([this.grupoColisionElectroEstrella, this.grupoColisionJugador, this.grupoColisionGloboJugador, this.grupoColisionEnemigo]);
                }
                else if (tipo == "Oceano") {
                    sprite.body.collides([this.grupoColisionElectroEstrella, this.grupoColisionCabeza]);
                }
                else if (tipo == "ElectroEstrella") {
                    sprite.body.collides([this.grupoColisionTerreno, this.grupoColisionOceano, this.grupoColisionJugador]);
                }
                else if (tipo == "Jugador") {
                    sprite.body.collides([this.grupoColisionTerreno, this.grupoColisionElectroEstrella, this.grupoColisionMandibulaPez, this.grupoColisionEnemigo, this.grupoColisionGloboEnemigo]);
                }
                else if (tipo == "GloboJugador") {
                    sprite.body.collides([this.grupoColisionTerreno, this.grupoColisionEnemigo, this.grupoColisionGloboEnemigo]);
                }
                else if (tipo == 'GloboEnemigo') {
                    sprite.body.collides([this.grupoColisionTerreno, this.grupoColisionGloboJugador, this.grupoColisionJugador]);
                }
                else if (tipo == 'Cabeza') {
                    sprite.body.collides([this.grupoColisionOceano]);
                }
                else if (tipo == 'MandibulaPez') {
                    sprite.body.collides([this.grupoColisionJugador]);
                }
                else if (tipo == 'Enemigo') {
                    sprite.body.collides([this.grupoColisionTerreno, this.grupoColisionJugador, this.grupoColisionGloboJugador]);
                }
            };
            return GestorGrupos;
        }());
        BallonFight.GestorGrupos = GestorGrupos;
    })(BallonFight = Elioway.BallonFight || (Elioway.BallonFight = {}));
})(Elioway || (Elioway = {}));
var Elioway;
(function (Elioway) {
    var BallonFight;
    (function (BallonFight) {
        var GestorMaterialesContacto = (function () {
            function GestorMaterialesContacto(game) {
                this.game = game;
                this.worldMaterial = this.game.physics.p2.createMaterial('worldMaterial');
                this.terrenoMaterial = this.game.physics.p2.createMaterial('terrenoMaterial');
                this.electroEstrellaMaterial = this.game.physics.p2.createMaterial('electroEstrellaMaterial');
                this.enemigoMaterial = this.game.physics.p2.createMaterial('enemigoMaterial');
                this.jugadorMaterial = this.game.physics.p2.createMaterial('jugadorMaterial');
                this.globoPlayerMaterial = this.game.physics.p2.createMaterial('globoPlayerMaterial');
                this.mandibulaPezMaterial = this.game.physics.p2.createMaterial('mandibulaPezMaterial');
                this.cm = this.game.physics.p2.createContactMaterial(this.worldMaterial, this.electroEstrellaMaterial);
                this.rellenarOpciones(this.cm);
                this.cm = this.game.physics.p2.createContactMaterial(this.terrenoMaterial, this.electroEstrellaMaterial);
                this.rellenarOpciones(this.cm);
                this.cm = this.game.physics.p2.createContactMaterial(this.electroEstrellaMaterial, this.electroEstrellaMaterial);
                this.rellenarOpciones(this.cm);
                this.cm = this.game.physics.p2.createContactMaterial(this.jugadorMaterial, this.terrenoMaterial);
                this.rellenarOpciones2(this.cm);
                this.cm = this.game.physics.p2.createContactMaterial(this.jugadorMaterial, this.worldMaterial);
                this.rellenarOpciones2(this.cm);
                this.cm = this.game.physics.p2.createContactMaterial(this.jugadorMaterial, this.electroEstrellaMaterial);
                this.rellenarOpciones2(this.cm);
                this.cm = this.game.physics.p2.createContactMaterial(this.globoPlayerMaterial, this.worldMaterial);
                this.rellenarOpciones2(this.cm);
                this.cm = this.game.physics.p2.createContactMaterial(this.globoPlayerMaterial, this.terrenoMaterial);
                this.rellenarOpciones2(this.cm);
                this.cm = this.game.physics.p2.createContactMaterial(this.jugadorMaterial, this.mandibulaPezMaterial);
                this.rellenarOpciones2(this.cm);
                this.cm = this.game.physics.p2.createContactMaterial(this.enemigoMaterial, this.terrenoMaterial);
                this.rellenarOpciones2(this.cm);
                this.cm = this.game.physics.p2.createContactMaterial(this.enemigoMaterial, this.jugadorMaterial);
                this.rellenarOpciones(this.cm);
                this.cm = this.game.physics.p2.createContactMaterial(this.globoPlayerMaterial, this.jugadorMaterial);
                this.rellenarOpciones(this.cm);
                this.cm = this.game.physics.p2.createContactMaterial(this.globoPlayerMaterial, this.globoPlayerMaterial);
                this.rellenarOpciones(this.cm);
            }
            GestorMaterialesContacto.getInstancia = function (game) {
                if (game === void 0) { game = null; }
                if (this.instancia == null) {
                    this.instancia = new GestorMaterialesContacto(game);
                }
                return this.instancia;
            };
            GestorMaterialesContacto.prototype.rellenarOpciones = function (cm) {
                cm.friction = 0.0;
                cm.restitution = 1.0;
                cm.stiffness = 1e7;
                cm.relaxation = 3;
                cm.frictionStuffness = 1e7;
                cm.frictionRelaxation = 3;
                cm.surfaceVelocity = 0;
            };
            GestorMaterialesContacto.prototype.rellenarOpciones2 = function (cm) {
                cm.friction = 0.0;
                cm.restitution = 0.0;
                cm.stiffness = 1e7;
                cm.relaxation = 3;
                cm.frictionStuffness = 1e7;
                cm.frictionRelaxation = 3;
                cm.surfaceVelocity = 0;
            };
            return GestorMaterialesContacto;
        }());
        BallonFight.GestorMaterialesContacto = GestorMaterialesContacto;
    })(BallonFight = Elioway.BallonFight || (Elioway.BallonFight = {}));
})(Elioway || (Elioway = {}));
var Elioway;
(function (Elioway) {
    var BallonFight;
    (function (BallonFight) {
        var IAEnemigo = (function () {
            function IAEnemigo(game, enemigo) {
                this.dir = { dirX: 0, dirY: 0 };
                this.direccionZigZag = "R";
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
                this.enemigo.body.onBeginContact.add(this.contactoOtroBody, this);
                this.enemigo.globo.body.onBeginContact.add(this.contactoGlobo, this);
                this.enemigo.paracaidas.body.onBeginContact.add(this.contactoParacaidas, this);
            }
            IAEnemigo.prototype.update = function () {
                if (this.puedeVolar) {
                    this.enemigo.volar(this.dir.dirX, this.dir.dirY);
                    if (this.enemigo.body.y > this.game.height - 64 - 16) {
                        this.cambiarDireccionTop();
                    }
                }
                if (this.cayendoParacaidas) {
                    if (this.enemigo.body.velocity.y > 20) {
                        this.enemigo.body.velocity.y = 20;
                    }
                    if (this.enemigo.body.y > this.game.height - 64 - 16) {
                        this.enemigo.body.data.shapes[0].sensor = true;
                    }
                }
            };
            IAEnemigo.prototype.zigZag = function () {
                if (this.direccionZigZag == "R") {
                    this.enemigo.body.moveLeft(20);
                    this.direccionZigZag = "L";
                }
                else {
                    this.enemigo.body.moveRight(20);
                    this.direccionZigZag = "R";
                }
            };
            IAEnemigo.prototype.numeroAleatorio = function (min, max) {
                return Math.random() * (max - min) + min;
            };
            IAEnemigo.prototype.cambiarDireccion = function () {
                this.dir.dirX = this.numeroAleatorio(-80, 80);
                this.dir.dirY = this.numeroAleatorio(-80, 80);
            };
            IAEnemigo.prototype.empezarTimerVolar = function () {
                this.dir.dirX = 0;
                this.dir.dirY = 0;
                this.crearTimerVolar();
            };
            IAEnemigo.prototype.crearTimerVolar = function () {
                this.timerVolarXNivel = new Phaser.Timer(this.game, false);
                this.game.time.add(this.timerVolarXNivel);
                this.cambiarDireccion();
                this.cambiarDireccionTop();
                this.timerVolarXNivel.loop(this.numeroAleatorio(1000, 3000), this.cambiarDireccion, this);
                this.timerVolarXNivel.start();
            };
            IAEnemigo.prototype.retrasarVuelo = function () {
                this.timerRetrasarVuelo = new Phaser.Timer(this.game, false);
                this.game.time.add(this.timerRetrasarVuelo);
                this.timerRetrasarVuelo.add(100, this.empezarTimerVolar, this);
                this.timerRetrasarVuelo.start();
            };
            IAEnemigo.prototype.contactoGlobo = function (bodyA, bodyB, shapeA, shapeB) {
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
            };
            IAEnemigo.prototype.contactoParacaidas = function (bodyA, bodyB, shapeA, shapeB) {
                if (!this.puedeVolar && this.cayendoParacaidas) {
                    if (bodyA) {
                        if (shapeB.id == this.enemigo.player.idColisionReventadorPie) {
                            this.enemigo.body.mass = 10;
                            this.enemigo.paracaidas.visible = false;
                            this.enemigo.caer();
                        }
                    }
                }
            };
            IAEnemigo.prototype.contactoOtroBody = function (bodyA, bodyB, shapeA, shapeB) {
                if (this.enemigo.animations.currentAnim.name == "quieto" || this.enemigo.animations.currentAnim.name == "inflandoGlobo") {
                    if (bodyA && (bodyA.sprite.name == "Jugador" || bodyA.sprite.name == "Globo1") || bodyA.sprite.name == "Globo2") {
                        this.timerInflarGlobo.stop(false);
                        if (this.enemigo.animations.currentAnim.name == "inflandoGlobo") {
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
                            this.enemigo.body.velocity.x = 0;
                            this.enemigo.paracaidas.body.velocity.x = 0;
                            this.enemigo.body.mass = 10;
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
                        }
                        else if (shapeA.id == this.enemigo.idColisionLeft && bodyA.sprite.name == "Terreno") {
                            this.cambiarDireccionRight();
                        }
                        else if (shapeA.id == this.enemigo.idColisionBot && bodyA.sprite.name == "Terreno") {
                            this.cambiarDireccionTop();
                        }
                        else if (shapeA.id == this.enemigo.idColisionTop && bodyA.sprite.name == "Terreno") {
                            this.cambiarDireccionBot();
                        }
                        else if ((shapeA.id == this.enemigo.idColisionReventadorPico || shapeA.id == this.enemigo.idColisionReventadorPie) && (bodyA.sprite.name == "Globo1" || bodyA.sprite.name == "Globo2")) {
                            bodyA.setZeroVelocity();
                            this.enemigo.player.reventarGlobo(bodyA);
                            if (this.enemigo.player.globo1 == null && this.enemigo.player.globo2 == null) {
                                this.enemigo.player.caer();
                            }
                        }
                    }
                    else {
                        if (shapeA.id == this.enemigo.idColisionRight) {
                            this.cambiarDireccionLeft();
                        }
                        else if (shapeA.id == this.enemigo.idColisionLeft) {
                            this.cambiarDireccionRight();
                        }
                        else if (shapeA.id == this.enemigo.idColisionBot) {
                            this.cambiarDireccionTop();
                        }
                        else if (shapeA.id == this.enemigo.idColisionTop) {
                            this.cambiarDireccionBot();
                        }
                    }
                }
            };
            IAEnemigo.prototype.cambiarDireccionLeft = function () {
                this.dir.dirX = this.numeroAleatorio(80, 50);
                this.timerVolarXNivel.stop(false);
                this.timerVolarXNivel.start(100);
            };
            IAEnemigo.prototype.cambiarDireccionRight = function () {
                this.dir.dirX = this.numeroAleatorio(-80, -50);
                this.timerVolarXNivel.stop(false);
                this.timerVolarXNivel.start(100);
            };
            IAEnemigo.prototype.cambiarDireccionTop = function () {
                this.dir.dirY = this.numeroAleatorio(80, 50);
                this.timerVolarXNivel.stop(false);
                this.timerVolarXNivel.start(100);
            };
            IAEnemigo.prototype.cambiarDireccionBot = function () {
                this.dir.dirY = this.numeroAleatorio(-80, -50);
                this.timerVolarXNivel.stop(false);
                this.timerVolarXNivel.start(100);
            };
            return IAEnemigo;
        }());
        BallonFight.IAEnemigo = IAEnemigo;
    })(BallonFight = Elioway.BallonFight || (Elioway.BallonFight = {}));
})(Elioway || (Elioway = {}));
var Elioway;
(function (Elioway) {
    var BallonFight;
    (function (BallonFight) {
        var Jugador = (function (_super) {
            __extends(Jugador, _super);
            function Jugador(game, x, y) {
                var _this = _super.call(this, game, x, y, 'gameAtlas', 'Player/Quieto/1') || this;
                _this.atrapado = false;
                //GamePad
                _this.gamepad = BallonFight.GamePad.getInstancia(_this.game);
                //Globos
                _this.globo1 = _this.game.add.sprite(_this.x + _this.width / 6, _this.y - _this.height / 1.5, 'gameAtlas', 'Globo/GloboReventando/Rojo/1', BallonFight.GestorGrupos.getInstancia(_this.game).grupoJugador);
                _this.globo1.animations.add('normal', ['Globo/GloboReventando/Rojo/1'], 1, true);
                _this.globo1.animations.add('reventando', ['Globo/GloboReventando/Rojo/1', 'Globo/GloboReventando/Rojo/2', 'Globo/GloboReventando/Rojo/3',
                    'Globo/GloboReventando/Rojo/4', 'Globo/GloboReventando/Rojo/5', 'Globo/GloboReventando/Rojo/6'], 10, true);
                _this.globo1.anchor.set(0.5);
                _this.globo1.smoothed = false;
                _this.globo1.name = "Globo1";
                _this.game.physics.p2.enable(_this.globo1, false);
                _this.globo1.body.data.gravityScale = 0;
                _this.globo1.body.clearShapes();
                _this.globo1.body.addCircle(_this.globo1.width / 4.5, 1.5, -2);
                _this.globo1.body.fixedRotation = true;
                _this.globo1.body.setMaterial(BallonFight.GestorMaterialesContacto.getInstancia(_this.game).globoPlayerMaterial);
                _this.globo1.body.collideWorldBounds = true;
                _this.globo1.body.setCollisionGroup(BallonFight.GestorGrupos.getInstancia(_this.game).grupoColisionGloboJugador);
                BallonFight.GestorGrupos.getInstancia(_this.game).configurarColisionamiento(_this.globo1, "GloboJugador");
                _this.globo1.play('normal');
                _this.globo2 = _this.game.add.sprite(_this.x - _this.width / 6, _this.y - _this.height / 1.5, 'gameAtlas', 'Globo/GloboReventando/Rojo/1', BallonFight.GestorGrupos.getInstancia(_this.game).grupoJugador);
                _this.globo2.animations.add('normal', ['Globo/GloboReventando/Rojo/1'], 1, true);
                _this.globo2.animations.add('reventando', ['Globo/GloboReventando/Rojo/1', 'Globo/GloboReventando/Rojo/2', 'Globo/GloboReventando/Rojo/3',
                    'Globo/GloboReventando/Rojo/4', 'Globo/GloboReventando/Rojo/5', 'Globo/GloboReventando/Rojo/6'], 10, true);
                _this.globo2.anchor.set(0.5);
                _this.globo2.smoothed = false;
                _this.globo2.name = "Globo2";
                _this.game.physics.p2.enable(_this.globo2, false);
                _this.globo2.body.data.gravityScale = 0;
                _this.globo2.body.clearShapes();
                _this.globo2.body.addCircle(_this.globo2.width / 4.5, -1.3, -2);
                _this.globo2.body.fixedRotation = true;
                _this.globo2.body.setMaterial(BallonFight.GestorMaterialesContacto.getInstancia(_this.game).globoPlayerMaterial);
                _this.globo2.body.collideWorldBounds = true;
                _this.globo2.body.setCollisionGroup(BallonFight.GestorGrupos.getInstancia(_this.game).grupoColisionGloboJugador);
                BallonFight.GestorGrupos.getInstancia(_this.game).configurarColisionamiento(_this.globo2, "GloboJugador");
                _this.globo2.play('normal');
                //Cabeza
                _this.cabeza = new Phaser.Sprite(_this.game, _this.x, _this.y, '', '');
                _this.cabeza.anchor.set(0.5);
                _this.cabeza.name = 'CabezaJugador';
                _this.game.physics.p2.enable(_this.cabeza, false);
                _this.cabeza.body.clearShapes();
                _this.cabeza.body.setCircle(_this.width / 6, 0, -_this.height / 8);
                _this.cabeza.body.fixedRotation = true;
                _this.cabeza.body.setCollisionGroup(BallonFight.GestorGrupos.getInstancia(_this.game).grupoColisionCabeza);
                BallonFight.GestorGrupos.getInstancia(_this.game).configurarColisionamiento(_this.cabeza, 'Cabeza');
                _this.game.add.existing(_this.cabeza);
                BallonFight.GestorGrupos.getInstancia(_this.game).grupoJugador.add(_this.cabeza);
                //Player
                _this.velocidadMovimiento = 100;
                _this.fuerza = 150;
                _this.velocidadMaxima = 100;
                _this.fuerzaLateral = 100;
                _this.outOfBoundsKill = true;
                _this.name = 'Jugador';
                _this.anchor.set(0.5);
                _this.smoothed = false;
                _this.animations.add('quieto', ['Player/Quieto/1', 'Player/Quieto/2', 'Player/Quieto/3', 'Player/Quieto/2'], 5, true);
                _this.animations.add('corriendo', ['Player/Corriendo/1', 'Player/Corriendo/2', 'Player/Corriendo/3', 'Player/Corriendo/4', 'Player/Corriendo/5'], 20, true);
                _this.animations.add('volando', ['Player/Volando/1', 'Player/Volando/2', 'Player/Volando/3', 'Player/Volando/4', 'Player/Volando/5', 'Player/Volando/4', 'Player/Volando/3', 'Player/Volando/2'], 38, true);
                _this.animations.add('desenso', ['Player/Volando/1'], 1, true);
                _this.animations.add('electrocutado', ['Player/Electrocutado/1', 'Player/Electrocutado/2', 'Player/Electrocutado/1', 'Player/Electrocutado/2', 'Player/Electrocutado/1',
                    'Player/Electrocutado/2', 'Player/Electrocutado/1', 'Player/Electrocutado/2', 'Player/Electrocutado/1', 'Player/Electrocutado/2',
                    'Player/Electrocutado/1', 'Player/Electrocutado/2'], 20, false).onComplete.add(_this.finElectrocutado, _this);
                _this.animations.add('cayendo', ['Player/Cayendo/1', 'Player/Cayendo/2', 'Player/Cayendo/3'], 20, true);
                _this.animations.add('tragado', ['Player/Tragado/1', 'Player/Tragado/2', 'Player/Tragado/3', 'Player/Tragado/4', 'Player/Tragado/5', 'Player/Tragado/4', 'Player/Tragado/3', 'Player/Tragado/2'], 20, true);
                _this.game.physics.p2.enable(_this, false);
                _this.body.clearShapes();
                _this.body.setRectangle(_this.width / 2, _this.height, 0, 0);
                _this.body.fixedRotation = true;
                _this.body.mass = 10;
                _this.body.addRectangle(_this.width / 2.1, _this.height / 10, 0, _this.height / 1.9);
                _this.body.data.shapes[1].sensor = true;
                _this.sensorSuelo = _this.body.data.shapes[1];
                _this.colisionReventadorPie = _this.body.addRectangle(5, 5, 5, 15);
                _this.colisionReventadorPie.sensor = true;
                _this.idColisionReventadorPie = _this.colisionReventadorPie.id;
                _this.body.onBeginContact.add(_this.triggerSensorSueloIn, _this);
                _this.body.onEndContact.add(_this.triggerSensorSueloOut, _this);
                _this.body.collideWorldBounds = true;
                _this.restriccionGlobo1 = _this.game.physics.p2.createLockConstraint(_this.body, _this.globo1.body, [-_this.width / 6, _this.height / 1.2], 0);
                _this.restriccionGlobo2 = _this.game.physics.p2.createLockConstraint(_this.body, _this.globo2.body, [_this.width / 6, _this.height / 1.2], 0);
                _this.game.physics.p2.createLockConstraint(_this.body, _this.cabeza.body, [0, _this.height / 7], 0);
                _this.body.setMaterial(BallonFight.GestorMaterialesContacto.getInstancia(_this.game).jugadorMaterial, _this.body.data.shapes[0]);
                _this.body.setCollisionGroup(BallonFight.GestorGrupos.getInstancia(_this.game).grupoColisionJugador);
                BallonFight.GestorGrupos.getInstancia(_this.game).configurarColisionamiento(_this, "Jugador");
                _this.game.add.existing(_this);
                BallonFight.GestorGrupos.getInstancia(_this.game).grupoJugador.add(_this);
                _this.animacionActual = _this.play('quieto');
                return _this;
            }
            Jugador.prototype.update = function () {
                this.gamepad.actualizarTeclado();
                if (!this.atrapado && !this.colisionGlobo) {
                    if ((this.animations.currentAnim.name != 'electrocutado' && this.animations.currentAnim.name != 'cayendo')) {
                        if (this.gamepad.isUpDown()) {
                            if (this.animations.currentAnim.name != 'volando') {
                                this.animacionActual = this.play('volando');
                            }
                            this.body.applyForce([0, this.fuerza], 0, 0);
                            if (this.body.velocity.y < -this.velocidadMaxima) {
                                this.body.velocity.y = -this.velocidadMaxima;
                            }
                        }
                        if (this.gamepad.isLeftDown()) {
                            this.setScaleMinMax(-1, 1, -1, 1);
                            if (this.direccion != "L") {
                                this.body.removeShape(this.colisionReventadorPie);
                                this.colisionReventadorPie = this.body.addRectangle(5, 5, -6, 16);
                                this.colisionReventadorPie.sensor = true;
                                this.idColisionReventadorPie = this.colisionReventadorPie.id;
                                this.body.setMaterial(BallonFight.GestorMaterialesContacto.getInstancia(this.game).jugadorMaterial, this.body.data.shapes[0]);
                                this.body.setCollisionGroup(BallonFight.GestorGrupos.getInstancia(this.game).grupoColisionJugador);
                                this.direccion = "L";
                            }
                            this.body.applyForce([this.fuerzaLateral, 0], 0, 0);
                            if (this.body.velocity.x < -this.velocidadMaxima) {
                                this.body.velocity.x = -this.velocidadMaxima;
                            }
                            if (this.tocandoSuelo) {
                                if (this.animations.currentAnim.name != 'corriendo' && !this.gamepad.isUpDown()) {
                                    this.animacionActual = this.play('corriendo');
                                }
                            }
                            else {
                                if (!this.gamepad.isUpDown()) {
                                    this.animacionActual = this.play('desenso');
                                }
                            }
                        }
                        if (this.gamepad.isRightDown()) {
                            this.setScaleMinMax(1, 1, 1, 1);
                            if (this.direccion != "R") {
                                this.body.removeShape(this.colisionReventadorPie);
                                this.colisionReventadorPie = this.body.addRectangle(5, 5, 6, 16);
                                this.colisionReventadorPie.sensor = true;
                                this.idColisionReventadorPie = this.colisionReventadorPie.id;
                                this.body.setMaterial(BallonFight.GestorMaterialesContacto.getInstancia(this.game).jugadorMaterial, this.body.data.shapes[0]);
                                this.body.setCollisionGroup(BallonFight.GestorGrupos.getInstancia(this.game).grupoColisionJugador);
                                this.direccion = "R";
                            }
                            this.body.applyForce([-this.fuerzaLateral, 0], 0, 0);
                            if (this.body.velocity.x > this.velocidadMaxima) {
                                this.body.velocity.x = this.velocidadMaxima;
                            }
                            if (this.tocandoSuelo) {
                                if (this.animations.currentAnim.name != 'corriendo' && !this.gamepad.isUpDown()) {
                                    this.animacionActual = this.play('corriendo');
                                }
                            }
                            else {
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
                                this.body.velocity.x = 0;
                            }
                            else {
                                this.animacionActual = this.play("desenso");
                            }
                        }
                    }
                }
            };
            Jugador.prototype.caer = function () {
                this.play('cayendo');
                this.body.setZeroVelocity();
                this.body.data.shapes[0].sensor = true;
            };
            Jugador.prototype.electrocutar = function () {
                this.play('electrocutado');
                this.body.setZeroVelocity();
                if (this.globo1 != null) {
                    this.globo1.body.setZeroVelocity();
                }
                if (this.globo2 != null) {
                    this.globo2.body.setZeroVelocity();
                }
                this.body.data.shapes[0].sensor = true;
                this.reventarGlobos();
            };
            Jugador.prototype.reventarGlobo = function (body) {
                if (body != null) {
                    if (body.sprite.name == 'Globo1') {
                        this.game.physics.p2.removeConstraint(this.restriccionGlobo1);
                        this.restriccionGlobo1 = null;
                        if (this.globo2 != null) {
                            this.game.physics.p2.removeConstraint(this.restriccionGlobo2);
                            this.restriccionGlobo2 = this.game.physics.p2.createLockConstraint(this.body, this.globo2.body, [0, this.height / 1.2], 0);
                        }
                        body.kinematic = true;
                        body.data.shapes[0].sensor = true;
                    }
                    else if (body.sprite.name == 'Globo2') {
                        this.game.physics.p2.removeConstraint(this.restriccionGlobo2);
                        this.restriccionGlobo2 = null;
                        if (this.globo1 != null) {
                            this.game.physics.p2.removeConstraint(this.restriccionGlobo1);
                            this.restriccionGlobo1 = this.game.physics.p2.createLockConstraint(this.body, this.globo1.body, [0, this.height / 1.2], 0);
                        }
                        body.kinematic = true;
                        body.data.shapes[0].sensor = true;
                    }
                    body.sprite.play('reventando', 10, false, true);
                    if (body.sprite.name == 'Globo1') {
                        this.globo1 = null;
                    }
                    else {
                        this.globo2 = null;
                    }
                }
            };
            Jugador.prototype.reventarGlobos = function () {
                if (this.globo1 != null) {
                    this.game.physics.p2.removeConstraint(this.restriccionGlobo1);
                    this.globo1.body.sprite.play('reventando', 10, false, true);
                    this.globo1.body.setZeroVelocity();
                    this.globo1 = null;
                }
                if (this.globo2 != null) {
                    this.game.physics.p2.removeConstraint(this.restriccionGlobo2);
                    this.globo2.body.sprite.play('reventando', 10, false, true);
                    this.globo2.body.setZeroVelocity();
                    this.globo2 = null;
                }
            };
            Jugador.prototype.finElectrocutado = function () {
                this.play('cayendo');
            };
            Jugador.prototype.triggerSensorSueloIn = function (body1, body2, shapeA, shapeB) {
                if (body1 != null) {
                    if (body1.sprite.name == "Terreno" && shapeA == this.sensorSuelo) {
                        this.tocandoSuelo = true;
                    }
                }
            };
            Jugador.prototype.triggerSensorSueloOut = function (body1, body2, shapeA, shapeB) {
                if (body1 != null) {
                    if (body1.sprite.name == "Terreno" && shapeA == this.sensorSuelo) {
                        this.tocandoSuelo = false;
                    }
                }
            };
            Jugador.prototype.atrapar = function () {
                this.atrapado = true;
                this.animations.play('tragado');
                this.setScaleMinMax(-1, 1, -1, 1);
            };
            Jugador.prototype.establecerColisionGlobo = function () {
                this.colisionGlobo = true;
                var timer = this.game.time.create(true);
                timer.add(100, function () {
                    this.colisionGlobo = false;
                }, this);
                timer.start();
            };
            return Jugador;
        }(Phaser.Sprite));
        BallonFight.Jugador = Jugador;
    })(BallonFight = Elioway.BallonFight || (Elioway.BallonFight = {}));
})(Elioway || (Elioway = {}));
/// <reference path="../tsDefinitions/phaser.d.ts" />
/// <reference path="../tsDefinitions/p2.d.ts" />
/// <reference path="../tsDefinitions/pixi.d.ts" />
var Elioway;
(function (Elioway) {
    var BallonFight;
    (function (BallonFight) {
        var Level1 = (function (_super) {
            __extends(Level1, _super);
            function Level1() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            Level1.prototype.create = function () {
                this.game.physics.p2.setWorldMaterial(BallonFight.GestorMaterialesContacto.getInstancia(this.game).worldMaterial, true, true, true, true);
                this.constructorTerreno = new BallonFight.ContructorTerreno(this.game, false);
                this.constructorOceano = new BallonFight.ConstructorOceano(this.game, false);
                this.generadorEstrellas = new BallonFight.GeneradorEstrellas(this.game);
                this.cursores = this.game.input.keyboard.createCursorKeys();
                this.nubes = [];
                this.game.world.setBounds(0, 0, 800, 480 + 32);
                this.generadorEstrellas.generarEstrellas(800, 480 - (32 * 2), 50);
                this.nubes.push(new BallonFight.Nube(this.game, 400, 100, 30 * 1000));
                this.constructorTerreno.crearTerrenoFlotante(9, new Phaser.Point(32 * 8, 32 * 7));
                this.constructorTerreno.crearTerrenoFlotante(4, new Phaser.Point(32 * 2, 32 * 3));
                this.constructorTerreno.crearTerrenoFlotante(5, new Phaser.Point(32 * 19, 32 * 5));
                this.constructorOceano.crearOceanoInterior(13, new Phaser.Point(32 * 6, 480 - 32), false);
                this.constructorOceano.crearOceanoInterior(13, new Phaser.Point(32 * 6, 480 - (32 * 2)), true);
                this.constructorTerreno.crearTerrenoSalienteDerecho(7, 4, new Phaser.Point(0, 480 - (32 * 4)));
                this.constructorTerreno.crearTerrenoSalienteIzquierdo(7, 4, new Phaser.Point(800 - (32 * 7), 480 - (32 * 4)));
                this.jugador = new BallonFight.Jugador(this.game, 100, 480 - (32 * 4) - 16);
                this.jugador.body.onBeginContact.add(this.colisionEntreJugadoryElectroEsrella, this);
                this.enemigos = new Array();
                this.enemigos.push(new BallonFight.Enemigo(this.game, 800 / 1.15, 480 / 3.3, 'Rosa', this.jugador));
                this.enemigos.push(new BallonFight.Enemigo(this.game, 800 / 6, 480 / 6, 'Verde', this.jugador));
                this.enemigos.push(new BallonFight.Enemigo(this.game, 800 / 2, 480 / 2.30, 'Amarillo', this.jugador));
                this.pez = new BallonFight.Pez(this.game, this.world.centerX, this.game.height + 32);
                this.pez.seguirJugador(this.jugador);
                this.oceano = this.constructorOceano.crearOceanoExterior(25, new Phaser.Point(0, 480 - 32));
                this.oceano.body.onBeginContact.add(this.colisionEntreOceanoyOtro, this);
            };
            Level1.prototype.render = function () {
                this.game.debug.text(this.game.time.fps.toString() || '--', this.game.width - 30, 20);
            };
            Level1.prototype.colisionEntreOceanoyOtro = function (body1, body2) {
                if (body1.sprite.name == 'ElectroEstrella') {
                    new BallonFight.Salipicadura(this.game, body1.x, body1.y - body1.sprite.height * 2);
                    body1.setZeroVelocity();
                    body1.velocity.y = 10;
                }
                if (body1.sprite.name == 'CabezaJugador') {
                    new BallonFight.Salipicadura(this.game, body1.x, body1.y - this.jugador.height);
                    this.jugador.body.setZeroVelocity();
                    if (this.jugador.animations.currentAnim.name != 'cayendo') {
                        this.jugador.reventarGlobos();
                        this.jugador.caer();
                    }
                }
                if (body1.sprite.name == 'CabezaEnemigo') {
                    new BallonFight.Salipicadura(this.game, body1.x, body1.y - this.jugador.height);
                }
            };
            Level1.prototype.colisionEntreJugadoryElectroEsrella = function (body1, body2) {
                if (body1 != null) {
                    if (body1.sprite.name == 'ElectroEstrella') {
                        body1.sprite.kill();
                        this.jugador.electrocutar();
                    }
                }
            };
            return Level1;
        }(Phaser.State));
        BallonFight.Level1 = Level1;
    })(BallonFight = Elioway.BallonFight || (Elioway.BallonFight = {}));
})(Elioway || (Elioway = {}));
var Elioway;
(function (Elioway) {
    var BallonFight;
    (function (BallonFight) {
        var Nube = (function (_super) {
            __extends(Nube, _super);
            function Nube(game, x, y, segundosEnAparecer) {
                var _this = _super.call(this, game, x, y, 'gameAtlas', 'Cielo/Nube/1') || this;
                _this.timer = _this.game.time.create(false);
                _this.timer.loop(segundosEnAparecer, _this.expulsarEstrella, _this);
                _this.timer.start();
                _this.anchor.set(0.5, 0.5);
                _this.smoothed = false;
                _this.animations.add('trueno', ['Cielo/Nube/1', 'Cielo/Nube/2', 'Cielo/Nube/1', 'Cielo/Nube/2', 'Cielo/Nube/1', 'Cielo/Nube/2',
                    'Cielo/Nube/1', 'Cielo/Nube/2', 'Cielo/Nube/1', 'Cielo/Nube/2', 'Cielo/Nube/1'], 20, false);
                _this.animations.add('normal', ['Cielo/Nube/1'], 0, true);
                _this.x = x;
                _this.y = y;
                _this.crearRayo();
                _this.game.add.existing(_this);
                BallonFight.GestorGrupos.getInstancia(_this.game).grupoNube.add(_this);
                return _this;
            }
            Nube.prototype.crearRayo = function () {
                this.rayo = this.game.add.sprite(this.x + (this.width / 10), this.y, 'gameAtlas', 'Cielo/Rayo/1');
                BallonFight.GestorGrupos.getInstancia(this.game).grupoNube.add(this.rayo);
                this.rayo.smoothed = false;
                this.rayo.animations.add('flash', ['Cielo/Rayo/1', 'Cielo/Rayo/2', 'Cielo/Rayo/3', 'Cielo/Rayo/4', 'Cielo/Rayo/5',
                    'Cielo/Rayo/6', 'Cielo/Rayo/7', 'Cielo/Rayo/8', 'Cielo/Rayo/9', 'Cielo/Rayo/10', 'Cielo/Rayo/11'], 20, false);
                this.rayo.animations.add('normal', ['Cielo/Rayo/1'], 1, true);
            };
            Nube.prototype.expulsarEstrella = function () {
                this.animations.play('trueno');
                this.rayo.animations.play('flash');
                var estrella = new BallonFight.ElectroEstrella(this.game, this.x + (this.width / 2), this.y + this.height / 4);
                estrella.mover(100);
                return estrella;
            };
            return Nube;
        }(Phaser.Sprite));
        BallonFight.Nube = Nube;
    })(BallonFight = Elioway.BallonFight || (Elioway.BallonFight = {}));
})(Elioway || (Elioway = {}));
var Elioway;
(function (Elioway) {
    var BallonFight;
    (function (BallonFight) {
        var Pez = (function (_super) {
            __extends(Pez, _super);
            function Pez(game, x, y) {
                var _this = _super.call(this, game, x, y, 'gameAtlas', 'Pez/1') || this;
                _this.smoothed = false;
                _this.anchor.set(0.5);
                _this.animations.add('bocaAbierta', ['Pez/3'], 1, true);
                _this.animations.add('mordiendo', ['Pez/6'], 1, true);
                _this.animations.add('mordida', ['Pez/3', 'Pez/2', 'Pez/1', 'Pez/2', 'Pez/3', 'Pez/4', 'Pez/5', 'Pez/6'], 15, false).onComplete.add(_this.mordidaCompleta, _this);
                _this.animations.add('abrirBoca', ['Pez/6', 'Pez/5', 'Pez/4', 'Pez/3'], 15, false).onComplete.add(_this.abrirBocaCompleta, _this);
                _this.jugadorAtrapado = false;
                _this.mandibula = _this.game.add.sprite(_this.x, _this.y, '', '');
                _this.game.physics.p2.enable(_this.mandibula, false);
                _this.mandibula.body.static = true;
                _this.mandibula.body.clearShapes();
                _this.mandibula.body.addRectangle(_this.width / 2, _this.height / 10, -_this.width / 4, 0);
                _this.mandibula.body.setCollisionGroup(BallonFight.GestorGrupos.getInstancia(_this.game).grupoColisionMandibulaPez);
                _this.mandibula.body.setMaterial(BallonFight.GestorMaterialesContacto.getInstancia(_this.game).mandibulaPezMaterial);
                //(<Phaser.Physics.P2.Body>this.mandibula.body).data.shapes[0].sensor=true;
                _this.mandibula.body.onBeginContact.add(_this.contactoConJugador, _this);
                BallonFight.GestorGrupos.getInstancia(_this.game).grupoPez.add(_this.mandibula);
                _this.tweenElevar = _this.game.make.tween(_this);
                _this.tweenElevar.to({ y: _this.game.height - _this.height }, 800, Phaser.Easing.Cubic.Out, false, 0, 0, false);
                _this.tweenDesender = _this.game.make.tween(_this);
                _this.tweenDesender.to({ y: _this.game.height + 32 }, 1000, Phaser.Easing.Linear.None, false, 0, 0, false);
                _this.timer = _this.game.time.create(false);
                _this.ordenAtrapar();
                _this.animations.play('bocaAbierta');
                _this.game.add.existing(_this);
                BallonFight.GestorGrupos.getInstancia(_this.game).configurarColisionamiento(_this.mandibula, 'MandibulaPez');
                BallonFight.GestorGrupos.getInstancia(_this.game).grupoPez.add(_this);
                return _this;
            }
            Pez.prototype.ordenAtrapar = function () {
                var numero = Math.round(this.numeroAleatorio(0, 1));
                //alert(numero);
                if (numero == 1) {
                    this.atrapo = true;
                }
                else {
                    this.atrapo = false;
                }
                this.timer.stop();
                this.timer.loop(this.numeroAleatorio(500, 5000), this.ordenAtrapar, this);
                this.timer.start();
            };
            Pez.prototype.numeroAleatorio = function (min, max) {
                return Math.random() * (max - min) + min;
            };
            Pez.prototype.contactoConJugador = function () {
                this.jugadorASeguir.body.static = true;
                this.jugadorASeguir.body.setZeroVelocity;
                this.jugadorAtrapado = true;
            };
            Pez.prototype.mordidaCompleta = function () {
                this.animations.play('mordiendo');
            };
            Pez.prototype.abrirBocaCompleta = function () {
                this.animations.play('bocaAbierta');
            };
            Pez.prototype.update = function () {
                if (this.jugadorAtrapado) {
                    this.jugadorASeguir.body.velocity.x = 0;
                    this.jugadorASeguir.body.y = this.y - 16;
                    this.jugadorASeguir.atrapar();
                }
                this.mandibula.body.x = this.x;
                this.mandibula.body.y = this.y;
                if (this.jugadorASeguir != null && !this.jugadorAtrapado) {
                    if (!this.tweenDesender.isRunning) {
                        this.x = this.jugadorASeguir.x + this.jugadorASeguir.width / 2;
                    }
                    if (this.jugadorASeguir.y > +this.game.height - (32 * 2.5)) {
                        if (this.atrapo) {
                            if (!this.tweenElevar.isRunning && !this.tweenDesender.isRunning) {
                                this.tweenElevar.start();
                                if (this.animations.currentAnim.name != 'mordiendo') {
                                    this.animations.play('mordida');
                                }
                            }
                        }
                    }
                    else {
                        if (!this.tweenDesender.isRunning && !this.tweenElevar.isRunning) {
                            this.tweenDesender.start();
                            this.animations.play('abrirBoca');
                        }
                    }
                }
                else if (this.jugadorAtrapado) {
                    if (!this.tweenDesender.isRunning && !this.tweenElevar.isRunning) {
                        this.tweenDesender.start();
                    }
                }
            };
            Pez.prototype.seguirJugador = function (player) {
                this.jugadorASeguir = player;
            };
            return Pez;
        }(Phaser.Sprite));
        BallonFight.Pez = Pez;
    })(BallonFight = Elioway.BallonFight || (Elioway.BallonFight = {}));
})(Elioway || (Elioway = {}));
var Elioway;
(function (Elioway) {
    var BallonFight;
    (function (BallonFight) {
        var Preloader = (function (_super) {
            __extends(Preloader, _super);
            function Preloader() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            Preloader.prototype.preload = function () {
                this.preloadBar = this.game.add.sprite(this.world.centerX, this.world.centerY, 'preloadBar');
                this.preloadBar.anchor.set(0.5, 0.5);
                this.load.setPreloadSprite(this.preloadBar);
                //Cargar los assets aqui.
                this.load.atlas('gameAtlas', 'assets/ballonFight.png', 'assets/ballonFight.json', Phaser.Loader.TEXTURE_ATLAS_JSON_HASH);
            };
            Preloader.prototype.create = function () {
                this.game.state.start("level1", true, false);
            };
            return Preloader;
        }(Phaser.State));
        BallonFight.Preloader = Preloader;
    })(BallonFight = Elioway.BallonFight || (Elioway.BallonFight = {}));
})(Elioway || (Elioway = {}));
var Elioway;
(function (Elioway) {
    var BallonFight;
    (function (BallonFight) {
        var Salipicadura = (function (_super) {
            __extends(Salipicadura, _super);
            function Salipicadura(game, x, y) {
                var _this = _super.call(this, game, x, y, 'gameAtlas', 'Mar/Splash/1') || this;
                _this.anchor.set(0.5, 0.5);
                _this.smoothed = false;
                _this.animations.add('splash', ['Mar/Splash/1', 'Mar/Splash/2', 'Mar/Splash/3', 'Mar/Splash/4', 'Mar/Splash/5', 'Mar/Splash/6',
                    'Mar/Splash/7', 'Mar/Splash/8', 'Mar/Splash/9'], 15, false);
                _this.play('splash', 15, false, true);
                _this.game.add.existing(_this);
                BallonFight.GestorGrupos.getInstancia(_this.game).grupoSplash.add(_this);
                return _this;
            }
            return Salipicadura;
        }(Phaser.Sprite));
        BallonFight.Salipicadura = Salipicadura;
    })(BallonFight = Elioway.BallonFight || (Elioway.BallonFight = {}));
})(Elioway || (Elioway = {}));
