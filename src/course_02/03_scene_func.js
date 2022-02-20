
import * as THREE from '../../build/three.module.js';
import { OrbitControls } from '../../jsm/controls/OrbitControls.js';
// import * as Stats from "../../jsm/libs/stats.module.js";
  
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
  mesh.position.set(Math.random()*10, Math.random()*10, Math.random()*10);
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

function findObject(objName){
  var findObj = scene.getObjectByName(objName,false);
  console.log(findObj.position);
  return findObj;
}

function removeObject(findObj){
  if(findObj instanceof THREE.Mesh){
    scene.remove(findObj);
  }
}
  
//将传入的obj进行过滤和旋转
function rotateMethod01(obj) {
  if(obj instanceof THREE.Mesh && obj != plane){
    obj.rotation.x += 0.01;
    obj.rotation.y += 0.01;
  }
}

//场景雾化效果
function sceneFog(){
  scene.fog = new THREE.FogExp2(0x990055,0.01);
  // scene.fog = new THREE.FogExp2(0xff00ff,0.01);
// scene.fog = new THREE.Fog(0xffffff,0.01,0.02);
}

//强制整个场景所有物使用相同材质
function overrideSceneMat(){
  scene.overrideMaterial = new THREE.MeshLambertMaterial({color:0x000990});
}

var camera = camera_init();
var controls = controller_init(camera);
var axes=axes_init();
var mesh = box_init();
var mesh2 = box_init();
var plane  =plane_init();
var ambientLight = ambientLight_init();
var spotLight = spotLight_init();
sceneFog();
// overrideSceneMat();

 
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

  //所有场景内符合情况的都进行统一动作
  scene.traverse(obj=>{rotateMethod01(obj)}); 

  requestAnimationFrame(animate);
  renderer.render(scene, camera);  
  controls.update();
  
}
 