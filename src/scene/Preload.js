import Phaser from "phaser";
import {setLoad} from "../redux/features/Load";
import level from "../json/level.json"

export default class Preload extends Phaser.Scene {
    store

    constructor() {
        super('Preloader');
    }


    getLocation() {
        level.filter((el) => el.id < 51).forEach((el) => {
            this.load.tilemapTiledJSON(el.name, './img/tiled/location_' + el.id + '.json');
        })
    }

    preload() {
        this.load.setCORS('anonymous');

        this.load.audio("backgroundMusic","./sound/IMG-Approaching.mp3")
        this.load.audio("fair","./sound/tankovyiy-moschnyiy-vyistrel.mp3")
        this.load.audio("shell_explosion","./sound/vzryiv-razorvavshegosya-snaryada.mp3")
        this.load.audio("tank_base_explosion","./sound/razrushitelnyiy-prodoljitelnyiy-vzryiv.mp3")
        this.load.audio("fire_burning","./sound/silnoe-plamya-ognya-versiya-2-27567.mp3")
        this.load.audio("engine_tank","./sound/dvijenie-tanka-37956.mp3")
        this.load.audio("start_rocket","./sound/moschnyiy-zvuk-zapuska-raketyi.mp3")

        this.load.image('tiles', './img/tiled/1.png');

        this.getLocation()

        this.load.image("HP-bot", './img/sprites/HP-bot.png');

        this.load.image("HP-player", './img/sprites/HP-player.png');

        this.load.atlas('tanks', './img/sprites/tanks.png', './img/tanks.json');

        this.load.atlas('tanks-bot', './img/sprites/tanks.png', './img/tanks_bot.json');

        this.load.atlas('sprites', './img/sprites/sprites.png', './img/sprites.json');

        this.load.image("pule", './img/sprites/pule.png');

        this.load.image("point-move", './img/sprites/pointNone.png');

        this.load.image("rocket-static", './img/sprites/rocket-static.png');



        this.load.spritesheet('occupy', './img/sprites/occupy.png', {
            frameWidth: 128,
            frameHeight: 128
        });

        this.load.spritesheet('linck', './img/sprites/linck.png', {
            frameWidth: 64,
            frameHeight: 64
        });

        this.load.spritesheet('pule-blast', './img/sprites/pule-blast.png', {
            frameWidth: 64,
            frameHeight: 64
        });
        this.load.spritesheet('pule-departure', './img/sprites/pule-departure.png', {
            frameWidth: 64,
            frameHeight: 64
        });
        this.load.spritesheet('image-point', './img/sprites/cursor.png', {
            frameWidth: 164,
            frameHeight: 164
        });
        this.load.spritesheet('track', './img/sprites/trak.png', {
            frameWidth: 105,
            frameHeight: 123
        });
        this.load.spritesheet('burning', './img/sprites/burning.png', {
            frameWidth: 100,
            frameHeight: 100
        });

        this.load.spritesheet('rocket', './img/sprites/rocket.png', {
            frameWidth: 64,
            frameHeight: 228
        });
        this.load.spritesheet('mine', './img/sprites/mine.png', {
            frameWidth: 64,
            frameHeight: 64
        });

        this.store = this.registry.get('store');
        this.load.on('progress', function (value) {
            this.store.dispatch(setLoad(value))
        }, this);

    }

    create() {
        this.scene.start('Start');

        this.anims.create({
            key: 'occupy-run',
            frames: "occupy",
            frameRate: 0.1,
            repeat: 0
        });

        this.anims.create({
            key: 'runPoint',
            frames: this.anims.generateFrameNumbers('image-point', {start: 0, end: 3}),
            frameRate: 2,
            repeat: -1
        });
        this.anims.create({
            key: 'pule-blast-run',
            frames: this.anims.generateFrameNumbers('pule-blast', {start: 0, end: 7}),
            frameRate: 30,
            repeat: 0
        });

        this.anims.create({
            key: 'burning',
            frames: this.anims.generateFrameNumbers('burning', {start: 0, end: 9}),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'pule-departure-run',
            frames: this.anims.generateFrameNumbers('pule-departure', {start: 0, end: 3}),
            frameRate: 50,
            repeat: 0
        });

        this.anims.create({
            key: 'run-track',
            frames: 'track',
            frameRate: 5,
            repeat: -1
        });

        this.anims.create({
            key: 'rocket-run',
            frames: 'rocket',
            frameRate: 5,
            repeat: -1
        });

        this.anims.create({
            key: 'mine-run',
            frames: 'mine',
            frameRate: 5,
            repeat: 0
        });

        this.anims.create({
            key: 'linck-run',
            frames: 'linck',
            frameRate: 5,
            repeat: -1
        });
    }

}
