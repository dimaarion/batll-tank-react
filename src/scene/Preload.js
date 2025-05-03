import Phaser from "phaser";
import {setLoad} from "../redux/features/Load";
import level from "../json/level.json"

export default class Preload extends Phaser.Scene {
    store

    constructor() {
        super('Preloader');
    }


    getLocation() {
        level.filter((el) => el.id < 28).forEach((el) => {
            this.load.tilemapTiledJSON(el.name, 'https://game.fk-i-s.ru/script/location_' + el.id + '-json.php');
        })
    }

    preload() {
        this.load.setCORS('anonymous');


        this.load.image('tiles', 'https://game.fk-i-s.ru/script/tiles.php');

        this.getLocation()

        this.load.image("base-player", 'https://game.fk-i-s.ru/script/base.php');

        this.load.image("HPBasePlayer", 'https://game.fk-i-s.ru/script/HPBasePlayer.php');

        this.load.image("base-bot", 'https://game.fk-i-s.ru/script/base-bot.php');

        this.load.image("HP-bot", 'https://game.fk-i-s.ru/script/HP-bot.php');

        this.load.image("HP-player", 'https://game.fk-i-s.ru/script/HP-player.php');

        this.load.atlas('tanks', 'https://game.fk-i-s.ru/script/tanks-img.php', 'https://game.fk-i-s.ru/script/tanks-json.php');

        this.load.atlas('tanks-bot', 'https://game.fk-i-s.ru/script/tanks-img.php', 'https://game.fk-i-s.ru/script/tanks_bot-json.php');

        this.load.atlas('sprites', 'https://game.fk-i-s.ru/script/sprites-img.php', 'https://game.fk-i-s.ru/script/sprites-json.php');

        this.load.image("pule", 'https://game.fk-i-s.ru/script/pule.php');

        this.load.image("point-move", 'https://game.fk-i-s.ru/script/pointNone.php');

        this.load.image("hallway", 'https://game.fk-i-s.ru/script/hallway.php');

        this.load.image("rocket-static", 'https://game.fk-i-s.ru/script/rocket-static.php');

     //   this.load.image("mpb_1", 'https://game.fk-i-s.ru/script/mpb_1.php');

        this.load.spritesheet('occupy', 'https://game.fk-i-s.ru/script/occupy.php', {
            frameWidth: 128,
            frameHeight: 128
        });

        this.load.spritesheet('linck', 'https://game.fk-i-s.ru/script/linck.php', {
            frameWidth: 64,
            frameHeight: 64
        });

        this.load.spritesheet('pule-blast', 'https://game.fk-i-s.ru/script/pule-blast.php', {
            frameWidth: 64,
            frameHeight: 64
        });
        this.load.spritesheet('pule-departure', 'https://game.fk-i-s.ru/script/pule-departure.php', {
            frameWidth: 64,
            frameHeight: 64
        });
        this.load.spritesheet('image-point', 'https://game.fk-i-s.ru/script/cursor.php', {
            frameWidth: 64,
            frameHeight: 64
        });
        this.load.spritesheet('track', 'https://game.fk-i-s.ru/script/trak.php', {
            frameWidth: 105,
            frameHeight: 123
        });
        this.load.spritesheet('burning', 'https://game.fk-i-s.ru/script/burning.php', {
            frameWidth: 100,
            frameHeight: 100
        });

        this.load.spritesheet('rocket', 'https://game.fk-i-s.ru/script/rocket.php', {
            frameWidth: 64,
            frameHeight: 228
        });
        this.load.spritesheet('mine', 'https://game.fk-i-s.ru/script/mine.php', {
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
            frameRate: 5,
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
