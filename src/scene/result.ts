import Phaser from "phaser";
import fit from "../class/fit";

class result extends Phaser.Scene {

    constructor(){
        super('result');
    }

    create(data:{result:boolean,cnt:number}){

        let win = {
            width: window.innerWidth,
            height: window.innerHeight
        }

        //結果で出力内容が変わる
        let back: Phaser.GameObjects.Image;
        if(data.result){
            //クリアパターン
            back = this.add.image(window.innerWidth/2, window.innerHeight/2, 'clear');
            this.add.text(window.innerWidth/2-200,window.innerHeight/2,"見つけるまでの回数："+data.cnt+"回",{fontSize:30,fontFamily:'Arial',color:'gray'});
        } else {
            //ゲームオーバーパターン
            back = this.add.image(window.innerWidth/2, window.innerHeight/2, 'gameover');
        }

        //共通パーツ（TOPに戻るボタンともう一度遊ぶボタン)

        const container = this.add.container(innerWidth/2,innerHeight/2).setSize(back.width,back.height);

        const topbtn = this.add.image(-back.width/3,back.height/4,'top').setDisplaySize(200,100).setAlpha(0.7);
        topbtn.setInteractive();
        topbtn.on('pointerdown', () => {
            this.scene.start('title');
        })

        const playbtn = this.add.image(back.width/3,back.height/4,'onemore').setDisplaySize(200,100).setAlpha(0.7);
        playbtn.setInteractive();
        playbtn.on('pointerdown', () => {
            
            this.scene.start('play');
        })

        container.add([topbtn, playbtn]);

        fit(this,back,container,win);

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

export default result;