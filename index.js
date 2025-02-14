import Phaser from 'https://cdn.jsdelivr.net/npm/phaser@3.60.0/dist/phaser.module.js';

import PreloadScene from 'https://github.com/becksons/my-portfolio-game/blob/2c7f42f198fc404121e8d2943a04dc9d68c68583/PreloadScene.js';
import TitleScene from 'https://github.com/becksons/my-portfolio-game/blob/2c7f42f198fc404121e8d2943a04dc9d68c68583/TitleScene.js';
import GameScene from 'https://github.com/becksons/my-portfolio-game/blob/2c7f42f198fc404121e8d2943a04dc9d68c68583/GameScene.js';
import ResumeScene from 'https://github.com/becksons/my-portfolio-game/blob/2c7f42f198fc404121e8d2943a04dc9d68c68583/ResumeScene.js';
import NewWorldScene from 'https://github.com/becksons/my-portfolio-game/blob/2c7f42f198fc404121e8d2943a04dc9d68c68583/NewWorldScene.js';

const config = {
  parent: 'game',
  type: Phaser.AUTO,
  width: 2500,  
  height: window.innerHeight > 1500 ? window.innerHeight - 1500 : 800,  
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
  game.scale.resize(2500, window.innerHeight - 1500); // Keep the width fixed
  game.scale.refresh();
});
