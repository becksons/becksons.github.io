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

    // Dialog images
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

    // Walk animation frames and default player image
    this.load.image('walk0', 'assets/walk0.png');
    this.load.image('walk1', 'assets/walk1.png');
    this.load.image('walk2', 'assets/walk2.png');
    this.load.image('walk3', 'assets/walk3.png');
    this.load.image('default', 'assets/default.png');

    // Block frames
    this.load.image('block0', 'assets/block-0.png');
    this.load.image('block1', 'assets/block-1.png');
    this.load.image('block2', 'assets/block-2.png');
    this.load.image('block3', 'assets/block-3.png');
    this.load.image('block4', 'assets/block-4.png');
    this.load.image('block5', 'assets/block-5.png');
    this.load.image('block6', 'assets/block-6.png');
    this.load.image('block7', 'assets/block-7.png');

    // Other assets
    this.load.image('grass', 'https://bsnbk.files.show/grassblock.png');
    this.load.image('cloud', 'https://bsnbk.files.show/smilecloud.png');
    this.load.image('cloud1', 'assets/smilecloud1.png');
    this.load.image('evil-cloud', 'assets/evilcloud.png');

    // Load cloud-blow images individually (keys "cloudblow-1" to "cloudblow-30")
    this.load.image('cloudblow-1', 'assets/cloudevil/cloudblow-1.png');
    this.load.image('cloudblow-2', 'assets/cloudevil/cloudblow-2.png');
    this.load.image('cloudblow-3', 'assets/cloudevil/cloudblow-3.png');
    this.load.image('cloudblow-4', 'assets/cloudevil/cloudblow-4.png');
    this.load.image('cloudblow-5', 'assets/cloudevil/cloudblow-5.png');
    this.load.image('cloudblow-6', 'assets/cloudevil/cloudblow-6.png');
    this.load.image('cloudblow-7', 'assets/cloudevil/cloudblow-7.png');
    this.load.image('cloudblow-8', 'assets/cloudevil/cloudblow-8.png');
    this.load.image('cloudblow-9', 'assets/cloudevil/cloudblow-9.png');
    this.load.image('cloudblow-10', 'assets/cloudevil/cloudblow-10.png');
    this.load.image('cloudblow-11', 'assets/cloudevil/cloudblow-11.png');
    this.load.image('cloudblow-12', 'assets/cloudevil/cloudblow-12.png');
    this.load.image('cloudblow-13', 'assets/cloudevil/cloudblow-13.png');
    this.load.image('cloudblow-14', 'assets/cloudevil/cloudblow-14.png');
    this.load.image('cloudblow-15', 'assets/cloudevil/cloudblow-15.png');
    this.load.image('cloudblow-16', 'assets/cloudevil/cloudblow-16.png');
    this.load.image('cloudblow-17', 'assets/cloudevil/cloudblow-17.png');
    this.load.image('cloudblow-18', 'assets/cloudevil/cloudblow-18.png');
    this.load.image('cloudblow-19', 'assets/cloudevil/cloudblow-19.png');
    this.load.image('cloudblow-20', 'assets/cloudevil/cloudblow-20.png');
    this.load.image('cloudblow-21', 'assets/cloudevil/cloudblow-21.png');
    this.load.image('cloudblow-22', 'assets/cloudevil/cloudblow-22.png');
    this.load.image('cloudblow-23', 'assets/cloudevil/cloudblow-23.png');
    this.load.image('cloudblow-24', 'assets/cloudevil/cloudblow-24.png');
    this.load.image('cloudblow-25', 'assets/cloudevil/cloudblow-25.png');
    this.load.image('cloudblow-26', 'assets/cloudevil/cloudblow-26.png');
    this.load.image('cloudblow-27', 'assets/cloudevil/cloudblow-27.png');
    this.load.image('cloudblow-28', 'assets/cloudevil/cloudblow-28.png');
    this.load.image('cloudblow-29', 'assets/cloudevil/cloudblow-29.png');
    this.load.image('cloudblow-30', 'assets/cloudevil/cloudblow-30.png');

    this.load.image('education-piece', 'assets/education-piece.png');
    this.load.image('work-piece', 'assets/work-piece.png');
    this.load.image('skills-piece', 'assets/skills-piece.png');
    this.load.image('interests-piece', 'assets/interests-piece.png');

    this.load.image('yes-option-resume', 'assets/yes-option-resume.png');
    this.load.image('no-option-resume', 'assets/no-option-resume.png');

  }

  create() {
    console.log('Preloading complete. Starting TitleScene...');
    this.scene.start('TitleScene');
  }
}
