// PreloadScene.js

export default class PreloadScene extends Phaser.Scene {
    constructor() {
      super({ key: 'PreloadScene' });
    }
  
    preload() {
    console.log('Starting PreloadScene...');
    
    
       
      this.load.image('startbutton', 'assets/startbutton.png');
      this.load.image('start-scene-0', 'assets/start-screen-0.png');
      this.load.image('start-scene-1', 'assets/start-screen-1.png');
      this.load.image('dialog0', 'assets/dialogue-0.png'); 
    this.load.image('dialog1', 'assets/dialogue-1.png');
    this.load.image('dialog2', 'assets/dialogue-2.png');
    this.load.image('dialog3', 'assets/dialogue-3.png');
    this.load.image('dialog4', 'assets/dialogue-4.png');
    this.load.image('dialog5', 'assets/dialogue-5.png');
    this.load.image('dialog6', 'assets/dialogue-6.png');
    this.load.image('dialog7', 'assets/dialogue-7.png');
    this.load.image('dialog8', 'assets/dialogue-8.png');
    this.load.image('dialog9', 'assets/dialogue-9.png');
    this.load.image('resume', 'assets/resumefull.png');
 
   `  `
      this.load.image('walk0', 'assets/walk0.png');
      this.load.image('walk1', 'assets/walk1.png');
      this.load.image('walk2', 'assets/walk2.png');
      this.load.image('walk3', 'assets/walk3.png');
      this.load.image('default', 'assets/default.png');
   
      this.load.image('block0', 'assets/block-0.png');
      this.load.image('block1', 'assets/block-1.png');
      this.load.image('block2', 'assets/block-2.png');
      this.load.image('block3', 'assets/block-3.png');
      this.load.image('block4', 'assets/block-4.png');
      this.load.image('block5', 'assets/block-5.png');
      this.load.image('block6', 'assets/block-6.png');
      this.load.image('block7', 'assets/block-7.png');
   
      this.load.image('grass', 'https://bsnbk.files.show/grassblock.png');
      this.load.image('cloud', 'https://bsnbk.files.show/smilecloud.png');
      this.load.image('cloud1','assets/smilecloud1.png');

      
    }
  
    create() {
  
      console.log('Preloading...');

      this.scene.start('TitleScene');
    }
  }
