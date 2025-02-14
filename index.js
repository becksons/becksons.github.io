import Phaser from 'phaser';
import PreloadScene from './PreloadScene.js';
import TitleScene from './TitleScene.js';
import GameScene from './GameScene.js';
import ResumeScene from './ResumeScene.js';
import NewWorldScene from './NewWorldScene.js';

const config = {
  type: Phaser.AUTO,
  width: 2500,  
  height: window.innerHeight-1500,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 200 }
    }
  },
  scene: [ PreloadScene, TitleScene, GameScene, ResumeScene, NewWorldScene ]
};

const game = new Phaser.Game(config);

window.addEventListener('resize', () => {
  game.scale.resize(2500, window.innerHeight-1500); // Keep the width fixed
  game.scale.refresh();
});
