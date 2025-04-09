import * as Phaser from "phaser";
import Body from "../components/Body";
import Base from "../components/Base";
import Clock from "phaser3-rex-plugins/plugins/time/clock/Clock";
import Bot from "../components/Bot";
import Action from "../components/Action";

import {seconds} from "../redux/features/Sec";
import {minute} from "../redux/features/Minutes";
import {count} from "../redux/features/CountPlayer";
import {countBot} from "../redux/features/CounterBot";
import {live} from "../redux/features/LibeBasePlayer";
import {liveBot} from "../redux/features/LiveBaseBot";
import {setHp} from "../redux/features/Hangar";
import {gameOverOpen} from "../redux/features/GameOver";
import {none, one, two, three} from "../redux/features/Stsr";
import Hallway from "../components/Hallway";
import store from "../redux/store";
import {increment} from "../redux/features/Money";
import Walls from "../components/Walls";

export default class Scene_1 extends Phaser.Scene {
    map
    cam
    pointT
    activePoint = true
    pointM
    lastX
    lastY
    velX = 0
    velY = 0
    hp = 0
    hpBaseBot = 0;
    activeObjectHead
    arrHp = []
    defaultHp = 0;
    countBot = 5
    countPlayer = 5
    countPlayerBase = 0
    countBotBase = 0
    control = {
        left: false,
        right: false,
        up: false,
        down: false,
        space: false
    }

    base = new Base(this);
    hallway = new Hallway(this);
    clock
    cursorKeys
    tankName = ''
    activeObject = undefined
    edgeThreshold = 100;
    block
    cameraSpeed = 4;
    action = new Action();
    body = []
    sec = 0
    min = 0
    bodyBot = []
    state = {}
    store = {}
    killedBot = 0;
    killedPlayer = 0;
    timerGameOver;
    walls = new Walls(this)


    constructor() {
        super("Scene_1");
    }

    create() {
        this.store = this.registry.get('store'); // Достаём Redux store
        this.state = this.store.getState();


        this.map = this.make.tilemap({key: this.state.levelCount.value.name, tileWidth: 32, tileHeight: 32});
        let tiles = this.map.addTilesetImage("level_" + this.state.levelCount.value.id, this.state.levelCount.value.tiles, 32, 32, 0, 0);
        this.layer = this.map.createLayer("ground", tiles, 0, 0);
        this.layer.setCollisionByProperty({collides: true});
        this.map.setCollisionByExclusion(-1, true);
        this.matter.world.createDebugGraphic();
        this.matter.world.drawDebug = false;
        this.cam = this.cameras.main;

        this.matter.world.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);
        this.cameras.main.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);
        if (this.sys.game.device.os.android) {
            this.cameras.main.setZoom(0.5);
        }else {
            this.cameras.main.setZoom(0.8);
        }

        this.walls.rect("walls")
        this.walls.circle("walls-circle")

        this.base.level = this.state.levelCount.value.id
        this.base.setup();
        this.hallway.setup()


        this.body = this.state.battle.value.map((el) => {
                let b = new Body(this.base.bodyPlayer[0].x, this.base.bodyPlayer[0].y, "tank_corpus_" + el.id, el.head, el.corpus,
                    this.action.getOption(el, "live"),
                    this.action.getOption(el, "shield"),
                    this.action.getOption(el, "attack"),
                    this.action.getOption(el, "attack_speed"),
                    this.action.getOption(el, "radius_attack"),
                    this.action.getOption(el, "speed")
                )
                b.id = el.id
                b.hp = el.hp

                return b;
            }
        )

        this.cameras.main.setScroll(this.base.bodyPlayer[0].x - window.innerWidth / 2, this.base.bodyPlayer[0].y - window.innerHeight / 2);


        this.store.subscribe(() => {
            const newState = this.store.getState();
            if (newState.pause.value || newState.gameOver.value.active) {
                if (this.scene.manager) {
                    this.scene.pause();
                }
            } else {
                if (this.scene.manager) {
                    this.scene.resume();
                }
            }

        });



        this.body.forEach((el, i) => {
            el.x = (this.base.bodyPlayer[0].x + i * 120)
            el.y = (this.base.bodyPlayer[0].y + this.base.bodyPlayer[0].height * 2)
            el.setup(this);
        })


        this.map.objects.filter((el) => el.name === "tanks")[0].objects.filter((el) => el.name === "bot").forEach((el, i) => {

            this.bodyBot[i] = new Bot(el.x, el.y, "bot_corpus_" + i,
                this.action.getProperties(el, "head"),
                this.action.getProperties(el, "corpus"),
                this.action.getProperties(el, "live"),
                this.action.getProperties(el, "shield"),
                this.action.getProperties(el, "attack"),
                this.action.getProperties(el, "attack_speed"),
                this.action.getProperties(el, "radius_attack"),
                this.action.getProperties(el, "speed")
            );
            this.bodyBot[i].hp = this.action.getProperties(el, "hp");
            this.bodyBot[i].level = this.state.levelCount.value.id;
            this.bodyBot[i].playerBasePosition = {x:this.base.bodyPlayer[0].x,y:this.base.bodyPlayer[0].y}
            this.bodyBot[i].setup(this);
            this.arrHp[i] = this.bodyBot[i].hp;

        })
        this.arrHp = this.arrHp.concat(this.base.arrBaseBot)
        this.defaultHp = this.arrHp.reduce((acc, num) => acc + num, 0);


        this.clock = new Clock(this);
        this.clock.start()

        this.cursorKeys = this.input.keyboard.createCursorKeys();
        this.control.space = this.input.keyboard.addKey('space');
        this.control.up = this.input.keyboard.addKey('w');
        this.control.down = this.input.keyboard.addKey('S');
        this.control.left = this.input.keyboard.addKey('A');
        this.control.right = this.input.keyboard.addKey('D');


        let pointer = this.input.activePointer;
        let worldXY = pointer.positionToCamera(this.cam);

        this.pointT = this.matter.add.sprite(100, 100, 'runPoint', 0, {
            isSensor: true,
            label: 'cursor-state'
        }).play("runPoint")
        this.pointM = this.matter.add.sprite(worldXY.x, worldXY.y, "point-move", 0, {label: 'cursor-move'}).setCircle(50, {label: "cursor-move"}).setSensor(true).setName("cursor");

        // collisionstart

        this.matter.world.on("collisionstart", (event) => {
            function pule(scene, pair) {
                pair.bodyB.gameObject.play("pule-blast-run", true).once('animationcomplete', () => {
                    if (pair.bodyB.gameObject) {
                        pair.bodyB.gameObject.destroy()
                    }
                    scene.matter.world.remove(pair.bodyB);

                });
            }

            function puleA(scene, pair) {
                pair.bodyA.gameObject.play("pule-blast-run", true).once('animationcomplete', () => {
                    if (pair.bodyA.gameObject) {
                        pair.bodyA.gameObject.destroy()
                    }
                    scene.matter.world.remove(pair.bodyA);

                });
            }

            event.pairs.forEach((pair) => {

                if ((pair.bodyA.label.match(/bot/i) || pair.bodyA.label.match(/walls/i)) && pair.bodyB.label === "pule") {
                    pule(this, pair)
                }
                if ((pair.bodyA.label.match(/tank/i) || pair.bodyA.label.match(/walls/i)) && pair.bodyB.label === "pule_bot") {
                    pule(this, pair)
                }

                if ((pair.bodyB.label.match(/bot/i) || pair.bodyB.label.match(/walls/i)) && pair.bodyA.label === "pule") {
                    puleA(this, pair)
                }
                if ((pair.bodyB.label.match(/tank/i) || pair.bodyB.label.match(/walls/i)) && pair.bodyA.label === "pule_bot") {
                    puleA(this, pair)
                }

                if (pair.bodyA.label.match(/tank_corpus/i) && pair.bodyB.label === "cursor-move") {
                    this.activePoint = true
                    this.input.on('pointerdown', (pointer) => {
                      //  this.activeObject = pair.bodyA.label

                        this.body.forEach((el) => {
                            if (el.constraint.corpus.body === pair.bodyA) {
                            //    el.constraint.corpus.body.highlight = true;
                            } else {
                             //   el.constraint.corpus.body.highlight = false;
                            }

                        })
                    });


                }
                if (pair.bodyB.label.match(/tank_corpus/i) && pair.bodyA.label === "cursor-move") {
                    this.activePoint = true
                    this.input.on('pointerdown', (pointer) => {
                     //   this.activeObject = pair.bodyB.label
                    });


                }
                if (/pule/i.test(pair.bodyB.label) && pair.bodyB.bot === 0 && pair.bodyA.label.match(/bot/i)) {

                    this.bodyBot.filter((el) => el.constraint.corpus.body === pair.bodyA).forEach((el) => {
                        el.shieldDamageBot(pair.bodyA, pair.bodyB.attack)
                        if (pair.bodyA.gameObject.body.shield === 0) {
                            el.takeDamageBot(pair.bodyA, pair.bodyB.attack)
                        }
                        if (el.constraint.corpus.body.health === 0) {
                            this.hp += el.hp
                            this.store.dispatch(increment(el.level * 50))
                            this.store.dispatch(setHp({id:pair.bodyB.bodyId,hp:el.hp}))
                        }

                    })
                    this.base.takeDamageBot(pair.bodyA, pair.bodyB.attack)
                }

                if (/pule/i.test(pair.bodyA.label) && pair.bodyA.bot === 0 && pair.bodyB.label.match(/bot/i)) {

                    this.bodyBot.filter((el) => el.constraint.corpus.body === pair.bodyB).forEach((el) => {
                        el.shieldDamageBot(pair.bodyB, pair.bodyA.attack)
                        if (pair.bodyB.gameObject.body.shield === 0) {
                            el.takeDamageBot(pair.bodyB, pair.bodyA.attack)
                        }
                        if (el.constraint.corpus.body.health === 0) {
                            this.hp += el.hp
                            this.store.dispatch(increment(el.level * 50))
                            this.store.dispatch(setHp({id:pair.bodyB.bodyId,hp:el.hp}))
                        }

                    })
                    this.base.takeDamageBot(pair.bodyA, pair.bodyB.attack)
                }
                if (/pule/i.test(pair.bodyB.label) && pair.bodyB.bot === 1 && pair.bodyA.label.match(/tank/i)) {
                    this.body.filter((el) => el.constraint.corpus.body === pair.bodyA).forEach((el) => {
                        el.shieldDamage(pair.bodyA, pair.bodyB.attack)
                        if (pair.bodyA.gameObject.body.shield === 0) {
                            el.takeDamage(pair.bodyA, pair.bodyB.attack)
                        }

                    })

                    this.base.takeDamageBot(pair.bodyA, pair.bodyB.attack)
                }

            });
        })
        this.matter.world.on("collisionactive", (event) => {

            event.pairs.forEach((pair) => {
                if (/sensor/i.test(pair.bodyA.label) && pair.bodyB.label.match(/bot_corpus/i)) {
                    this.body.filter((el) => el.constraint.sensor === pair.bodyA).forEach((el) => {
                        if(pair.bodyB.health === 0 || el.constraint.corpus.body.health === 0){
                            el.timer.paused = true
                        }else {
                            el.constraint.sensor.positionBot = pair.bodyB.position
                            el.constraint.sensor.sensorActive = true
                            el.timer.paused = false
                        }
//console.log(el)

                    })
                }

                if (/sensor/i.test(pair.bodyB.label) && pair.bodyA.label.match(/base-bot/i)) {
                    this.body.filter((el) => el.constraint.sensor === pair.bodyB).forEach((el) => {
                        if(el.constraint.corpus.body.health === 0){
                            el.timer.paused = true
                        }
                        if(pair.bodyA.healthBase < 1){
                            el.timer.paused = true
                            this.hp += pair.bodyA.hpBot
                            this.store.dispatch(increment(this.state.levelCount.value.id * 100))
                            this.store.dispatch(setHp({id:el.id,hp:this.state.levelCount.value.id * 100}))
                        }else {
                            el.constraint.sensor.positionBot = pair.bodyA.position
                            el.constraint.sensor.sensorActive = true
                            el.timer.paused = false
                        }

                    })
                }
                if (pair.bodyA.label.match(/tank_base/i) || pair.bodyB.label.match(/bot/i)) {
                    this.bodyBot.filter((el) => el.constraint.sensor === pair.bodyB).forEach((el) => {
                        if(pair.bodyA.healthBase === 0){
                            el.timer.paused = true
                        }else {
                            el.constraint.sensor.positionBot = pair.bodyA.position
                            el.constraint.sensor.sensorActive = true
                            el.timer.paused = false
                        }
                    })
                }

                if (/sensor/i.test(pair.bodyB.label) && pair.bodyA.label.match(/tank_corpus/i)) {
                    this.bodyBot.filter((el) => el.constraint.sensor === pair.bodyB).forEach((el) => {
                        if(pair.bodyA.health === 0 || el.constraint.corpus.body.health === 0){
                            el.timer.paused = true
                        }else {
                            el.constraint.sensor.positionBot = pair.bodyA.position
                            el.constraint.sensor.sensorActive = true
                            el.timer.paused = false
                        }
                    })

                }

                if (/search_object/i.test(pair.bodyB.label) && pair.bodyA.label.match(/tank/i)) {
                    pair.bodyB.activeObj = true
                    pair.bodyB.targetObj = pair.bodyA.position
                }

                if (/base-player-sensor/i.test(pair.bodyA.label) && pair.bodyB.label.match(/tank_corpus/i)) {
                    if (pair.bodyB.health < pair.bodyB.defaultHealth) {
                        //  pair.bodyB.health += 0.1
                    }

                }


            })


        }, this)

        this.matter.world.on("collisionend", (event) => {
            event.pairs.forEach((pair) => {
                if ((pair.bodyA.label.match(/tank_corpus/i) && pair.bodyB.label === "cursor-move") || (pair.bodyB.label.match(/tank_corpus/i) && pair.bodyA.label === "cursor-move")) {
                    // this.activePoint = true
                   this.activePoint = false
                }
                if (/sensor/i.test(pair.bodyA.label) && pair.bodyB.label.match(/bot_corpus/i)) {

                    pair.bodyA.sensorActive = false
                    this.body.filter((el) => el.constraint.sensor === pair.bodyA).forEach((el) => {
                        el.timer.paused = true
                        if (el.constraint.corpus.body && el.constraint.corpus.body.health > 1) {
                            el.constraint.sensor.positionBot = pair.bodyB.position
                            if (pair.bodyB.health !== 0) {

                                //  el.rotateHead(pair.bodyA.headObject.body, pair.bodyB.position.x, pair.bodyB.position.y, false)
                            }
                        }

                    })

                }

                if (/sensor/i.test(pair.bodyB.label) && pair.bodyA.label.match(/tank/i)) {
                    pair.bodyA.sensorActive = false
                    this.bodyBot.filter((el) => el.constraint.sensor === pair.bodyB).forEach((el) => {
                        el.timer.paused = true
                        if (el.constraint.corpus.body.health > 1) {
                            el.constraint.sensor.positionBot = pair.bodyA.position
                            if (pair.bodyA.health !== 0) {
                                //  el.rotateHead(pair.bodyB.headObject.body, pair.bodyA.position.x, pair.bodyA.position.y, false)
                            }
                        }
                    })

                }
                if (/search_object/i.test(pair.bodyB.label) && pair.bodyA.label.match(/tank/i)) {
                    pair.bodyB.activeObj = false

                }
                if (pair.bodyA.label.match(/base-bot/i)) {

                  //  pair.bodyB.sensorActive = false
                    this.body.filter((el) => el.constraint.sensor === pair.bodyB).forEach((el) => {
                        el.timer.paused = true
                    })

                }
                if (pair.bodyA.label.match(/tank_base/i)) {

                  //  pair.bodyB.sensorActive = false
                    this.bodyBot.filter((el) => el.constraint.sensor === pair.bodyB).forEach((el) => {
                        el.timer.paused = true
                    })

                }
            });


        })


        this.input.on('pointerdown', (pointer) => {

            let worldXY = pointer.positionToCamera(this.cam);

                this.tankName = this.activeObject
                this.body.filter((f) =>f.constraint.corpus.body.health > 1).forEach((el) => {
                    if(this.matter.containsPoint(el.constraint.corpus,worldXY.x,worldXY.y)){
                      //  console.log(el)
                      this.activeObject = el.constraint.corpus
                        this.activeObjectHead = el.constraint.head
                        el.constraint.corpus.body.highlight = true;
                       // console.log(el)
                    }else {
                        el.constraint.corpus.body.highlight = false;
                    }


                })

            this.body.forEach((el) => {
                if (el.constraint.corpus.body.label === this.activeObject) {
                    //
                }
            })
        });

        this.time.addEvent({
            delay: 1000,                // ms
            callback: () => {
                this.store.dispatch(seconds(this.sec += 1));
                if (this.sec >= 59) {
                    this.sec = 0;
                }
            },
            //args: [],
            callbackScope: this,
            loop: true
        });

        this.time.addEvent({
            delay: 60000,                // ms
            callback: () => {
                this.store.dispatch(minute(this.min += 1));
                if (this.min >= 59) {
                    this.min = 0;
                }
            },
            //args: [],
            callbackScope: this,
            loop: true
        });

        this.timerGameOver = this.time.addEvent({
            delay: 1000,                // ms
            callback: ()=>{

            },
            //args: [],
            callbackScope: ()=>{

            },
            loop: true,
            paused:true
        });

    }


    update(time, delta) {
        if(this.state.restart.value){

        }


        let pointer = this.input.activePointer;
        let worldXY = pointer.positionToCamera(this.cam);
        if (this.control.space.isDown) {
            if (pointer.x < this.edgeThreshold) {
                this.cam.scrollX -= this.cameraSpeed;
            }
            if (pointer.x > this.game.config.width - this.edgeThreshold) {
                this.cam.scrollX += this.cameraSpeed;
            }
            if (pointer.y > this.game.config.height - this.edgeThreshold) {
                this.cam.scrollY += this.cameraSpeed;
            }
            if (pointer.y < (this.edgeThreshold + 100)) {
                this.cam.scrollY -= this.cameraSpeed;
            }
        }

        if (this.control.up.isDown) {

            this.cam.scrollY -= this.cameraSpeed;
        }
        if (this.control.down.isDown) {
            this.cam.scrollY += this.cameraSpeed;
        }
        if (this.control.left.isDown) {
            this.cam.scrollX -= this.cameraSpeed;
        }
        if (this.control.right.isDown) {
            this.cam.scrollX += this.cameraSpeed;
        }

        if (pointer.isDown && !this.activePoint && this.activeObject) {
            this.activeObject.body.pX = worldXY.x;
            this.activeObject.body.pY = worldXY.y;
            this.pointT.setPosition(worldXY.x, worldXY.y)
            this.activeObject.body.highlight = true;
            if(!this.activeObject.body.corpusImg.match(/[0-9]/i)){
                //this.activeObject.setPosition(worldXY.x, worldXY.y)
              //  this.activeObjectHead.setPosition(worldXY.x, worldXY.y)
            }
        }
        this.pointM.setPosition(worldXY.x, worldXY.y)

        this.countBot = this.matter.world.getAllBodies().filter((el) => el.label.match(/bot_corpus/i)).length
        this.countPlayer = this.matter.world.getAllBodies().filter((el) => el.label.match(/tank_corpus/i)).length
        this.countPlayerBase = this.matter.world.getAllBodies().filter((el) => el.label.match(/tank_base/i)).length
        this.countBotBase = this.matter.world.getAllBodies().filter((el) => el.label.match(/base-bot/i)).length

        if (this.countPlayer === 0 || this.countPlayerBase === 0) {
            this.store.dispatch(none())
            this.store.dispatch(gameOverOpen({
                active: true,
                hp: this.hp,
                bot: this.bodyBot.length - this.countBot,
                title: "Поражение"
            }))
        }



        if (this.countBotBase === 0) {
            if (this.hp >= this.defaultHp) {
                this.store.dispatch(three())

            } else if (this.hp >= this.defaultHp / 2) {
                this.store.dispatch(two())

            } else if (this.hp >= this.defaultHp / 3) {
                this.store.dispatch(one())
            }
            if(this.countBotBase === 0 && this.countBot === 0){
                this.store.dispatch(three())
            }

            this.store.dispatch(gameOverOpen({
                active: true,
                hp: this.hp,
                bot: this.bodyBot.length - this.countBot,
                title: "Победа"
            }))
        }


        this.store.dispatch(count(this.countPlayer));
        this.store.dispatch(countBot(this.countBot));


        this.body.filter((name) => name.constraint.corpus.body).forEach((el, i) => {
            el.draw();
        })

        this.bodyBot.filter((name) => name.constraint.corpus.body).forEach((el, i) => {
            el.move();
        })

        this.base.liveDraw()

        this.store.dispatch(live((this.base.health / this.base.liveDefault) * 100))
        this.store.dispatch(liveBot((this.base.healthBot / this.base.liveDefault) * 100))


    }


}