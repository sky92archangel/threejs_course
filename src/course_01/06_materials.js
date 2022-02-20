

// import * as THREE from '../libs/three.js'; 
//  import { group } from 'yargs';

import * as THREE from '../../build/three.module.js';   
import {PointerLockControls} from '../../jsm/controls/PointerLockControls.js';
var containerDom = document.querySelector("#container")
//var containerDom = document.getElementById( 'container' );

var width = window.innerWidth,
  height = window.innerHeight;

// Create a renderer and add it to the DOM.
var renderer = new THREE.WebGLRenderer();
renderer.setSize(width, height);
//document.body.appendChild(renderer.domElement);
containerDom.appendChild(renderer.domElement);
// Create the scene 
var scene = new THREE.Scene();
// Create a camera
var camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 200);
//var camera = new THREE.OrthographicCamera(-1000,1000,1000,-1000,0.1,10000);
camera.position.z = 50;

scene.add(camera);

// Create a light, set its position, and add it to the scene.
var light = new THREE.PointLight(0xf302f4);
light.position.set(-30, 30, 50);
scene.add(light);

const ambientLight=new THREE.AmbientLight(0x111111);
scene.add(ambientLight);

// Add OrbitControls so that we can pan around with the mouse.
//var controls = new THREE.OrbitControls(camera, renderer.domElement);
var controls = new PointerLockControls(camera, renderer.domElement);

document.onclick = function (event) {
  controls.lock();
}

document.onkeydown = function (event) {
  if(event.escape==true )
  {controls.unlock();}
  switch (event.key) {
    case 'w': controls.moveForward(0.5); break;
    case 's': controls.moveForward(-0.5); break;
    case 'a': controls.moveRight(-0.5); break;
    case 'd': controls.moveRight(0.5); break; 
  }
}

// Add axes
var axes = new THREE.AxisHelper(50);
scene.add(axes);

//  var geometry = new THREE.BoxGeometry(5,5,1);
//  var cubeMaterial = new THREE.MeshNormalMaterial(); 

//  var mesh = new THREE.Mesh( geometry, cubeMaterial );
//  mesh.position.set(1,3,0);
//  mesh.scale.multiplyScalar(4);
//  mesh.rotation.x = Math.PI/2;
//  scene.add( mesh );


//  var ballGeometry = new THREE.SphereGeometry(1,12,12);
//  var ballMaterial = new THREE.MeshNormalMaterial(); 

//  var ballMesh = new THREE.Mesh( ballGeometry, ballMaterial );
//  ballMesh.position.set(5,3,0);
//  ballMesh.scale.multiplyScalar(4);
//  ballMesh.rotation.x = Math.PI/5;
//  scene.add( ballMesh );

//=============================================================
const geometry = new THREE.TorusGeometry(2, 1, 16, 20);
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });

const points = new THREE.Points(geometry, new THREE.PointsMaterial({ color: 0xffffff, size: 0.1 }));
const mesh = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({ color: 0x00ff00 }));
const line = new THREE.Line(geometry, new THREE.LineBasicMaterial({ color: 0xffffff, linewidth: 1 }));
const lineLoop = new THREE.LineLoop(geometry, new THREE.LineBasicMaterial({ color: 0xffffff, linewidth: 1 }));
const lineSegments = new THREE.LineSegments(geometry, new THREE.LineBasicMaterial({ color: 0xffffff, linewidth: 1 }));

points.position.set(-20, 0, 0);
mesh.position.set(-10, 0, 0);
line.position.set(- 0, 0, 0);
lineLoop.position.set(10, 0, 0);
lineSegments.position.set(20, 0, 0);
 
scene.add(points);
scene.add(mesh);
scene.add(line);
scene.add(lineLoop);
scene.add(lineSegments);
//=============================================================
const basicMatFrame = new THREE.Mesh(geometry,new THREE.MeshBasicMaterial({color:0xffffff,wireframe:true}));
const basicMatSolid = new THREE.Mesh(geometry,new THREE.MeshBasicMaterial({color:0xff00ff,wireframe:false}));
const lambertFrame  = new THREE.Mesh(geometry,new THREE.MeshLambertMaterial({color:0xff0000,wireframe:true}));
const lambertSolid  = new THREE.Mesh(geometry,new THREE.MeshLambertMaterial({color:0xff0000,wireframe:false}));
const phongFrame    = new THREE.Mesh(geometry,new THREE.MeshPhongMaterial({color:0xff33ff,wireframe:true}))
const phongSolid    = new THREE.Mesh(geometry,new THREE.MeshPhongMaterial({color:0xff33ff,wireframe:false}))

const depthMat      = new THREE.Mesh(geometry,new THREE.MeshDepthMaterial( )  )
const toonMat       = new THREE.Mesh(geometry,new THREE.MeshToonMaterial({color:0xff33ff,wireframe:false}))
const normalMat     = new THREE.Mesh(geometry,new THREE.MeshNormalMaterial( )  )
const physicalMat   = new THREE.Mesh(geometry,new THREE.MeshPhongMaterial({color:0xff33ff,wireframe:false}))

basicMatFrame.position.set(-20, 10, 0);
basicMatSolid.position.set(-20, 20, 0);
lambertFrame.position.set(-10, 10, 0);
lambertSolid.position.set(-10, 20, 0);
phongFrame.position.set(-0, 10, 0);
phongSolid.position.set(-0, 20, 0);


depthMat     .position.set(0, -1, 0);
toonMat      .position.set(-10, -10, 0);
normalMat    .position.set(- 0, -10, 0);
physicalMat  .position.set( 10, -10, 0);


const group=new THREE.Group();
group.add(basicMatFrame);
group.add(basicMatSolid);
group.add(lambertFrame);
group.add(lambertSolid);
group.add(phongFrame);
group.add(phongSolid);

group.add(depthMat    );
group.add(toonMat     );
group.add(normalMat   );
group.add(physicalMat );

// group.position.set(-20, 20, 0);
 
scene.add(group);
//=============================================================
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

  // group.rotation.x+=0.01;
  // group.rotation.y+=0.01;
  // light.rotation.z+=0.01; 
  depthMat.rotation.x+=0.01;
  depthMat.rotation.y+=0.01;
  // console.log(light.rotation);

  renderer.render(scene, camera);
  //controls.update();

  requestAnimationFrame(animate);

}

 //containerDom.appendChild( renderer.domElement );
