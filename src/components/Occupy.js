export default class Occupy{
    body = []
    scene
    day
    quest = false
    constructor(scene) {
        this.scene = scene
    }

    create(){
        if(this.scene.map.objects.filter((el) => el.name === "occupy")[0]){
            this.scene.map.objects.filter((el) => el.name === "occupy")[0].objects.filter((el) => el.name === "occupy").forEach((el, i) => {
                this.body[i] = this.scene.matter.add.sprite(el.x + el.width / 2,el.y + el.height / 2,"occupy","").setRectangle(el.width,el.height,{isSensor:true}).setScale(2)
                this.body[i].play("occupy-run").once('animationcomplete', () => {
                    this.body[i].play("burning",true)
                });
                if(!this.day){
                    this.body[i].setPipeline('Light2D');
                }

            })
        }
    }

    collegeActive(pair){
        this.body.forEach((el)=>{
            if(pair.bodyA === el.body && pair.bodyB.label.match(/tank_corpus/)){
                el.stop()
                this.quest = true;
            }
        })
    }
    collegeEnd(pair){
        this.body.forEach((el)=>{
            if(pair.bodyA === el.body && pair.bodyB.label.match(/tank_corpus/)){
                el.play("occupy-run").once('animationcomplete', () => {
                    el.play("burning",true)
                    this.quest = false;
                });

            }
        })
    }

}