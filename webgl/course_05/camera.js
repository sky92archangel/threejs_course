

class gpl_camera{
    constructor(gl,dat_gui,fovy,aspect,near,far) {
        this.gl = gl;
        this.dat_gui = dat_gui;
        
        this.cameraCtrlObj = {
            fovy:fovy,
            aspect:aspect,
            near:near,
            far:far,
            eyeX:2,
            eyeX:2,
            eyeX:2,

            centerX :0,
            centerX :0,
            centerX :0,

            upX :0,
            upY :1,
            upZ :0,

        };
    }
}


export {gpl_camera}