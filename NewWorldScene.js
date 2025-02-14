// NewWorldScene.js
/*
-----------------------------------------------------------
                        PLAYER FILE
-----------------------------------------------------------


*/ 
import Player from './Player.js';

export default class NewWorldScene extends Phaser.Scene {
  constructor() {
    super({ key: 'NewWorldScene' });
  }
  
  create() {
    const { width, height } = this.sys.game.canvas;

     this.cameras.main.setBackgroundColor('#ae9dba');


     this.ground = this.add.tileSprite(0, height - 256, 8000, 256, 'stone-ground')
      .setOrigin(0, 0)
      .setDepth(-1);
    this.physics.add.existing(this.ground, true);

    this.physics.world.setBounds(0, 0, 8000, height);
    this.cameras.main.setBounds(0, 0, 8000, height);

     this.player = new Player(this, 100, height - 200, 'default');
    this.player.setCollideWorldBounds(true);
    this.physics.add.collider(this.player, this.ground);
    this.cameras.main.startFollow(this.player, true, 0.05, 0.05);

    this.cursors = this.input.keyboard.createCursorKeys();
  }
  
  update() {
    this.player.update();
  }
}
