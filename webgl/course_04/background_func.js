//16进制颜色 转换 为rbg
import { ColorValueToColorArray } from './transformer.js'

function background_clear(gl) {
    gl.clearColor(0.5, 0.8, 0.8, 0.7);
    gl.clear(gl.COLOR_BUFFER_BIT);
}
  
function background_gui_color_init(gl,gui,backgroundObj, propName) {
    var clrArray = new Float32Array([1.0, 1.0, 1.0, 1.0]);

    var backgroundFolder = gui.addFolder("backgroundFolder2");
    backgroundFolder
        .addColor(backgroundObj, propName)
        .onChange((value) => {
            console.log(value);
            ColorValueToColorArray(value, clrArray)
            gl.clearColor(clrArray[0], clrArray[1], clrArray[2], clrArray[3]);
            gl.clear(gl.COLOR_BUFFER_BIT);
        });
}  


export {background_clear}
export {background_gui_color_init}
