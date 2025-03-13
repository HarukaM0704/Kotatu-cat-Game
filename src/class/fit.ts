//汎用回転制御

import Phaser from "phaser";

function fit(scene:Phaser.Scene, back:Phaser.GameObjects.Image, container:Phaser.GameObjects.Container, win:{width:number, height:number}) {
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

    if(window.innerHeight>window.innerWidth){
        if(win.height<window.innerHeight){
            scene.game.scale.displaySize.setAspectRatio( window.innerHeight/window.innerWidth );
        }
        scene.cameras.main.setRotation(Math.PI * 0.5);
        
    } else {
        if(win.width<window.innerWidth){
            scene.game.scale.displaySize.setAspectRatio( window.innerWidth/window.innerHeight );
        }
        scene.cameras.main.setRotation(0);
    }
}

export default fit;