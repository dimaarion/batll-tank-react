import Body from "./Body";
import * as Phaser from "phaser";
export default class Bot extends Body {
  targetBot
  sensorObject = null
  linck = null

  timerDopRocket
  scout = false

  constructor(x, y, name, head = 'Gun_01', corpus = 'Hull_01', live = 10, shield = 10, attack = 5, speedAttack = 10, radiusSensor = 20, speed = 10) {
    super(x, y, name, head, corpus, live, shield, attack, speedAttack, radiusSensor, speed);
    this.bot = 1;
    this.namePule = "pule_bot";
    this.nameRocket = "rocket_bot"
    this.icon = "HP-bot";
    this.label = this.corpusImg
    this.keyImage = "tanks-bot"
  }

  setup(scene) {
    super.setup(scene);
    this.sensorObject = this.scene.matter.add.circle(this.x,this.y,500,{isSensor:true,label:"search_object",activeObj:false, targetObj:{x:Phaser.Math.Between(100, this.scene.map.heightInPixels),y:Phaser.Math.Between(100, this.scene.map.heightInPixels)}})
    this.scene.matter.add.constraint(this.constraint.sensor,this.sensorObject,0,1)
    this.targetBot = { x: Phaser.Math.Between(0, this.scene.map.heightInPixels), y: Phaser.Math.Between(0, this.scene.map.heightInPixels) };
    if(this.corpusImg === "Hull_04" && this.level === 6){
      this.linck = this.scene.matter.add.sprite(this.x,this.y,"linck","linck-run",{isSensor:true}).setDepth(50);
    }


    this.timerDopRocket = this.scene.time.addEvent({
      delay: this.speedPule * 2,
      callback: () => {
        if (this.type.match(/Hull_boss_1/i)) {
          this.rocket()
          this.rocketMove(75,50)
        }

      },
      callbackScope: this,
      loop: true,
      paused: true
    });
    if (this.type.match(/Hull_boss_1/i)) {
      this.countRocket = 2
      this.createRocketStatic()
    }


      this.scene.time.addEvent({
        delay: Phaser.Math.Between(5000,20000),
        loop: true,
        callback: () => {
          if(this.inTrack){
            this.targetBot = { x: Phaser.Math.Between(0, this.scene.map.heightInPixels), y: Phaser.Math.Between(0, this.scene.map.heightInPixels) };
          }

        }
      });

    this.scene.time.addEvent({
      delay: 10000,
      loop: true,
      callback: () => {
        if (this.inTrack){
          this.targetBot = this.playerBasePosition;
        }


      }
    });
    if(!this.inTrack){
      this.targetBot = this.constraint.sensor.positionBot
    }

  }

  takeDamageBot(body, amount) {
    body.health -= amount;
    if (body.health < 0) body.health = 0;
  }

  shieldDamageBot(body, amount) {
    body.shield -= amount;
    if (body.shield < 0) body.shield = 0;
  }


  move(){
    if(this.sensorObject.activeObj){
      this.targetBot = this.sensorObject.targetObj
    }


    if(this.inTrack){
      this.trackAngle()
    }
    this.setPositionHP()
    this.liveDraw()
    this.shieldDraw();
    if(this.constraint.corpus.body.health !== 0){
      this.movePule();
      if(this.inTrack){
        this.rotateTank(this.targetBot.x,this.targetBot.y)
      }
      if(this.constraint.sensor.sensorActive){
        this.rotateHead(this.constraint.head.body,this.constraint.sensor.positionBot.x,this.constraint.sensor.positionBot.y)
        this.timerRocket.paused = false
        this.timerDopRocket.paused = false
      }else {
        this.timerRocket.paused = true
        this.timerDopRocket.paused = true
        if (this.targetBot) {
           this.rotateHead(this.constraint.head.body, this.targetBot.x, this.targetBot.y)
        }
      }

    }else {
      if(this.inTrack){
        this.constraint.track.stop()
      }
      this.timerRocket.paused = true
      this.timerDopRocket.paused = true
    }

    this.reportPlayerDetection()

    if (this.type.match(/Hull_boss_1/i)) {
      this.drawRocketStatic(this.rocketStatic,75,50)
    }

  }


  connect(pair){
    if(pair.bodyB === this.constraint.sensor && pair.bodyA.label.match(/tank_corpus/)){
      if(this.linck && this.constraint.corpus.body.health !== 0){
        this.linck.play("linck-run",true)
        this.scout = true
      }
    }
  }

  reportPlayerDetection(){
      if(this.linck){
        this.linck.setPosition(this.constraint.sensor.position.x,this.constraint.sensor.position.y)
      }
  }





}
