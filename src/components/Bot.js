import Body from "./Body";
import * as Phaser from "phaser";
export default class Bot extends Body {
  targetBot
  sensorObject = null


  constructor(x, y, name, head = 'Gun_01', corpus = 'Hull_01', live = 10, shield = 10, attack = 5, speedAttack = 10, radiusSensor = 20, speed = 10) {
    super(x, y, name, head, corpus, live, shield, attack, speedAttack, radiusSensor, speed);
    this.bot = 1;
    this.namePule = "pule_bot";
    this.nameRocket = "rocket_bot"
    this.icon = "HP-bot";
  }

  setup(scene) {
    super.setup(scene);
    this.sensorObject = this.scene.matter.add.circle(this.x,this.y,500,{isSensor:true,label:"search_object",activeObj:false, targetObj:{x:Phaser.Math.Between(100, this.scene.map.heightInPixels),y:Phaser.Math.Between(100, this.scene.map.heightInPixels)}})
    this.scene.matter.add.constraint(this.constraint.sensor,this.sensorObject,0,1)
    this.targetBot = { x: Phaser.Math.Between(0, this.scene.map.heightInPixels), y: Phaser.Math.Between(0, this.scene.map.heightInPixels) };

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

    this.hpPlayer.setPosition(this.constraint.corpus.body.position.x - 45, this.constraint.corpus.body.position.y - 80)
    if(this.inTrack){
      this.trackAngle()
    }

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
      }else {
        this.timerRocket.paused = true
        if (this.targetBot) {
           this.rotateHead(this.constraint.head.body, this.targetBot.x, this.targetBot.y)
        }
      }



    }else {
      if(this.inTrack){
        this.constraint.track.stop()
      }
      this.timerRocket.paused = true
    }

  }

  moveToTarget(tank, target, speed) {
let m = false

    const angleToTarget = Phaser.Math.Angle.Between(tank.x, tank.y, target.x, target.y)  ;

    // Плавный поворот танка
    const angleDiff = Phaser.Math.Angle.Wrap(angleToTarget - (tank.rotation)) ;

    tank.rotation += Phaser.Math.Clamp(angleDiff, -0.05, 0.05);

    // Движение вперёд
    if (Math.abs(angleDiff) < 0.2) { // Двигаемся только если почти повернулись
      const velocityX = (Math.cos(tank.rotation - Math.PI / 2) * speed);
      const velocityY = (Math.sin(tank.rotation - Math.PI / 2) * speed);
      tank.setVelocity(velocityX, velocityY);
      m = true
    }

    // Остановка, если достигли цели
    if (Phaser.Math.Distance.Between(tank.x, tank.y, target.x, target.y) < 10) {
      tank.setVelocity(0, 0);
      m = false
    }

    this.constraint.track.forEach((el) => {
      if (m) {
        el.play("run-track", true)
      } else {
        el.stop()
      }
    })

  }


}
