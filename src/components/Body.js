import * as Phaser from "phaser";
import Action from "./Action";

export default class Body {
    x = 200
    y = 200
    botPosition = {x: 0, y: 0}
    scene;
    name
    keyObjects = null
    corpus
    speedPule = 1000
    velocity
    activePoint = true
    dx = null
    dy = null
    cam
    bot = 0
    namePule = "pule"
    nameSensor = "sensor"
    countPule = 0
    countTanks = 0;
    speed = 10
    speedTank = 10
    rotations = 0.01;
    attack = 5
    radiusSensor = 300
    hpPlayer = 100
    scalePule = 0.6
    constraint = {
        main: null,
        head: null,
        muzzle: null,
        corpus: null,
        pule: null,
        live: null,
        sensor: null,
        track: [],
        burning: null
    }
    targetBot = {x: 0, y: 0}
    highlightShield
    highlight
    sensorHighlight
    headImg
    corpusImg
    healthBar
    cursorKeys
    id = 0;
    scale = 0.5
    control = {
        left: false,
        right: false,
        up: false,
        down: false,
        space: false
    }
    headSensor = null
    timer
    shield = 85
    live = 85
    headerCorpus = {a:20,b:30}
    target
    scaleTrack = {x:1,y:1}
    worldXY = {x: 0, y: 0}
    action = new Action();

    constructor(x, y, name, head = 'Gun_01', corpus = 'Hull_01', live = 10, shield = 10, attack = 5, speedAttack = 10, radiusSensor = 20, speed = 10) {
        this.x = x;
        this.y = y;
        this.name = name;
        this.headImg = head;
        this.corpusImg = corpus;
        this.live = live * 10;
        this.shield = shield * 10;
        this.attack = attack;
        this.speedPule = 1000 - speedAttack;
        this.radiusSensor = radiusSensor * 10;
        this.speedTank = speed;
        this.speed = attack

        if(this.corpusImg === "Hull_03"){
            this.scaleTrack = {x:0.8,y:1}
            this.scalePule = 0.5
        }
        if(this.corpusImg === "Hull_02"){
            this.scalePule = 0.5
        }
        if(this.corpusImg === "Hull_04"){
            this.scalePule = 0.5
            this.scaleTrack = {x:0.6,y:0.8}
        }
        if(this.corpusImg === "Hull_06"){
            this.headerCorpus = {a:10,b:20}
            this.scalePule = 0.4
        }
        if(this.corpusImg === "Hull_07"){
            this.scalePule = 0.8
            this.scaleTrack = {x:0.8,y:1}
        }
    }


    setup(scene) {
        this.countTanks += 1;
        this.scene = scene;
        this.healthBar = this.scene.add.graphics();
        this.healthBar.fillStyle(0x00ff00, 1);
        this.healthBar.fillRect(this.x - 50, this.y - 80, 100, 10);
        this.healthBar.setDepth(100);

        this.highlightShield = this.scene.add.graphics();
        this.highlightShield.fillStyle(0x21B1BB, 1);
        this.highlightShield.fillRect(this.x, this.y, 100, 10);
        this.highlightShield.setDepth(100);

        this.highlight = this.scene.add.graphics();
        this.highlight.lineStyle(4, 0x3949AB, 1);

        this.sensorHighlight = this.scene.add.graphics();
        this.sensorHighlight.lineStyle(4, 0x808080, 0.5);



        this.hpPlayer = this.scene.matter.add.sprite(this.x, this.y, "HP-player", 0, {
            isSensor: true,
        }).setScale(1).setFixedRotation().setDepth(99)
        this.constraint.track = this.scene.matter.add.sprite(this.x, this.y, "track", "run-track", {
            isSensor: true,
            cP: {x: 40, y: 0}
        }).play("run-track").stop().setFixedRotation().setScale(this.scaleTrack.x,this.scaleTrack.y)
        this.constraint.corpus = this.scene.matter.add.sprite(this.x, this.y, "tanks", this.corpusImg, {label: this.name}).setRectangle(200, 200, {
            label: this.name,
            pX: this.x,
            pY: this.y,
            highlight: false,
            health: this.live,
            shield: this.shield,
            defaultHealth: this.live,
            mass: 5,
            frictionAir: 0,
        }).setScale(this.scale).setDepth(1).setName(this.name)
        this.constraint.head = this.scene.matter.add.sprite(this.x, this.y, "tanks", this.headImg, {label: "head"}).setSensor(true).setScale(this.scale).setDepth(2);
        this.constraint.sensor = this.scene.matter.add.circle(this.x, this.y, this.radiusSensor, {
            isSensor: true,
            label: this.nameSensor,
            positionBot: {x: 0, y: 0},
            headObject: this.constraint.head,
            sensorActive: false

        })
        this.constraint.burning = this.scene.matter.add.sprite(this.x, this.y, "pule-blast", "burning", {isSensor: true}).setDepth(10)


        this.constraint.main = this.scene.matter.add.constraint(this.constraint.corpus, this.constraint.head, 0, 0, {
            pointA: {
                x: 0,
                y: this.headerCorpus.a,
            },
            pointB: {
                x: 0,
                y: this.headerCorpus.b,
            },
            damping: 0.2,
            angularStiffness: 0
        });



        this.headSensor = this.scene.matter.add.constraint(this.constraint.head, this.constraint.sensor, 0, 1);
        this.scene.matter.add.constraint(this.constraint.corpus, this.constraint.burning, 0, 1);


        // this.trackAngle()

        this.cam = this.scene.cameras.main;
        this.cursorKeys = scene.input.keyboard.createCursorKeys();

        this.control.left = scene.input.keyboard.addKey('A');  // Get key object
        this.control.right = scene.input.keyboard.addKey('D');
        this.control.up = scene.input.keyboard.addKey('W');
        this.control.down = scene.input.keyboard.addKey('S');
        this.control.space = scene.input.keyboard.addKey('SPACE');

        this.timer = this.scene.time.addEvent({
            delay: this.speedPule,
            callback: () => {
                this.pule()
            },
            callbackScope: this,
            loop: true,
            paused: true
        });

    }


    trackAngle() {
        this.hpPlayer.setPosition(this.constraint.corpus.body.position.x - 45, this.constraint.corpus.body.position.y - 80)
        this.constraint.track.setPosition(this.constraint.corpus.body.position.x, this.constraint.corpus.body.position.y)
        this.constraint.track.setRotation(this.constraint.corpus.body.angle)
        //this.constraint.head.setPosition(this.constraint.corpus.body.position.x,this.constraint.corpus.body.position.y)
        //  this.constraint.head.setRotation(this.constraint.corpus.body.angle)

    }

    rotateTank(x, y) {
        this.dx = x - this.constraint.corpus.body.position.x;
        this.dy = y - this.constraint.corpus.body.position.y;

        // Вычисляем угол в радианах
        const angle = Math.atan2(this.dy, this.dx) + Math.PI / 2;
        // Вычисляем текущий угол объекта
        const currentAngle = this.constraint.corpus.body.angle;
        // Рассчитываем разницу углов
        let angleDiff = angle - currentAngle;
        // Нормализуем разницу углов для корректного направления вращения
        angleDiff = Phaser.Math.Angle.Wrap(angleDiff);
        // Устанавливаем угловую скорость
        const angularSpeed = 0.1; // Подбери подходящее значение для скорости
        this.scene.matter.body.setAngularVelocity(this.constraint.corpus.body, angleDiff * angularSpeed);

        this.moveTo(this.constraint.corpus.body, x, y)
        if (this.target) {
            const distance = Phaser.Math.Distance.Between(this.constraint.corpus.body.position.x, this.constraint.corpus.body.position.y, this.target.x, this.target.y);

            if (distance < 200) { // Если близко к цели, останавливаем
                this.scene.matter.setVelocity(this.constraint.corpus.body, 0, 0);
                this.target = null; // Убираем цель
            }
        }
        this.trackAnimate()
    }


    trackAnimate() {
        if (this.target !== null) {
            this.constraint.track.play("run-track", true)
        } else {
            this.constraint.track.stop()
        }
    }


    draw() {
        this.trackAngle()
        this.rotateTank(this.constraint.corpus.body.pX, this.constraint.corpus.body.pY)

        if (this.constraint.corpus.body.highlight) {
            this.highlight.clear()
            this.sensorHighlight.clear()
            this.highlight.lineStyle(4, 0x3949AB, 1)
            this.highlight.strokeCircle(this.constraint.corpus.body.position.x, this.constraint.corpus.body.position.y, 100);
            this.sensorHighlight.lineStyle(4, 0x00ff00, 0.5);
            this.sensorHighlight.strokeCircle(this.constraint.head.body.position.x, this.constraint.head.body.position.y, this.radiusSensor);
        } else {
            this.highlight.clear()
            this.sensorHighlight.clear()

        }

        if (this.constraint.sensor.sensorActive) {
            this.rotateHead(this.constraint.head.body, this.constraint.sensor.positionBot.x, this.constraint.sensor.positionBot.y)
        } else {
            if (this.target) {
                this.rotateHead(this.constraint.head.body, this.target.x, this.target.y)
            }

        }

        this.movePule()
        this.liveDraw()
        this.shieldDraw()
    }

    moveTo(body, targetX, targetY) {
        const speed = this.speedTank; // Скорость движения
        const angle = Phaser.Math.Angle.Between(body.position.x, body.position.y, targetX, targetY);

        const velocityX = Math.cos(angle) * speed;
        const velocityY = Math.sin(angle) * speed;

        this.scene.matter.setVelocity(body, velocityX, velocityY);
        this.target = {x: targetX, y: targetY}; // Запоминаем цель
    }


    movePule() {
        if (this.constraint.pule) {
            this.scene.matter.world.engine.world.bodies.filter((el) => el.label === this.namePule).forEach((pule) => {
                if (pule.speed < 1.5) {
                    pule.gameObject.play("pule-blast-run", true).once('animationcomplete', () => {
                        if (pule.gameObject) {
                            pule.gameObject.destroy()
                        }
                        this.scene.matter.world.remove(pule);

                    });
                }
            })
        }
    }

    rotateHead(body, x, y) {

        const dx = x - body.position.x;
        const dy = y - body.position.y;
        let angle = Math.atan2(dy, dx) + Math.PI / 2;
        const currentAngle = body.angle;
        // Рассчитываем разницу углов
        let angleDiff = angle - currentAngle;
        // Нормализуем разницу углов для корректного направления вращения
        angleDiff = Phaser.Math.Angle.Wrap(angleDiff);
        const angularSpeed = 0.1; // Подбери подходящее значение для скорости
        this.scene.matter.body.setAngularVelocity(body, angleDiff * angularSpeed);

        //this.scene.matter.body.setAngle(body, angle);
    }

    pule() {
        this.constraint.pule = this.scene.matter.add
            .sprite(this.constraint.sensor.headObject.body.position.x, this.constraint.sensor.headObject.body.position.y, 'pule', "pule", {
                label: this.namePule,
                attack: this.attack,
                bot: this.bot
            }).setScale(this.scalePule)
            .setSensor(true).setDepth(2)
            .play("pule-departure-run").once('animationcomplete', () => {
                if (this.constraint.pule) {
                    this.constraint.pule.setTexture("pule");
                }
                // Останавливаем анимацию

            });
        const dx = this.constraint.sensor.positionBot.x - this.constraint.sensor.headObject.body.position.x;
        const dy = this.constraint.sensor.positionBot.y - this.constraint.sensor.headObject.body.position.y;
        const angle = Math.atan2(dy, dx) + Math.PI / 2;
        this.scene.matter.body.setAngle(this.constraint.pule.body, angle);
        const length = Math.sqrt(dx * dx + dy * dy);
        const speed = this.speed; // Можно менять скорость
        const velocity = {x: (dx / length) * speed, y: (dy / length) * speed};
        const distance = Math.sqrt(dx * dx + dy * dy);
        const moveX = this.constraint.sensor.headObject.body.position.x + (dx / distance) * 50;
        const moveY = this.constraint.sensor.headObject.body.position.y + (dy / distance) * 50;
        this.constraint.pule.setPosition(moveX, moveY)
        this.scene.matter.setVelocity(this.constraint.pule.body, velocity.x, velocity.y);
    }

    liveDraw() {
        let healthWidth = this.constraint.corpus.body.health;
        this.healthBar.clear();
        this.healthBar.fillStyle(0x00ff00, 1);  // Зеленый
        if (healthWidth < 50) {
            this.healthBar.fillStyle(0xffff00, 1);
        }
        if (healthWidth < 20) {
            this.healthBar.fillStyle(0xff0000, 1);
        }
        if (healthWidth < 10) {

        }
        if (healthWidth < 1) {
            this.scene.matter.world.remove(this.constraint.corpus);
            this.constraint.burning.play("burning", true)

        }
        this.healthBar.fillRect(this.constraint.corpus.body.position.x - 22, this.constraint.corpus.body.position.y - 92, healthWidth, 8);
    }

    shieldDraw() {
        this.highlightShield.clear();
        this.highlightShield.fillStyle(0x21B1BB, 1);
        this.highlightShield.fillRect(this.constraint.corpus.body.position.x - 22, this.constraint.corpus.body.position.y - 80, this.constraint.corpus.body.shield, 8);
        if (this.constraint.corpus.body.shield < this.constraint.corpus.body.defaultHealth) {
            this.constraint.corpus.body.shield += 0.001
        }
    }


    takeDamage(body, amount) {
        body.health -= amount;
        if (body.health < 0) body.health = 0;
    }

    shieldDamage(body, amount) {
        body.shield -= amount;
        if (body.shield < 0) body.shield = 0;
    }

}


