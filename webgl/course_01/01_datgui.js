

import * as shaderText from './dot_shader.glsl.js';
import dat from '../libs/dat.gui.module.js' ;

var cvs = document.getElementById('canvas');

const gl = cvs.getContext('webgl');
 

//画布宽高
cvs.width = window.innerWidth;
cvs.height = window.innerHeight;
gl.viewport(0, 0, cvs.width, cvs.height);

//监听画布宽高
window.addEventListener('resize', resizeCanvas);
function resizeCanvas() {
    cvs.width = window.innerWidth;
    cvs.height = window.innerHeight;
    gl.viewport(0, 0, cvs.width, cvs.height);
}

//背景
gl.clearColor(0.5, 0.5, 0.3, 0.7);
gl.clear(gl.COLOR_BUFFER_BIT);


//shader
{ 
    //shdaer绘制
    // var vshader_src = document.getElementById('vshader_src').innerHTML;
    var vshader_src = shaderText.vertex;
    var vshader = gl.createShader(gl.VERTEX_SHADER);
    gl.shaderSource(vshader, vshader_src);
    gl.compileShader(vshader);


    // var fshader_src = document.getElementById('fshader_src').innerHTML;
    var fshader_src = shaderText.fragment;
    var fshader = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(fshader, fshader_src);
    gl.compileShader(fshader);

    var glProgram = gl.createProgram();
    gl.attachShader(glProgram, vshader);
    gl.attachShader(glProgram, fshader);
    gl.linkProgram(glProgram);
    gl.useProgram(glProgram);

    gl.drawArrays(gl.POINTS, 0, 1);

}
 
var gui = new dat.GUI();

var backgroundObj = new function () {
    this.backColor = 0xffffff;
}
var backgroundFolder = gui.addFolder("backgroundFolder");
backgroundFolder.addColor(backgroundObj, 'backColor').onChange((value) => {

    var r = (value&0xff0000)>>16;
    var g = (value&0xff00)>>8;
    var b = (value&0xff) ;

    gl.clearColor(r/255, g/255, b/255, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.drawArrays(gl.POINTS, 0, 1);

});