import Phaser from "phaser";
import fit from "../class/fit";

class title extends Phaser.Scene {
    constructor() {
        super('title');
    }

    init(){
        //フェードイン
        this.cameras.main.fadeIn(1000, 255, 255, 255);    //時間、R,G,B
    }

    create() {

        let win = {
            width: window.innerWidth,
            height: window.innerHeight
        }

        //背景
        const back = this.add.image(window.innerWidth/2, window.innerHeight/2, 'title');
        //ボタン等を入れておく枠
        const container = this.add.container(innerWidth/2,innerHeight/2).setSize(back.width,back.height);
        
        const playbtn = this.add.image(-back.width/3,back.height/4,'playbtn').setDisplaySize(200,100).setAlpha(0.7);
        playbtn.setInteractive();

        const howtobtn = this.add.image(back.width/3,back.height/4,'howtobtn').setDisplaySize(200,100).setAlpha(0.7);
        howtobtn.setInteractive();

        container.add([playbtn, howtobtn]);

        //マウスオーバーで色が強くなる
        playbtn.on('pointerover', () => {
            playbtn.setAlpha(1);
        })
        //マウスが離れるとまた薄くなる
        playbtn.on('pointerout', () => {
            playbtn.setAlpha(0.7);
        })
        //プレイ画面へ遷移
        playbtn.on('pointerdown', () => {
            this.scene.start('play');
        })

        howtobtn.on('pointerover', () => {
            howtobtn.setAlpha(1);
        })

        howtobtn.on('pointerout', () => {
            howtobtn.setAlpha(0.7);
        })

        //遊び方画面は並列実行で上にかぶせる
        howtobtn.on('pointerdown', () => {
            this.scene.launch('test')
        })

        //回転を合わせる
        fit(this,back,container,win);

        //画面サイズ変更時の処理
        window.addEventListener('resize', () => {
            this.game.scale.resize(window.innerWidth, window.innerHeight);
            back.setPosition(window.innerWidth/2,window.innerHeight/2);
            container.setPosition(window.innerWidth/2,window.innerHeight/2);
            fit(this,back,container,win);
            win.height=window.innerHeight;
            win.width=window.innerWidth;
        });
    }
}

export default title;
