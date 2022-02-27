
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

function createSprites() {
  for (var i = -10; i < 10; i++) {
    for (var j = -10; j < 10; j++) {
      for (var k = -10; k < 10; k++) {
        var material = new THREE.SpriteMaterial({
          opacity: 0.2,
          transparent: true,
          color: 0xffffff * Math.random(),
        });

        var sprite = new THREE.Sprite(material);
        sprite.position.set(i * 1, j * 1, k * 10)
        scene.add(sprite);
      }
    }
  }
}

//创建点云
function createPoints() {
  var geom = new THREE.BufferGeometry();
  var material = new THREE.PointsMaterial({
    size: 0.1,
    vertexShader: true,
    color: Math.random() * 0xffffff,
  });

  //计算位置和颜色
  var positions = []
  var colors = []
  for (var i = -30; i < 30; i++) {
    for (var j = -30; j < 30; j++) {
      for (var k = -30; k < 30; k++) {

        positions.push(i * 1, j * 1, k * 1)
        var clr = new THREE.Color(Math.random() * 0xffffff);
        colors.push(clr.r, clr.g, clr.b);
      }
    }
  }

  //放入显卡缓存
  geom.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  geom.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));

  // var clouds = new THREE.PointCloud(material);
  var clouds = new THREE.Points(geom, material);
  scene.add(clouds)
}

//
function PointCloud_init(points, colors) {
  var geom = new THREE.BufferGeometry();
  var material = new THREE.PointsMaterial({
    size: 0.02,
    vertexShader: true,
    //color: Math.random() * 0xffffff,
  });
  //放入显卡缓存
  geom.setAttribute('position', new THREE.Float32BufferAttribute(points, 3));
  geom.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
  // var clouds = new THREE.PointCloud(material);
  var clouds = new THREE.Points(geom, material);
  scene.add(clouds)
}


var m_points = [];
var m_colors = [];
function mandelbrot_init() {
  for (var x = -2.1; x < 1.0; x += 0.01) {
    for (var z = -1.0; z < 1.0; z += 0.01) {
      var zz = new THREE.Vector3(0.0, 0.0, 0.0);
      var c = new THREE.Vector3(x, 0.0, z);
      var iterations = 0;
      var isOK = true;
      while (  iterations < 50) {
        // if(zz.normalize() > 500) isOK=false; 
        zz = complex_sqr(zz) + c;
        iterations++;
      }
      
      m_points.push(zz.x, 0, zz.z);
      m_colors.push(20, 1 - iterations * 0.02, 90);
    }
  }
}

function complex_sqr(zz) {
  zz = new THREE.Vector3(
    zz.x * zz.x - zz.z *zz.z,
    0,
    zz.z * zz.x * 2);
    console.log(zz);
  return zz;
}

//---------------------------------------------------

var camera = camera_init();
var controls = controller_init(camera);
var axes = axes_init();
var plane = plane_init();
var ambientLight = ambientLight_init();
var spotLight = spotLight_init();
// createSprites();
// createPoints();
mandelbrot_init();
console.log(m_points);
PointCloud_init(m_points, m_colors);

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
