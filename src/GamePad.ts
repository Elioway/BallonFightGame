module Elioway.BallonFight{

    export class GamePad{

        private leftDown:boolean;
        private rightDown:boolean;
        private upDown:boolean;

        private static instancia:GamePad;
        private game: Phaser.Game;
        private cursores:Phaser.CursorKeys;

        private btnLeft:Phaser.Button;
        private btnRight:Phaser.Button;
        private btnUp:Phaser.Button;

        constructor(game: Phaser.Game){

            this.game=game;

            this.cursores=this.game.input.keyboard.createCursorKeys();

            this.btnLeft=this.game.add.button(10,this.game.height-64-32,'gameAtlas',null,null,'GamePad/2','GamePad/1','GamePad/2','GamePad/1');
            this.btnLeft.scale.set(2);
            this.btnLeft.alpha=0.5;
            this.btnRight=this.game.add.button((64*2)+10+5,this.game.height-64-32,'gameAtlas',null,null,'GamePad/2','GamePad/1','GamePad/2','GamePad/1');
            this.btnRight.scale.set(-2,2);
            this.btnRight.alpha=0.5;
            this.btnUp=this.game.add.button(this.game.width-64-10,this.game.height-64-32,'gameAtlas',null,null,'GamePad/4','GamePad/3','GamePad/4','GamePad/3');
            this.btnUp.alpha=0.5;
            this.btnUp.scale.set(2);

            this.btnLeft.onInputOver.add(this.btnLeftDown,this);
            this.btnLeft.onInputDown.add(this.btnLeftDown,this);
            this.btnLeft.onInputOut.add(this.btnLeftUp,this);
            this.btnLeft.onInputUp.add(this.btnLeftUp, this);

            this.btnRight.onInputOver.add(this.btnRightDown,this);
            this.btnRight.onInputDown.add(this.btnRightDown,this);
            this.btnRight.onInputOut.add(this.btnRightUp,this);
            this.btnRight.onInputUp.add(this.btnRightUp, this);

            this.btnUp.onInputOver.add(this.btnUpDown,this);
            this.btnUp.onInputDown.add(this.btnUpDown,this);
            this.btnUp.onInputOut.add(this.btnUpUp,this);
            this.btnUp.onInputUp.add(this.btnUpUp, this);

        }

        public static getInstancia(game:Phaser.Game):GamePad{
            if(this.instancia==null){
                this.instancia=new GamePad(game);
            }
            return this.instancia;
        }

        private btnLeftDown(){
            this.leftDown=true;
        }

        private btnLeftUp(){
            this.leftDown=false;
        }

        private btnRightDown(){
            this.rightDown=true;
        }

        private btnRightUp(){
            this.rightDown=false;
        }

        private btnUpDown(){
            this.upDown=true;
        }

        private btnUpUp(){
            this.upDown=false;
        }

        isLeftDown():boolean{
            return this.leftDown;
        }

        isRightDown():boolean{
            return this.rightDown;
        }

        isUpDown():boolean{
            return this.upDown;
        }

        actualizarTeclado(){

            if(this.cursores.up.isDown){
                this.upDown=true;
            }else{
                this.upDown=false;
            }

            if(this.cursores.left.isDown){
                this.leftDown=true;
            }else{
                this.leftDown=false;
            }

            if(this.cursores.right.isDown){
                this.rightDown=true;
            }else{
                this.rightDown=false;
            }

        }

    }

}