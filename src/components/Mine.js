export default class Mine{
    scene
    body = []
    day  = true;
    constructor(scene) {
        this.scene = scene
    }

    setup(){
        if(this.scene.map.objects.filter((el) => el.name === "mine")[0]){
            this.scene.map.objects.filter((el) => el.name === "mine")[0].objects.filter((el) => el.name === "mine").forEach((el, i) => {
                this.body[i] = this.scene.matter.add.sprite(el.x + el.width / 2,el.y + el.height / 2,"mine","").setCircle(el.width / 2,{isSensor:true,label:el.type})
            if(!this.day){
                this.body[i].setPipeline('Light2D');
            }

            })
        }
    }


    collegeStart(pair){
        this.body.forEach((el)=>{
            if(pair.bodyA === el.body && pair.bodyB.label.match(/tank_corpus/i)){
                el.play("mine-run",true).once('animationcomplete', () => {
                    if (el.body) {
                        el.body.gameObject.destroy()
                    }
                    this.scene.tank_base_explosion.play()
                    this.scene.matter.world.remove(el);
                });
                pair.bodyB.shield -= this.getMineDamage(50,this.scene.state.levelCount.value.id);
                if (pair.bodyB.shield < 0) pair.bodyB.shield = 0;
                if(pair.bodyB.shield === 0){
                    pair.bodyB.health -= this.getMineDamage(50,this.scene.state.levelCount.value.id);
                    if (pair.bodyB.health < 0) pair.bodyB.health = 0;
                }

            }
            if(pair.bodyB === el.body && pair.bodyA.label.match(/czech/i) || pair.bodyA === el.body && pair.bodyB.label.match(/czech/i)){
                el.play("mine-run",true).once('animationcomplete', () => {
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