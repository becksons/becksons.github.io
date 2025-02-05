// IntroDialogueScene.js

export default class IntroDialogueScene extends Phaser.Scene {
    constructor() {
      super({ key: 'IntroDialogueScene' });
  
      // We'll store bubble image keys here in an array
      this.dialogKeys = [
        'dialog0',
        'dialog1',
        'dialog2',
        'dialog3',
        'dialog4',
        'dialog5',
        'dialog6',
        'dialog7',
        'dialog8',
        'dialog9' 

        
      ];
      this.currentIndex = 0;
    }
    preload() {
        
    }
  
    create() {
      console.log('Starting IntroDialogueScene...');
  
      const { width, height } = this.sys.game.canvas;
  
      // 1) Create a semi‐transparent background (optional)
      // So it feels like a "pause" or "cutscene"
      this.bg = this.add.rectangle(
        width / 2, height / 2,
        width, height,
        0x000000, // black
        0.5        // half‐transparent
      ).setOrigin(0.5);
  
      // 2) Create a sprite for the bubble image
      this.dialogSprite = this.add.image(
        1900 , height/2.5 ,
        this.dialogKeys[this.currentIndex]
      );
      this.dialogSprite.setScale(1.0); // scale up if needed
  
      // 3) Make it interactive to detect clicks
      this.dialogSprite.setInteractive();
  
      // 4) When the user clicks/taps, go to the next bubble
      this.dialogSprite.on('pointerdown', () => {
        this.nextBubble();
      });
      this.playerFace = this.add.image(width / 2, height / 2 + 100, 'default');
this.playerFace.setScale(2.0);

// Then position the bubble above the player, etc.
this.dialogSprite.y = this.playerFace.y - 200;
  
      // Alternatively, you could listen for any pointerdown on the Scene:
      this.input.once('pointerdown', () => this.nextBubble());
    }
  
    nextBubble() {
      // Advance the index
      this.currentIndex++;
  
      // If we've shown all bubbles, start the real GameScene
      if (this.currentIndex >= this.dialogKeys.length) {
        this.scene.start('GameScene');
        return;
      }
  
      // Otherwise, set the new bubble image
      this.dialogSprite.setTexture(this.dialogKeys[this.currentIndex]);
    }
  }
  