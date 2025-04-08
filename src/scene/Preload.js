import Phaser from "phaser";
export default class Preload extends Phaser.Scene{
  constructor() {
    super('Preloader');
  }


  preload() {

    this.load.image('tiles', './img/tiled/1.png');
    this.load.image('tiles_2', './img/tiled/2.png');
    this.load.tilemapTiledJSON('map', './img/tiled/location_1.json');
    this.load.tilemapTiledJSON('map2', './img/tiled/location_2.json');

    this.load.image("base-player", './img/sprites/base.png');
    this.load.image("HPBasePlayer", './img/sprites/HPBasePlayer.png');

    this.load.image("base-bot", './img/sprites/base-bot.png');

    this.load.image("HP-bot", './img/sprites/HP-bot.png');
    this.load.image("HP-player", './img/sprites/HP-player.png');

    this.load.image("Hull_01", './img/sprites/PNG/Hulls_Color_A/Hull_01.png');
    this.load.atlas('tanks', './img/sprites/tanks.png', './img/tanks.json');

    this.load.image("Gun_01", './img/sprites/PNG/Weapon_Color_A/Gun_01.png');
    this.load.image("Gun_01_A", './img/sprites/PNG/Weapon_Color_A/Gun_01_A.png');

    this.load.image("pule", './img/sprites/pule.png');
    this.load.image("point-move", './img/sprites/pointNone.png');

    this.load.image("hallway", './img/sprites/hallway.png');

    this.load.spritesheet('pule-blast', './img/sprites/pule-blast.png', {
      frameWidth: 64,
      frameHeight: 64
    });
    this.load.spritesheet('pule-departure', './img/sprites/pule-departure.png', {
      frameWidth: 64,
      frameHeight: 64
    });
    this.load.spritesheet('image-point', './img/sprites/pule-on.png', {
      frameWidth: 64,
      frameHeight: 64
    });
    this.load.spritesheet('track', './img/sprites/trak.png', {
      frameWidth: 105,
      frameHeight: 123
    });
    this.load.spritesheet('burning', './img/sprites/burning.png', {
      frameWidth: 100,
      frameHeight: 100
    });





  }

  create(){
    this.scene.start('Start');
    this.anims.create({
      key: 'runPoint',
      frames: this.anims.generateFrameNumbers('image-point', {start: 0, end: 3}),
      frameRate: 5,
      repeat: -1
    });
    this.anims.create({
      key: 'pule-blast-run',
      frames: this.anims.generateFrameNumbers('pule-blast', {start: 0, end: 8}),
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
      frames:'track',
      frameRate: 5,
      repeat: -1
    });
  }

}
