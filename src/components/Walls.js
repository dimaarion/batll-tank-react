export default class Walls {
    bodyRect
    bodyCircle
    scene

    constructor(scene) {
        this.scene = scene
    }


    setup(name){

    }

    rect(name) {
        if (this.scene.map.objects.filter((el) => el.name === "walls")[0]) {
            this.scene.map.objects.filter((el) => el.name === "walls")[0].objects.filter((el) => el.name === name).forEach((el, i) => {
                this.bodyRect = this.scene.matter.add.rectangle(el.x + el.width / 2, el.y + el.height / 2, el.width, el.height, {
                    isStatic: true,
                    label: el.name
                })
            })
        }
    }

    circle(name) {
        if (this.scene.map.objects.filter((el) => el.name === "walls")[0]) {
            this.scene.map.objects.filter((el) => el.name === "walls")[0].objects.filter((el) => el.name === name).forEach((el, i) => {
                this.bodyCircle = this.scene.matter.add.circle(el.x + el.width / 2, el.y + el.height / 2, el.width / 2, {
                    isStatic: true,
                    label: el.name
                })
            })
        }
    }

    createCzech(){
        if (this.scene.map.objects.filter((el) => el.name === "walls")[0]) {
            this.scene.map.objects.filter((el) => el.name === "walls")[0].objects.filter((el) => el.name === "czech").forEach((el, i) => {
                this.bodyRect = this.scene.matter.add.sprite(el.x + el.width / 2, el.y + el.height / 2,"sprites","czech", {
                    isStatic: false,
                    label: "czech"
                }).setScale(0.5)
            })
        }
    }
}