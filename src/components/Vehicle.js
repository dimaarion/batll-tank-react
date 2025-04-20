export default class Vehicle{
    scene
    body = []
    constructor(scene) {
        this.scene = scene
    }

    setup(){

            if(this.scene.map.objects.filter((el) => el.name === "vehicle")[0]){
                this.scene.map.objects.filter((el) => el.name === "vehicle")[0].objects.filter((el) => el.name === "vehicle").forEach((el, i) => {
                    this.body[i] = this.scene.matter.add.sprite(el.x,el.y,el.type,0).setRectangle(el.width, el.height,{isSensor:false,height:el.height})
                })
            }
this.body.forEach((el)=>{
    this.scene.tweens.add({
        targets: el,
        y: {value:el.y + el.body.height,flipY:true},
        duration:10000,
        yoyo: true,
        repeat: -1,


        // interpolation: null,
    });
})

    }
}
