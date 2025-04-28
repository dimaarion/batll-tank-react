import Body from "./Body";
import Bot from "./Bot";
import Phaser from "phaser";

export default class Vehicle extends Bot {
    scene;
    body = [];
    move = [{x: 0, y: 0}]
    delay = 20000;
    countTime = 0;
    index = 0;
    constructor(x, y, name, head = 'Gun_01', corpus = 'Hull_01', live = 10, shield = 10, attack = 5, speedAttack = 10, radiusSensor = 20, speed = 10) {
        super(x, y, name, head, corpus, live, shield, attack, speedAttack, radiusSensor, speed);
        this.inTrack = false
        this.scale = 1
        this.width = 100
        this.height = 100
    }

    createVehicle(scene) {
        this.scene = scene
        this.move = this.scene.map.objects.filter((el) => el.name === "vehicle")[0]?.objects.filter((el) => el.name === "point_" + this.index).sort((a, b) => a.id - b.id).map((el)=>[{x:el.x,y:el.y}][0])
        this.delay = Phaser.Math.Between(10000, 20000)
        this.createHealthShield();
        this.createBurning();
        this.createHPIcons("HP-bot");
        this.createCorpus("tanks","mpb_1");
        this.constraintCorpusBurning()

        this.scene.time.addEvent({
            delay: this.delay,
            loop: true,
            callback: (e) => {
                this.countTime += 1;
                if(this.countTime  >= this.move.length){
                    this.countTime = 0
                }
            }
        });

this.createLight()


    }

    drawVehicle() {
        this.setPositionHP()
        this.liveDraw();
        this.shieldDraw();
        this.rotateTank(this.move[this.countTime].x, this.move[this.countTime].y)
    }
}
