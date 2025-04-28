import Action from "./Action";

export default class Base {
    bodyBot
    bodyPlayer
    HPBasePlayer
    HPBaseBot
    scene
    scale = 2
    liveDefault = 190
    health = 190
    healthBot = 190
    hpBot = 0;
    arrBaseBot = []
    healthBar
    healthBarBot
    sensorPlayer
    level = 1
    action = new Action(this);
    x = 0
    y = 0
    day = true
    player = []
    bot = []
    connection_baseBot = []
    hpPlayer = []
    hpBaseBot = []
    hpConnection_baseBot = []
    sensor = []

    constructor(scene) {
        this.scene = scene
        this.health = this.liveDefault;
        this.healthBot = this.liveDefault;
    }


    createPlayerBase() {
        if (this.scene.map.objects.filter((el) => el.name === "base")[0]) {
            this.scene.map.objects.filter((el) => el.name === "base")[0].objects.filter((el) => el.name === "player").forEach((el, i) => {
                this.player[i] = this.scene.matter.add.sprite(el.x + el.width / 2, el.y + el.height / 2, "sprites", "basePlayer", {
                    isStatic: true,
                    label: "tank_base",
                    healthBase: this.health,
                    level: this.level,
                    hp:this.createHP(el.x, el.y - el.height, this.liveDefault),
                    icon:this.scene.matter.add.image(el.x, el.y - el.height, "HP-player").setScale(this.scale).setRectangle(el.width, el.height, {isSensor: true}),
                    width:el.width,
                    height:el.height,
                }).setScale(2)

                this.sensor[i] = this.scene.matter.add.circle(el.x + el.width / 2,el.y + el.height / 2,el.width * 2,{isSensor:true,label:"base_sensor"})

                if (!this.day) {
                    this.player[i].setPipeline('Light2D');
                    this.player[i].body.hp.setPipeline('Light2D');
                    this.player[i].body.icon.setPipeline('Light2D');
                }

            })
        }
    }

    createBotBase() {
        if (this.scene.map.objects.filter((el) => el.name === "base")[0]) {
            this.scene.map.objects.filter((el) => el.name === "base")[0].objects.filter((el) => el.name === "baseBot").forEach((el, i) => {
                this.bot[i] = this.scene.matter.add.sprite(el.x + el.width / 2, el.y + el.height / 2, "sprites", el.type, {
                    isStatic: true,
                    label: "base-bot_" + el.type,
                    healthBase: this.health,
                    level: this.level,
                    hp:this.createHP(el.x, el.y - el.height, this.liveDefault),
                    icon:this.scene.matter.add.image(el.x, el.y - el.height, "HP-bot").setScale(this.scale).setRectangle(el.width, el.height, {isSensor: true}),
                    width:el.width,
                    height:el.height,
                    hpBot:this.hpBot
                }).setScale(2).setDepth(500)
                if (!this.day) {
                    this.bot[i].setPipeline('Light2D');
                    this.bot[i].body.hp.setPipeline('Light2D');
                    this.bot[i].body.icon.setPipeline('Light2D');
                }

            })
            this.hpBot = this.arrBaseBot.reduce((acc, num) => acc + num, 0)
        }
    }

    createBotBaseConnection() {
        if (this.scene.map.objects.filter((el) => el.name === "base")[0]) {
            this.scene.map.objects.filter((el) => el.name === "base")[0].objects.filter((el) => el.name === "connection_baseBot").forEach((el, i) => {
                this.connection_baseBot[i] = this.scene.matter.add.sprite(el.x + el.width / 2, el.y + el.height / 2, "sprites", "connection_baseBot", {
                    isStatic: true,
                    label: "connection_base-bot",
                    healthBase: this.health,
                    level: this.level,
                    hp:this.createHP(el.x, el.y - el.height, this.liveDefault),
                    icon:this.scene.matter.add.image(el.x, el.y - el.height, "HP-bot").setScale(this.scale).setRectangle(el.width, el.height, {isSensor: true}),
                    width:el.width,
                    height:el.height,
                    hpBot:this.hpBot
                }).setScale(2)
                if (!this.day) {
                    this.connection_baseBot[i].setPipeline('Light2D');
                    this.connection_baseBot[i].body.hp.setPipeline('Light2D');
                    this.connection_baseBot[i].body.icon.setPipeline('Light2D');
                }

            })
            this.hpBot = this.arrBaseBot.reduce((acc, num) => acc + num, 0)
        }
    }

    setup() {
        this.scene.map.objects.filter((el) => el.name === "base")[0].objects.filter((el) => el.type.match(/baseBot/)).forEach((el, i) => {
            this.arrBaseBot[i] = this.scene.getBaseDestructionXP(this.level,1.0,false)
        })

        this.hpBot = this.arrBaseBot.reduce((acc, num) => acc + num, 0)
        this.createPlayerBase()
        this.createBotBase()
       // this.createBotBaseConnection()
    }

    createHP(x, y, w) {
      let obj = this.scene.add.graphics();
        obj.fillStyle(0x00ff00, 1);
        obj.fillRect(x, y, w, 10);
        obj.setDepth(100);
        return obj;
    }


    takeDamageBot(body, amount) {
        body.healthBase -= amount;
        if (body.healthBase < 0) body.healthBase = 0;
    }

    viewHP(obj, graphic, x, y) {
        let live = this.liveDefault;
        function dagMage(t,e,o){
            let healthWidth = e.body.healthBase;
            graphic.clear();
            graphic.fillStyle(0x00ff00, 1);  // Зеленый
            if (healthWidth < 50) {
                graphic.fillStyle(0xffff00, 1);
            }
            if (healthWidth < 20) {
                graphic.fillStyle(0xff0000, 1);
            }
            if (healthWidth < 10) {

            }
            if (healthWidth < 1) {
                t.scene.matter.world.remove(o);
            }
            graphic.fillRect(x + 70, y, healthWidth, 10);
            live = healthWidth
        }
        if (obj.length > 0) {
            obj.forEach((el) => {
                dagMage(this,el,el)
            })

        }else {
            dagMage(this,obj,obj)
        }
        return live;
    }

    liveDraw() {
        this.player.forEach((el)=>{
            this.viewHP(el, el.body.hp, el.body.position.x - 120, el.body.position.y - (el.body.height + 120))
        })
        this.bot.forEach((el)=>{
            this.viewHP(el, el.body.hp, el.body.position.x - 120, el.body.position.y - (el.body.height + 120))
        })
        this.connection_baseBot.forEach((el)=>{
            this.viewHP(el, el.body.hp, el.body.position.x - 120, el.body.position.y - (el.body.height + 120))
        })
        this.health = this.player[0].body.healthBase
        this.healthBot = this.bot[0].body.healthBase
        // this.viewHP(this.bodyBot, this.healthBarBot, this.HPBaseBot.body.position.x - this.HPBaseBot.width / 2, (this.HPBaseBot.body.position.y - this.HPBaseBot.height / 2) - 5)

    }

}
