//プレイ画面用ボタンクラス

import * as Phaser from "phaser"


interface Props{
	width?: number;
	height?: number;
	onClick?: Function;
}

export default class Button extends Phaser.GameObjects.Container {
	ans: Phaser.GameObjects.Image;  //クリック後に表示される画像。ねこの存在に合わせて○×を入れる。
	container: Phaser.GameObjects.Rectangle;    //ボタンの枠。この中に画像を入れる。
	clk: boolean = false;   //このボタンがクリック済みか覚えておく
	alertcontainer: Phaser.GameObjects.Rectangle;   //同じボタンを複数回クリックしたとき用の枠
	alerttext: Phaser.GameObjects.Text;             //同じボタンを複数回クリックしたときに表示するテキスト

	constructor (scene: Phaser.Scene, x:number, y:number, cat:number, props: Props= {}) {
		super(scene, x, y)

		const {
			width = 80,
			height = 80,
			onClick
		} = props

		this.scene = scene;
		this.scene.add.existing(this);

		this.setSize(width,height).setInteractive();

        //ボタンの基準点は呼び出し側で決めてある
		this.container = scene.add.rectangle(0, 0, width, height);
		this.container.setStrokeStyle(1, 0xffffff).setOrigin(0.5);

        //ねこが存在するかしないかで表示する画像が変わる
		if(cat!==0){
			this.ans = scene.add.image(0,0,'maru').setDisplaySize(width,height).setAlpha(0);
		} else {
			this.ans = scene.add.image(0,0,'batu').setDisplaySize(width,height).setAlpha(0);
		}

        //アラート作成
		this.alertcontainer = scene.add.rectangle(scene.sys.game.canvas.width/2,scene.sys.game.canvas.height/2,300,200,0xffffff,0.5);
		this.alertcontainer.setAlpha(0).setOrigin(0.5);

		this.alerttext = scene.add.text(scene.sys.game.canvas.width/2,scene.sys.game.canvas.height/2,"ほかを探そう",{fontSize:30,fontFamily:'Arial'}).setOrigin(0.5);
		this.alerttext.setAlpha(0);

		this.add([this.container, this.ans])

        //クリック時のボタン挙動
		this.on('pointerdown', (p: any) => {
			onClick && onClick(p);
            //既にクリック済みのボタンを押した場合
			if(this.clk){
				this.alertcontainer.setAlpha(1);
				this.alerttext.setAlpha(1);
				scene.tweens.add({
					targets: this.alertcontainer,
					alpha: 0,
					duration: 2000,
					ease: 'Power2'
				});
				scene.tweens.add({
					targets: this.alerttext,
					alpha: 0,
					duration: 2000,
					ease: 'Power2'					
				})

			} else {
                //1回目のクリックであればフラグ立てて画像を表示
				this.ans.setAlpha(1);
				this.clk=true;
			}
		})
	}

    //プレイ画面がクリック済か判定するためのゲッター
	getClk(){
		return this.clk;
	}
}
