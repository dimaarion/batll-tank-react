import * as Phaser from "phaser";
import Body from "../components/Body";
import Base from "../components/Base";
import Clock from "phaser3-rex-plugins/plugins/time/clock/Clock";
import Bot from "../components/Bot";
import Action from "../components/Action";
import hangar from "../json/hangar.json"

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
    countBot = 5
    countPlayer = 5
    control = {
        left: false,
        right: false,
        up: false,
        down: false,
        space: false
    }

    base = new Base(this);
    clock
    cursorKeys
    tankName = ''
    activeObject = undefined
    edgeThreshold = 100;
    block
    cameraSpeed = 4;
    action = new Action();
    body = []


    props
    bodyBot = []

    constructor(props) {
        super("Scene_1");
        this.props = props;
        this.body = props.battle.value.map((el) => new Body(100, 500, "tank_corpus_" + el.id,el.head,el.corpus,
            this.action.getOption(el,"live"),
            this.action.getOption(el,"shield"),
            this.action.getOption(el,"attack"),
            this.action.getOption(el,"attack_speed"),
            this.action.getOption(el,"radius_attack"),
            this.action.getOption(el,"speed")
            )
        )
    }

    create() {


        this.map = this.make.tilemap({key: 'map', tileWidth: 32, tileHeight: 32});
        let tiles = this.map.addTilesetImage("location_1", "tiles", 32, 32, 0, 0);
        this.layer = this.map.createLayer("ground", tiles, 0, 0);
        this.block = this.map.createLayer("block", tiles, 0, 0);
        this.layer.setCollisionByProperty({collides: true});
        this.map.setCollisionByExclusion(-1, true);
        this.matter.world.convertTilemapLayer(this.block);
        this.matter.world.createDebugGraphic();
        this.matter.world.drawDebug = false;
        this.cam = this.cameras.main;
        this.cameras.main.zoom = 1;
        this.matter.world.setBounds(0, -100, this.map.widthInPixels, this.map.heightInPixels);
        this.cameras.main.setBounds(0, -100, this.map.widthInPixels, this.map.heightInPixels);
        this.base.setup();

        //this.cameras.main.roundPixels = true;
        this.body.forEach((el, i) => {
            el.x = (800 + i * 300)
            el.y = 200
            el.setup(this);
        })


        this.map.objects.filter((el) => el.name === "tanks")[0].objects.filter((el) => el.name === "bot").forEach((el, i) => {
         //   console.log(el)
            this.bodyBot[i] = new Bot(el.x, el.y, "bot_corpus_" + i,
                this.action.getProperties(el,"head"),
                this.action.getProperties(el,"corpus"),
                this.action.getProperties(el,"live"),
                this.action.getProperties(el,"shield"),
                this.action.getProperties(el,"attack"),
                this.action.getProperties(el,"attack_speed"),
                this.action.getProperties(el,"radius_attack"),
                this.action.getProperties(el,"speed")
            );
            this.bodyBot[i].setup(this)
        })


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

        this.matter.world.on("collisionstart", (event) => {
            function pule(scene, pair) {
                pair.bodyB.gameObject.play("pule-blast-run", true).once('animationcomplete', () => {
                    if (pair.bodyB.gameObject) {
                        pair.bodyB.gameObject.destroy()
                    }
                    scene.matter.world.remove(pair.bodyB);

                });
            }

            event.pairs.forEach((pair) => {
                if (pair.bodyA.label.match(/bot/i) && pair.bodyB.label === "pule") {
                    pule(this, pair)
                }
                if (pair.bodyA.label.match(/tank/i) && pair.bodyB.label === "pule_bot") {
                    pule(this, pair)
                }

                if (pair.bodyA.label.match(/tank_corpus/i) && pair.bodyB.label === "cursor-move") {
                    this.activePoint = true
                    this.input.on('pointerdown', (pointer) => {
                        this.activeObject = pair.bodyA.label

                        this.body.forEach((el) => {
                            if (el.constraint.corpus.body === pair.bodyA) {
                                el.constraint.corpus.body.highlight = true;
                            } else {
                                el.constraint.corpus.body.highlight = false;
                            }

                        })
                    });


                }
                if (pair.bodyB.label.match(/tank_corpus/i) && pair.bodyA.label === "cursor-move") {
                    this.activePoint = true
                    this.input.on('pointerdown', (pointer) => {
                        this.activeObject = pair.bodyB.label
                    });


                }
                if (/pule/i.test(pair.bodyB.label) && pair.bodyB.bot === 0 && pair.bodyA.label.match(/bot/i)) {

                    this.bodyBot.filter((el) => el.constraint.corpus.body === pair.bodyA).forEach((el) => {
                        el.shieldDamageBot(pair.bodyA, pair.bodyB.attack)
                        if (pair.bodyA.gameObject.body.shield === 0) {
                            el.takeDamageBot(pair.bodyA, pair.bodyB.attack)
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

            function rotateHeadPule(el, pair, name = "") {
                if (name !== "bot") {
                    if (el.constraint.corpus.body.health < 1 || pair.bodyA.healthBase < 1) {
                        el.timer.paused = true
                    } else {
                        if (pair.bodyB.health === 0 || pair.bodyA.healthBase === 0) {
                            el.timer.paused = true
                        } else {
                            el.timer.paused = false
                            el.constraint.sensor.positionBot = pair.bodyB.position
                            pair.bodyA.sensorActive = true
                            //  el.rotateHead(pair.bodyA.headObject.body, pair.bodyB.position.x, pair.bodyB.position.y, true)
                        }

                    }
                } else {
                    if (el.constraint.corpus.body.health < 1 || pair.bodyA.healthBase < 1) {
                        el.timer.paused = true
                    } else {
                        if (pair.bodyA.health === 0 || pair.bodyA.healthBase === 0) {
                            el.timer.paused = true
                        } else {
                            el.timer.paused = false
                            el.constraint.sensor.positionBot = pair.bodyA.position
                            pair.bodyB.sensorActive = true
                            //   el.rotateHead(pair.bodyB.headObject.body, pair.bodyA.position.x, pair.bodyA.position.y, true)
                        }

                    }

                }


            }

            event.pairs.forEach((pair) => {
                if (/sensor/i.test(pair.bodyA.label) && pair.bodyB.label.match(/bot_corpus/i)) {
                    this.body.filter((el) => el.constraint.sensor === pair.bodyA).forEach((el) => {
                        rotateHeadPule(el, pair, "")

                    })
                }

                if (/sensor/i.test(pair.bodyB.label) && pair.bodyA.label.match(/base-bot/i)) {
                    // pair.bodyB.sensorActive = true
                    this.body.filter((el) => el.constraint.sensor === pair.bodyB).forEach((el) => {
                        //   el.constraint.sensor.positionBot = pair.bodyA.position
                        rotateHeadPule(el, pair, "bot")
                    })
                }
                if (pair.bodyA.label.match(/base/i) || pair.bodyB.label.match(/base/i)) {
                    // pair.bodyB.sensorActive = true
                    this.bodyBot.filter((el) => el.constraint.sensor === pair.bodyB).forEach((el) => {
                        ///   el.constraint.sensor.positionBot = pair.bodyA.position
                        rotateHeadPule(el, pair, "bot")
                    })
                }

                if (/sensor/i.test(pair.bodyB.label) && pair.bodyA.label.match(/tank_corpus/i)) {
                    this.bodyBot.filter((el) => el.constraint.sensor === pair.bodyB).forEach((el) => {
                        rotateHeadPule(el, pair, "bot")
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


        })

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

                    pair.bodyB.sensorActive = false
                    this.body.filter((el) => el.constraint.sensor === pair.bodyB).forEach((el) => {
                        el.timer.paused = true
                    })

                }
                if (pair.bodyA.label.match(/base-player/i)) {

                    pair.bodyB.sensorActive = false
                    this.bodyBot.filter((el) => el.constraint.sensor === pair.bodyB).forEach((el) => {
                        el.timer.paused = true
                    })

                }
            });


        })

        this.input.on('pointerdown', (pointer) => {
            let worldXY = pointer.positionToCamera(this.cam);
            if (!this.activePoint) {
                this.tankName = this.activeObject
                this.body.filter((el) => el.constraint.corpus.body.label === this.activeObject && el.constraint.corpus.body.health > 1).forEach((el) => {
                    el.constraint.corpus.body.pX = worldXY.x;
                    el.constraint.corpus.body.pY = worldXY.y;


                })
            }
            this.body.forEach((el) => {
                if (el.constraint.corpus.body.label === this.activeObject) {
                    //  this.cam.startFollow(el.constraint.corpus, true);
                }
            })
        });


    }


    update(time, delta) {
        // this.topPanel.getSec(Math.floor(this.clock.seek(time).now / 1000) % 60,this.clock)
        //  this.topPanel.getMin(Math.floor(this.clock.seek(time).now / 60000))
        this.props.setSec(this.action.seconds(time, this.clock))
        this.props.setMin(Math.floor(this.clock.seek(time).now / 60000))
        //  console.log()
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

        if (pointer.isDown && !this.activePoint) {
            this.pointT.setPosition(worldXY.x, worldXY.y)
        }
        this.pointM.setPosition(worldXY.x, worldXY.y)

        this.countBot = this.matter.world.getAllBodies().filter((el) => el.label.match(/bot_corpus/i)).length
        this.countPlayer = this.matter.world.getAllBodies().filter((el) => el.label.match(/tank_corpus/i)).length
        this.props.setCountPlayer(this.countPlayer)
        this.props.setCountBot(this.countBot)
        //  this.topPanel.getCountBot(this.countBot);
        //  this.topPanel.getCountPlayer(this.countPlayer);

        this.body.filter((name) => name.constraint.corpus.body).forEach((el, i) => {
            el.draw();
        })

        this.bodyBot.filter((name) => name.constraint.corpus.body).forEach((el, i) => {
            el.move();
        })

        this.base.liveDraw()
        this.props.setLiveBasePlayer((this.base.health / this.base.liveDefault) * 100)
        this.props.setLiveBaseBot((this.base.healthBot / this.base.liveDefault) * 100)
        // this.topPanel.getBasePlayer((this.base.health / this.base.liveDefault) * 100)
        // this.topPanel.getBaseBot((this.base.healthBot / this.base.liveDefault) * 100)
    }

}