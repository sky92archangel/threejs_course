

// import * as THREE from '../libs/three.module.js';
// import { OrbitControls } from '../libs/OrbitControls.js';

import * as shaderText from './shader.glsl.js';
import * as THREE from '../../build/three.module.js';
import { OrbitControls } from '../../jsm/controls/OrbitControls.js';
import dat from '../../jsm/libs/dat.gui.module.js'
// import {GLTFLoader} from '../../jsm/loaders/GLTFLoader.js';


var containerDom = document.querySelector("#container")
//var containerDom = document.getElementById( 'container' );

var width = window.innerWidth,
  height = window.innerHeight;

// Create a renderer and add it to the DOM.
var renderer = new THREE.WebGLRenderer();
renderer.setSize(width, height);
//document.body.appendChild(renderer.domElement);
containerDom.appendChild(renderer.domElement);
// Create the scene 
var scene = new THREE.Scene();
// Create a camera
var camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 10000);
//var camera = new THREE.OrthographicCamera(-1000,1000,1000,-1000,0.1,10000);
camera.position.z = 50;

scene.add(camera);

// Create a light, set its position, and add it to the scene.
var pointLight = new THREE.PointLight(0xff555f);
pointLight.position.set(5, 5, 10);
scene.add(pointLight);

// const ambientLight = new THREE.AmbientLight(0x111111);
// scene.add(ambientLight);

// Add OrbitControls so that we can pan around with the mouse.
//var controls = new THREE.OrbitControls(camera, renderer.domElement);
// var controls = new PointerLockControls(camera, renderer.domElement);
var controls = new OrbitControls(camera, renderer.domElement);


// document.onkeydown = function (event) {

//   switch (event.key) {
//     case 'w': controls.moveForward(0.5); break;
//     case 's': controls.moveForward(-0.5); break;
//     case 'a': controls.moveRight(-0.5); break;
//     case 'd': controls.moveRight(0.5); break;
//   }
// }

// Add axes
var axes = new THREE.AxisHelper(50);
scene.add(axes);

const torusGeometry = new THREE.TorusGeometry(2, 1, 16, 20);
// const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });

//===================================================== 

//skybox 
scene.add(makeSkybox([
  '../../texture/skybox/px.png', // right
  '../../texture/skybox/nx.png', // left
  '../../texture/skybox/py.png', // top
  '../../texture/skybox/ny.png', // bottom 
  '../../texture/skybox/pz.png', // back
  '../../texture/skybox/nz.png', // front
], 5000));


//=====================================================
// var lightPos=new THREE.Vector3(20,20,20); 
var lightColor=new THREE.Vector3(1.0,1.0,1.0); 
 
var rawShaderMat = new THREE.RawShaderMaterial(
  {
    /*
    uniforms:THREE.UniformsUtils.merge([ 
      THREE.UniformsLib["commin"],
      THREE.ShaderLib['phong'].uniforms
    ] ),
    */
    uniforms: {
      time: { value: 1.0 },
      ambientRatio:{value:0.5},
      diffuseRatio:{value:0.5},
      diffuseCut:{value:0.1},
      speculerRatio:{value:0.5},  
      powRatio:{value:32.0},  
      lightPos:{value:pointLight.position},
      lightColor:{value:pointLight.color},
      viewPos:{value:camera.position},  
    },

    vertexShader: shaderText.vertex,
    fragmentShader: shaderText.fragment,
    // vertexShader: document.getElementById('vertexShader').textContent,
    // fragmentShader: document.getElementById('fragmentShader').textContent,
    // vertexShader: document.querySelector('#vertexShader').textContent,
    // fragmentShader: document.querySelector('#fragmentShader').textContent,

    // fragmentShader:[THREE.ShaderChunk.common,THREE.ShaderChunk.bsdfs].join("\n")
  }
);
const shaderObject = new THREE.Mesh(torusGeometry, rawShaderMat);

shaderObject.position.set(-10, 0, 0);
scene.add(shaderObject);
//=====================================================

var geomSphere = new THREE.SphereGeometry(3,32,32); 
const sphereObject = new THREE.Mesh(geomSphere, rawShaderMat);
sphereObject.position.set(0, 0, 0);
scene.add(sphereObject);

//=====================================================

resize();
animate();
window.addEventListener('resize', resize);

function resize() {
  let w = window.innerWidth;
  let h = window.innerHeight;

  renderer.setSize(w, h);
  camera.aspect = w / h;
  camera.updateProjectionMatrix();
}

// Renders the scene
function animate() {

  shaderObject.rotation.x += 0.01;
  shaderObject.rotation.y += 0.01;
  shaderObject.rotation.z += 0.01;
  // rawShaderMat.uniforms.time.value += 0.5;

  renderer.render(scene, camera);
  controls.update();

  requestAnimationFrame(animate);

}
 

function makeSkybox(urls, size) {
  //创建盒子，并设置盒子的大小为( 5000, 5000, 5000 )
  var skyGeometry = new THREE.BoxGeometry(size, size, size);
  //设置盒子材质
  var materialArray = [];
  for (var i = 0; i < 6; i++)
    materialArray.push(new THREE.MeshBasicMaterial({
      map: THREE.ImageUtils.loadTexture(urls[i]),//将图片纹理贴上
      side: THREE.BackSide/*镜像翻转，如果设置镜像翻转，那么只会看到黑漆漆的一片，因为你身处在盒子的内部，所以一定要设置镜像翻转。*/
    }));
  var skyMaterial = new THREE.MeshFaceMaterial(materialArray);
  var skyBox = new THREE.Mesh(skyGeometry, skyMaterial);//创建一个完整的天空盒，填入几何模型和材质的参数
  //skyBox.scale.x=-1;也是镜像翻转，与上面的side一个效果
  // skyBox.scale.x=-1;
  return skyBox;
  // scene.add( skyBox );//在场景中加入天空盒
}

 

var gui = new dat.GUI(); 
{
  var shaderFolder = gui.addFolder("shaderFolder");
  var shaderProperty= new function () {
    this.shaderTime = 1.0; 
    this.ambientRatio = 0.8;
    this.speculerRatio=0.2;
    this.powRatio = 2.0;
    this.diffuseRatio = 0.5 ;
    this.diffuseCut = 0.2;

    this.lightColor = 0xff00ff,

    this.lightPosX = 20;
    this.lightPosY = 20;
    this.lightPosZ = 20;
  };  
  shaderFolder.add(shaderProperty, 'shaderTime',0.1,10.0).onChange(value=>{
    rawShaderMat.uniforms.time.value  = 20*value; 
  }); 
  shaderFolder.add(shaderProperty, 'ambientRatio',0.0,1.0).onChange(value=>{
    rawShaderMat.uniforms.ambientRatio.value  = value; 
  }); 
  shaderFolder.add(shaderProperty, 'speculerRatio',0.0,1.0).onChange(value=>{
    rawShaderMat.uniforms.speculerRatio.value  = value; 
  });
  shaderFolder.add(shaderProperty, 'diffuseRatio',0.0,1.0).onChange(value=>{
    rawShaderMat.uniforms.diffuseRatio.value  = value; 
  }); 
  shaderFolder.add(shaderProperty, 'diffuseCut',0.0,1.0).onChange(value=>{
    rawShaderMat.uniforms.diffuseCut.value  = value; 
  }); 
  shaderFolder.add(shaderProperty, 'powRatio',0.0,8.0).onChange(value=>{
    rawShaderMat.uniforms.powRatio.value  = value; 
  }); 

  shaderFolder.addColor(shaderProperty, 'lightColor').onChange(value=>{
    rawShaderMat.uniforms.lightColor.value = new THREE.Color(value);; 
  }); 
 
  shaderFolder.add(shaderProperty, 'lightPosX',-50.0,50.0).onChange(value=>{
    rawShaderMat.uniforms.lightPos.value.x  = value; 
  }); 
  shaderFolder.add(shaderProperty, 'lightPosY',-50,50.0).onChange(value=>{
    rawShaderMat.uniforms.lightPos.value.y  = value;  
  }); 
  shaderFolder.add(shaderProperty, 'lightPosZ',-50.0,50.0).onChange(value=>{
    rawShaderMat.uniforms.lightPos.value.z = value; 
  }); 
}


