
export const vertex= /*glsl*/` 
void main(){
    gl_Position = vec4(-1.0,-1.0,1.0,1.0);
    gl_PointSize = 200.0; //
}
`;
 
export const fragment= /*glsl*/` 
void main (){
    gl_FragColor = vec4(1.0, 0.8, 1.0,1.0);
}
`;