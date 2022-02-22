
import * as THREE from '../../build/three.module.js';
import { OrbitControls } from '../../jsm/controls/OrbitControls.js';
// import * as Stats from "../../jsm/libs/stats.module.js";

import dat from '../../jsm/libs/dat.gui.module.js'
  
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

//创建环境光
function ambientLight_init(){
  //环境光
  var ambientLight = new THREE.AmbientLight(0x111111);
  scene.add(ambientLight)
  return ambientLight;
}
  
//创建聚光灯
function spotLight_init(){
  //聚光灯
  var spotLight = new THREE.SpotLight(0xFFFFFF);   //六个参数 ：  光照颜色  强度  最大距离  散射角度   光锥半影衰减百分比   光照距离衰减量
  spotLight.intensity = 0.5;
  spotLight.position.set(60, 40, 45);  
  spotLight.castShadow = true;
  spotLight.shadow.mapSize = new THREE.Vector2(1024,1024);
  spotLight.shadow.camera.far = 500; 
  spotLight.shadow.camera.near = 10;
  scene.add(spotLight);
  return scene;
}


var camera = camera_init();
var controls = controller_init(camera);
var axes=axes_init();
var mesh = box_init();
var plane  =plane_init();
var ambientLight = ambientLight_init();
var spotLight = spotLight_init(); 


//------------------------------------------------------------------
//控制
//------------------------------------------------------------------
var gui = new dat.GUI(); 
//------------------------------------------------------------------
//环境光控制  
var ambientLightFolder = gui.addFolder("ambientLightGroup");
var controlAmbientLight= new function () {
  this.intensity = 0.02;
  this.ambientColor = 0x3462343;
};   
// gui.add(controlAmbientLight, 'intensity', 0, 0.5);  // 另一种写法
ambientLightFolder.add(controlAmbientLight, 'intensity',0,0.5).onChange(intensity=>{
  ambientLight.intensity = intensity;
});    
ambientLightFolder.addColor(controlAmbientLight, 'ambientColor' ).onChange(clr=>{
  console.log(clr);
  ambientLight.color = new THREE.Color(clr);
});   
//------------------------------------------------------------------
var spotLightFolder = gui.addFolder("spotLightGroup");
var controlSpotLight= new function () {
  this.intensity = 0.02;
  this.spotColor = 0x000FF0;
};  
spotLightFolder.add(controlSpotLight, 'intensity',0,5).onChange(intensity=>{
  spotLight.intensity = intensity;
});    
spotLightFolder.addColor(controlSpotLight, 'spotColor' ).onChange(clr=>{
  console.log(clr);
  spotLight.color = new THREE.Color(clr);
});  
//------------------------------------------------------------------

//------------------------------------------------------------------
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
  // mesh.rotation.x += 0.005;
  // mesh.rotation.y += 0.005;
  // mesh.rotation.z += 0.005;
  // spotLight.position.x+=0.1; 

  // ambientLight.intensity = controlAmbientLight.intensity;

  requestAnimationFrame(animate);
  renderer.render(scene, camera);  
  controls.update();
 
   
}
 