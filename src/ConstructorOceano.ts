module Elioway.BallonFight{

    export class ConstructorOceano{
        game:Phaser.Game;
        debug:boolean;

        constructor(game:Phaser.Game,  debug:boolean=false){
            this.game=game;
            this.debug=debug;
        }

        crearOceanoExterior(cantidadBloques:number,posicion:Phaser.Point):Phaser.Sprite{
            let sprite:Phaser.Sprite=null;
            let spriteConCuerpo:Phaser.Sprite=null;

            for(let i=1;i<=cantidadBloques;i++){

                if(i===1){
                    sprite=this.game.add.sprite(0,0,'gameAtlas','Mar/MarPunta/1');
                    GestorGrupos.getInstancia(this.game).grupoOceanoExterior.add(sprite);
                    sprite.smoothed=false;
                    sprite.animations.add('olas',['Mar/MarPunta/1','Mar/MarPunta/2','Mar/MarPunta/3','Mar/MarPunta/4','Mar/MarPunta/5','Mar/MarPunta/6'],8,true);
                    sprite.animations.play('olas');
                    sprite.position.set(posicion.x+(-sprite.width/2)+(sprite.width*i),posicion.y+(sprite.height/2));
                    this.game.physics.p2.enable(sprite,this.debug);
                    (<Phaser.Physics.P2.Body>sprite.body).static=true;
                    
                    (<Phaser.Physics.P2.Body>sprite.body).clearShapes();
                    (<Phaser.Physics.P2.Body>sprite.body).addLine(sprite.width*cantidadBloques*2);
                    (<Phaser.Physics.P2.Body>sprite.body).data.shapes[0].sensor=true;
                    (<Phaser.Physics.P2.Body>sprite.body).setCollisionGroup(GestorGrupos.getInstancia(this.game).grupoColisionOceano);
                    GestorGrupos.getInstancia(this.game).configurarColisionamiento(sprite,"Oceano");

                    spriteConCuerpo=sprite;
                }else{
                    sprite=this.game.add.sprite(0,0,'gameAtlas','Mar/MarPunta/1');
                    GestorGrupos.getInstancia(this.game).grupoOceanoExterior.add(sprite);
                    sprite.smoothed=false;
                    sprite.position.set(posicion.x+(-sprite.width)+(sprite.width*i),posicion.y);
                    sprite.animations.add('olas',['Mar/MarPunta/1','Mar/MarPunta/2','Mar/MarPunta/3','Mar/MarPunta/4','Mar/MarPunta/5','Mar/MarPunta/6'],8,true);
                    sprite.animations.play('olas');
                    
                }  
            }
            return spriteConCuerpo;
        }

         crearOceanoInterior(cantidadBloques:number,posicion:Phaser.Point, isPunta:boolean):void{
            let sprite:Phaser.Sprite=null;
            let spriteConCuerpo:Phaser.Sprite=null;

            for(let i=1;i<=cantidadBloques;i++){

               if(isPunta){
                    sprite=this.game.add.sprite(0,0,'gameAtlas','Mar/MarPunta/1');
                    GestorGrupos.getInstancia(this.game).grupoOceanoInterior.add(sprite);
                    sprite.smoothed=false;
                    sprite.animations.add('olas',['Mar/MarPunta/1','Mar/MarPunta/2','Mar/MarPunta/3','Mar/MarPunta/4','Mar/MarPunta/5','Mar/MarPunta/6'],8,true);
               }else{
                   sprite=this.game.add.sprite(0,0,'gameAtlas','Mar/MarCentro/1');
                   GestorGrupos.getInstancia(this.game).grupoOceanoInterior.add(sprite);
                   sprite.smoothed=false;
                   sprite.animations.add('olas',['Mar/MarCentro/1','Mar/MarCentro/2','Mar/MarCentro/3','Mar/MarCentro/4','Mar/MarCentro/5','Mar/MarCentro/6'],8,true);
               }
                   
            sprite.position.set(posicion.x+(-sprite.width)+(sprite.width*i),posicion.y);
            sprite.animations.play('olas');
                    
            }
            
        }

    }

}