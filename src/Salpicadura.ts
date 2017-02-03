module Elioway.BallonFight{

    export class Salipicadura extends Phaser.Sprite{

        constructor(game:Phaser.Game,x:number, y:number){
            super(game,x,y,'gameAtlas','Mar/Splash/1');
            this.anchor.set(0.5,0.5);
            this.smoothed=false;
            this.animations.add('splash',['Mar/Splash/1','Mar/Splash/2','Mar/Splash/3','Mar/Splash/4','Mar/Splash/5','Mar/Splash/6',
            'Mar/Splash/7','Mar/Splash/8','Mar/Splash/9'],15,false);
            this.play('splash',15,false,true);
            this.game.add.existing(this);
             GestorGrupos.getInstancia(this.game).grupoSplash.add(this);
        }

    }

}