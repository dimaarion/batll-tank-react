import Body from "./Body";
import Bot from "./Bot";

export default class Vehicle extends Bot {
    scene;
    body = [];
    move = [{x: 4300, y: 400, delay: 10000},{x: 43820, y: 2800, delay: 20000},{x: 1800, y: 2800, delay:30000},{x: 4300, y: 2800, delay: 40000},{x: 4300, y: 400, delay: 50000}]

    constructor(x, y, name, head = 'Gun_01', corpus = 'Hull_01', live = 10, shield = 10, attack = 5, speedAttack = 10, radiusSensor = 20, speed = 10) {
        super(x, y, name, head, corpus, live, shield, attack, speedAttack, radiusSensor, speed);
        this.inTrack = false
    }

    createVehicle(scene) {
        this.scene = scene
        this.createHealthShield();
        this.createHPIcons("HP-bot");
        this.createCorpus("mpb_1");
        this.createBurning();
        this.move.forEach((el) => {
            this.scene.time.addEvent({
                delay: el.delay,
                loop: true,
                callback: (e) => {
                    this.targetBot.x = el.x;
                    this.targetBot.y = el.y;
                }
            });
        })


    }

    drawVehicle() {
        this.setPositionHP()
        this.liveDraw();
        this.shieldDraw();
        this.rotateTank(this.targetBot.x, this.targetBot.y)
    }
}
