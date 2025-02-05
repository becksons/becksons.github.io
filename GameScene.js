export default class GameScene extends Phaser.Scene {
  constructor() {
    super({ key: 'GameScene' });

    this.dialogKeys = [
      'dialog0','dialog1','dialog2','dialog3',
      'dialog4','dialog5','dialog6','dialog7',
      'dialog8','dialog9','dialog10','dialog11'
    ];
    this.currentIndex = 0;

 
    this.isDialogueActive = false;
    this.canMove = false;
    this.resumeDialogue = false;
    this.resumeStartX = 0;


    this.hasSpawnedBlock = false;
    this.block = null;
    this.blockHit = false;

    this.dialogSprite = null;
    this.bgOverlay = null;

    this.dialogueSpritePosX = 700;
    this.dialogueSpritePosY = -600;
  }

  create() {

    this.createGround();
    this.createAnimations();
    this.createPlayer();
    this.createClouds();

   
    this.createIntroDialogue();
    this.isDialogueActive = true;
  }

  update() {
 
    if (this.canMove) {
      this.updatePlayerMovement();
    }
  
    
    this.updateCloudMovement();
  
  
    if (this.dialogSprite) {
      this.dialogSprite.setPosition(this.player.x + this.dialogueSpritePosX, this.player.y + this.dialogueSpritePosY);  
    }
  
    // -------------------------
    // Trigger cutscene after traveling X distance
    //    (when the user was last on bubble #3)
    // -------------------------
    if (this.resumeDialogue) {
      const distanceTraveled = this.player.x - this.resumeStartX;
  
      if (distanceTraveled >= 100) {
 
        
  
         this.dialogSprite.setAlpha(0);
        this.isDialogueActive = false;
        this.resumeDialogue = false;
  
        // ----------------------------------------------------------------
        // CUTSCENE STARTS HERE
        // ----------------------------------------------------------------
        
         this.canMove = false;
  
         if (!this.hasSpawnedBlock) {
          this.createBreakableBlock(1400, 1900);
          this.hasSpawnedBlock = true;
        }
  
        //Jump to bubble 4
        this.currentIndex = 4;
        this.dialogSprite.setTexture(this.dialogKeys[4]);
        this.dialogSprite.setPosition(this.player.x + 700, this.player.y - 400);
        this.dialogSprite.setAlpha(1);
        this.isDialogueActive = true;
  
        //A short pause, then let the player move again 
        //    (so they can go break the block).
        this.time.delayedCall(2000, () => {
          this.canMove = true; // unfreeze after 2 seconds
        }, [], this);
  
        console.log('Triggered cutscene: block spawned, bubble #4 shown, player movement re-enabled in 2s');
      }
    }
  
 
    if (this.dialogSprite && this.currentIndex >= 4 && this.isDialogueActive) {
      this.dialogSprite.setPosition(this.player.x + this.dialogueSpritePosX, this.player.y + this.dialogueSpritePosY);
    }
  }
  

  // ======================================
  //         CREATE INTRO DIALOGUE
  // ======================================
  createIntroDialogue() {
    const { width, height } = this.sys.game.canvas;

  
    this.dialogSprite = this.add.image(this.player.x + this.dialogueSpritePosX, this.player.y + this.dialogueSpritePosY, this.dialogKeys[this.currentIndex]);  
    this.dialogSprite.setAlpha(0); 
    this.dialogSprite.setScale(1.0);

    this.time.delayedCall(2000, () => {
      this.dialogSprite.setAlpha(1);
    }, [], this);

     
    this.dialogSprite.setInteractive();
    this.dialogSprite.on('pointerdown', () => {
      this.nextBubble();
    });

   
    this.input.keyboard.on('keydown-LEFT', () => {
      if (this.currentIndex > 0) {
        this.previousBubble();
      }
    });
    this.input.keyboard.on('keydown-RIGHT', () => {
      this.nextBubble();
    });
  }

  // ======================================
  //        NEXT / PREV BUBBLE
  // ======================================
  nextBubble() {
    this.currentIndex++;
 
    if (this.currentIndex > this.dialogKeys.length) {
      //end of dialogue
      
      this.dialogSprite.destroy();
      this.isDialogueActive = false;
      this.canMove = true;
      

      
      return;
    }

    // If we just advanced to bubble #3, show it and let the player walk
    if (this.currentIndex === 4 ) {
      this.dialogSprite.setTexture(this.dialogKeys[3]);
      console.log('Showing bubble #3, letting player walk...');
     
       this.isDialogueActive = false;
      this.canMove = true;
      this.dialogSprite.setAlpha(0);
      this.dialogSprite.setPosition(this.player.x + this.dialogueSpritePosX, this.player.y + this.dialogueSpritePosY);
      
      this.time.delayedCall(3000, () => {
        this.dialogSprite.setAlpha(1);
        this.resumeDialogue = true;
      }, this);
      
     
      this.resumeStartX = this.player.x; 
      

      return;
    }

     if (this.currentIndex > 5 && this.currentIndex<this.dialogKeys.length) {
      
      this.isDialogueActive = true;
      
    }

    this.dialogSprite.setTexture(this.dialogKeys[this.currentIndex]);
    this.dialogSprite.setPosition(this.player.x + this.dialogueSpritePosX, this.player.y + this.dialogueSpritePosY);
  }

  previousBubble() {
    // If we're at bubble 4, do nothing
    if (this.currentIndex >= 4) {
      return; 
    }
  
    if (this.currentIndex > 0) {
      this.currentIndex--;
      this.dialogSprite.setTexture(this.dialogKeys[this.currentIndex]);
    }
  }

  // ===================================
  //         WORLD & GROUND
  // ===================================
  createGround() {
    const { height } = this.sys.game.canvas;
 
    this.ground = this.add.tileSprite(0, height - 256, 8000, 256, 'grass')  
      .setOrigin(0, 0);
  
    this.physics.add.existing(this.ground, true);
  
    this.physics.world.setBounds(0, 0, 8000, height);   
    this.cameras.main.setBounds(0, 0, 8000, height); 
  }

  // ===================================
  //         ANIMATIONS
  // ===================================
  createAnimations() {
    // Break block
    this.anims.create({
      key: 'break',
      frames: [
        { key: 'block0' },
        { key: 'block1' },
        { key: 'block2' },
        { key: 'block3' },
        { key: 'block4' },
        { key: 'block5' },
        { key: 'block6' },
        { key: 'block7' }
      ],
      frameRate: 10,
      repeat: 0
    });

    // Walk
    this.anims.create({
      key: 'walk',
      frames: [
        { key: 'walk0' },
        { key: 'walk1' },
        { key: 'walk2' },
        { key: 'walk3' }
      ],
      frameRate: 8,
      repeat: -1
    });
  }

  // ===================================
  //         PLAYER
  // ===================================
  createPlayer() {
    this.player = this.physics.add.sprite(600, 2500, 'default');
    this.player.setCollideWorldBounds(true);

    this.cameras.main.startFollow(this.player, true, 0.05, 0.05);
    this.cursors = this.input.keyboard.createCursorKeys();
  }

  updatePlayerMovement() {
    
    const speed = 200;
    const jumpSpeed = 400;

    this.player.setVelocityX(0);

    // LEFT
    if (this.cursors.left.isDown) {
      this.player.setVelocityX(-speed);
      this.player.setFlipX(true);
      this.player.anims.play('walk', true);
    }
    // RIGHT
    else if (this.cursors.right.isDown) {
      this.player.setVelocityX(speed);
      this.player.setFlipX(false);
      this.player.anims.play('walk', true);

       this.ground.tilePositionX += 5;
    }
    else {
      // IDLE
  
      this.player.anims.stop();
      this.player.setTexture('default');
    }
    // JUMP

     if (this.cursors.up.isDown && this.player.body.blocked.down) {
      this.player.setVelocityY(-jumpSpeed);
      this.player.anims.play('walk', false);
    }
  }

  // ===================================
  //         CLOUDS
  // ===================================
  createClouds() {
    this.clouds = this.add.group();
  
     const totalClouds = Phaser.Math.Between(5, 8);
   
    const segmentWidth = 8000 / (totalClouds + 1);
   
    const possibleScales = [0.6, 0.9, .7, .8,1.2];
  
    for (let i = 0; i < totalClouds; i++) {
     
      const x = segmentWidth * (i + 1) + Phaser.Math.Between(-200, 200);
    
      const y = Phaser.Math.Between(1000, 2300);
   
      const scale = possibleScales[Phaser.Math.Between(0, possibleScales.length - 1)];
   
      const cloudKey = Phaser.Math.Between(0, 1) === 0 ? 'cloud' : 'cloud1';
  
 
      let cloudSprite = this.physics.add.sprite(x, y, cloudKey);
      cloudSprite.setScale(scale);
      cloudSprite.body.allowGravity = false;  
      cloudSprite.setDepth(-1);  
   
      cloudSprite.baseY = y;
  
      cloudSprite.offset = Math.random() * 2000;
  
      this.clouds.add(cloudSprite);
    }
  } 
  createCloudWave() {
    // Random wave sizes
    const waveSize = Phaser.Math.Between(3, 6);
   
    const baseX = Phaser.Math.Between(500, 7500);
    const baseY = Phaser.Math.Between(1000, 1500);
   waveSize=4
    const fixedScales = [ 1.0, 1.3,1.8];
    let scales = [...fixedScales]; 
    if (waveSize === 4) {
   
      scales.push(Phaser.Math.FloatBetween(1.2,1.8));
    }
  
   
    scales.sort((a, b) => a - b);
  
    
    const xSpacing = 250;
   
    for (let i = 0; i < waveSize; i++) {
      
      const offsetX = i * xSpacing;
      const offsetY = Phaser.Math.Between(-30, 30);
  
   
      const cloudKey = Phaser.Math.Between(0, 1) === 0 ? 'cloud' : 'cloud1';
  
      let cloudSprite = this.physics.add.sprite(
        baseX + offsetX,
        baseY + offsetY,
        cloudKey
      );
  
       cloudSprite.setScale(scales[i]);
  
       cloudSprite.body.allowGravity = false;
  
       cloudSprite.baseY = cloudSprite.y;
      
       cloudSprite.offset = Math.random() * 1000;
  
       this.clouds.add(cloudSprite);
    }
  }
  
  updateCloudMovement() {
     const amplitude = 20;
   
     const frequency = 0.002;
  
    this.clouds.children.each(cloud => {
       cloud.y = cloud.baseY + amplitude * Math.sin((cloud.offset + this.time.now) * frequency);
    });
  }
  
  

  // ===================================
  //         BREAKABLE BLOCK
  // ===================================   
  createBreakableBlock(x, y) {
    this.block = this.physics.add.sprite(x, y, 'block0');
    this.block.setImmovable(true);
    this.block.body.allowGravity = false;
    this.block.setScale(1.5);
  
    console.log('Block spawned at', x, y);
  
     this.block.on('animationcomplete', (anim) => {
      if (anim.key === 'break') {
         const blockX = this.block.x;
        const blockY = this.block.y;
        this.block.destroy();
  
        
        this.currentIndex = 5;
        this.dialogSprite.setTexture(this.dialogKeys[this.currentIndex]);
        this.dialogSprite.setAlpha(1);
        this.isDialogueActive = true;
   
        this.resumeSprite = this.physics.add.sprite(blockX, blockY - 30, 'resume');
        this.resumeSprite.setAlpha(0).setScale(0.3);
        this.resumeSprite.body.allowGravity = false; // so it stays in the air
  
         this.tweens.add({
          targets: this.resumeSprite,
          y: blockY - 80,  
          alpha: 1,         
          duration: 1000,    
          ease: 'Power2',
          onComplete: () => {
            console.log('Resume sprite done tweening.')
          }});
        this.canMove = false;
  
        // Maybe fade out the cutscene after some time/ resume movement
        // this.time.delayedCall(3000, () => {
        //   this.canMove = true;
        // }, [], this);
        
  
        console.log('Block destroyed, showing bubble #5');
      }
    });
  
     this.physics.add.collider(this.player, this.block, this.onBlockHit, null, this);
  }
  
  
  onBlockHit(player, block) {
    if (player.body.velocity.y < 0 && player.y > block.y) {
      block.anims.play('break');
    } else if (player.body.velocity.x !== 0) {
      block.anims.play('break');
    }
  
    
    this.time.delayedCall(3000, () => {
      console.log('2s after hitting block, the block break was triggered.');
    }, [], this);
  
    this.blockHit = true;
  }
  
}
