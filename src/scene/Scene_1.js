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
import {increment} from "../redux/features/Money";
import Walls from "../components/Walls";
import getHangar from "../json/hangar.json"
import getHangarBot from "../json/hangarBot.json"
import {updateQuest} from "../redux/features/LevelCount";
import {setStar} from "../redux/features/Level";
import Mine from "../components/Mine";
import Vehicle from "../components/Vehicle";

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
    defaultCountPlayer = 0
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
    cameraSpeed = 10;
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
    mine = new Mine(this)

    vehicleBot = []
    scout = false
    day = true


    constructor() {
        super("Scene_1");
    }

    create() {
        this.store = this.registry.get('store'); // Достаём Redux store
        this.state = this.store.getState();


        this.map = this.make.tilemap({key: this.state.levelCount.value.name, tileWidth: 32, tileHeight: 32});
        let tiles = this.map.addTilesetImage("level_1", this.state.levelCount.value.tiles, 32, 32, 0, 0);
        this.layer = this.map.createLayer("ground", tiles, 0, 0);
        let block = this.map.createLayer("block", tiles, 0, 0)
        let tree = this.map.createLayer("tree", tiles, 0, 0).setDepth(100)
        this.layer.setCollisionByProperty({collides: true});
        this.map.setCollisionByExclusion(-1, true);
        this.matter.world.createDebugGraphic();
        this.matter.world.drawDebug = false;
        this.cam = this.cameras.main;

        if(!this.day){
            this.layer.setPipeline('Light2D');
            block.setPipeline('Light2D');
            tree.setPipeline('Light2D');
        }


        this.matter.world.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);
        this.cameras.main.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);
        if (this.sys.game.device.os.android) {
            this.cameras.main.setZoom(0.5);
        } else {
            this.cameras.main.setZoom(0.8);
        }

        this.walls.rect("walls")
        this.walls.circle("walls-circle")

       // this.lights.enable().setAmbientColor(0x111111);


        this.base.level = this.state.levelCount.value.id
        this.base.setup();
        this.hallway.setup();
        this.mine.setup();




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
                    if (this.scene.isActive('Scene_1')) {
                        this.scene.pause();
                    }

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

        this.map.objects.filter((el) => el.name === "vehicle")[0]?.objects.filter((el) => el.name === "vehicle").forEach((el, i) => {
            this.vehicleBot[i] = new Vehicle(el.x,el.y,"bot_corpus_" + i,"",el.type,5,5,0,0,0,4);
            if(this.state.levelCount.value.id === 5){
                this.vehicleBot[i].move = [{x: 4400, y: 3050},{x: 1800, y: 2900},{x: 4700, y: 2900},{x: 4400, y: 300}]
                this.vehicleBot[i].delay = 15000;
            }
            this.vehicleBot[i].createVehicle(this);


        })


        this.map.objects.filter((el) => el.name === "tanks")[0].objects.filter((el) => el.name === "bot").forEach((el, i) => {
            let b = getHangarBot.filter((f) => f.name === el.type)[0];
            this.bodyBot[i] = new Bot(el.x, el.y, "bot_corpus_" + i,
                b.head,
                b.corpus,
                this.action.getOption(b, "live") + this.state.levelCount.value.id,
                this.action.getOption(b, "shield") + this.state.levelCount.value.id,
                this.action.getOption(b, "attack") + this.state.levelCount.value.id,
                this.action.getOption(b, "attack_speed") + this.state.levelCount.value.id,
                this.action.getOption(b, "radius_attack") + this.state.levelCount.value.id,
                this.action.getOption(b, "speed") + this.state.levelCount.value.id
            );
            this.bodyBot[i].hp = b.hpRemove * this.state.levelCount.value.id;
            this.bodyBot[i].level = this.state.levelCount.value.id;
            this.bodyBot[i].playerBasePosition = {x: this.base.bodyPlayer[0].x, y: this.base.bodyPlayer[0].y}
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

            function rocket(scene, pair) {
                pair.bodyB.gameObject.play("pule-blast-run", true).once('animationcomplete', () => {
                    if (pair.bodyB.gameObject) {
                        pair.bodyB.gameObject.destroy()
                    }
                    scene.matter.world.remove(pair.bodyB);

                });
            }

            function rocketA(scene, pair) {
                pair.bodyA.gameObject.play("pule-blast-run", true).once('animationcomplete', () => {
                    if (pair.bodyA.gameObject) {
                        pair.bodyA.gameObject.destroy()
                    }
                    scene.matter.world.remove(pair.bodyA);

                });
            }

            event.pairs.forEach((pair) => {
                this.mine.collegeStart(pair)

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


                if (pair.bodyA.label.match(/bot/i) && pair.bodyB.label === "rocket") {

                    rocket(this, pair)
                }
                if (pair.bodyA.label.match(/tank/i) && pair.bodyB.label === "rocket_bot") {
                    rocket(this, pair)
                }

                if (pair.bodyB.label.match(/bot/i) && pair.bodyA.label === "rocket") {

                    rocketA(this, pair)
                }
                if (pair.bodyB.label.match(/tank/i) && pair.bodyA.label === "rocket_bot") {
                    rocketA(this, pair)
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
                if ((/pule/i.test(pair.bodyB.label) || /rocket/i.test(pair.bodyB.label)) && pair.bodyB.bot === 0 && pair.bodyA.label.match(/bot/i)) {

                    this.attackBotA(this.bodyBot,pair)
                    this.attackBotA(this.vehicleBot,pair)
                    this.base.takeDamageBot(pair.bodyA, pair.bodyB.attack)
                }

                if ((/pule/i.test(pair.bodyA.label) || /rocket/i.test(pair.bodyA.label)) && pair.bodyA.bot === 0 && pair.bodyB.label.match(/bot/i)) {

                   // атака бота
                    this.attackBotB(this.bodyBot,pair)
                    this.attackBotB(this.vehicleBot,pair)


                    this.base.takeDamageBot(pair.bodyA, pair.bodyB.attack)
                }
                if ((/pule/i.test(pair.bodyB.label) || /rocket/i.test(pair.bodyB.label)) && pair.bodyB.bot === 1 && pair.bodyA.label.match(/tank/i)) {
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
                this.bodyBot.forEach((el)=>{
                    el.connect(pair)
                    this.scout = el.scout
                })


                if (/sensor/i.test(pair.bodyA.label) && pair.bodyB.label.match(/bot_corpus/i)) {
                    this.body.filter((el) => el.constraint.sensor === pair.bodyA).forEach((el) => {
                        if (pair.bodyB.health === 0 || el.constraint.corpus.body.health === 0) {
                            el.timer.paused = true
                            el.timerRocket.paused = true
                        } else {
                            el.constraint.sensor.positionBot = pair.bodyB.position
                            el.constraint.sensor.sensorActive = true
                            el.timer.paused = false
                            el.timerRocket.paused = false
                        }

                    })

                }

                if (/sensor/i.test(pair.bodyB.label) && pair.bodyA.label.match(/base-bot/i)) {
                    this.body.filter((el) => el.constraint.sensor === pair.bodyB).forEach((el) => {
                        if (el.constraint.corpus.body.health === 0) {
                            el.timer.paused = true
                            el.timerRocket.paused = true
                        }
                        if (pair.bodyA.healthBase < 1) {
                            el.timer.paused = true
                            el.timerRocket.paused = true
                            this.hp += pair.bodyA.hpBot
                            this.store.dispatch(increment(this.state.levelCount.value.id * 100))
                            this.store.dispatch(setHp({id: el.id, hp: this.state.levelCount.value.id * 100}))
                        } else {
                            el.constraint.sensor.positionBot = pair.bodyA.position
                            el.constraint.sensor.sensorActive = true
                            el.timer.paused = false
                            el.timerRocket.paused = false
                        }

                    })
                }
                if (pair.bodyA.label.match(/tank_base/i) || pair.bodyB.label.match(/bot/i)) {
                    this.bodyBot.filter((el) => el.constraint.sensor === pair.bodyB).forEach((el) => {
                        if (pair.bodyA.healthBase === 0) {
                            el.timer.paused = true
                            el.timerRocket.paused = true
                        } else {
                            el.constraint.sensor.positionBot = pair.bodyA.position
                            el.constraint.sensor.sensorActive = true
                            el.timer.paused = false
                            el.timerRocket.paused = false
                        }
                    })
                }

                if (/sensor/i.test(pair.bodyB.label) && pair.bodyA.label.match(/tank_corpus/i)) {
                    this.bodyBot.filter((el) => el.constraint.sensor === pair.bodyB).forEach((el) => {
                        if (pair.bodyA.health === 0 || el.constraint.corpus.body.health === 0) {
                            el.timer.paused = true
                            el.timerRocket.paused = true
                        } else {
                            el.constraint.sensor.positionBot = pair.bodyA.position
                            el.constraint.sensor.sensorActive = true
                            el.timer.paused = false
                            el.timerRocket.paused = false
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
                        el.timerRocket.paused = true
                        if (el.constraint.corpus.body && el.constraint.corpus.body.health > 1) {
                            el.constraint.sensor.positionBot = pair.bodyB.position
                            if (pair.bodyB.health !== 0) {

                                //  el.rotateHead(pair.bodyA.headObject.body, pair.bodyB.position.x, pair.bodyB.position.y, false)
                            }
                        }

                    })

                }

                if (/sensor/i.test(pair.bodyB.label) && pair.bodyA.label.match(/tank/i)) {
                    pair.bodyB.sensorActive = false
                    this.bodyBot.filter((el) => el.constraint.sensor === pair.bodyB).forEach((el) => {
                        el.timer.paused = true
                        el.timerRocket.paused = true
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
                        el.timerRocket.paused = true
                    })

                }
                if (pair.bodyA.label.match(/tank_base/i)) {

                    //  pair.bodyB.sensorActive = false
                    this.bodyBot.filter((el) => el.constraint.sensor === pair.bodyB).forEach((el) => {
                        el.timer.paused = true
                        el.timerRocket.paused = true
                    })

                }
            });


        })


        this.input.on('pointerdown', (pointer) => {

            let worldXY = pointer.positionToCamera(this.cam);

            this.tankName = this.activeObject
            this.body.filter((f) => f.constraint.corpus.body.health > 1).forEach((el) => {
                if (this.matter.containsPoint(el.constraint.corpus, worldXY.x, worldXY.y)) {
                    //  console.log(el)
                    this.activeObject = el.constraint.corpus
                    this.activeObjectHead = el.constraint.head
                    el.constraint.corpus.body.highlight = true;
                    // console.log(el)
                } else {
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

        this.defaultCountPlayer = this.state.battle.value.length


    }


    update(time, delta) {
        if (this.state.restart.value) {

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
            if (this.activeObject.body.health > 0) {
                this.activeObject.body.pX = worldXY.x;
                this.activeObject.body.pY = worldXY.y;

            }

            this.pointT.setPosition(worldXY.x, worldXY.y)
            this.activeObject.body.highlight = true;
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


        if (this.countBot === 0) {
            this.store.dispatch(updateQuest({tanks: true, base: false, completed: false}))
            this.store.dispatch(one())
            this.store.dispatch(setStar({id: this.state.levelCount.value.id, star: 1}))
        }
        if (this.countBotBase === 0) {
            this.store.dispatch(updateQuest({tanks: false, base: true, completed: false}))
            this.store.dispatch(one())
            this.store.dispatch(setStar({id: this.state.levelCount.value.id, star: 1}))
            this.store.dispatch(gameOverOpen({
                active: true,
                hp: this.hp,
                bot: this.bodyBot.length - this.countBot,
                title: "Победа"
            }))
        }
        if (this.countBotBase === 0 && this.countBot === 0) {
            this.store.dispatch(updateQuest({tanks: true, base: true, completed: false}))
            this.store.dispatch(two())
            this.store.dispatch(setStar({id: this.state.levelCount.value.id, star: 2}))
            this.store.dispatch(gameOverOpen({
                active: true,
                hp: this.hp,
                bot: this.bodyBot.length - this.countBot,
                title: "Победа"
            }))
        }
        if (this.state.levelCount.value.id === 1 && this.countBotBase === 0 && this.countBot === 0) {
            this.victory()

        } else if (this.state.levelCount.value.id === 2 && this.countBotBase === 0 && this.countBot === 0) {
            this.victory()

        } else if (this.state.levelCount.value.id === 3 && this.countPlayer === this.state.battle.value.length && this.countBotBase === 0 && this.countBot === 0) {
            this.victory()

        } else if (this.state.levelCount.value.id === 4 && this.countBotBase === 0 && this.countBot === 0 && this.matter.world.getAllBodies().filter((el) => el.label.match(/Hull_art_1/i)).length === 0) {
            this.victory()

        }else if (this.state.levelCount.value.id === 5 && this.countBotBase === 0 && this.countBot === 0 && this.matter.world.getAllBodies().filter((el) => el.label.match(/mpb_1/i)).length === 0) {
            this.victory()

        }else if (this.state.levelCount.value.id === 6 && this.countBotBase === 0 && this.countBot === 0 && !this.scout) {
            this.victory()

        }




        this.store.dispatch(count(this.countPlayer));
        this.store.dispatch(countBot(this.countBot));


        this.body.filter((name) => name.constraint.corpus.body).forEach((el, i) => {
            el.draw();
        })

        this.bodyBot.filter((name) => name.constraint.corpus.body).forEach((el, i) => {
            el.move();
        })

        this.vehicleBot.filter((name) => name.constraint.corpus.body).forEach((el, i) => {
            el.drawVehicle();
        })

        this.base.liveDraw()

        this.store.dispatch(live((this.base.health / this.base.liveDefault) * 100))
        this.store.dispatch(liveBot((this.base.healthBot / this.base.liveDefault) * 100))


    }

    victory() {
        this.store.dispatch(updateQuest({tanks: true, base: true, completed: true}))
        this.store.dispatch(three())
        this.store.dispatch(setStar({id: this.state.levelCount.value.id, star: 3}))
        this.store.dispatch(gameOverOpen({
            active: true,
            hp: this.hp,
            bot: this.bodyBot.length - this.countBot,
            title: "Победа"
        }))
    }

    attackBotB(arr,pair){
        arr.filter((el) => el.constraint.corpus.body === pair.bodyB).forEach((el) => {
            el.shieldDamageBot(pair.bodyB, pair.bodyA.attack)
            if (pair.bodyB.gameObject.body.shield === 0) {
                el.takeDamageBot(pair.bodyB, pair.bodyA.attack)
            }
            if (el.constraint.corpus.body.health === 0) {
                this.hp += el.hp
                this.store.dispatch(increment(el.level * 50))
                this.store.dispatch(setHp({id: pair.bodyB.bodyId, hp: el.hp}))
            }

        })
    }
    attackBotA(arr,pair){
        arr.filter((el) => el.constraint.corpus.body === pair.bodyA).forEach((el) => {
            el.shieldDamageBot(pair.bodyA, pair.bodyB.attack)
            if (pair.bodyA.gameObject.body.shield === 0) {
                el.takeDamageBot(pair.bodyA, pair.bodyB.attack)
            }
            if (el.constraint.corpus.body.health === 0) {
                this.hp += el.hp
                this.store.dispatch(increment(el.level * 50))
                this.store.dispatch(setHp({id: pair.bodyB.bodyId, hp: el.hp}))
            }

        })
    }


    updateMap ()
    {
        this.activeObject.setPipeline('Light2D');
        const origin = this.map.getTileAtWorldXY(this.activeObject.body.position.x, this.activeObject.body.position.y);

        this.map.forEachTile(tile =>
        {
            const dist = Phaser.Math.Distance.Snake(
                origin.x,
                origin.y,
                tile.x,
                tile.y
            );

            tile.setAlpha(1 - 0.1 * dist);
        });
    }



}