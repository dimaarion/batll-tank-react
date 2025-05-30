import {setHp} from "../redux/features/Hangar";

export default class Mine {
    scene
    body = []
    day = true;

    constructor(scene) {
        this.scene = scene
    }

    setup() {
        if (this.scene.map.objects.filter((el) => el.name === "mine")[0]) {
            this.scene.map.objects.filter((el) => el.name === "mine")[0].objects.filter((el) => el.name === "mine").forEach((el, i) => {
                this.body[i] = this.scene.matter.add.sprite(el.x + el.width / 2, el.y + el.height / 2, "mine", "").setCircle(el.width / 2, {
                    isSensor: true,
                    label: el.type
                }).setDepth(20)
                if (!this.day) {
                    this.body[i].setPipeline('Light2D');
                }

            })
        }
    }

    sapper(body){
        if (!body.label.match(/МР-55/i)) {
            body.shield -= this.getMineDamage(50, this.scene.state.levelCount.value.id);
        }
        if (body.label.match(/МР-55/i)) {
            body.hp += this.getMineDamage(25, this.scene.state.levelCount.value.id);
             this.scene.store.dispatch(setHp({
                 id: body.bodyId,
                 hp: this.getMineDamage(25, this.scene.state.levelCount.value.id)
             }))

        }

        if (body.shield < 0) body.shield = 0;
        if (body.shield === 0) {
            if (!body.label.match(/МР-55/i)) {
                body.health -= this.getMineDamage(50, this.scene.state.levelCount.value.id);
                if (body.health < 0) body.health = 0;
            }
        }
    }

    remove(body){
        body.play("mine-run", true).once('animationcomplete', () => {
            if (body.body) {
                body.body.gameObject.destroy();
            }
            this.scene.tank_base_explosion.play();
            this.scene.matter.world.remove(body);
        });
    }

    collegeStart(pair) {

        this.body.forEach((el) => {
            if (pair.bodyA === el.body && pair.bodyB.label.match(/tank_corpus/i)) {
                this.remove(el)
                this.sapper(pair.bodyB)
            }
            if (pair.bodyB === el.body && pair.bodyA.label.match(/tank_corpus/i)) {
                this.remove(el)
                this.sapper(pair.bodyA)
            }

            if ((pair.bodyB === el.body && pair.bodyA.label.match(/czech/i)) || (pair.bodyA === el.body && pair.bodyB.label.match(/czech/i))) {
                el.play("mine-run", true).once('animationcomplete', () => {
                    if (el.body) {
                        el.body.gameObject.destroy()
                    }
                    this.scene.matter.world.remove(el);
                    this.scene.tank_base_explosion.play()
                });
            }

        })
    }

    getMineDamage(baseDamage, level) {
        const scalingFactor = 0.07; // +7% урона за уровень
        return Math.floor(baseDamage * (1 + level * scalingFactor));
    }

}