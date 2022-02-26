
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
 
//-----------------------------------------------------------
function circleGeom_init(){
  //半径1  分段数量3 8   起始角度0    中心角 2pi   
  var geometry = new THREE.CircleGeometry(4,10,0,Math.PI * 2);
  var material =new THREE.MeshBasicMaterial({color:0x00ff00,side:THREE.DoubleSide});
  var mesh =new THREE.Mesh(geometry,material);
  mesh.position.set(-10,10,0);
  scene.add(mesh);
  return mesh;
}

function ringGeom_init(){
//半径0.5  外半径1    圆环分段   圆环长度   起始角度   圆心角 
  var geometry =new THREE.RingGeometry(3,4,8,8,0, Math.PI *2);
  var material =new THREE.MeshBasicMaterial({color:0x00ff00,side:THREE.DoubleSide});
  var mesh =new THREE.Mesh(geometry,material);
  mesh.position.set(-10,0,0);
  scene.add(mesh);
  return mesh;
}


function boxGeom_init(){ 
  //x y z  seg xyz  
  var geometry = new THREE.BoxGeometry(5, 5, 8);
  var material = new THREE.MeshLambertMaterial();
  var mesh = new THREE.Mesh(geometry, material);
  mesh.position.set(-10,20,0); 
  return mesh;
}

function sphereGeom_init(){
  //半径1   水平分段32  m3  垂直分段d16 12  水平起始角度d32 1   水平扫描角度2pi  垂直起始角度d0   垂直扫描角度 dpi  
  var geometry = new THREE.SphereGeometry(); 
  var material = new THREE.MeshLambertMaterial();
  var mesh = new THREE.Mesh(geometry, material);
  mesh.position.set(-10,30,0);
  mesh.scale.multiplyScalar(4); 
  scene.add(mesh); 
  return mesh;
}
 
//-----------------------------------------------------------

var camera = camera_init();
var controls = controller_init(camera);
var axes=axes_init();
// var mesh = box_init();
// var plane  =plane_init();
var ambientLight = ambientLight_init();
var spotLight = spotLight_init(); 
var circleGeom = circleGeom_init();
var ringGeom = ringGeom_init();
var boxGeom = boxGeom_init();
var sphereGeom =sphereGeom_init();
//-----------------------------------------------------------

var gui = new dat.GUI(); 
//------------------------------------------------------------------
//圆片控制
{
  var position = circleGeom.position;
  var circleGeomFolder= gui.addFolder("circleGeomFolder");
  var circleProperty= new function () { 
    this.radius = 3;
    this.segments = 10;
    this.angleSt = 0;
    this.angleCenter= Math.PI *2;
  }
  circleGeomFolder.add(circleProperty, 'radius',3,50).onChange(porp=>{ 
    scene.remove(circleGeom); 
    circleGeom = new THREE.CircleGeometry(
      // circleProperty.radius,
      porp,
      circleProperty.segments,
      circleProperty.angleSt,
      circleProperty.angleCenter);
    var planeMat = new THREE.MeshBasicMaterial({ color: 0x00ff00,wireframe:true});
    planeMat.side = THREE.DoubleSide;
    circleGeom = new THREE.Mesh(circleGeom,planeMat); 
    scene.add(circleGeom);   
    circleGeom.position.set(position.x,position.y,position.z); 
  });  
  circleGeomFolder.add(circleProperty, 'segments',3,50).onChange(porp=>{
    scene.remove(circleGeom);
    circleGeom = new THREE.CircleGeometry(
      circleProperty.radius,
      porp,
      // circleProperty.segments,
      circleProperty.angleSt,
      circleProperty.angleCenter);
    var planeMat = new THREE.MeshBasicMaterial({ color: 0x00ff00,wireframe:true});
    planeMat.side = THREE.DoubleSide;
    circleGeom = new THREE.Mesh(circleGeom,planeMat);
    scene.add(circleGeom); 
    circleGeom.position.set(position.x,position.y,position.z); 
  });
  circleGeomFolder.add(circleProperty, 'angleSt',0,Math.PI*2).onChange(porp=>{
    scene.remove(circleGeom);
    circleGeom = new THREE.CircleGeometry(
      circleProperty.radius,   
      circleProperty.segments,
      // circleProperty.angleSt,
      porp,
      circleProperty.angleCenter);
    var planeMat = new THREE.MeshBasicMaterial({ color: 0x00ff00,wireframe:true});
    planeMat.side = THREE.DoubleSide;
    circleGeom = new THREE.Mesh(circleGeom,planeMat);
    scene.add(circleGeom); 
    circleGeom.position.set(position.x,position.y,position.z); 
  });
  circleGeomFolder.add(circleProperty, 'angleCenter',0,Math.PI*2).onChange(porp=>{
    scene.remove(circleGeom);
    circleGeom = new THREE.CircleGeometry(
      circleProperty.radius,  
      circleProperty.segments,
      circleProperty.angleSt,
      // circleProperty.angleCenter
      porp,
      );
    var planeMat = new THREE.MeshBasicMaterial({ color: 0x00ff00,wireframe:true});
    planeMat.side = THREE.DoubleSide;
    circleGeom = new THREE.Mesh(circleGeom,planeMat);
    scene.add(circleGeom); 
    circleGeom.position.set(position.x,position.y,position.z); 
  }); 
}
//-----------------------------------------------------------
//环控制 
{
  var position = ringGeom.position;
  var ringGeomFolder= gui.addFolder("ringGeomFolder");
  var ringProperty= new function () {
    //半径0.5  外半径1    圆环分段 m3 d8   圆环环上环线数   起始角度   圆心角 2pi
    this.inRadius     = 0.5;
    this.outRadius    = 1;
    this.ringNum    = 8 ;
    this.loopNum    = 8 ; 
    this.angleSt    = 0;
    this.angleCt    =    Math.PI *2;
  }

  ringGeomFolder.add(ringProperty, 'inRadius',1,50).onChange(porp=>{
    scene.remove(ringGeom); 
    ringGeom = new THREE.RingGeometry(
      porp        ,
      ringProperty.outRadius   ,
      ringProperty.ringNum     ,
      ringProperty.loopNum     ,
      ringProperty.angleSt     ,
      ringProperty.angleCt     , );
    var planeMat = new THREE.MeshBasicMaterial({ color: 0x00ff00,wireframe:true});
    planeMat.side = THREE.DoubleSide;
    ringGeom = new THREE.Mesh(ringGeom,planeMat);
    scene.add(ringGeom); 
    ringGeom.position.set(position.x,position.y,position.z); 
  });  

  ringGeomFolder.add(ringProperty, 'outRadius',3,50).onChange(porp=>{
    scene.remove(ringGeom); 
    ringGeom = new THREE.RingGeometry(
      ringProperty.inRadius        ,
      // ringProperty.outRadius   ,
      porp,
      ringProperty.ringNum     ,
      ringProperty.loopNum     ,
      ringProperty.angleSt     ,
      ringProperty.angleCt     , );
    var planeMat = new THREE.MeshBasicMaterial({ color: 0x00ff00,wireframe:true});
    planeMat.side = THREE.DoubleSide;
    ringGeom = new THREE.Mesh(ringGeom,planeMat);
    scene.add(ringGeom); 
    ringGeom.position.set(position.x,position.y,position.z); 
  });
 
  ringGeomFolder.add(ringProperty, 'ringNum',8,20).onChange(porp=>{
    scene.remove(ringGeom); 
    ringGeom = new THREE.RingGeometry(
      ringProperty.inRadius        ,
      ringProperty.outRadius   ,
      parseInt(porp)   , 
      ringProperty.loopNum     ,
      ringProperty.angleSt     ,
      ringProperty.angleCt     , );
    var planeMat = new THREE.MeshBasicMaterial({ color: 0x00ff00,wireframe:true});
    planeMat.side = THREE.DoubleSide;
    ringGeom = new THREE.Mesh(ringGeom,planeMat);
    scene.add(ringGeom); 
    ringGeom.position.set(position.x,position.y,position.z); 
  });

  ringGeomFolder.add(ringProperty, 'loopNum',8,10).onChange(porp=>{
    scene.remove(ringGeom); 
    ringGeom = new THREE.RingGeometry(
      ringProperty.inRadius        ,
      ringProperty.outRadius   , 
      ringProperty.ringNum     , 
      parseInt(porp)   ,
      ringProperty.angleSt     ,
      ringProperty.angleCt     , );
    var planeMat = new THREE.MeshBasicMaterial({ color: 0x00ff00,wireframe:true});
    planeMat.side = THREE.DoubleSide;
    ringGeom = new THREE.Mesh(ringGeom,planeMat);
    scene.add(ringGeom); 
    ringGeom.position.set(position.x,position.y,position.z); 
  });

  ringGeomFolder.add(ringProperty, 'angleSt',0,Math.PI * 2).onChange(porp=>{
    scene.remove(ringGeom); 
    ringGeom = new THREE.RingGeometry(
      ringProperty.inRadius        ,
      ringProperty.outRadius   , 
      ringProperty.ringNum     ,
      ringProperty.loopNum     ,
      porp,
      // ringProperty.angleSt     ,
      ringProperty.angleCt     , );
    var planeMat = new THREE.MeshBasicMaterial({ color: 0x00ff00,wireframe:true});
    planeMat.side = THREE.DoubleSide;
    ringGeom = new THREE.Mesh(ringGeom,planeMat);
    scene.add(ringGeom); 
    ringGeom.position.set(position.x,position.y,position.z); 
  });

  ringGeomFolder.add(ringProperty, 'angleCt',0,Math.PI * 2).onChange(porp=>{
    scene.remove(ringGeom); 
    ringGeom = new THREE.RingGeometry(
      ringProperty.inRadius  ,
      ringProperty.outRadius   , 
      ringProperty.ringNum     ,
      ringProperty.loopNum     , 
      ringProperty.angleSt     ,
      porp, );
    var planeMat = new THREE.MeshBasicMaterial({ color: 0x00ff00,wireframe:true});
    planeMat.side = THREE.DoubleSide;
    ringGeom = new THREE.Mesh(ringGeom,planeMat);
    scene.add(ringGeom); 
    ringGeom.position.set(position.x,position.y,position.z); 
  });
}
//-----------------------------------------------------------
//方块控制
{
  var mesh = boxGeom;
  var position = boxGeom.position;
  var folder= gui.addFolder("boxGeomFolder");
  var property= new function () {
    //半径0.5  外半径1    圆环分段 m3 d8   圆环环上环线数   起始角度   圆心角 2pi
    this.x      =5 ;
    this.y      =5 ;
    this.z      =5 ;
    this.segX   =5 ; 
    this.segY   =5 ;
    this.segZ   =5 ;
  }

  folder.add(property, 'x',1,50).onChange(porp=>{
    scene.remove(mesh); 
    var geometry = new THREE.BoxGeometry(
      porp,
      property.y     ,
      property.z     ,
      property.segX  ,
      property.segY  ,
      property.segZ  ,      
    );
    var material = new THREE.MeshBasicMaterial({ color: 0x00ff00,side:THREE.DoubleSide,wireframe:true}); 
      mesh = new THREE.Mesh(geometry,material);
    scene.add(mesh); 
    mesh.position.set(position.x,position.y,position.z); 
  });  
 
  folder.add(property, 'y',1,50).onChange(porp=>{
    scene.remove(mesh); 
   var geometry = new THREE.BoxGeometry(
      property.x, 
      porp ,
      property.z     ,
      property.segX  ,
      property.segY  ,
      property.segZ  ,      
    );
    var material = new THREE.MeshBasicMaterial({ color: 0x00ff00,side:THREE.DoubleSide,wireframe:true}); 
      mesh = new THREE.Mesh(geometry,material);
    scene.add(mesh); 
    mesh.position.set(position.x,position.y,position.z); 
  });  
 
  folder.add(property, 'z',1,50).onChange(porp=>{
    scene.remove(mesh); 
   var geometry = new THREE.BoxGeometry(
      property.x, 
      property.y     ,
      porp,      
      property.segX  ,
      property.segY  ,
      property.segZ  ,      
    );
    var material = new THREE.MeshBasicMaterial({ color: 0x00ff00,side:THREE.DoubleSide,wireframe:true}); 
      mesh = new THREE.Mesh(geometry,material);
    scene.add(mesh); 
    mesh.position.set(position.x,position.y,position.z); 
  });  

  folder.add(property, 'segX',1,50).onChange(porp=>{
    scene.remove(mesh); 
   var geometry = new THREE.BoxGeometry(
      property.x, 
      property.y     ,
      property.z,      
      parseInt(porp)  ,
      property.segY  ,
      property.segZ  ,      
    );
    var material = new THREE.MeshBasicMaterial({ color: 0x00ff00,side:THREE.DoubleSide,wireframe:true}); 
      mesh = new THREE.Mesh(geometry,material);
    scene.add(mesh); 
    mesh.position.set(position.x,position.y,position.z); 
  });  
  folder.add(property, 'segY',1,50).onChange(porp=>{
    scene.remove(mesh); 
   var geometry = new THREE.BoxGeometry(
      property.x, 
      property.y     ,
      property.z,      
      property.segX  ,
      parseInt(porp) ,
      property.segZ  ,      
    );
    var material = new THREE.MeshBasicMaterial({ color: 0x00ff00,side:THREE.DoubleSide,wireframe:true}); 
      mesh = new THREE.Mesh(geometry,material);
    scene.add(mesh); 
    mesh.position.set(position.x,position.y,position.z); 
  });  
  folder.add(property, 'segZ',1,50).onChange(porp=>{
    scene.remove(mesh); 
   var geometry = new THREE.BoxGeometry(
      property.x, 
      property.y     ,
      property.z,      
      property.segX  , 
      property.segY  ,  
      parseInt(porp) ,    
    );
    var material = new THREE.MeshBasicMaterial({ color: 0x00ff00,side:THREE.DoubleSide,wireframe:true}); 
      mesh = new THREE.Mesh(geometry,material);
    scene.add(mesh); 
    mesh.position.set(position.x,position.y,position.z); 
  });  

} 
//-----------------------------------------------------------
//球体控制
{

  var mesh = sphereGeom;
  var position = sphereGeom.position;
  var folder= gui.addFolder("sphereGeomFolder");
  var property= new function () {
   //半径1   水平分段32  m3  垂直分段d16 12  水平起始角度d32 1   水平扫描角度2pi  垂直起始角度d0   垂直扫描角度 dpi  
    this.radius         = 1 ;
    this.horSeg         = 32 ;
    this.verSeg         = 16 ;
    this.horAngleSt     = 1 ; 
    this.horAngleSweep  = Math.PI*2 ;
    this.verAngleSt     = 0 ;
    this.verAngleSweep  = Math.PI ;
  } 

  folder.add(property, 'radius',1,500).onChange(porp=>{
    scene.remove(mesh); 
    var geometry = new THREE.SphereGeometry( 
      porp        ,
     property.horSeg        ,
     property.verSeg        ,
     property.horAngleSt    ,
     property.horAngleSweep ,
     property.verAngleSt    ,
     property.verAngleSweep , 
    );
    var material = new THREE.MeshBasicMaterial({ color: 0x00ff00,side:THREE.DoubleSide,wireframe:true}); 
      mesh = new THREE.Mesh(geometry,material);
    scene.add(mesh); 
    mesh.position.set(position.x,position.y,position.z); 
  });  

  folder.add(property, 'horSeg',3,50).onChange(porp=>{
    scene.remove(mesh); 
    var geometry = new THREE.SphereGeometry( 
     property.radius        ,
     parseInt(porp)        ,
     property.verSeg        ,
     property.horAngleSt    ,
     property.horAngleSweep ,
     property.verAngleSt    ,
     property.verAngleSweep , 
    );
    var material = new THREE.MeshBasicMaterial({ color: 0x00ff00,side:THREE.DoubleSide,wireframe:true}); 
      mesh = new THREE.Mesh(geometry,material);
    scene.add(mesh); 
    mesh.position.set(position.x,position.y,position.z); 
  });  

  folder.add(property, 'verSeg',12,50).onChange(porp=>{
    scene.remove(mesh); 
    var geometry = new THREE.SphereGeometry( 
     property.radius        ,
     property.horSeg        ,
     parseInt(porp)        ,
     property.horAngleSt    ,
     property.horAngleSweep ,
     property.verAngleSt    ,
     property.verAngleSweep , 
    );
    var material = new THREE.MeshBasicMaterial({ color: 0x00ff00,side:THREE.DoubleSide,wireframe:true}); 
      mesh = new THREE.Mesh(geometry,material);
    scene.add(mesh); 
    mesh.position.set(position.x,position.y,position.z); 
  });  

  folder.add(property, 'horAngleSt',1,Math.PI*2).onChange(porp=>{
    scene.remove(mesh); 
    var geometry = new THREE.SphereGeometry( 
     property.radius        ,
     property.horSeg        ,
     property.verSeg        ,
     porp    ,
     property.horAngleSweep ,
     property.verAngleSt    ,
     property.verAngleSweep , 
    );
    var material = new THREE.MeshBasicMaterial({ color: 0x00ff00,side:THREE.DoubleSide,wireframe:true}); 
      mesh = new THREE.Mesh(geometry,material);
    scene.add(mesh); 
    mesh.position.set(position.x,position.y,position.z); 
  });  

  folder.add(property, 'horAngleSweep',1,Math.PI*4).onChange(porp=>{
    scene.remove(mesh); 
    var geometry = new THREE.SphereGeometry( 
     property.radius        ,
     property.horSeg        ,
     property.verSeg        ,
     property.horAngleSt    ,
     porp,
     property.verAngleSt    ,
     property.verAngleSweep , 
    );
    var material = new THREE.MeshBasicMaterial({ color: 0x00ff00,side:THREE.DoubleSide,wireframe:true}); 
      mesh = new THREE.Mesh(geometry,material);
    scene.add(mesh); 
    mesh.position.set(position.x,position.y,position.z); 
  });  

  folder.add(property, 'verAngleSt',1,Math.PI*2).onChange(porp=>{
    scene.remove(mesh); 
    var geometry = new THREE.SphereGeometry( 
     property.radius        ,
     property.horSeg        ,
     property.verSeg        ,
     property.horAngleSt    ,
     property.horAngleSweep ,
     porp   ,
     property.verAngleSweep , 
    );
    var material = new THREE.MeshBasicMaterial({ color: 0x00ff00,side:THREE.DoubleSide,wireframe:true}); 
      mesh = new THREE.Mesh(geometry,material);
    scene.add(mesh); 
    mesh.position.set(position.x,position.y,position.z); 
  });  

  folder.add(property, 'verAngleSweep',0,Math.PI*2).onChange(porp=>{
    scene.remove(mesh); 
    var geometry = new THREE.SphereGeometry( 
     property.radius        ,
     property.horSeg        ,
     property.verSeg        ,
     property.horAngleSt    ,
     property.horAngleSweep ,
     property.verAngleSt    ,
     porp , 
    );
    var material = new THREE.MeshBasicMaterial({ color: 0x00ff00,side:THREE.DoubleSide,wireframe:true}); 
      mesh = new THREE.Mesh(geometry,material);
    scene.add(mesh); 
    mesh.position.set(position.x,position.y,position.z); 
  }); 
} 
 
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
 