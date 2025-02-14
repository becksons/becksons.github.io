// Player.js
export default class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture = 'default') {
      super(scene, x, y, texture);
  
    
      scene.add.existing(this);
      scene.physics.add.existing(this);
      this.setCollideWorldBounds(true);
  
    
      this.cursors = scene.input.keyboard.createCursorKeys();
   
      this.speed = 400;
      this.jumpSpeed = 400;
    }
  
    update() {
 
      this.setVelocityX(0);
  
     
      if (this.cursors.left.isDown) {
        this.setVelocityX(-this.speed);
        this.setFlipX(true);
        this.anims.play('walk', true);
      } else if (this.cursors.right.isDown) {
        this.setVelocityX(this.speed);
        this.setFlipX(false);
        this.anims.play('walk', true);
      } else {
        this.anims.stop();
        this.setTexture('default');
      }
  
 
      if (this.cursors.up.isDown && this.body.blocked.down) {
        this.setVelocityY(-this.jumpSpeed);
      }
    }
  }
  