import Phaser from "phaser";

class howto extends Phaser.Scene {
    constructor(){
        super('test');
    }

    create() {

        //遊び方画面のページ数
        const pages = 4;
        //現在のページ数を覚えておく
        let currentpage = 1;

        //回転を合わせる
        const fit = () => {
            const scw = window.innerWidth/container.width;
            const sch = window.innerHeight/container.height;

            if(window.innerHeight>window.innerWidth){
                if(container.height>window.innerHeight){
                    container.setDisplaySize(container.height*sch,container.width*scw);
                } else {
                    container.setDisplaySize(container.height,container.width*scw);
                }
                back.setDisplaySize(window.innerHeight,window.innerWidth);
            } else {
                if(back.width>window.innerWidth){
                    container.setDisplaySize(container.width*scw,container.height*sch);
                } else {
                    container.setDisplaySize(container.width,container.height*sch);
                }
                back.setDisplaySize(window.innerWidth,window.innerHeight);
            }

            if(window.innerHeight>window.innerWidth){
                this.cameras.main.setRotation(Math.PI * 0.5);                
            } else {
                this.cameras.main.setRotation(0);
            }
        }

        //見せる見せないを制御する
        const contentvisible= () => {
            if(currentpage==1) {
                prev.setVisible(false);
                next.setVisible(true);
            }  
            else if(currentpage===pages) {
                prev.setVisible(true);
                next.setVisible(false);
            } else {
                prev.setVisible(true);
                next.setVisible(true);
            }

            text.forEach((_value,i) => {
                if(currentpage===i+1){
                    text[i].setVisible(true);
                    howto[i].setVisible(true);
                } else {
                    text[i].setVisible(false);
                    howto[i].setVisible(false);
                }
            });
        }

        //背景
        const back = this.add.rectangle(window.innerWidth/2,window.innerHeight/2,window.innerWidth,window.innerHeight,0x000000,0.5);
        back.setInteractive();

        const container = this.add.container(window.innerWidth/2,window.innerHeight/2).setSize(600,400);

        const content = this.add.rectangle(0,0,600,400,0xffffff);
        content.setInteractive();

        //説明文
        const textstyle = {fontSize:30,color:'gray',fontFamily:'Arial'};
        const text1 = this.add.text(-container.width/2,container.height/4+20,"・こたつのなかに隠れているねこを探そう",textstyle).setOrigin(0);
        const text2 = this.add.text(-container.width/2,container.height/4+20,"・３、２、１マスのねこが隠れているよ",textstyle).setOrigin(0);
        const text3 = this.add.text(-container.width/2,container.height/4+20,"・ねこは斜めには隠れないよ",textstyle).setOrigin(0);
        const text4 = this.add.text(-container.width/2,container.height/4+20,"・すべてのねこを探し出せたらクリア",textstyle).setOrigin(0);
        //管理しやすいように配列に入れる
        const text:Phaser.GameObjects.Text[] = [text1,text2,text3,text4];

        //説明画像
        const howto1 = this.add.image(0,0,'howto1');
        const howto2 = this.add.image(0,0,'howto2');
        const howto3 = this.add.image(0,0,'howto3');
        const howto4 = this.add.image(0,0,'howto4');
        //管理しやすいように配列に入れる
        const howto:Phaser.GameObjects.Image[] = [howto1,howto2,howto3,howto4];

        //閉じるボタンを作る
        const close = this.add.image(container.width/2-50,-container.height/2+50,'close');
        close.setInteractive();

        //戻るボタン
        const prev = this.add.image(-container.width+350,0,'prev');
        prev.setInteractive();

        //進むボタン
        const next = this.add.image(container.width-350,0,'next');
        next.setInteractive();

        container.add([content,close,prev,next,text1,text2,text3,text4,howto1,howto2,howto3,howto4]);

        contentvisible();
        fit();

        //グレーアウトしている部分をクリックしたらタイトル画面に戻る
        back.on('pointerdown', () => {
            this.scene.sleep();
        })
        //閉じるボタンをクリックしてもタイトル画面に戻る
        close.on('pointerdown', () => {
            this.scene.sleep();
        })

        prev.on('pointerdown', () => {
          currentpage -= 1;
          contentvisible();  
        })

        next.on('pointerdown', () => {
            currentpage += 1;
            contentvisible();
        })

        window.addEventListener('resize', () => {
            this.game.scale.resize(window.innerWidth, window.innerHeight);
            back.setPosition(window.innerWidth/2,window.innerHeight/2);
            container.setPosition(window.innerWidth/2,window.innerHeight/2);
            fit();
        });
    }
}

export default howto;