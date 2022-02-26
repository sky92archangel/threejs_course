
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

//==================================================
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
  return spotLight;
}
function pointLight_init(){
  var pointLight = new THREE.PointLight(0xffffff,6,160);
  pointLight.position.set(-20,20,20);
  pointLight.castShadow = true;
  scene.add(pointLight); 
  return pointLight; 
}

function sphere_init(){  
  var sphereGeom = new THREE.SphereGeometry(0.2);
  var sphereMat = new THREE.MeshBasicMaterial({color:0xff0000});
  var sphereMesh = new THREE.Mesh(sphereGeom, sphereMat);
  sphereMesh.castShadow = true;  
  scene.add(sphereMesh);
  return sphereMesh ;
}

//平行光
function directionLight_init(){
  var directionLight = new THREE.DirectionalLight(0xffffff,2);
  directionLight.castShadow = true;
  directionLight.shadow.mapSize.width = 1024;
  directionLight.shadow.mapSize.height = 1024;
  directionLight.position.set(50,50,5-50);
  scene.add(directionLight);
  return directionLight;
}


//半球光
function hemisphereLight_init(){
  //天空色 地面色  强度
  var hemisphereLight = new THREE.HemisphereLight(0xffffff,0x00ff0f,1);
  scene.add(hemisphereLight)
  return hemisphereLight;
}

//==================================================

var camera = camera_init();
var controls = controller_init(camera);
var axes=axes_init();
var mesh = box_init();
var plane  =plane_init();
var ambientLight = ambientLight_init();
var spotLight = spotLight_init(); 
var pointLight = pointLight_init();
var sphereMesh  = sphere_init();
sphereMesh.position.copy(pointLight.position);
var directionLight = directionLight_init();
directionLight.target =mesh;
var hemisphereLight = hemisphereLight_init();
//------------------------------------------------------------------
//控制
//------------------------------------------------------------------
var gui = new dat.GUI(); 
//------------------------------------------------------------------
//环境光控制  
{
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
}
//------------------------------------------------------------------
//聚光灯控制
{
  var spotLightFolder = gui.addFolder("spotLightGroup");
  var spotLightProperty= new function () {
    this.spotIntensity = 0.02;
    this.spotColor = 0x000FF0;
    this.spotDistance = 0 ;
    this.spotAngle = Math.PI*0.3;
    this.spotPenumbra = 0;
    this.spotDecay = 0;
    this.spotVisibility = true;
  };  
  spotLightFolder.add(spotLightProperty, 'spotIntensity',0,5).onChange(intensity=>{
    spotLight.intensity = intensity;
  });    
  spotLightFolder.addColor(spotLightProperty, 'spotColor' ).onChange(clr=>{
    console.log(clr);
    spotLight.color = new THREE.Color(clr);
  });  
  spotLightFolder.add(spotLightProperty, 'spotDistance',0,1000).onChange(dis=>{
    spotLight.distance = dis;
  });  
  spotLightFolder.add(spotLightProperty, 'spotAngle',0,Math.PI*2).onChange(angle=>{
    spotLight.angle = angle;
  });  
  spotLightFolder.add(spotLightProperty, 'spotPenumbra',0,1).onChange(pen=>{
    spotLight.penumbra = pen;
  });  
  spotLightFolder.add(spotLightProperty, 'spotDecay',0,1).onChange(dec=>{
    spotLight.decay = dec;
  });  
  spotLightFolder.add(spotLightProperty, 'spotVisibility').onChange(v=>{
    spotLight.visible = v;
  });  
}
//------------------------------------------------------------------
//点光源控制
{
  var pointLightFolder = gui.addFolder("pointLightGroup");
  var pointLightProperty= new function () {
    this.pointColor = 0xffffff; 
    this.pointIntensity = 3;
    this.pointDistance = 150;
    this.pointDecay = 0.5;
    this.pointVisibility = true;
  };  
  pointLightFolder.addColor(pointLightProperty, 'pointColor').onChange(clr=>{
    console.log(clr);
    pointLight.color = new THREE.Color(clr);
  });  
  pointLightFolder.add(pointLightProperty,'pointIntensity',0,10).onChange(ins=>{
    pointLight.intensity = ins;
  });
  pointLightFolder.add(pointLightProperty,'pointDistance',0,200).onChange(dis=>{
    pointLight.distance = dis;
  });
  pointLightFolder.add(pointLightProperty,'pointDecay',0,10).onChange(dec=>{
    pointLight.decay = dec;
  });
  pointLightFolder.add(pointLightProperty,'pointVisibility').onChange(v=>{
    pointLight.visible = v;
  });
}
//------------------------------------------------------------------
//平行光控制
{
  var directionLightFolder = gui.addFolder('directionLightGroup');
  var directionLightProperty = new function () {
    this.directionColor = 0xff4422;
    this.directionIntensity = 10;
    this.directionVisibility = true;
  }
  directionLightFolder.addColor(directionLightProperty,'directionColor').onChange(clr=>{
    directionLight.color = new THREE.Color(clr);
  });
  directionLightFolder.add(directionLightProperty,'directionIntensity',0,10).onChange(ins=>{
    directionLight.intensity = ins;
  });
  directionLightFolder.add(directionLightProperty,'directionVisibility',0,10).onChange(v=>{
    directionLight.visible = v;
  });
}
//------------------------------------------------------------------
//半球光控制
{
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
}
//------------------------------------------------------------------
//------------------------------------------------------------------

//光源范围显示线
var spotLightHelper = new THREE.SpotLightHelper(spotLight);
scene.add(spotLightHelper);
var shadowCameraHelper = new THREE.CameraHelper(spotLight.shadow.camera);
scene.add(shadowCameraHelper);
var pointLightHelper = new THREE.PointLightHelper(pointLight);
scene.add(pointLightHelper);
var directionLightHelper = new THREE.DirectionalLightHelper(directionLight,5);
scene.add(directionLightHelper);

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
  
var pos = 0 ;
// Renders the scene
function animate() { 
  // mesh.rotation.x += 0.005;
  // mesh.rotation.y += 0.005;
  // mesh.rotation.z += 0.005;
  // spotLight.position.x+=0.1; 
  pos += 0.1;
  pointLight.position.y = 20* Math.sin( pos );
  sphereMesh.position.copy(pointLight.position);

  spotLightHelper.update();
  shadowCameraHelper.update();
  pointLightHelper.update();
  directionLightHelper.update();
  
  requestAnimationFrame(animate);
  renderer.render(scene, camera);  
  controls.update();
 
   
}
 