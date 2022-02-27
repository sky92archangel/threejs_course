
import * as THREE from '../../build/three.module.js';
import { OrbitControls } from '../../jsm/controls/OrbitControls.js';
// import * as Stats from "../../jsm/libs/stats.module.js";
import dat from '../../jsm/libs/dat.gui.module.js';

// import ConvexGeometry from '../../jsm/geometries/ConvexGeometry.js';
// import LatheGeometry from '../../jsm/geometries/LatheGeometry.js';
  
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
  
function ambientLight_init(){
  //环境光
  var ambientLight = new THREE.AmbientLight(0x999999);
  scene.add(ambientLight)
  return ambientLight;
}

function sphereGeom_init(){
  //半径1   水平分段32  m3  垂直分段d16 12  水平起始角度d32 1   水平扫描角度2pi  垂直起始角度d0   垂直扫描角度 dpi  
  var geometry = new THREE.SphereGeometry(0.3); 
  var material = new THREE.MeshLambertMaterial({ color: 0xff0000 });
  var mesh = new THREE.Mesh(geometry, material);  
  scene.add(mesh); 
  return mesh;
}
   
//-----------------------------------------------------------
function convex_init(){ 
  var convexPoints = [];
  for(var i = 0; i < 200; i++){
    var x = Math.random() * 40 -20 ;
    var y = Math.random() * 40 -20 ;
    var z = Math.random() * 40 -20 ;
    convexPoints.push(new THREE.Vector3(x,y,z));
  }
convexPoints.forEach(point=>{
  var sphere = sphereGeom_init();
  sphere.position.copy(point); 
});

}

function path_init(){ 
  var points = [];
  for(var i = 0; i < 100; i++){ 
    points.push(new THREE.Vector3(i*3,Math.sin(i)*5,i*3));
  }
  points.forEach(point=>{
    var sphere = sphereGeom_init();
    sphere.position.copy(point); 
  });
  return points;
}


function catmullromcurve3_init(points){
  var path = new THREE.CatmullRomCurve3(points); 

  var lineGeom = new THREE.BufferGeometry();
  lineGeom.setFromPoints(path.getPoints(500));

  var material = new THREE.LineBasicMaterial({ color: 0xff0000 });
  var line = new THREE.Line(lineGeom, material);  
  scene.add(line); 
  return path;
}
  
function tubeGeometry_init(path){
  //路径    分段64    管道半径1    管道截面分段8    是否闭合
  var geometry = new THREE.TubeGeometry(path,50,3,30,false);
  var material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
  var mesh = new THREE.Mesh(geometry, material);  
  scene.add(mesh); 
  return mesh;
}

//-----------------------------------------------------------
var camera = camera_init();
var controls = controller_init(camera);
var axes=axes_init(); 
var ambientLight = ambientLight_init(); 
var path = path_init();
catmullromcurve3_init(path);
var tubeGeom = tubeGeometry_init(path);
//-----------------------------------------------------------

var gui = new dat.GUI(); 
//-----------------------------------------------------------


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
 