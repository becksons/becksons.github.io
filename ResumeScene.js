// ResumeScene.js
/** 
 *   AFTER PLAYER GOES THROUGH INTRO SCENE AND STARTS GAME
 * ----------------------------------------------------------
 * Pipe appears -> (Player says dialgoe (TODO))-> Goes throuh pipe to new world ------------------------
 * Goal 1: Find education piece of my resume first
 * 
 * 
*/
import Player from './Player.js';

export default class ResumeScene extends Phaser.Scene {
  constructor() {
    super({ key: 'ResumeScene' });
  }
  
  create() {
    const { width, height } = this.sys.game.canvas;

     
    this.cameras.main.setBackgroundColor('#6A5ACD');

    this.ground = this.add.tileSprite(0, height - 256, 8000, 256, 'stone-ground').setOrigin(0, 0);
    this.physics.add.existing(this.ground, true);
    this.physics.world.setBounds(0, 0, 8000, height);
    this.cameras.main.setBounds(0, 0, 8000, height);

    this.player = new Player(this, 100, height - 100, 'default');
    this.player.setCollideWorldBounds(true);
    this.physics.add.collider(this.player, this.ground);
    this.cameras.main.startFollow(this.player, true, 0.05, 0.05);

    this.pipe = this.physics.add.sprite(3000, height - 256 - 64, 'pipe');
    this.pipe.setImmovable(true);
    this.pipe.body.allowGravity = false;
    this.physics.add.overlap(this.player, this.pipe, this.handlePipe, null, this);

    this.cursors = this.input.keyboard.createCursorKeys();
  }
  
  update() {
    this.player.update();
  }
  
  handlePipe(player, pipe) {
    if (this.cursors.down.isDown) {
      player.body.enable = false;
      this.tweens.add({
        targets: player,
        y: pipe.y + pipe.height / 2,
        duration: 1000,
        ease: 'Linear',
        onComplete: () => {
          console.log('Player entered the pipe in ResumeScene!');
          this.scene.start('NewWorldScene');
        }
      });
    }
  }
}
