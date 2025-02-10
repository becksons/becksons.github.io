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
    //    
    // -------------------------
    if (this.resumeDialogue) {
      const distanceTraveled = this.player.x - this.resumeStartX;
  
      if (distanceTraveled >= 100) {
 
        
  
         this.dialogSprite.setAlpha(0);
        this.isDialogueActive = false;
        this.resumeDialogue = false;
  
        // ----------------------------------------------------------------
        //FIRST CUTSCENE STARTS HERE
        // ----------------------------------------------------------------
        
         this.canMove = false;
  
         if (!this.hasSpawnedBlock) {
          this.createBreakableBlock(1400, 1600);
          this.hasSpawnedBlock = true;
        }
  
        //Jump to bubble 4
        this.currentIndex = 4;
        this.dialogSprite.setTexture(this.dialogKeys[4]);
        this.dialogSprite.setPosition(this.player.x + 700, this.player.y - 400);
        this.dialogSprite.setAlpha(1);
        this.isDialogueActive = true;
   
        this.time.delayedCall(2000, () => {
          this.canMove = true; 
        }, [], this);
  
        console.log('Triggered cutscene: block spawned, bubble #4 shown, player movement re-enabled in 2s');
      }
    }
  
 
    if (this.dialogSprite && this.currentIndex >= 4 && this.isDialogueActive) {
      this.dialogSprite.setPosition(this.player.x + this.dialogueSpritePosX, this.player.y + this.dialogueSpritePosY);
    }
  }
  

  // ======================================
  //          INTRO DIALOGUE
  // ======================================
  createIntroDialogue() {
    const { width, height } = this.sys.game.canvas;

  
    this.dialogSprite = this.add.image(this.player.x + this.dialogueSpritePosX, this.player.y + this.dialogueSpritePosY, this.dialogKeys[this.currentIndex]);  
    this.dialogSprite.setAlpha(0); 
    this.dialogSprite.setScale(1.0);

    this.time.delayedCall(1000, () => {
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
      // end of dialogue
      this.dialogSprite.destroy();
      this.isDialogueActive = false;
      this.canMove = true;
      return;
    }
  
 
    if (this.currentIndex === 4) {
      this.dialogSprite.setTexture(this.dialogKeys[3]);
      console.log('Showing bubble #3, letting player walk...');
      this.isDialogueActive = false;
      this.canMove = true;
      this.dialogSprite.setAlpha(0);
      this.dialogSprite.setPosition(this.player.x + this.dialogueSpritePosX, this.player.y + this.dialogueSpritePosY);
      this.time.delayedCall(3000, () => {
        this.dialogSprite.setAlpha(1);
        this.resumeDialogue = true;
      }, [], this);
      this.resumeStartX = this.player.x;
      return;
    }
  
    if (this.currentIndex === 6) {
      console.log('Showing bubble #6, triggering cutscene...');
      this.dialogSprite.setTexture(this.dialogKeys[6]);
      this.isDialogueActive = false;
      this.canMove = false;
      this.dialogSprite.setAlpha(0);
      this.dialogSprite.setPosition(this.player.x + this.dialogueSpritePosX, this.player.y + this.dialogueSpritePosY);
      this.time.delayedCall(1000, () => {
        this.dialogSprite.setAlpha(1);
        this.triggerRainCutscene();
      }, [], this);
      return;
    }
    
   
    if (this.currentIndex === 8) {
     
      this.dialogSprite.setPosition(this.player.x + this.dialogueSpritePosX, this.player.y + this.dialogueSpritePosY);
    
      this.time.delayedCall(1000, () => {

        this.createResumeOptions();
        console.log("Displaying yes/no options...");

      }, [], this);
 
      this.isDialogueActive = false;
      return;
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
    // Break block animation
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
  
    // Walk animation
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
  
    // Evil cloud blowing animation
    let cloudFrames = [];
    for (let i = 1; i <= 30; i++) {
      cloudFrames.push({ key: 'cloudblow-' + i });
    }
    this.anims.create({
      key: 'cloudBlow',
      frames: cloudFrames,
      frameRate: 15,
      repeat: 3
    });

    // Resume pieces animation
    this.anims.create({
      key: 'blowEducation',
      frames: [{ key: 'education-piece' }],
      frameRate: 1,
      repeat: 0
    });

    this.anims.create({
      key: 'blowWork',
      frames: [{ key: 'work-piece' }],
      frameRate: 1,
      repeat: 0
    });

    this.anims.create({
      key: 'blowSkills',
      frames: [{ key: 'skills-piece' }],
      frameRate: 1,
      repeat: 0
    });

    this.anims.create({
      key: 'blowInterests',
      frames: [{ key: 'interests-piece' }],
      frameRate: 1,
      repeat: 0
    });
  }
  triggerCloudBlow() {
    this.dialogSprite.setTexture(this.dialogKeys[7]);

    if (this.evilCloud) {
      this.evilCloud.play('cloudBlow');
      this.evilCloud.on('animationcomplete', () => {
        console.log('Cloud blow animation complete');
        this.evilCloud.setTexture('evil-cloud');
        
        // Blow out resume pieces
        const pieces = [
          { key: 'education-piece', distance: 300 },
          { key: 'work-piece', distance: 600 },
          { key: 'skills-piece', distance: 900 },
          { key: 'interests-piece', distance: 1200 }
        ];

        pieces.forEach((piece, index) => {
          let sprite = this.add.sprite(this.evilCloud.x, this.evilCloud.y, piece.key);
          sprite.setAlpha(0);
          sprite.setScale(0.5);
          this.tweens.add({
            targets: sprite,
            x: this.evilCloud.x + piece.distance,
            y: this.evilCloud.y + Phaser.Math.Between(-100, 100),
            alpha: 1,
            duration: 5000 + index * 500,
            ease: 'Power2',
            onComplete: () => {
              console.log(`${piece.key} blown out`);
            }
          });
        });
      });
    }
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
    
      const y = Phaser.Math.Between(100, 1300);
   
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
    // Do random wave sizes
    const waveSize = Phaser.Math.Between(3, 6);
   
    const baseX = Phaser.Math.Between(500, 7500);
    const baseY = Phaser.Math.Between(100, 1000);
   waveSize=4
    const fixedScales = [ 1.0, 1.2,1.3,1.5];
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
     const amplitude = 20;//max vertical displacement 
   
     const frequency = 0.002;//speed of wave
  
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
            console.log('Resume sprite done tweening ')
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
      console.log('block break triggered...');
    }, [], this);
  
    this.blockHit = true;
  }
//============================================ 
//                    RAIN CUT SCENE
//============================================ 
  triggerRainCutscene() {
     this.cameras.main.fade(1000, 44, 62, 80);  
    this.cameras.main.once('camerafadeoutcomplete', () => {
      this.cameras.main.setBackgroundColor('#406fbb');
      this.cameras.main.fadeIn(1000);

      this.evilCloud = this.add.sprite(0, 0, 'evil-cloud');
      this.evilCloud.setOrigin(0, 0);  
      this.evilCloud.setScale(1.5);
      this.evilCloud.originalX = this.evilCloud.x;
      this.evilCloud.originalY = this.evilCloud.y;
      this.time.delayedCall(1000, () => {
       this.resumeSprite.setAlpha(0);
      }, [], this);
     
      this.tweens.add({
        targets: this.evilCloud,
        x: this.resumeSprite.x - 100,  
        y: this.resumeSprite.y - 100, 
        alpha: 1,
        duration: 1500, 
        ease: 'Sine.easeInOut',
        onComplete: () => {  
          this.tweens.add({
            targets: this.evilCloud,
            x: this.evilCloud.originalX,
            y: this.evilCloud.originalY,
            duration: 3000,
            ease: 'Sine.easeInOut',
            onComplete: () => {
             this.triggerCloudBlow();
            }
          });
   
        }
      });
    });

     
  }
  triggerCloudBlow() {
 
    this.dialogSprite.setTexture(this.dialogKeys[7]);
  
    // Start playing evil cloud’s blowing animation
   
    if (this.evilCloud) {
      this.evilCloud.play('cloudBlow');
      
    }
  
    const pieces = [
      { key: 'education-piece', distance: 3000, anim: 'blowEducation' },
      { key: 'work-piece', distance: 5000, anim: 'blowWork' },
      { key: 'skills-piece', distance: 7000, anim: 'blowSkills' },
      { key: 'interests-piece', distance: 9000, anim: 'blowInterests' }
    ];
  
    this.cameras.main.stopFollow();
  
    
    let tweensCompleted = 0;
    const totalPieces = pieces.length;
  
    const groundY = this.sys.game.canvas.height - 256;
  
    // Spawn concurrently
    pieces.forEach((piece) => {
    
      let pieceSprite = this.add.sprite(this.evilCloud.x, this.evilCloud.y, piece.key);
      pieceSprite.setScale(0.5);
     
      pieceSprite.play(piece.anim);
   
      let targetX = this.evilCloud.x + piece.distance;
      let targetY = Phaser.Math.Between(groundY - 200, groundY - 50);
   
      this.tweens.add({
        targets: pieceSprite,
        x: targetX,
        y: targetY,
        alpha: 1,
        duration: 5000,  
        ease: 'Power2',
        onComplete: () => {
          console.log(`${piece.key} blown out`);
          tweensCompleted++;
          // Once all pieces have landed…
          if (tweensCompleted === totalPieces) {
            console.log('All pieces blown out, returning camera to player.');
            
            this.cameras.main.startFollow(this.player, true, 0.05, 0.05);
  
            // Stop the evil cloud's animation 
            if (this.evilCloud) {
              this.evilCloud.stop();
              this.evilCloud.setTexture('evil-cloud');
              this.time.delayedCall(1000, () => {
                this.tweens.add({
                  targets: this.evilCloud,
                  x: -(this.evilCloud.width+100),  
                  duration: 2000,
                  ease: 'Power2',
                  onComplete: () => {
                    console.log('Evil cloud moved off screen');
                  }
                });
              }, [], this);
            }
  
            // Now ask if player wants to play full game
            this.dialogSprite.setTexture(this.dialogKeys[8]);
             this.time.delayedCall(1000, () => {
              this.createResumeOptions();
              console.log("Displaying yes/no options...");
            }, [], this);
          }
        }
      });
    });
  }
  
  //Call yes/no to play game
  createResumeOptions() {
     const centerX = this.cameras.main.centerX;
    const centerY = this.cameras.main.centerY;
  
 
    this.yesButton = this.add.image(centerX-300, centerY-300 , 'yes-option-resume').setInteractive();
    this.noButton  = this.add.image(centerX-300, centerY+300 , 'no-option-resume').setInteractive();
  
     this.yesButton.on('pointerdown', () => {
      console.log('Yes option chosen');
      // CODE FOR YES
    });
  
    this.noButton.on('pointerdown', () => {
      console.log('No option chosen');
      // CODE FOR NO
    });
  }
  
  
  
}
