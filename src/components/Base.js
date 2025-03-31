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
  healthBar
  healthBarBot
  sensorPlayer

  constructor(scene) {
    this.scene = scene
    this.health = this.liveDefault;
    this.healthBot = this.liveDefault;
  }

  setup(scene) {
    this.bodyBot = this.scene.map.createFromObjects('base', {name: "bot"});
    this.bodyPlayer = this.bodyPlayer = this.scene.map.createFromObjects('base', {name: "tank"});

    this.bodyPlayer = this.bodyPlayer.map((el) => {
      this.HPBasePlayer = this.scene.matter.add.image(el.x, el.y - 150, "HPBasePlayer").setScale(this.scale).setRectangle(el.width, el.height, {isSensor: true})
      //  this.sensorPlayer = this.scene.matter.add.circle(el.x,el.y,500,{isSensor:true,label:"base-player-sensor"})
      return this.scene.matter.add.gameObject(el, {label: "base_tank"}).setTexture('base-player').setRectangle(300, 300, {
        isStatic: true,
        label: "tank_base",
        healthBase: this.health
      }).setScale(this.scale)
    })

    this.bodyBot = this.bodyBot.map((el) => {
      this.HPBaseBot = this.scene.matter.add.image(el.x, el.y - 150, "HP-bot").setScale(this.scale).setRectangle(el.width, el.height, {isSensor: true})
      // this.sensorPlayer = this.scene.matter.add.circle(el.x,el.y,500,{isSensor:true,label:"base-player-sensor"})
      return this.scene.matter.add.gameObject(el, {label: "base_bot"}).setTexture('base-bot').setRectangle(300, 300, {
        isStatic: true,
        label: "base-bot",
        healthBase: this.health
      }).setScale(this.scale)
    })


    this.healthBar = this.createHP(this.healthBar, this.HPBasePlayer.body.position.x - this.HPBasePlayer.width / 2, this.HPBasePlayer.body.position.y - this.HPBasePlayer.height / 2, this.HPBasePlayer.width)
    this.healthBarBot = this.createHP(this.healthBarBot, this.HPBaseBot.body.position.x - this.HPBaseBot.width / 2, this.HPBaseBot.body.position.y - this.HPBaseBot.height / 2, this.HPBaseBot.width)

  }

  createHP(obj, x, y, w) {
    obj = this.scene.add.graphics();
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
    if (obj.length > 0) {
      obj.forEach((el) => {
        let healthWidth = el.body.healthBase;
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
          // this.scene.matter.world.remove(this.constraint.corpus);
          // this.constraint.burning.play("burning", true)

        }
        graphic.fillRect(x, y, healthWidth, 10);
        live = healthWidth

      })

    }
    return live;
  }

  liveDraw() {
    this.health = this.viewHP(this.bodyPlayer, this.healthBar, this.HPBasePlayer.body.position.x - this.HPBasePlayer.width / 2, (this.HPBasePlayer.body.position.y - this.HPBasePlayer.height / 2) - 5)
    this.healthBot = this.viewHP(this.bodyBot, this.healthBarBot, this.HPBaseBot.body.position.x - this.HPBaseBot.width / 2, (this.HPBaseBot.body.position.y - this.HPBaseBot.height / 2) - 5)

  }

}
