{
    var canvasElement = document.getElementById('webgl');
    var gl = canvasElement.getContext('webgl');
    //顶点着色器源码
    var vertexShaderSource = '' +
        //attribute声明vec4类型变量apos
        'attribute vec4 apos;' +
        'void main(){' +
        //顶点坐标apos赋值给内置变量gl_Position
        '   gl_Position =apos;' +
        '}';
    //片元着色器源码
    var fragShaderSource = '' +
        'void main(){' +
        '   gl_FragColor = vec4(1.0,0.0,0.0,1.0);' +
        '}';
    //初始化着色器
    var program = initShader(gl, vertexShaderSource, fragShaderSource);
    //获取顶点着色器的位置变量apos
    var aposLocation = gl.getAttribLocation(program, 'apos');

    //9个元素构建三个顶点的xyz坐标值
    var data = new Float32Array([
        0, 0, 1,
        0, 1, 0,
        1, 0, 0
    ]);

    //创建缓冲区对象
    var buffer = gl.createBuffer();
    //绑定缓冲区对象
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    //顶点数组data数据传入缓冲区
    gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW);
    //第二个代码案例vertexAttribPointer方法的第二个参数是2，这里是3
    gl.vertexAttribPointer(aposLocation, 3, gl.FLOAT, false, 0, 0);
    //允许数据传递
    gl.enableVertexAttribArray(aposLocation);
    //开始绘制图形，使用TRIANGLES模式，三点构成一个平面
    gl.drawArrays(gl.TRIANGLES, 0, 3);

    //声明初始化着色器函数
    function initShader(gl, vertexShaderSource, fragmentShaderSource) {
        var vertexShader = gl.createShader(gl.VERTEX_SHADER);
        var fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
        gl.shaderSource(vertexShader, vertexShaderSource);
        gl.shaderSource(fragmentShader, fragmentShaderSource);
        gl.compileShader(vertexShader);
        gl.compileShader(fragmentShader);
        var program = gl.createProgram();
        gl.attachShader(program, vertexShader);
        gl.attachShader(program, fragmentShader);
        gl.linkProgram(program);
        gl.useProgram(program);
        return program;
    }

}