

//16进制颜色 转换 为rbg
import { ColorValueToColorArray } from './transformer.js'

class pgl_background {
    constructor(glCanvas,gui,color) {
        this.gl =glCanvas;
        this.gui = gui;
        this.clrArray  = new Float32Array([1.0, 1.0, 1.0, 1.0]); 
        this.backgroundObj = new function () { this.backColor = 0xffffff; }
        this.backgroundFolder  ;
        this.color= color; 
    }

    init(){
        ColorValueToColorArray(this.backgroundObj.backColor, this.clrArray)
        this.gl.clearColor(this.clrArray[0], this.clrArray[1], this.clrArray[2], this.clrArray[3]);
        this.gl.clear(this.gl.COLOR_BUFFER_BIT); 
    }

    gui_init(){
        this.backgroundFolder = this.gui.addFolder("backgroundFolder1");
        this.backgroundFolder
                .addColor(this.backgroundObj, 'backColor')
                .onChange((value) => { 
                    console.log(value);
                    ColorValueToColorArray(value, this.clrArray)
                    this.gl.clearColor(this.clrArray[0], this.clrArray[1], this.clrArray[2], this.clrArray[3]);
                    this.gl.clear(this.gl.COLOR_BUFFER_BIT); 
            }); 
    }  

    fresh( ){
        //console.log(value); 
        ColorValueToColorArray(this.color, this.clrArray)
        this.gl.clearColor(this.clrArray[0], this.clrArray[1], this.clrArray[2], this.clrArray[3]);
        this.gl.clear(this.gl.COLOR_BUFFER_BIT);  
    }

}


export {pgl_background}