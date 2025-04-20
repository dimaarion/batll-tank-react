export default class Mine{
    scene
    body = []
    constructor(scene) {
        this.scene = scene
    }

    setup(){
        if(this.scene.map.objects.filter((el) => el.name === "mine")[0]){
            this.scene.map.objects.filter((el) => el.name === "mine")[0].objects.filter((el) => el.name === "mine").forEach((el, i) => {
                this.body[i] = this.scene.matter.add.sprite(el.x,el.y,"mine","mine-run").setCircle(el.width / 2,{isSensor:true})
            })
        }
    }


    collegeStart(pair){
        this.body.forEach((el)=>{
            if(pair.bodyA === el.body && pair.bodyB.label.match(/tank_corpus/)){
                el.play("mine-run",true).once('animationcomplete', () => {
                    if (el.body) {
                        el.body.gameObject.destroy()
                    }
                    this.scene.matter.world.remove(el);
                });

                pair.bodyB.health -= (10 * this.scene.state.levelCount.value.id);
                if (pair.bodyB.health < 0) pair.bodyB.health = 0;
            }
        })
    }

}