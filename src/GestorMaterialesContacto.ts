module Elioway.BallonFight{

    export class GestorMaterialesContacto{

        private static instancia:GestorMaterialesContacto;

        private game:Phaser.Game;

        worldMaterial:Phaser.Physics.P2.Material;
        terrenoMaterial:Phaser.Physics.P2.Material;
        electroEstrellaMaterial:Phaser.Physics.P2.Material;
        jugadorMaterial:Phaser.Physics.P2.Material;
        globoPlayerMaterial:Phaser.Physics.P2.Material;
        mandibulaPezMaterial:Phaser.Physics.P2.Material;
        
        private cm:Phaser.Physics.P2.ContactMaterial;
       

        constructor(game:Phaser.Game){
            this.game=game;

            this.worldMaterial=this.game.physics.p2.createMaterial('worldMaterial');
            this.terrenoMaterial=this.game.physics.p2.createMaterial('terrenoMaterial');
            this.electroEstrellaMaterial=this.game.physics.p2.createMaterial('electroEstrellaMaterial');
            this.jugadorMaterial=this.game.physics.p2.createMaterial('jugadorMaterial');
            this.globoPlayerMaterial=this.game.physics.p2.createMaterial('globoPlayerMaterial');
            this.mandibulaPezMaterial=this.game.physics.p2.createMaterial('mandibulaPezMaterial');

            this.cm= this.game.physics.p2.createContactMaterial(this.worldMaterial,this.electroEstrellaMaterial);

            this.rellenarOpciones(this.cm);

            this.cm=this.game.physics.p2.createContactMaterial(this.terrenoMaterial,this.electroEstrellaMaterial);

            this.rellenarOpciones(this.cm);

            this.cm=this.game.physics.p2.createContactMaterial(this.electroEstrellaMaterial,this.electroEstrellaMaterial);

             this.rellenarOpciones(this.cm);

             this.cm=this.game.physics.p2.createContactMaterial(this.jugadorMaterial,this.terrenoMaterial);

             this.rellenarOpciones2(this.cm);

             this.cm=this.game.physics.p2.createContactMaterial(this.jugadorMaterial,this.worldMaterial);

             this.rellenarOpciones2(this.cm);

             this.cm=this.game.physics.p2.createContactMaterial(this.jugadorMaterial,this.electroEstrellaMaterial);

             this.rellenarOpciones2(this.cm);

             this.cm=this.game.physics.p2.createContactMaterial(this.globoPlayerMaterial,this.worldMaterial);

             this.rellenarOpciones2(this.cm);

             this.cm=this.game.physics.p2.createContactMaterial(this.globoPlayerMaterial,this.terrenoMaterial);

             this.rellenarOpciones2(this.cm);

             this.cm=this.game.physics.p2.createContactMaterial(this.jugadorMaterial,this.mandibulaPezMaterial);

             this.rellenarOpciones2(this.cm);
        }

        public static getInstancia(game:Phaser.Game=null):GestorMaterialesContacto{
            
            if(this.instancia==null){
                this.instancia=new GestorMaterialesContacto(game);
            }

            return this.instancia;
        }

        private rellenarOpciones(cm:Phaser.Physics.P2.ContactMaterial){
            cm.friction = 0.0;    
            cm.restitution = 1.0;  
            cm.stiffness = 1e7;    
            cm.relaxation = 3;     
            cm.frictionStuffness = 1e7;    
            cm.frictionRelaxation = 3;     
            cm.surfaceVelocity = 0;
        }

        private rellenarOpciones2(cm:Phaser.Physics.P2.ContactMaterial){
            cm.friction = 0.0;    
            cm.restitution = 0.0;  
            cm.stiffness = 1e7;    
            cm.relaxation = 3;     
            cm.frictionStuffness = 1e7;    
            cm.frictionRelaxation = 3;     
            cm.surfaceVelocity = 0;
        }


    }

}