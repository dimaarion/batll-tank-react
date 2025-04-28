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
import getHangarBot from "../json/hangarBot.json"
import {updateQuest} from "../redux/features/LevelCount";
import {setStar} from "../redux/features/Level";
import Mine from "../components/Mine";
import Vehicle from "../components/Vehicle";
import Occupy from "../components/Occupy";
import AllyTank from "../components/AllyTank";
import quest from "phaser3-rex-plugins/plugins/quest";

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
    action = new Action(this);
    body = []
    sec = 0
    min = 0
    bodyBot = []
    state = {}
    store = {}
    killedBot = 0;
    killedPlayer = 0;
    timerGameOver;
    walls = new Walls(this);
    mine = new Mine(this);
    occupy = new Occupy(this);
    vehicleBot = []

    allyTank = []
    scout = false
    day = true

    quest = false


    constructor() {
        super("Scene_1");
    }

    create() {
        this.store = this.registry.get('store'); // Достаём Redux store
        this.state = this.store.getState();
        if (this.state.levelCount.value.id === 7 || this.state.levelCount.value.id === 21 || this.state.levelCount.value.id === 23) {
            this.day = false
        }

        this.map = this.make.tilemap({key: this.state.levelCount.value.name, tileWidth: 32, tileHeight: 32});
        let tiles = this.map.addTilesetImage("level_1", this.state.levelCount.value.tiles, 32, 32, 0, 0);
        this.layer = this.map.createLayer("ground", tiles, 0, 0);
        let block = this.map.createLayer("block", tiles, 0, 0)
        let tree = this.map.createLayer("tree", tiles, 0, 0).setDepth(100)
        this.layer.setCollisionByProperty({collides: true});
        this.map.setCollisionByExclusion(-1, true);
        this.matter.world.createDebugGraphic();
        this.matter.world.drawDebug = true;
        this.cam = this.cameras.main;

        if (!this.day) {
            this.lights.enable().setAmbientColor(0x111111);
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

        this.hallway.setup();
        this.mine.day = this.day;
        this.mine.setup();
        this.occupy.day = this.day;
        this.occupy.create();
        this.walls.rect("walls")
        this.walls.circle("walls-circle")
        this.walls.createCzech()
        // this.lights.enable().setAmbientColor(0x111111);


        this.base.level = this.state.levelCount.value.id
        this.base.day = this.day
        this.base.setup()





        this.body = this.state.battle.value.map((el) => {
                let b = new Body(this.base.player[0].body.position.x, this.base.player[0].body.position.y, "tank_corpus_" + el.id, el.head, el.corpus,
                    this.action.getOption(el, "live"),
                    this.action.getOption(el, "shield"),
                    this.action.getOption(el, "attack"),
                    this.action.getOption(el, "attack_speed"),
                    this.action.getOption(el, "radius_attack"),
                    this.action.getOption(el, "speed")
                )
                b.id = el.id
                b.hp = el.hp
                b.day = this.day

                return b;
            }
        )

        this.cameras.main.setScroll(this.base.player[0].body.position.x - window.innerWidth / 2, this.base.player[0].body.position.y - window.innerHeight / 2);


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
            el.x = (this.base.player[0].body.position.x + i * 120)
            el.y = (this.base.player[0].body.position.y + this.base.player[0].body.height * 2)
            el.setup(this);
        })



        this.map.objects.filter((el) => el.name === "vehicle")[0]?.objects.filter((el) => el.name === "vehicle").forEach((el, i) => {
            this.vehicleBot[i] = new Vehicle(el.x + el.width / 2, el.y + el.height / 2, "bot_corpus_" + i, "", el.type, 5, 5, 0, 0, 0, 4);
            this.vehicleBot[i].index = i;
            this.vehicleBot[i].day = this.day;
            this.vehicleBot[i].createVehicle(this);
        })



        const level = this.state.levelCount.value.id;
        const scalingFactor = 1 + level * 0.05;

        this.map.objects.filter((el) => el.name === "tanks")[0].objects.filter((el) => el.name === "bot").forEach((el, i) => {
            let b = getHangarBot.filter((f) => f.name === el.type)[0];
            this.bodyBot[i] = new Bot(el.x + el.width / 2, el.y + el.height / 2, "bot_corpus_" + i,
                b.head,
                b.corpus,
                this.scaleStat(this.action.getOption(b, "live"), level, "live"),
                this.scaleStat(this.action.getOption(b, "shield"), level, "shield"),
                this.scaleStat(this.action.getOption(b, "attack"), level, "attack"),
                this.scaleStat(this.action.getOption(b, "attack_speed"), level, "attack_speed"),
                this.scaleStat(this.action.getOption(b, "radius_attack"), level, "radius_attack"),
                this.scaleStat(this.action.getOption(b, "speed"), level, "speed")
            );

            this.bodyBot[i].hp = b.hpRemove * this.state.levelCount.value.id;
            this.bodyBot[i].level = this.state.levelCount.value.id;
            this.bodyBot[i].playerBasePosition = {
                x: this.base.player[0].body.position.x,
                y: this.base.player[0].body.position.y
            }
            this.bodyBot[i].day = this.day;
            this.bodyBot[i].setup(this);
            this.arrHp[i] = this.bodyBot[i].hp;

        })
        this.map.objects.filter((el) => el.name === "tanks")[0]?.objects.filter((el) => el.name === "player_tank").forEach((el, i) => {
            this.allyTank[i] = new AllyTank(el.x, el.y, "tank_corpus_apply", "Gun_01", "Hull_01", 10, 10, 5, 10, 20, 3)
            this.allyTank[i].createTank(this);
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

                if (pair.bodyA.label.match(/bot/i) && pair.bodyB.label === "pule") {
                    pule(this, pair)
                }
                if (pair.bodyA.label.match(/tank/i) && pair.bodyB.label === "pule_bot") {
                    pule(this, pair)
                }

                if (pair.bodyB.label.match(/bot/i) && pair.bodyA.label === "pule") {
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

                    this.attackBotA(this.bodyBot, pair)
                    this.attackBotA(this.vehicleBot, pair)
                    this.base.takeDamageBot(pair.bodyA, pair.bodyB.attack)
                }

                if ((/pule/i.test(pair.bodyA.label) || /rocket/i.test(pair.bodyA.label)) && pair.bodyA.bot === 0 && pair.bodyB.label.match(/bot/i)) {

                    // атака бота
                    this.attackBotB(this.bodyBot, pair)
                    this.attackBotB(this.vehicleBot, pair)


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
                this.bodyBot.forEach((el) => {
                    el.connect(pair)
                    this.scout = el.scout
                })

                this.occupy.collegeActive(pair)
                this.allyTank.forEach((el) => {
                    el.colligeActive(pair)
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
                            this.store.dispatch(increment(this.getBaseDestructionXP(this.state.levelCount.value.id, 1.0, false)))
                            this.store.dispatch(setHp({
                                id: el.id,
                                hp: this.getBaseDestructionXP(this.state.levelCount.value.id, 1.0, false)
                            }))
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
                this.occupy.collegeEnd(pair)


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


        this.victory(1, this.isObjectRemove(/bot_corpus/i))
        this.victory(2, this.isObjectRemove(/bot_corpus/i))
        this.victory(3, this.countPlayer === this.defaultCountPlayer)
        this.victory(4, this.isObjectRemove(/Hull_art_1/i))
        this.victory(5, this.isObjectRemove(/mpb_1/i))
        this.victory(6, !this.scout)
        this.victory(7, this.isObjectRemove(/bot_corpus/i))
        this.victory(8, this.occupy.quest)
        this.victory(9, this.isObjectRemove(/connection_baseBot/i))
        this.victory(10, this.occupy.quest)
        this.victory(11, this.quest)
        this.victory(12, this.isObjectRemove(/Hull_art_2/i))
        this.victory(13, this.isObjectRemove(/czech/i))
        this.victory(14, this.quest)
        this.victory(15, this.quest)
        this.victory(16, this.isObjectRemove(/mpb_1/i))
        this.victory(17, true)
        this.victory(18, this.isObjectRemove(/rocket/i))
        this.victory(19, this.isObjectRemove(/tower/i))
        this.victory(20, !this.isObjectRemove(/tank_base/i))
        this.victory(21, this.isObjectRemove(/mpb_1/i))
        this.victory(22, this.quest)
        this.victory(23, this.isObjectRemove(/fuel_depot/i))
        this.victory(24, this.isObjectRemove(/czech/i))

        this.store.dispatch(count(this.countPlayer));
        this.store.dispatch(countBot(this.countBot));


        this.body.filter((name) => name.constraint.corpus.body).forEach((el, i) => {
            el.draw();
        })

        this.bodyBot.filter((name) => name.constraint.corpus.body).forEach((el, i) => {
            el.move();
        })
        this.allyTank.filter((name) => name.constraint.corpus.body).forEach((el, i) => {
            el.drawAlly();
        })
        this.vehicleBot.filter((name) => name.constraint.corpus.body).forEach((el, i) => {
            el.drawVehicle();
        })

        this.base.liveDraw()

        this.store.dispatch(live((this.base.health / this.base.liveDefault) * 100))
        this.store.dispatch(liveBot((this.base.healthBot / this.base.liveDefault) * 100))


    }


    victory(level = 1, quest_three = false) {
        this.defeat(level, quest_three)
        if (level === this.state.levelCount.value.id && this.isObjectRemove(/base-bot/i) && this.isObjectRemove(/bot_corpus/i) && quest_three) {
            this.store.dispatch(updateQuest({tanks: true, base: true, completed: true}))
            this.store.dispatch(three())
            this.store.dispatch(setStar({id: this.state.levelCount.value.id, star: 3}))
            this.store.dispatch(gameOverOpen({
                active: true,
                hp: this.hp,
                bot: this.bodyBot.length - this.countBot,
                title: "Победа"
            }))
        } else if (level === this.state.levelCount.value.id && this.isObjectRemove(/base-bot/i) && this.isObjectRemove(/bot_corpus/i)) {
            this.store.dispatch(updateQuest({tanks: true, base: true, completed: false}))
            this.store.dispatch(two())
            this.store.dispatch(setStar({id: this.state.levelCount.value.id, star: 2}))
            this.store.dispatch(gameOverOpen({
                active: true,
                hp: this.hp,
                bot: this.bodyBot.length - this.countBot,
                title: "Победа"
            }))
        } else if (level === this.state.levelCount.value.id && this.isObjectRemove(/base-bot/i) && quest_three) {
            this.store.dispatch(updateQuest({tanks: false, base: true, completed: true}))
            this.store.dispatch(two())
            this.store.dispatch(setStar({id: this.state.levelCount.value.id, star: 2}))
            this.store.dispatch(gameOverOpen({
                active: true,
                hp: this.hp,
                bot: this.bodyBot.length - this.countBot,
                title: "Победа"
            }))
        } else if (level === this.state.levelCount.value.id && this.isObjectRemove(/bot_corpus/i)) {
            this.store.dispatch(updateQuest({tanks: true, base: false, completed: false}))
            this.store.dispatch(one())
            this.store.dispatch(setStar({id: this.state.levelCount.value.id, star: 1}))
        } else if (level === this.state.levelCount.value.id && this.isObjectRemove(/base-bot/i)) {
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


    }

    defeat(level = 1, quest = false) {
        if (level === this.state.levelCount.value.id && this.countPlayer === 0 || this.countPlayerBase === 0) {
            this.store.dispatch(updateQuest({tanks: false, base: false, completed: quest}))
            this.store.dispatch(none())
            this.store.dispatch(gameOverOpen({
                active: true,
                hp: this.hp,
                bot: this.bodyBot.length - this.countBot,
                title: "Поражение"
            }))
        }
    }

    attackBotB(arr, pair) {
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

    attackBotA(arr, pair) {
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


    scaleStat(baseValue, level, type) {
        switch (type) {
            case "live":           // здоровье
            case "shield":         // щит
                return Math.floor(baseValue * (1 + level * 0.04)); // +8% за уровень

            case "attack":         // урон
                return Math.floor(baseValue * (1 + level * 0.03)); // +6% за уровень

            case "attack_speed":   // скорость атаки (чем меньше, тем быстрее)
                return Math.max(0.2, baseValue - level * 0.01); // уменьшается (до минимума 0.2)

            case "radius_attack":  // радиус атаки
                return baseValue + (level % 5 === 0 ? 1 : 0); // растёт на 1 каждые 5 уровней

            case "speed":          // скорость движения
                return baseValue + (level >= 10 ? 0.01 * level : 0); // небольшой прирост с 10-го уровня

            default:
                return baseValue;
        }
    }


    getBaseDestructionXP(baseLevel, difficultyMultiplier = 1.0, isMainHQ = false) {
        const baseXP = 250; // Базовое количество опыта за стандартную базу
        const hqBonus = isMainHQ ? 2 : 1; // В 2 раза больше за главный штаб

        return Math.floor(baseXP * (1 + baseLevel * 0.1) * difficultyMultiplier * hqBonus);
    }

    isObjectRemove(name) {
        return this.matter.world.getAllBodies().filter((el) => el.label.match(name)).length === 0
    }

}