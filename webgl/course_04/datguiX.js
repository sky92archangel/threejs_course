

import * as shaderText from './dot_shader.glsl.js';
import dat from '../libs/dat.gui.module.js';  
import {class_background} from './background_class.js';
import { pgl_axes } from './axes.js'; 

var cvs = document.getElementById('canvas');
const gl = cvs.getContext('webgl');

var gui = new dat.GUI();
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

//控制背景色
var backgroundObj = new function () {
    this.backColor = 0xffffff;
} 

var cls_background = new class_background(gl,gui,backgroundObj);

//背景
cls_background.background_clear();
cls_background.background_gui_color_init('backColor'); 
// gl.clearColor(0.5, 0.8, 0.8, 0.7);
// gl.clear(gl.COLOR_BUFFER_BIT);
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
var glProgram = shader_init(vshader_src, fshader_src);
//#endregion  
//------------------------------------------------------------- 

//轴属性   用于动态控制
var axesCtrlObj = {
    length: 50,
    xColor: 0xff0000,
    yColor: 0x00ff00,
    zColor: 0x0000ff,
    // colors:[ 0xff0000,  0x00ff00, 0x0000ff ]
}
 
var a_Position = gl.getAttribLocation(glProgram, 'a_Position');   //将顶点传给shader
var a_Color = gl.getAttribLocation(glProgram, 'a_Color');

var axes = new pgl_axes(gl, a_Position, a_Color, axesCtrlObj.length,
    axesCtrlObj.xColor, axesCtrlObj.yColor, axesCtrlObj.zColor, gui)

axes.draw();
   
{
    var axesColorFolder = gui.addFolder("axesColorFolder");
    // axesColorFolder.addColor(axesCtrlObj, 'xColor').onChange((value) => {  });
    axesColorFolder.addColor(axesCtrlObj, 'xColor');
    axesColorFolder.addColor(axesCtrlObj, 'yColor');
    axesColorFolder.addColor(axesCtrlObj, 'zColor');
    axesColorFolder.add(axesCtrlObj, 'length');
}
 
function draw() {

    cls_background.background_clear(backgroundObj.backColor); 
 
    axes = new pgl_axes(gl, a_Position, a_Color, axesCtrlObj.length,
        axesCtrlObj.xColor, axesCtrlObj.yColor, axesCtrlObj.zColor, gui)

    axes.draw();

}

renderScene();

function renderScene() {
    draw();
    requestAnimationFrame(renderScene);
}