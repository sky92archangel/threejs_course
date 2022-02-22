
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
  mesh.position.set(Math.random() * 10, Math.random() * 10, Math.random() * 10);
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


//================================================================
//此处是界面上的显示数据
var guiData;
function gui_builder() {
  //初始化界面的实例容器
  var guiInstance = new dat.GUI();
  //定义界面内的所有参数
  guiData = {
    rotationSpeed: 0.01,
    jumpSpeed: 0.01,
    addNewCube: box_init    //此处讲函数放到这里   用于按钮触发func的事件
  };
  //把 界面数据 加载到 界面容器 中
  guiInstance.add(guiData, 'rotationSpeed', 0.1);
  guiInstance.add(guiData, 'jumpSpeed', 0.1);
  guiInstance.add(guiData, 'addNewCube');

  //--------------------------------------------------------
  //存放有所有需要改变的属性的对象
  var controlRotationSpeedText = new function () {
    this.rotationSpeed = 0.02;
  };
  guiInstance.add(controlRotationSpeedText, 'rotationSpeed');
  //--------------------------------------------------------
  //可以设置最小值最大值范围，则显示为 slider 滑块组件（当然右侧还是有 input 输入）
  var controlRotationSpeedSlider = new function () {
    this.rotationSpeed = 0.02;
  };
  guiInstance.add(controlRotationSpeedSlider, 'rotationSpeed', 0, 0.5);
  //--------------------------------------------------------
  //还可以只单独限制最小值或者最大值，这个同样为一个 input 输入框。
  var controlRotationSpeedXY = new function () {
    this.rotationSpeedX = 0.02;
    this.rotationSpeedY = 0.02;
  };
  guiInstance.add(controlRotationSpeedXY, 'rotationSpeedX').min(0);
  guiInstance.add(controlRotationSpeedXY, 'rotationSpeedY').max(10);
  //--------------------------------------------------------
  //可以配合 step 限制步长。
  var controlRotationSpeedXYZ = new function () {
    this.rotationSpeedX = 0.02;
    this.rotationSpeedY = 0.02;
    this.rotationSpeedZ = 0.02;
  };
  guiInstance.add(controlRotationSpeedXYZ, 'rotationSpeedX').step(0.5);
  guiInstance.add(controlRotationSpeedXYZ, 'rotationSpeedY', 0, 3).step(0.5);
  guiInstance.add(controlRotationSpeedXYZ, 'rotationSpeedZ').max(10).step(0.5);
  //--------------------------------------------------------
  //如果数字只是有限的几种固定值，那还可以使用下拉框的形式。
  var controlRotationSpeedComboBox = new function () {
    this.rotationSpeed = 0;
  };
  guiInstance.add(controlRotationSpeedComboBox, 'rotationSpeed', { Stopped: 0, Slow: 0.02, Fast: 5 });
  //--------------------------------------------------------
  //默认情况下就是一个 input 输入框。
  var controlText = new function () {
    this.site = "zhouht.com"
  };
  guiInstance.add(controlText, 'site');
  //--------------------------------------------------------
  var controlTextComboBox = new function () {
    this.site = "zhouht.com"
  };
  guiInstance.add(controlTextComboBox, 'site', ['google.com', 'zhouht.com', '163.com']);
  //--------------------------------------------------------
  var controlBool = new function () {
    this.visible = true
  };
  guiInstance.add(controlBool, 'visible');
  //--------------------------------------------------------
  var controlFunc = new function () {
    this.hello = function () {
      alert("欢迎访问 zhouht.com");
    }
  };
  guiInstance.add(controlFunc, 'hello');
  //--------------------------------------------------------
  var controls = new function () {
    this.color0 = "#ffae23"; // CSS string
    this.color1 = [0, 128, 255]; // RGB array
    this.color2 = [0, 128, 255, 0.3]; // RGB with alpha
    this.color3 = { h: 350, s: 0.9, v: 0.3 }; // Hue, saturation, value
  };
  var gui = new dat.GUI();
  gui.addColor(controls, 'color0');
  gui.addColor(controls, 'color1');
  gui.addColor(controls, 'color2');
  gui.addColor(controls, 'color3');
  //--------------------------------------------------------
  var controlListener = new function () {
    this.speed = 1;
  };
  var gui = new dat.GUI();
  var speedController = gui.add(controlListener, 'speed', 0, 5);
  //对应控制项值改变时响应（比如拖动滑块过程中）
  speedController.onChange(function (value) {
    console.log("onChange:" + value)
  });
  //对应控制项值修改完毕响应
  speedController.onFinishChange(function (value) {
    console.log("onFinishChange" + value)
  });
  //--------------------------------------------------------
  //创建按钮
  var obj = { add: box_init };
  gui.add(obj, 'add');
  //--------------------------------------------------------
  //带有其他参数的按钮
  var obj = { emptyFunc: function () { } };
  gui.add(obj, 'emptyFunc').onChange(function (value) {
    console.log("onChange:" + value)
    clone_Mesh(cylinderGeom)  //真正需要操作的动作在这里
  });
  //--------------------------------------------------------
  return guiInstance;
}
 

//================================================================ =====
///统一创建所有内容 
var camera = camera_init();
var controls = controller_init(camera);
var axes = axes_init();
var mesh = box_init();
var plane = plane_init();
var ambientLight = ambientLight_init();
var spotLight = spotLight_init();

//=============================================
//初始化界面
var guiInstance = gui_builder();

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
  gap += guiData.jumpSpeed;
  mesh.position.x = 25 + (20 * (Math.sin(gap)));
  mesh.position.y = 6 + (20 * Math.abs(Math.cos(gap)));
  //
  // guiInstance.add(addNewBox,"add New box") 

  requestAnimationFrame(animate);
  renderer.render(scene, camera);
  controls.update();

}
