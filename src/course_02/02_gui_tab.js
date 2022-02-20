
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
  mesh.position.set(Math.random() * 10,Math.random() * 10,Math.random() * 10 ); 
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

 
//================================================================
//此处是界面上的显示数据
var guiData ;
function gui_init(){
  //初始化界面的实例容器
  var ctrlInstance = new dat.GUI();
  //定义界面内的所有参数
  guiData = {
    rotationSpeed:0.01,
    jumpSpeed:0.01,
    addNewCube:box_init    //此处讲函数放到这里   用于按钮触发func的事件
  }; 
  //把 界面数据 加载到 界面容器 中
  ctrlInstance.add(guiData,'rotationSpeed',0.1);
  ctrlInstance.add(guiData,'jumpSpeed',0.1);
  ctrlInstance.add(guiData,'addNewCube');

  return ctrlInstance;
} 

//================================================================ =====
///统一创建所有内容 
var camera = camera_init();
var controls = controller_init(camera);
var axes=axes_init();
var mesh = box_init();
var plane  = plane_init();
var ambientLight = ambientLight_init();
var spotLight = spotLight_init();
 
//=============================================
//初始化界面
var ctrlInstance = gui_init();
  
resize();
animate();
window.addEventListener('resize', resize);

function resize() {
  let w = window.innerWidth;
  let h = window.innerHeight; 

  camera.aspect = w / h;
  camera.updateProjectionMatrix();
  renderer.setSize(w, h);
}
  

var gap = 0;
// Renders the scene
function animate() { 
  // mesh.rotation.x += 0.005;
  // mesh.rotation.y += 0.005;
  // mesh.rotation.z += 0.005;

  //rotation情况传入gui的数据
  mesh.rotation.x += guiData.rotationSpeed;
  mesh.rotation.y += guiData.rotationSpeed;
  mesh.rotation.z += guiData.rotationSpeed;
  //jump情况传入gui的数据
  gap+= guiData.jumpSpeed;
  mesh.position.x = 25 + (20*(Math.sin(gap)));
  mesh.position.y = 6 + (20*Math.abs(Math.cos(gap))); 
  //
  // ctrlInstance.add(addNewBox,"add New box") 

  requestAnimationFrame(animate);
  renderer.render(scene, camera);  
  controls.update();
  
}
 