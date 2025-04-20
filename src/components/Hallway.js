export default class Hallway{
    scene
    body
    constructor(scene) {
        this.scene = scene
    }

    setup(){
        this.body = this.scene.map.createFromObjects('hallway', {name: "hallway"});
        this.body.forEach((el)=>{
            if(el){
                el.setTexture("hallway").setScale(1).setDepth(1000)
            }
        })

    }
}