export default class Walls {
    bodyRect = []
    bodyCircle = []
    czech = []
    scene


    constructor(scene) {
        this.scene = scene
    }


    setup(){
        this.rect("walls")
        this.circle("walls-circle")
        this.createCzech()
        this.createObjectsSprite("fuel_depot_2","fuel_depot_2")
        this.createObjectsSprite("light","no_image",1,true)
    }

    createObjectsSprite(name, sprite,scale = 1,light = false,radius = 200){
        if (this.scene.map.objects.filter((el) => el.name === "walls")[0]) {
            this.scene.map.objects.filter((el) => el.name === "walls")[0].objects.filter((el) => el.name === name).forEach((el, i) => {
                if (!this.scene.day) {
                    this.scene.matter.add.sprite(el.x + el.width / 2, el.y + el.height / 2,"sprites",sprite, {
                        isSensor: true,
                        label: name
                    }).setScale(scale).setPipeline('Light2D');
                    if(light){
                        this.scene.lights.addLight(el.x + el.width / 2, el.y + el.height / 2, radius).setIntensity(1);
                    }

                }else{
                    this.scene.matter.add.sprite(el.x + el.width / 2, el.y + el.height / 2,"sprites",sprite, {
                        isSensor: true,
                        label: name
                    }).setScale(scale)
                }
            })
        }

    }

    rect(name) {
        if (this.scene.map.objects.filter((el) => el.name === "walls")[0]) {
            this.scene.map.objects.filter((el) => el.name === "walls")[0].objects.filter((el) => el.name === name).forEach((el, i) => {
                this.bodyRect[i] = this.scene.matter.add.rectangle(el.x + el.width / 2, el.y + el.height / 2, el.width, el.height, {
                    isStatic: true,
                    label: el.name
                })
                if (!this.scene.day) {
                    //this.bodyRect[i].setPipeline('Light2D');
                    console.log(this.bodyRect[i])
                }
            })
        }
    }

    circle(name) {
        if (this.scene.map.objects.filter((el) => el.name === "walls")[0]) {
            this.scene.map.objects.filter((el) => el.name === "walls")[0].objects.filter((el) => el.name === name).forEach((el, i) => {
                this.bodyCircle[i] = this.scene.matter.add.circle(el.x + el.width / 2, el.y + el.height / 2, el.width / 2, {
                    isStatic: true,
                    label: el.name
                })
                if (!this.scene.day) {
                  //  this.bodyCircle[i].setPipeline('Light2D');
                }
            })
        }
    }

    createCzech(){
        if (this.scene.map.objects.filter((el) => el.name === "walls")[0]) {
            this.scene.map.objects.filter((el) => el.name === "walls")[0].objects.filter((el) => el.name === "czech").forEach((el, i) => {
                this.czech[i] = this.scene.matter.add.sprite(el.x + el.width / 2, el.y + el.height / 2,"sprites","czech", {
                    isStatic: false,
                    label: "czech"
                }).setScale(0.5).setDepth(20)
                if (!this.scene.day) {
                    this.czech[i].setPipeline('Light2D');
                }
            })
        }
    }
}