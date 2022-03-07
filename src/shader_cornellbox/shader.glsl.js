
export const vertex = /*glsl*/` 
    precision mediump float;
    precision mediump int;

    uniform mat4 modelViewMatrix;
    uniform mat4 projectionMatrix;

    attribute vec3 position;
    attribute vec4 color;

    varying vec3 vPosition;
    varying vec4 vColor;

    void main() {
        vPosition = position;
        vColor=color;
        gl_Position = projectionMatrix * modelViewMatrix*vec4(position,1.0);
    } 
`;

export const fragment = /*glsl*/` 
    precision mediump float;
    precision mediump int;

    uniform float time;

    varying vec3 vPosition;
    varying vec4 vColor;

    void main(){
        vec4 color=vec4(vColor);
        color.r += sin(vPosition.x*10.0+time)*0.5 ;
        gl_FragColor = color;
    }
`;