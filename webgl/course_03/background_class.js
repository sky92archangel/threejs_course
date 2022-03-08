//16进制颜色 转换 为rbg
import { ColorValueToColorArray } from './transformer.js'

class class_background {
    constructor(glCanvas, gui, backgroundObj) {
        this.gl = glCanvas;
        this.gui = gui;
        this.clrArray= new Float32Array([1.0, 1.0, 1.0, 1.0]); ; 
        this.backgroundObj = backgroundObj;
        this.backgroundFolder;
        // this.color= color; 
    }

    background_clear(value) {
        // console.log('efe');
        // var clrArray = new Float32Array([1.0, 1.0, 1.0, 1.0]);
        // this.gl.clearColor(0.5, 0.8, 0.8, 0.7);
        // this.gl.clear(this.gl.COLOR_BUFFER_BIT);
        ColorValueToColorArray(value, this.clrArray)
        this.gl.clearColor(this.clrArray[0], this.clrArray[1], this.clrArray[2], this.clrArray[3]);
        this.gl.clear(this.gl.COLOR_BUFFER_BIT);
        // clrArray = null;
    }

    background_gui_color_init(propName) {
        //var clrArray = new Float32Array([1.0, 1.0, 1.0, 1.0]);
        this.backgroundFolder = this.gui.addFolder("backgroundFolder");
        this.backgroundFolder
            .addColor(this.backgroundObj, propName)
            .onChange((value) => {
                console.log(value);
                ColorValueToColorArray(value, this.clrArray)
                this.gl.clearColor(this.clrArray[0], this.clrArray[1], this.clrArray[2], this.clrArray[3]);
                this.gl.clear(this.gl.COLOR_BUFFER_BIT);
            });

        // clrArray = null;
    }
}

export { class_background }
