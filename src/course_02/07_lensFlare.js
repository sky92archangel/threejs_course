
import * as THREE from '../../build/three.module.js';
import { OrbitControls } from '../../jsm/controls/OrbitControls.js';
// import * as Stats from "../../jsm/libs/stats.module.js";
import dat from '../../jsm/libs/dat.gui.module.js'
import {RectAreaLightUniformsLib} from '../../jsm/lights/RectAreaLightUniformsLib.js'
import {RectAreaLightHelper} from '../../jsm/helpers/RectAreaLightHelper.js'  

import {Lensflare, LensflareElement} from '../../jsm/objects/Lensflare.js'

var containerDom = document.getElementById("container");

var width = window.innerWidth,
  height = window.innerHeight;

// Create a renderer and add it to the DOM.
var renderer = new THREE.WebGLRenderer();
renderer.shadowMap.enabled = true;
renderer.setSize(width, height);
//document.body.appendChild(renderer.domElement);
containerDom.appendChild(renderer.domElement);

// Create the scene 
var scene = new THREE.Scene();

function camera_init(){
  // Create a camera
  var camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 10000);
  //var camera = new THREE.OrthographicCamera(-1000,1000,1000,-1000,0.1,10000);
  camera.position.z = 50; 
  scene.add(camera);
  return camera;
}

function controller_init(camera){
  // Add OrbitControls so that we can pan around with the mouse.
  var orbitControls = new OrbitControls(camera, renderer.domElement);
  return orbitControls;
}
  
function axes_init(){ 
  // Add axes  坐标创建
  var axes = new THREE.AxisHelper(50);
  scene.add(axes);
  return axes;
}

function box_init(){ 
  //物体创建
  var geometry = new THREE.BoxGeometry(5, 5, 1);
  var cubeMaterial = new THREE.MeshLambertMaterial();
  var mesh = new THREE.Mesh(geometry, cubeMaterial);
  mesh.position.set(1, 3, 0);
  mesh.scale.multiplyScalar(4);
  mesh.rotation.x = Math.PI / 2;
  scene.add(mesh);
  mesh.castShadow = true;
  return mesh;
}

function plane_init(){ 
  //地面创建
  var planeGeometry = new THREE.PlaneGeometry(100, 100);
  var planeMaterial = new THREE.MeshLambertMaterial({ color: 0x555999 });
  planeMaterial.side = THREE.DoubleSide;
  var plane = new THREE.Mesh(planeGeometry, planeMaterial);
  plane.rotation.x = -0.5 * Math.PI
  plane.position.set(0, -10, 0)
  scene.add(plane);
  plane.receiveShadow = true;
  return plane;
}

function hemisphereLight_init(){
  //天空色 地面色  强度
  var hemisphereLight = new THREE.HemisphereLight(0xffffff,0x00ff0f,10);
  scene.add(hemisphereLight)
  return hemisphereLight;
}

//==================================================
//创建环境光
function ambientLight_init(){
  //环境光
  var ambientLight = new THREE.AmbientLight(0x111111);
  scene.add(ambientLight)
  return ambientLight;
}   

function AreaLight(){
  RectAreaLightUniformsLib.init();
  //颜色 亮度  宽 高
  rectLight = new THREE.RectAreaLight(0xffffff,5,3,10);
  rectLight.position.set(5,5,0);
  rectLight.lookAt(0,0,0);
  scene.add(rectLight); 
  return rectLight; 
}

function floor_init(){
  const geoFloor = new THREE.BoxGeometry(2000,0.1,1000);
  const matStdFloor = new THREE.MeshStandardMaterial({color:0xffffff,roughness:0.2,metalness:0.2});
  var meshStdFloor = new THREE.Mesh(geoFloor,matStdFloor);
  meshStdFloor.position.set(0,-20,0);
  scene.add(meshStdFloor);
  return meshStdFloor;
}

//   '../texture/wood.png'
function texture_init(path){
  var loader = new THREE.TextureLoader();
  var tt;
  tt=
  loader.load(  
    path, function (texture) {
      // console.log(texture);
      // material.map=texture;
      // material.needsUpdate = true;
      // tt = texture;     
    },
    undefined,
    function(err){
      console.error('error');
    }
  );
  return tt;
}

function lensflare_init(textrues){
  //纹理贴图 光晕尺寸  光源距离值0-1  光晕颜色
  var lensflare = new Lensflare();
  for(var i = 0; i < 3; i++)
  {
    // console.log(textures[i]);
    lensflare.addElement(
      new LensflareElement(textrues[i],500/(i+1),i*0.1));
  }
   return lensflare ;
}
//==================================================
var camera = camera_init();
var controls = controller_init(camera);
var axes=axes_init(); 
var ambientLight = ambientLight_init(); 
var rectLight = AreaLight();
var floor = floor_init();
var hemisphereLight = hemisphereLight_init();

var textrue0 = texture_init('../../texture/skybox/ny.png');
var textrue1 = texture_init('../../texture/skybox/ny.png');
var textrue2 = texture_init('../../texture/skybox/ny.png'); 
var textrueList = new Array([textrue0,textrue1,textrue2]); 
// console.log(textrue0);

var lensflare  = lensflare_init(textrueList);

hemisphereLight.add(lensflare);
//------------------------------------------------------------------
//控制
//------------------------------------------------------------------
var gui = new dat.GUI(); 
//------------------------------------------------------------------
//环境光控制  
var ambientLightFolder = gui.addFolder("ambientLightGroup");
var ambientLightProperty= new function () {
  this.intensity = 0.02;
  this.ambientColor = 0x3462343;
};   
ambientLightFolder.add(ambientLightProperty, 'intensity',0,5).onChange(intensity=>{
  ambientLight.intensity = intensity;
});    
ambientLightFolder.addColor(ambientLightProperty, 'ambientColor' ).onChange(clr=>{
  console.log(clr);
  ambientLight.color = new THREE.Color(clr);
});   
//------------------------------------------------------------------
// var areaLightFolder = gui.addFolder("areaLightFolder");
// var areaLightPorperty= new function () {
//   this.intensity = 0.02;
//   this.areaColor = 0x3462343;
//   this.areaWidth = 10;
// };   
// areaLightFolder.add(areaLightPorperty, 'intensity',0,50).onChange(intensity=>{
//   rectLight.intensity = intensity;
// });    
// areaLightFolder.addColor(areaLightPorperty, 'areaColor' ).onChange(clr=>{
//   console.log(clr);
//   rectLight.color = new THREE.Color(clr);
// });   
// areaLightFolder.add(areaLightPorperty, 'areaWidth',0,100).onChange(w=>{
//   rectLight.width = w;
// });  
// var rectLightHelper = new RectAreaLightHelper( rectLight );
// scene.add( rectLightHelper );
//------------------------------------------------------------------
var hemisphereLightFolder =  gui.addFolder('hemisphereLightGroup');
var hemisphereLightProperty = new function(){
  this.hemiVisibility = true;
  this.hemiSkyColor = 0xff4422;
  this.hemiGroundColor = 0xff4422;
  this.hemiIntensity = 1;  
}
hemisphereLightFolder.add(hemisphereLightProperty,'hemiVisibility' ).onChange(v=>{
  hemisphereLight.visible = v;
});
hemisphereLightFolder.addColor(hemisphereLightProperty,'hemiSkyColor').onChange(clr=>{
  hemisphereLight.color = new THREE.Color(clr);
});
hemisphereLightFolder.addColor(hemisphereLightProperty,'hemiGroundColor').onChange(clr=>{
  hemisphereLight.groundColor = new THREE.Color(clr);
});
hemisphereLightFolder.add(hemisphereLightProperty,'hemiIntensity' ,0,10).onChange(ins=>{
  hemisphereLight.intensity = ins;
});
//----------------------------------------------------------------

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
  
  requestAnimationFrame(animate);
  renderer.render(scene, camera);  
  controls.update();
 
   
}
 