import * as Phaser from "phaser";
export default class StartScene extends Phaser.Scene{
  constructor() {
    super("Start");
  }

create(){


  this.scene.start("Scene_1");

}

update(time, delta) {


}

}
