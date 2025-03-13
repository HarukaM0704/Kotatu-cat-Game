import Phaser from "phaser";
import Button from "../class/button";

class play extends Phaser.Scene {

    //猫の数と猫の長さを決める
    catlength: number[] = [3,2,1]
    //撫でてもいい回数を決める
    putmaxcnt: number = 15;

    constructor() {
        super('play');
    };
    

    create() {
        //どの猫がどこにいるかを把握する配列
        let cat: number[][]= [
            [0,0,0,0,0],
            [0,0,0,0,0],
            [0,0,0,0,0],
            [0,0,0,0,0],
            [0,0,0,0,0]
        ];
        //撫でた回数
        let putcnt: number = 0;
        //猫ごとの撫でた回数
        let putcat: number[] = [0,0,0];

        let win = {
            width: window.innerWidth,
            height: window.innerHeight
        }

        const kotatufit = () => {   
            const scw = window.innerWidth/back.width;
            const sch = window.innerHeight/back.height;

            if(window.innerHeight>window.innerWidth){
                if(back.height>window.innerHeight){
                    back.setDisplaySize(back.height*sch,back.width*scw);
                    container.setDisplaySize(back.height*sch,back.width*scw);

                } else {
                    back.setDisplaySize(back.height,back.width*scw);
                    container.setDisplaySize(back.height,back.width*scw);
                }
            }else{
                if(back.width>window.innerWidth){
                    back.setDisplaySize(back.width*scw,back.height*sch);
                    container.setDisplaySize(back.width*scw,back.height*sch);
                } else {
                    back.setDisplaySize(back.width,back.height*sch);
                    container.setDisplaySize(back.width,back.height*sch);
                }
            }

            kotatu.setDisplaySize(back.displayHeight*0.8,back.displayHeight*0.8);
            kotatucontainer.setDisplaySize(kotatu.displayWidth,kotatu.displayHeight);

            if(window.innerHeight>window.innerWidth){
                if(win.height<window.innerHeight){
                    this.game.scale.displaySize.setAspectRatio( window.innerHeight/window.innerWidth );
                }
                this.cameras.main.setRotation(Math.PI * 0.5);
                
            } else {
                if(win.width<window.innerWidth){
                    this.game.scale.displaySize.setAspectRatio( window.innerWidth/window.innerHeight );
                }
                this.cameras.main.setRotation(0);
            }
        }

        //猫配置
        catset(this.catlength,cat);

        //画面構築
        const back = this.add.image(window.innerWidth/2,window.innerHeight/2, 'play');

        const kotatu = this.add.image(back.x,back.y,'kotatu');

        const container = this.add.container(back.x,back.y).setSize(back.width,back.height);

        const kotatucontainer = this.add.container(kotatu.x,kotatu.y).setSize(kotatu.width,kotatu.height);


        
        
        //左上に残り回数
        const hand = this.add.image(-kotatu.width/2-70,-kotatu.height/2+20,'hand');
        const ato = this.add.text(-kotatu.width/2-100,-kotatu.height/2-10,"あと",{fontSize:25, color:'gray',fontFamily:'Arial'});
        const restput = this.add.text(-kotatu.width/2-90,-kotatu.height/2+20,this.putmaxcnt.toString(),{fontSize:40,color:'gray',fontFamily:'Arial'}).setOrigin(0);
        const kai = this.add.text(-kotatu.width/2-60,-kotatu.height/2+60,"回",{fontSize:25, color:'gray',fontFamily:'Arial'});
        
        const text = this.add.text(kotatu.width/2,-kotatu.height/3,"みつけたねこ",{fontSize:30, color:'gray',fontFamily:'Arial'});
        container.add([hand, restput, ato, kai, text]);
        
        //右側にのこりのねこ
        const beforecatimage:Phaser.GameObjects.Image[] = new Array;
        const aftercatimage:Phaser.GameObjects.Image[] = new Array;

        //残りのねこの表示制御
        this.catlength.forEach((_value, i) => {
            beforecatimage[i] = this.add.image(kotatu.width/2+80,100*i-kotatu.height/6,'catbefore');
            beforecatimage[i].setAlpha(0.7).setDisplaySize(100,100);

            aftercatimage[i] = this.add.image(kotatu.width/2+80,100*i-kotatu.height/6,'catafter');
            aftercatimage[i].setAlpha(0).setDisplaySize(100,100);

            container.add([beforecatimage[i], aftercatimage[i]]);

        })

        

        //ボタンを配置        
        for(var i=0; i<cat.length; i++){            
            for(var j=0; j<cat.length; j++){
                const catcheck = cat[i][j];
                const setButton = new Button(this, -kotatu.width/3+85*j,-kotatu.height/3+85*i, catcheck, {  
                    onClick: () => {
                        if(!setButton.getClk()){
                            putcnt++;
                            restput.setText((this.putmaxcnt-putcnt).toString());
                            if(catcheck!=0){
                                putcat[catcheck-1]++;
                            }
                        
                            var check=0;
                            this.catlength.forEach((value, i) => {
                                if(putcat[i]===value){
                                    beforecatimage[i].setAlpha(0);
                                    aftercatimage[i].setAlpha(1);
                                    check++;
                                }
                            });
                            
                            if(check===this.catlength.length){
                                const data={result:true,cnt:putcnt};
                                this.cameras.main.fadeOut(1000, 255, 255, 255);
                                this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, () => {
                                    this.scene.start('result',data);
                                });
                            } else {
                                if(putcnt===this.putmaxcnt){
                                    const data={result:false,cnt:putcnt};
                                    this.cameras.main.fadeOut(1000, 255, 255, 255);
                                    this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, () => {
                                        this.scene.start('result',data);
                                    });
                               }
                            }
                        }
                    }
                });
                kotatucontainer.add(setButton);
            }
        }
        
        const start = this.add.image(window.innerWidth/2,window.innerHeight/2,'start');

        kotatufit();

        this.tweens.add({
            targets: start,
            alpha: 0,
            duration: 3000,
            ease: 'Power2'
        });

        //猫配置関数
        function catset(catlength:number[],cat:number[][]) {
            //猫の数だけ繰り返す
            var i = 0;
            while(i<catlength.length){
                //方向を決める(1~4)
                const dir = Math.floor(Math.random() * catlength.length) + 1;
                //始点の座標を決める
                const catx = Math.floor(Math.random() * cat.length);
                const caty = Math.floor(Math.random() * cat.length);

                //重なっていないか、範囲内に収まるかチェック
                var rangecheck = true;
                switch(dir){
                    case 1:
                        if(caty-catlength[i]-1<0){
                            rangecheck=false;
                            break;
                        }
                        for(var j=0;j<catlength[i];j++){
                            if(cat[caty-j][catx] != 0){
                                rangecheck=false;
                                break;
                            }
                        }
                        break;
                    case 2:
                        if(catx+catlength[i]-1>=cat.length){
                            rangecheck=false;
                            break;
                        }
                        for(var j=0;j<catlength[i];j++){
                            if(cat[caty][catx+j] != 0){
                                rangecheck=false;
                                break;
                            }
                        }
                        break;
                    case 3:
                        if(caty+catlength[i]-1>=cat.length){
                            rangecheck=false;
                            break;
                        }
                        for(var j=0;j<catlength[i];j++){
                            if(cat[caty+j][catx] != 0){
                                rangecheck=false;
                                break;
                            }
                        }
                        break;
                    case 4:
                        if(catx-catlength[i]-1<0){
                            rangecheck=false;
                            break;
                        }
                        for(var j=0;j<catlength[i];j++){
                            if(cat[caty][catx-j] != 0){
                                rangecheck=false;
                                break;
                            }
                        }
                        break;
                }
                console.log(rangecheck);

                if(rangecheck==false){
                    continue;
                }

                //実際に配置する
                for(var j=0;j<catlength[i];j++){
                    switch(dir) {
                        //上向き
                        case 1:
                            cat[caty-j][catx] = i+1;
                            break;
                        //右向き
                        case 2:
                            cat[caty][catx+j] = i+1;
                            break;
                        //下向き
                        case 3:
                            cat[caty+j][catx] = i+1;
                            break;
                        //左向き
                        case 4:
                            cat[caty][catx-j] = i+1;
                            break;
                    }
                }
                i++;            
            }
            //確認用
            //console.log(cat);
        }

        window.addEventListener('resize', () => {
            this.game.scale.resize(window.innerWidth, window.innerHeight);
            back.setPosition(window.innerWidth/2,window.innerHeight/2);
            kotatu.setPosition(window.innerWidth/2,window.innerHeight/2);
            container.setPosition(window.innerWidth/2,window.innerHeight/2);
            kotatucontainer.setPosition(window.innerWidth/2,window.innerHeight/2);

            kotatufit();
            win.height=window.innerHeight;
            win.width=window.innerWidth;

        });
    

    }
    

}

export default play;