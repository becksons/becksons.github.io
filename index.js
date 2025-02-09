 
import Phaser from 'phaser';

import PreloadScene from './PreloadScene.js';
import TitleScene from './TitleScene.js';
import GameScene from './GameScene.js';

 
const config = {
  type: Phaser.AUTO,
  width: 2500,  
  height: window.innerHeight-1500,
  backgroundColor: '#87CEEB',
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 200 }
    }
  },
  
  scene: [ PreloadScene, TitleScene, GameScene ]
};

 
const game = new Phaser.Game(config);

 
window.addEventListener('resize', () => {
  game.scale.resize(2500, window.innerHeight-1500); // Keep the width fixed
  game.scale.refresh();
});
