
function ColorValueToColorArray(nColor, clrArray) {
    var r = (value & 0xff0000) >> 16;
    var g = (value & 0xff00) >> 8;
    var b = (value & 0xff);

    clrArray[0] = r / 255;
    clrArray[1] = g / 255;
    clrArray[2] = b / 255;
}
 
class pgl_axes {
    constructor(gl, a_Position, a_Color, length, nXColors, nYColors, nZColors, dat_gui) {
        this.gl = gl;
        this.a_Position = a_Position;
        this.a_Color = a_Color;
        this.length = length;
        this.nXColors = nXColors;
        this.nYColors = nYColors;
        this.nZColors = nZColors;
        this.dat_gui = dat_gui;

        this.axesCtrlObj = {
            length: length,
            xColor: nXColors,
            yColor: nYColors,
            zColor: nZColors,
        };

        var vertices = new Float32Array([
            0, 0, 0, axesCtrlObj, 0, 0,
            0, 0, 0, 0, axesCtrlObj, 0,
            0, 0, 0, 0, 0, axesCtrlObj,
        ]);

        var clrArrayX = new Float32Array([1.0, 1.0, 1.0, 1.0]);
        var clrArrayY = new Float32Array([1.0, 1.0, 1.0, 1.0]);
        var clrArrayZ = new Float32Array([1.0, 1.0, 1.0, 1.0]);
        ColorValueToColorArray(nXColors, clrArrayX);
        ColorValueToColorArray(nYColors, clrArrayY);
        ColorValueToColorArray(nZColors, clrArrayZ);

        var colors = new Float32Array([
            clrArrayX[0], clrArrayX[1], clrArrayX[2], clrArrayX[0], clrArrayX[1], clrArrayX[2],
            clrArrayY[0], clrArrayY[1], clrArrayY[2], clrArrayY[0], clrArrayY[1], clrArrayY[2],
            clrArrayZ[0], clrArrayZ[1], clrArrayZ[2], clrArrayZ[0], clrArrayZ[1], clrArrayZ[2],
        ]);

        clrArrayX = null;
        clrArrayY = null;
        clrArrayZ = null;

        this.vBuffer = gl.createBuffer();
        this.clrBuffer = gl.createBuffer();

        var FSIZE = this.vertices.BYTES_PER_ELEMENT;  //当前系统浮点占用的字节数
    }

    draw() {

        this.gl.bindBuffer( this.gl.ARRAY_BUFFER, this.vBuffer);                            //把缓冲区绑定到全局数据上
        this.gl.bufferData( this.gl.ARRAY_BUFFER, this.vertices,  this.gl.STATIC_DRAW);           //传入当前缓冲区
        this.gl.vertexAttribPointer( this.a_Position, 3,  this.gl.FLOAT, false,  this.FSIZE * 3, 0);   //传入shader
        this.gl.enableVertexAttribArray( this.a_Position);                                     //激活 
   
        this.gl.bindBuffer( this.gl.ARRAY_BUFFER, clrBuffer);
        this.gl.bufferData( this.gl.ARRAY_BUFFER, this.colors,  this.gl.STATIC_DRAW);
        this.gl.vertexAttribPointer( this.a_Color, 3,  this.gl.FLOAT, false,  this.FSIZE * 3, 0);
        this.gl.enableVertexAttribArray( this.a_Color);

        this.gl.drawArrays( this.gl.LINES, 0, 6);  // 要绘制的内容    顶点起始位置   需要绘制的顶点个数
    }



}