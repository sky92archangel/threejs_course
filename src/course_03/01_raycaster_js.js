
import * as THREE from '../../build/three.module.js';
import { OrbitControls } from '../../jsm/controls/OrbitControls.js';
// import * as Stats from "../../jsm/libs/stats.module.js";
import {_raycaster_} from './raycaster_class.js'; 
// var raycaster_class = require('raycaster_class');
  

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

function camera_init() {
  // Create a camera
  var camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 10000);
  //var camera = new THREE.OrthographicCamera(-1000,1000,1000,-1000,0.1,10000);
  camera.position.z = 50;
  scene.add(camera);
  return camera;
}

function controller_init(camera) {
  // Add OrbitControls so that we can pan around with the mouse.
  var controls = new OrbitControls(camera, renderer.domElement);
  return controls;
}

function axes_init() {
  // Add axes  坐标创建
  var axes = new THREE.AxisHelper(50);
  scene.add(axes);
  return axes;
}

function box_init() {
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

function plane_init() {
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

function ambientLight_init() {
  //环境光
  var ambientLight = new THREE.AmbientLight(0x999999);
  scene.add(ambientLight)
  return ambientLight;
}

function spotLight_init() {
  //聚光灯
  var spotLight = new THREE.SpotLight(0xFFFFFF);
  spotLight.position.set(-60, 40, 45);
  spotLight.castShadow = true;
  spotLight.shadow.mapSize = new THREE.Vector2(1024, 1024);
  spotLight.shadow.camera.far = 500;
  spotLight.shadow.camera.near = 40;
  scene.add(spotLight);
  return scene;
}

// import * from raycaster_class
var _raycaster = new _raycaster_(container,scene,camera);
containerDom.onclick = _raycaster.raycaster_init
containerDom.onmousemove = select_object;
//----------------------------------------------------------------------
containerDom.onclick = select_object;
function select_object(e) {
  e.preventDefault();

  var objects= scene.children; 
  //将鼠标点击位置的屏幕坐标转成threejs中的标准坐标,具体解释见代码释义
  var mousex = (e.clientX / window.innerWidth) * 2 - 1;
  var mousey = -(e.clientY / window.innerHeight) * 2 + 1;
  //新建一个三维单位向量 假设z方向就是0.5
  //根据照相机，把这个向量转换到视点坐标系
  // var vector = new THREE.Vector3(mouse.x, mouse.y, 0.5).unproject(camera);
  var vector = new THREE.Vector3(mousex, mousey, 0.5).unproject(camera);

  //在视点坐标系中形成射线,射线的起点向量是照相机， 射线的方向向量是照相机到点击的点，这个向量应该归一标准化。
  var raycaster = new THREE.Raycaster(camera.position, vector.sub(camera.position).normalize());

  //射线和模型求交，选中一系列直线
  var intersects = raycaster.intersectObjects(objects);
  console.log('imtersrcts=' + intersects)

  if (intersects.length > 0) {
    //选中第一个射线相交的物体
    // SELECTED = intersects[0].object;
    var intersected = intersects[0].object;
    console.log("cool")
    console.log(intersects[0].object)
    console.log(intersects[0].object.rotation)

    intersects[0].object.material.color.set(0xff00ff *Math.random() )
  }
  else {
    console.log("没捕获到对象");
  }
  
}
//----------------------------------------------------------------------

var camera = camera_init();
var controls = controller_init(camera);
var axes = axes_init();
var mesh = box_init();
var plane = plane_init();
var ambientLight = ambientLight_init();
var spotLight = spotLight_init();



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
  mesh.rotation.x += 0.005;
  mesh.rotation.y += 0.005;
  mesh.rotation.z += 0.005;


  requestAnimationFrame(animate);
  renderer.render(scene, camera);
  controls.update();

}
