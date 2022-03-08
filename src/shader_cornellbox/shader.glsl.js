
export const vertex = /*glsl*/` 
    precision mediump float;
    precision mediump int;

    uniform mat4 modelViewMatrix;
    uniform mat4 projectionMatrix;

    attribute vec3 position;
    attribute vec4 color;

    attribute vec3 normal; 
    varying vec3 objectNormal;


    varying vec3 vPosition;
    varying vec4 vColor;

    // out vec3 Normal;

    void main() {
        objectNormal = vec3(normal);
        vPosition = position;
        vColor=color;
        gl_Position = projectionMatrix * modelViewMatrix*vec4(position,1.0);
    } 
`;

export const fragment = /*glsl*/` 
    precision mediump float;
    precision mediump int;

    uniform float time;
    uniform float ambientRatio;
    uniform float speculerRatio;
    uniform float powRatio;
    uniform float diffuseRatio;
    uniform vec3 viewPos;
   

    uniform vec3 lightPos;
    uniform  vec3 lightColor;

    varying vec3 objectNormal;

    varying vec3 vPosition;
    varying vec4 vColor;

    void main(){ 
        vec4 color=vec4(vColor);

        //color.r += sin(vPosition.x*10.0+time)*0.5 ; 
        // lightPos = vec3(20.0,20.0,20.0);
        // lightColor = vec3(1.0,1.0,1.0);
        vec3 lightDir = normalize(lightPos - vPosition);
        vec3 norm = normalize(objectNormal); 
        //================================================================
        float diff = max(dot(norm, lightDir), 0.0);
        vec3 diffuse =diffuseRatio * diff * lightColor; 
        //================================================================ 
        vec3 viewDir = normalize(viewPos - vPosition);
        vec3 reflectDir = reflect(-lightDir, norm);
        float spec = pow(max(dot(viewDir, reflectDir), 0.0),powRatio); 
        vec3 specular = speculerRatio * spec * lightColor; 
        //================================================================
        vec4 ambient = ambientRatio * color * vec4(lightColor,1.0) ;
        //================================================================
        gl_FragColor = 
            ambient +
            vec4(diffuse,1.0)+
            vec4(specular,1.0) ;
    }
`;



/*
vac3 transformed = vec3(position);
vec3 objectNormal = vec3(normalize(objectNormal));

varying ve3c3 vColor;

vColor.xyz = color.xyz;

*/