import Phaser from "phaser";

class loading extends Phaser.Scene {

    progressBar!: Phaser.GameObjects.Rectangle;
    loadingText!: any;
    loadingimage!: Phaser.GameObjects.Image;

    constructor() {
        super('loading');
    }

    preload() {
        
        this.progressBar = this.add.rectangle(0, window.innerHeight / 2, 0, 8, 0xffffff);
        this.loadingText = this.add.text(window.innerWidth / 2, window.innerHeight / 2 - 30, 'l o a d i n g . . .', {fontFamily:'fantasy'});
        this.loadingText.setOrigin(0.5);
        this.fit();

        // ロード進行中はプログレスバーの伸縮を進捗率に応じて変化させる。
        this.scene.scene.load.on('progress', this._updateBar.bind(this));
        // すべてのファイルのロードが完了したらローディング画面はフェードアウトしてメインのシーンに遷移する。
        this.scene.scene.load.on('complete', this._fadeoutMainCamera.bind(this));

        //画像のロード
        this.load.image('title', 'title.png');
        this.load.image('maru','maru.png');
        this.load.image('batu','batu.png');
        this.load.image('playbtn','playbtn.png');
        this.load.image('howtobtn','howtobtn.png');
        this.load.image('top','top.png');
        this.load.image('onemore','onemore.png');
        this.load.image('play', 'play.png');
        this.load.image('kotatu', 'kotatu.png');
        this.load.image('hand', 'hand.png');
        this.load.image('catbefore','catbefore.png');
        this.load.image('catafter','catafter.png');
        this.load.image('clear','clear.png');
        this.load.image('gameover','gameover.png');
        this.load.image('start','start.png');
        this.load.image('prev','prev.png');
        this.load.image('next','next.png');
        this.load.image('close','close.png');
        this.load.image('howto1','howto1.png');
        this.load.image('howto2','howto2.png');
        this.load.image('howto3','howto3.png');
        this.load.image('howto4','howto4.png');

    }

     /** 
     * ローディングプログレスバーの幅を進捗率に応じて伸縮する。
     * @param percentage ローディングの進捗率。 
     */
     private _updateBar(percentage: number) {
        this.progressBar.width = window.innerWidth * percentage;
    }

    /**
     * メインカメラを1秒かけてフェードアウトさせる。
     */
    private _fadeoutMainCamera() {
        this.cameras.main.fadeOut(1000, 0, 0, 0);
    }

    create() {
        // フェードアウトが完了したとき
        this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, () => {

            if (this.progressBar) {
                this.progressBar.destroy();
                this.loadingText.destroy();
            }

            this.cameras.main.fadeIn(1000, 255, 255, 255);
        });

        this.cameras.main.fadeOut(1000, 255, 255, 255);
        this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, () => {
            this.scene.start('title');
        });

        //画面サイズ変更時に行う処理
        window.addEventListener('resize', () => {
            this.game.scale.resize(window.innerWidth, window.innerHeight);
            this.scene.scene.load.on('progress', this._updateBar.bind(this));
            this.loadingText.setPosition(window.innerWidth / 2, window.innerHeight / 2 - 30)
        });

    }
    //回転
    private fit() {
        if(window.innerHeight>window.innerWidth){
            this.cameras.main.setRotation(Math.PI * 0.5);            
        } else {
            this.cameras.main.setRotation(0);
        }
    }
}

export default loading;