

import * as shaderText from './dot_shader.glsl.js';
import dat from '../libs/dat.gui.module.js';

var cvs = document.getElementById('canvas'); 
const gl = cvs.getContext('webgl');

//------------------------------------------------------------- 
//#region 监听画布 
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
//------------------------------------------------------------- 

//#endregion 
//------------------------------------------------------------- 
//#region shdaer绘制
//shdaer绘制
// var vshader_src = document.getElementById('vshader_src').innerHTML;
// var fshader_src = document.getElementById('fshader_src').innerHTML;
var vshader_src = shaderText.vertex;
var fshader_src = shaderText.fragment; 
function shader_init(vshader_src, fshader_src) {
 
    var vshader = gl.createShader(gl.VERTEX_SHADER);
    gl.shaderSource(vshader, vshader_src);
    gl.compileShader(vshader);
 
    var fshader = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(fshader, fshader_src);
    gl.compileShader(fshader);

    var program = gl.createProgram();
    gl.attachShader(program, vshader);
    gl.attachShader(program, fshader);
    gl.linkProgram(program);
    gl.useProgram(program);
    return program;
}
var glProgram=shader_init(vshader_src,fshader_src); 
//#endregion
//-------------------------------------------------------------
// var axesCtrlObj = new function () {
//     this.length = 5;
//     this.xColor = 0xff0000;
//     this.yColor = 0x00ff00;
//     this.zColor = 0x0000ff;
// }
var axesCtrlObj = {
    length: 50,
    xColor: 0xff0000,
    yColor: 0x00ff00,
    zColor: 0x0000ff,
}

var a_Position = gl.getAttribLocation(glProgram, 'a_Position');
var a_Color = gl.getAttribLocation(glProgram, 'a_Color');

var axesVertices = new Float32Array([
    0, 0, 0, axesCtrlObj, 0, 0,
    0, 0, 0, 0, axesCtrlObj, 0,
    0, 0, 0, 0, 0, axesCtrlObj,
]);

var axesColors = new Float32Array([
    1.0, 0.0, 0.0, 1.0, 0.0, 0.0,
    0.0, 1.0, 0.0, 0.0, 1.0, 0.0,
    0.0, 0.0, 1.0, 0.0, 0.0, 1.0,
]);

var FSIZE = axesVertices.BYTES_PER_ELEMENT;  //当前系统浮点占用的字节数

var vAxesBuffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, vAxesBuffer);                            //把缓冲区绑定到全局数据上
gl.bufferData(gl.ARRAY_BUFFER, axesVertices, gl.STATIC_DRAW);           //传入当前缓冲区
gl.vertexAttribPointer(a_Position, 3, gl.FLOAT, false, FSIZE * 3, 0);   //传入shader
gl.enableVertexAttribArray(a_Position);                                 //激活 

console.log(a_Position);

var CSIZE = axesColors.BYTES_PER_ELEMENT;
var clrBuffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, clrBuffer);
gl.bufferData(gl.ARRAY_BUFFER, axesColors, gl.STATIC_DRAW);
gl.vertexAttribPointer(a_Color, 3, gl.FLOAT, false, CSIZE * 3, 0);
gl.enableVertexAttribArray(a_Color);

gl.drawArrays(gl.LINES, 0, 6);  // 要绘制的内容    顶点起始位置   需要绘制的顶点个数
//-------------------------------


//gl.drawArrays(gl.POINTS, 0, 1);

var gui = new dat.GUI();

//控制背景色
{
    var backgroundObj = new function () {
        this.backColor = 0xffffff;
    }
    var backgroundFolder = gui.addFolder("backgroundFolder");
    backgroundFolder.addColor(backgroundObj, 'backColor').onChange((value) => {

        var r = (value & 0xff0000) >> 16;
        var g = (value & 0xff00) >> 8;
        var b = (value & 0xff);

        gl.clearColor(r / 255, g / 255, b / 255, 1.0);
        gl.clear(gl.COLOR_BUFFER_BIT);
        //gl.drawArrays(gl.POINTS, 0, 1);

    });

}




