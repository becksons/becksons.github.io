export default class TitleScene extends Phaser.Scene {
    constructor() {
      super({ key: 'TitleScene' });
    }
  
    preload() {
       
      this.load.image('start-screen-0', 'assets/start-scene-0.png');
      this.load.image('start-screen-1', 'assets/start-scene-1.png');
  
     
      this.load.image('startbutton', 'assets/startbutton.png');
    }
  
    create() {
      console.log('Starting TitleScene...');
  
      const { width, height } = this.sys.game.canvas;
   
   
      this.anims.create({
        key: 'startBackground',
        frames: [
          { key: 'start-scene-0' },
          { key: 'start-scene-1' }
        ],
        frameRate: .8,
        repeat: -1
      });
  
      
      this.bg = this.add.sprite(width / 2, height / 2, 'start-scene-0')
        .setDisplaySize(width, height);
  
      this.bg.play('startBackground');
  
 
      const startButton = this.add.image(width / 2, height / 1.15, 'startbutton')
        .setInteractive()
        .setScale(3.5);
  
        startButton.on('pointerdown', () => {
            console.log('Starting IntroDialogueScene...');
            this.scene.start('GameScene');
          });
  
     
    }
  }
  