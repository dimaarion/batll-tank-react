import Bot from "./Bot";

export default class AllyTank extends Bot{
    scene;
    body = [];
    position = {x:0,y:0}
    constructor(x, y, name, head = 'Gun_01', corpus = 'Hull_01', live = 10, shield = 10, attack = 5, speedAttack = 10, radiusSensor = 20, speed = 10) {
        super(x, y, name, head, corpus, live, shield, attack, speedAttack, radiusSensor, speed);
        this.position = {x:x + 200,y:y + 200}
        this.icon = "HP-player"
    }

    createTank(scene){
        this.scene = scene;
        this.createHealthShield();
        this.createBurning();
        this.createHPIcons(this.icon);
        this.createCorpus("tanks");
        this.createHead("tanks",this.headImg);
        this.createTrek();
        this.constraintCorpusBurning();
        this.createSensor();
        this.constraint.main = this.createConstraint(this.constraint.corpus,this.constraint.head,{x:0,y:this.headerCorpus.a},{x:0,y:this.headerCorpus.b})
        this.headSensor = this.createConstraint(this.constraint.head,this.constraint.sensor)

    }


    colligeActive(pair){
            if(pair.bodyB === this.constraint.sensor && pair.bodyA.label.match(/sensor/i)){
                this.position = pair.bodyA.position;
            }
            if(pair.bodyB === this.constraint.sensor && pair.bodyA.label.match(/base_sensor/i)){
                this.position = pair.bodyA.position;
                this.scene.quest = true
            }

    }


    drawAlly(){
        this.setPositionHP()
        this.liveDraw();
        this.shieldDraw();
        this.trackAngle();
        this.rotateTank(this.position.x, this.position.y)
        this.rotateHead(this.constraint.head.body, this.position.x, this.position.y)
    }

}