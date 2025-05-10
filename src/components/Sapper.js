import Body from "./Body";

export default class Sapper extends Body {
    scene

    constructor(x, y, name, head = 'Gun_01', corpus = 'Hull_01', live = 10, shield = 10, attack = 5, speedAttack = 10, radiusSensor = 20, speed = 5) {
        super(x, y, name, head, corpus, live, shield, attack, speedAttack, radiusSensor, speed);
        this.icon = "HP-player"
    }

    createSapper(scene) {
        this.scene = scene
        this.createHealthShield();
        this.createBurning();
        this.createHPIcons(this.icon);
        this.createCorpus("tanks");
        this.createTrek();
        this.constraintCorpusBurning();
        this.createSensor();
    }


    collegeActive(pair){
        if(pair.bodyB === this.constraint.sensor && pair.bodyA.label.match(/sensor/i)){
            this.position = pair.bodyA.position;
        }
    }


    viewSapper() {
        this.setPositionHP()
        this.liveDraw();
        this.shieldDraw();
        this.trackAngle();
        this.rotateTank(this.x + 200, this.y + 200)
    }
}