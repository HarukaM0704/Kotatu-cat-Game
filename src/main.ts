import * as Phaser from 'phaser';
import { Scenes } from './scene/scenes';


const scale: Phaser.Types.Core.ScaleConfig = {
  mode: Phaser.Scale.FIT,
  autoCenter: Phaser.Scale.CENTER_BOTH,
  width: Math.min(window.innerWidth, 1920),
  height: Math.min(window.innerHeight, 1080),
};

const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,  // webGLを使うかcanvasを使うかをphaserが自動で判断してくれる
  scale: scale,
  backgroundColor:'0xffa791',
  parent: 'game-app',  // #game-app内にcanvasを生成
  scene: Scenes
};

new Phaser.Game(config);