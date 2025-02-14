import Phaser from 'https://cdn.jsdelivr.net/npm/phaser@3.60.0/dist/phaser.module.js';

import PreloadScene from './PreloadScene.js';
import TitleScene from './TitleScene.js';
import GameScene from './GameScene.js';
import ResumeScene from './ResumeScene.js';
import NewWorldScene from './NewWorldScene.js';

const config = {
  parent: 'game',
  type: Phaser.AUTO,
  width: 2500,  
  height: window.innerHeight > 1500 ? window.innerHeight - 1500 : 800,  physics: {
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
