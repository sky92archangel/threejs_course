
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
  var orbitControls = new OrbitControls(camera, renderer.domElement);
  return orbitControls;
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
  mesh.scale.multiplyScalar(2);
  mesh.rotation.x = Math.PI / 2;
  scene.add(mesh);
  mesh.castShadow = true;
  return mesh;
}


function torus_init() {
  //物体创建
  var geometry = new THREE.TorusGeometry(15, 1, 15, 15);
  var material = new THREE.MeshLambertMaterial({ color: 0x242662 });
  var mesh = new THREE.Mesh(geometry, material);
  mesh.position.set(5, 3, 1);
  mesh.scale.multiplyScalar(4);
  mesh.rotation.x = Math.PI / 2;
  scene.add(mesh);
  mesh.castShadow = true;
  return mesh;
}


function cylinder_init() {
  //物体创建
  var geometry = new THREE.CylinderGeometry(2, 2, 5, 18, 3, false, 0, 1.5 * Math.PI);
  var material = new THREE.MeshLambertMaterial({ color: 0x242662 });
  material.side = THREE.DoubleSide;
  var mesh = new THREE.Mesh(geometry, material);
  mesh.position.set(10, 5, 1);
  mesh.scale.multiplyScalar(2);
  mesh.rotation.x = Math.PI / 2;
  scene.add(mesh);
  mesh.castShadow = true;
  return mesh;
}

function ConfigGeometry() {
  var geometry = new THREE.BufferGeometry();
  var vertices = new Float32Array([
    0, 0, 10,
    -10, -10, 0,
    10, -10, 0,

    0, 0, 10,
    -10, -10, 0,
    0, 10, 0,

    0, 0, 10,
    10, -10, 0,
    0, 10, 0,

    10, -10, 0,
    0, 10, 0,
    -10, -10, 0,

  ]);

  var attribute = new THREE.BufferAttribute(vertices, 3);
  geometry.attributes.position = attribute;
  var material = new THREE.MeshBasicMaterial({
    color: 0x0ff8ff,
    side: THREE.DoubleSide
  })
  var mesh = new THREE.Mesh(geometry, material);
  mesh.position.set(3, 6, 10);
  scene.add(mesh);

  var wireFrame = new THREE.WireframeGeometry(geometry);
  var line = new THREE.LineSegments(wireFrame);
  line.material.depth_test = true;
  line.material.transparent = false;
  line.material.opacity = 0.9;
  line.position.set(3, 6, 10);
  scene.add(line);
}

function clone_Mesh(mesh) {
  var cloneGeometry = mesh.geometry.clone();
  var clonematerial = new THREE.MeshBasicMaterial({
    color: 0xff0798,
    side: THREE.DoubleSide
  });
  var clonemesh = new THREE.Mesh(cloneGeometry, clonematerial); 
  clonemesh.translateZ(20);
  clonemesh.position.set(Math.random(),Math.random(),Math.random());
  clonemesh.name = "copy";
  scene.remove(scene.getChildByName("copy"));
  scene.add(mesh);

  var wireFrame = new THREE.WireframeGeometry(cloneGeometry);
  var line = new THREE.LineSegments(wireFrame);
  line.position.set(Math.random(),Math.random(),Math.random());
  line.material.depthTest = true;
  scene.add(line);

}
  
var guiData;
function gui_init() {
  //初始化界面的实例容器
  var ctrlInstance = new dat.GUI();
  //定义界面内的所有参数
  // guiData = {
  //   geometry:geometry,
  //   cloneMesh: clone_Mesh    //此处讲函数放到这里   用于按钮触发func的事件
  // };
  //把 界面数据 加载到 界面容器 中   
  ctrlInstance.add(guiData, 'cloneMesh');
  return ctrlInstance;
}

function plane_init() {
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

var camera = camera_init();
var orbitControls = controller_init(camera);
var axes = axes_init();
var boxGeom = box_init();
var torusGeom = torus_init();
var cylinderGeom = cylinder_init();
var configGeom = ConfigGeometry();

//-------------------------------------------  
//dat
//存放有所有需要改变的属性的对象
var controls = new function () {
  this.rotationSpeed = 0.02;
};
//创建dat.GUI，传递并设置属性
var gui = new dat.GUI();
gui.add(controls, 'rotationSpeed', 0, 0.5);  
//-------------------------------------------  
var obj = { emptyFunc : function(){} }; 
gui.add(obj,'emptyFunc').onChange(function(value) {
  console.log("onChange:" + value)
  clone_Mesh(cylinderGeom)
}); 
//-------------------------------------------  
  
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
  boxGeom.rotation.x += controls.rotationSpeed;
  boxGeom.rotation.y += 0.005;
  boxGeom.rotation.z += 0.005;

  torusGeom.rotation.x += 0.03;

  requestAnimationFrame(animate);
  renderer.render(scene, camera);
  orbitControls.update();


}
