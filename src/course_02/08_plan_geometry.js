
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
  var controls = new OrbitControls(camera, renderer.domElement);
  return controls;
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
  var plane = new THREE.Mesh(planeGeometry, planeMaterial);
  plane.rotation.x = -0.5 * Math.PI
  plane.position.set(0, -10, 0)
  scene.add(plane);
  plane.receiveShadow = true;
  return plane;
}

function ambientLight_init(){
  //环境光
  var ambientLight = new THREE.AmbientLight(0x999999);
  scene.add(ambientLight)
  return ambientLight;
}

function spotLight_init(){
  //聚光灯
  var spotLight = new THREE.SpotLight(0xFFFFFF);
  spotLight.position.set(-60, 40, 45);
  spotLight.castShadow = true;
  spotLight.shadow.mapSize = new THREE.Vector2(1024,1024);
  spotLight.shadow.camera.far = 500; 
  spotLight.shadow.camera.near = 40;
  scene.add(spotLight);
  return scene;
}


function planeGeom_init(){
  //宽  高
  var planeGeom = new THREE.PlaneGeometry(30,30,5,5);
  var planeMat = new THREE.MeshBasicMaterial({ color: 0x00ff00});
  planeMat.side = THREE.DoubleSide;
  planeMat.wireframe = true;
  var plane = new THREE.Mesh(planeGeom,planeMat);
  scene.add(plane);
}


//-----------------------------------------------------------

var camera = camera_init();
var controls = controller_init(camera);
var axes=axes_init();
// var mesh = box_init();
// var plane  =plane_init();
var ambientLight = ambientLight_init();
var spotLight = spotLight_init();
var planeGeom = planeGeom_init();

//-----------------------------------------------------------

var gui = new dat.GUI(); 
//------------------------------------------------------------------
//环境光控制  
var planeFolder = gui.addFolder("planeFolder");
var planeProperty= new function () {
  this.width = 30;
  this.height = 43;
  this.widthSegments = 3;
  this.heightSegments =8;
};   
planeFolder.add(planeProperty, 'width',0,50).onChange(prop=>{
  scene.remove(planeGeom);
  planeGeom = new THREE.PlaneGeometry(
    // planeProperty.width,
    prop,
    planeProperty.height,planeProperty.widthSegments,planeProperty.height);
  var planeMat = new THREE.MeshBasicMaterial({ color: 0x00ff00});
  planeMat.side = THREE.DoubleSide;
  planeGeom = new THREE.Mesh(planeGeom,planeMat);
  scene.add(planeGeom);
  // planeGeom.width = w;
});    
planeFolder.add(planeProperty, 'height',0,50).onChange(prop=>{
  scene.remove(planeGeom);
  planeGeom = new THREE.PlaneGeometry(planeProperty.width,
    // planeProperty.height,
    prop,
    planeProperty.widthSegments,planeProperty.height);
  var planeMat = new THREE.MeshBasicMaterial({ color: 0x00ff00});
  planeMat.side = THREE.DoubleSide;
  planeGeom = new THREE.Mesh(planeGeom,planeMat);
  scene.add(planeGeom);
  // planeGeom.height = w;
});    
planeFolder.add(planeProperty, 'widthSegments',0,50).onChange(prop=>{
  scene.remove(planeGeom);
  planeGeom = new THREE.PlaneGeometry(planeProperty.width,planeProperty.height,
    // planeProperty.widthSegments,
    prop,
    planeProperty.height);
  var planeMat = new THREE.MeshBasicMaterial({ color: 0x00ff00});
  planeMat.side = THREE.DoubleSide;
  planeGeom = new THREE.Mesh(planeGeom,planeMat);
  scene.add(planeGeom);
  // planeGeom.widthSegments = w;
});    
planeFolder.add(planeProperty, 'heightSegments',0,50).onChange(prop=>{
  scene.remove(planeGeom);
  planeGeom = new THREE.PlaneGeometry(planeProperty.width,planeProperty.height,planeProperty.widthSegments,
    prop,
    // planeProperty.height
    );
  var planeMat = new THREE.MeshBasicMaterial({ color: 0x00ff00});
  planeMat.side = THREE.DoubleSide;
  planeGeom = new THREE.Mesh(planeGeom,planeMat);
  scene.add(planeGeom);
  // planeGeom.heightSegments = w;
});    

//-----------------------------------------------------------

 
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
 