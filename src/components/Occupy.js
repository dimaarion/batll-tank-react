export default class Occupy{
    body = []

    point = []

    sklad = []
    pointSklad = []

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
        if(this.scene.map.objects.filter((el) => el.name === "occupy")[0]){
            this.scene.map.objects.filter((el) => el.name === "occupy")[0].objects.filter((el) => el.name === "control_point").forEach((el, i) => {
                this.point[i] = this.scene.matter.add.sprite(el.x + el.width / 2,el.y + el.height / 2,"sprites","control_point_neutral",{isSensor:true})
                if(!this.day){
                    this.body[i].setPipeline('Light2D');
                }

            })
        }
        if(this.scene.map.objects.filter((el) => el.name === "occupy")[0]){
            this.scene.map.objects.filter((el) => el.name === "occupy")[0].objects.filter((el) => el.name === "sklad").forEach((el, i) => {
                this.pointSklad[i] = this.scene.matter.add.sprite(el.x + el.width / 2,el.y + el.height / 2,"sprites","control_point_neutral",{isSensor:true})
                this.sklad[i] = this.scene.matter.add.sprite(el.x + el.width / 2,el.y + el.height / 2,"sprites","no_image",{isSensor:true}).setScale(2)

                if(!this.day){
                    this.body[i].setPipeline('Light2D');
                }

            })
        }
    }

    collegeActive(pair){
        this.body.forEach((el)=>{
            if(pair.bodyA === el.body && pair.bodyB.label.match(/tank_corpus/i)){
                el.stop()
                this.quest = true;
            }
        })
        this.point.forEach((el)=>{
            if(pair.bodyA === el.body && pair.bodyB.label.match(/tank_corpus/i)){
                el.setTexture("sprites","control_point_player")
                this.quest = true;
            }else if(pair.bodyA === el.body && pair.bodyB.label.match(/bot_corpus/i)){
                el.setTexture("sprites","control_point_bot")
                this.quest = false;
            }
        })

        this.sklad.forEach((el,i)=>{
            if(pair.bodyA === el.body && pair.bodyB.label.match(/tank_corpus/i)){
                el.play("occupy-run",true).once('animationcomplete', () => {
                    this.pointSklad[i].setTexture("sprites","control_point_player")
                    this.scene.quest = true;
                });
                if(this.scene.quest){
                    el.stop()
                }
            }
        })

    }
    collegeEnd(pair){
        this.body.forEach((el)=>{
            if(pair.bodyA === el.body && pair.bodyB.label.match(/tank_corpus/i)){
                el.play("occupy-run").once('animationcomplete', () => {
                    el.play("burning",true)
                    this.quest = false;
                });

            }
        })

        this.point.forEach((el)=>{
            if(pair.bodyA === el.body && pair.bodyB.label.match(/tank_corpus/i)){
                el.setTexture("sprites","control_point_neutral")
                this.quest = false;
            }else if(pair.bodyA === el.body && pair.bodyB.label.match(/bot_corpus/i)){
                el.setTexture("sprites","control_point_neutral")
            }
        })

        this.sklad.forEach((el,i)=>{
            if(pair.bodyA === el.body && pair.bodyB.label.match(/tank_corpus/i)){
                el.stop()
            }
        })
    }

}