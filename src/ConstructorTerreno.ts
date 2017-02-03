module Elioway.BallonFight{

    export class ContructorTerreno{

        game:Phaser.Game;
        debug:boolean;

        constructor(game:Phaser.Game, debug:boolean=false){
            this.game=game;
            this.debug=debug;
        }

        crearTerrenoFlotante(cantidadBloques:number,posicion:Phaser.Point):Phaser.Sprite{
            let sprite:Phaser.Sprite=null;
            let spriteConCuerpo:Phaser.Sprite=null;

            for(var i=1;i<=cantidadBloques;i++){

                if(i===1){
                    sprite=this.game.add.sprite(0,0,'gameAtlas','Terreno/2');
                    sprite.name="Terreno";
                    GestorGrupos.getInstancia(this.game).grupoTerreno.add(sprite);
                    sprite.smoothed=false;
                    sprite.position.set(posicion.x+(-sprite.width/2)+(sprite.width*i),posicion.y+(sprite.height/2));
                    this.game.physics.p2.enable(sprite,this.debug);
                    (<Phaser.Physics.P2.Body>sprite.body).static=true;
                    (<Phaser.Physics.P2.Body>sprite.body).clearShapes();
                    (<Phaser.Physics.P2.Body>sprite.body).addRectangle(sprite.width*cantidadBloques,sprite.height/1.5,(sprite.width*cantidadBloques)/2-(sprite.width/2),-sprite.height/9);
                    (<Phaser.Physics.P2.Body>sprite.body).setMaterial(GestorMaterialesContacto.getInstancia(this.game).terrenoMaterial);
                    (<Phaser.Physics.P2.Body>sprite.body).setCollisionGroup(GestorGrupos.getInstancia(this.game).grupoColisionTerreno);
                    GestorGrupos.getInstancia(this.game).configurarColisionamiento(sprite,"Terreno");
                    spriteConCuerpo=sprite;

                }else if(i===cantidadBloques){
                    sprite=this.game.add.sprite(0,0,'gameAtlas','Terreno/7'); 
                    GestorGrupos.getInstancia(this.game).grupoTerreno.add(sprite);
                    sprite.smoothed=false;
                    sprite.position.set(posicion.x+(-sprite.width)+(sprite.width*i),posicion.y); 
                    
                }else{
                    sprite=this.game.add.sprite(0,0,'gameAtlas','Terreno/1'); 
                    GestorGrupos.getInstancia(this.game).grupoTerreno.add(sprite);
                    sprite.smoothed=false;
                    sprite.position.set(posicion.x+(-sprite.width)+(sprite.width*i),posicion.y); 
                }
                
            }
            return spriteConCuerpo;
        }

        crearTerrenoSalienteDerecho(largo:number, ancho:number, posicion:Phaser.Point){

            let sprite:Phaser.Sprite=null;
            let spriteConCuerpo:Phaser.Sprite=null;

            for(var i=1;i<=largo;i++){
                for(var k=1;k<=ancho;k++){
                    if(i===1 && k==1){
                    sprite=this.game.add.sprite(0,0,'gameAtlas','Terreno/9');
                    sprite.name="Terreno";
                    GestorGrupos.getInstancia(this.game).grupoTerreno.add(sprite);
                    sprite.smoothed=false;
                    sprite.position.set(posicion.x+(-sprite.width/2)+(sprite.width*i),posicion.y-(sprite.height/2)+sprite.height*k);
                    this.game.physics.p2.enable(sprite,this.debug);
                    (<Phaser.Physics.P2.Body>sprite.body).static=true;
                    (<Phaser.Physics.P2.Body>sprite.body).clearShapes();
                    (<Phaser.Physics.P2.Body>sprite.body).addRectangle(sprite.width*largo,sprite.height*ancho,(sprite.width*largo)/2-(sprite.width/2),(sprite.height*ancho/2)-(sprite.height/2.5));
                    (<Phaser.Physics.P2.Body>sprite.body).setMaterial(GestorMaterialesContacto.getInstancia(this.game).terrenoMaterial);
                    (<Phaser.Physics.P2.Body>sprite.body).setCollisionGroup(GestorGrupos.getInstancia(this.game).grupoColisionTerreno);
                    GestorGrupos.getInstancia(this.game).configurarColisionamiento(sprite,"Terreno");
                    spriteConCuerpo=sprite;

                }else if(i<largo && k===1){
                    sprite=this.game.add.sprite(0,0,'gameAtlas','Terreno/9');
                    GestorGrupos.getInstancia(this.game).grupoTerreno.add(sprite);
                    sprite.smoothed=false;
                    sprite.position.set(posicion.x+(-sprite.width)+(sprite.width*i),posicion.y-(sprite.height)+sprite.height*k);
                }else if(i===largo && k===1){
                    sprite=this.game.add.sprite(0,0,'gameAtlas','Terreno/3');
                    GestorGrupos.getInstancia(this.game).grupoTerreno.add(sprite);
                    sprite.smoothed=false;
                    sprite.position.set(posicion.x+(-sprite.width)+(sprite.width*i),posicion.y-(sprite.height)+sprite.height*k);
            
                }else if(i===largo){
                    sprite=this.game.add.sprite(0,0,'gameAtlas','Terreno/5');
                    GestorGrupos.getInstancia(this.game).grupoTerreno.add(sprite);
                    sprite.smoothed=false;
                   sprite.position.set(posicion.x+(-sprite.width)+(sprite.width*i),posicion.y-(sprite.height)+sprite.height*k);
                }
                else{
                    sprite=this.game.add.sprite(0,0,'gameAtlas','Terreno/8');
                    GestorGrupos.getInstancia(this.game).grupoTerreno.add(sprite);
                    sprite.smoothed=false;
                   sprite.position.set(posicion.x+(-sprite.width)+(sprite.width*i),posicion.y-(sprite.height)+sprite.height*k);
                  }
                }                
            }
            return spriteConCuerpo;
        }

        crearTerrenoSalienteIzquierdo(largo:number, ancho:number, posicion:Phaser.Point){

            let sprite:Phaser.Sprite=null;
            let spriteConCuerpo:Phaser.Sprite=null;

            for(var i=1;i<=largo;i++){
                for(var k=1;k<=ancho;k++){
                    if(i===1 && k==1){
                    sprite=this.game.add.sprite(0,0,'gameAtlas','Terreno/4');
                    sprite.name="Terreno";
                    GestorGrupos.getInstancia(this.game).grupoTerreno.add(sprite);
                    sprite.smoothed=false;
                    sprite.position.set(posicion.x+(-sprite.width/2)+(sprite.width*i),posicion.y-(sprite.height/2)+sprite.height*k);
                    this.game.physics.p2.enable(sprite,this.debug);
                    (<Phaser.Physics.P2.Body>sprite.body).static=true;
                    (<Phaser.Physics.P2.Body>sprite.body).clearShapes();
                    (<Phaser.Physics.P2.Body>sprite.body).addRectangle(sprite.width*largo,sprite.height*ancho,(sprite.width*largo)/2-(sprite.width/2),(sprite.height*ancho/2)-(sprite.height/2.5));
                    (<Phaser.Physics.P2.Body>sprite.body).setMaterial(GestorMaterialesContacto.getInstancia(this.game).terrenoMaterial);
                    (<Phaser.Physics.P2.Body>sprite.body).setCollisionGroup(GestorGrupos.getInstancia(this.game).grupoColisionTerreno);
                    GestorGrupos.getInstancia(this.game).configurarColisionamiento(sprite,"Terreno");
                    spriteConCuerpo=sprite;

                }else if(i>1 && k===1){
                    sprite=this.game.add.sprite(0,0,'gameAtlas','Terreno/9');
                    GestorGrupos.getInstancia(this.game).grupoTerreno.add(sprite);
                    sprite.smoothed=false;
                    sprite.position.set(posicion.x+(-sprite.width)+(sprite.width*i),posicion.y-(sprite.height)+sprite.height*k);
                }else if(i===1 && k>1){
                    sprite=this.game.add.sprite(0,0,'gameAtlas','Terreno/6');
                    GestorGrupos.getInstancia(this.game).grupoTerreno.add(sprite);
                    sprite.smoothed=false;
                    sprite.position.set(posicion.x+(-sprite.width)+(sprite.width*i),posicion.y-(sprite.height)+sprite.height*k);
            
                }
                else{
                    sprite=this.game.add.sprite(0,0,'gameAtlas','Terreno/8');
                   GestorGrupos.getInstancia(this.game).grupoTerreno.add(sprite);
                    sprite.smoothed=false;
                   sprite.position.set(posicion.x+(-sprite.width)+(sprite.width*i),posicion.y-(sprite.height)+sprite.height*k);
                  }
                }                
            }
            return spriteConCuerpo;
        }

        }

    }
