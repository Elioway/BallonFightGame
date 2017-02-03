module Elioway.BallonFight{

    export class GeneradorEstrellas{
        
        game:Phaser.Game;

        constructor(game:Phaser.Game){
            this.game=game;
        }

        generarEstrellas(largoZona:number, anchoZona:number, cantidad:number):void{

            let sprite:Phaser.Sprite;

            for(var i=0;i<cantidad;i++){
               sprite = this.game.add.sprite(this.numeroAleatorio(0,largoZona),this.numeroAleatorio(0,anchoZona),'gameAtlas','Cielo/Estrellas1/1');  
               GestorGrupos.getInstancia(this.game).grupoEstrellas.add(sprite);
               sprite.smoothed=false;          
                if(i%2===0){
                    sprite.animations.add('brillar1',['Cielo/Estrellas1/1','Cielo/Estrellas1/2','Cielo/Estrellas1/3','Cielo/Estrellas1/4','Cielo/Estrellas1/5',
                    'Cielo/Estrellas1/6','Cielo/Estrellas1/7','Cielo/Estrellas1/8'],8,true);
                    sprite.play('brillar1');
                }else{
                     sprite.animations.add('brillar2',['Cielo/Estrellas2/1','Cielo/Estrellas2/2','Cielo/Estrellas2/3','Cielo/Estrellas2/4','Cielo/Estrellas2/5',
                    'Cielo/Estrellas2/6','Cielo/Estrellas2/7','Cielo/Estrellas2/8'],8,true);
                    sprite.play('brillar2');
                }
               
            }

        }

        private numeroAleatorio(min:number, max:number):number{
            return Math.random()*(max-min)+min;
        }

    }

}