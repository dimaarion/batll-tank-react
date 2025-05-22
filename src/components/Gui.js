export default class Gui{
    scene
    rightArrow
    heightRightArrow
    widthRightArrow
    constructor(scene) {
        this.scene = scene
    }

    setup(){

       this.rightArrow = this.scene.matter.add.sprite(0,0,"sprites","play",{isSensor:true}).setDepth(500)
    }

    draw(){
        this.heightRightArrow = window.innerHeight - 50
        this.widthRightArrow = window.innerWidth + 50
        this.rightArrow.setPosition(this.scene.cameras.main.scrollX + this.widthRightArrow,this.scene.cameras.main.scrollY + this.heightRightArrow)
    }

}