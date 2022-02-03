 
// import * as THREE from '../libs/three.module.js';
// import {GLTFLoader} from '../libs/GLTFLoader.js';
 

import * as THREE from '../../build/three.module.js'; 
import { OrbitControls } from '../../jsm/controls/OrbitControls.js';
// import {GLTFLoader} from '../../jsm/loaders/GLTFLoader.js';

var containerDom = document.querySelector("#container");

var width = window.innerWidth,
height = window.innerHeight;

// Create a renderer and add it to the DOM.
var renderer = new THREE.WebGLRenderer();
renderer.setSize(width, height);
//document.body.appendChild(renderer.domElement);
containerDom.appendChild( renderer.domElement );
// Create the scene 
var scene = new THREE.Scene();
// Create a camera
var camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 10000);
//var camera = new THREE.OrthographicCamera(-1000,1000,1000,-1000,0.1,10000);
camera.position.z = 50;

scene.add(camera);

// Create a light, set its position, and add it to the scene.
var light = new THREE.PointLight(0xffffff);
light.position.set(-100,200,100);
scene.add(light);

// Add OrbitControls so that we can pan around with the mouse.
var controls = new  OrbitControls(camera, renderer.domElement);

// Add axes
var axes = new THREE.AxisHelper(50);
scene.add( axes );

//============================================================    

var geometry = new THREE.TorusGeometry(2,1,16,20);
const material = new THREE.MeshBasicMaterial({color:0x00ff00});

const points    = new THREE.Points(geometry, new THREE.PointsMaterial({color:0xffffff,size:0.1}));
const mesh      = new THREE.Mesh( geometry,new THREE.MeshBasicMaterial({color:0x00ff00}));
const line      = new THREE.Line(geometry,new THREE.LineBasicMaterial({color:0xffffff,linewidth:1}));
const lineLoop  = new THREE.LineLoop(geometry,new THREE.LineBasicMaterial({color:0xffffff,linewidth:1}));
const lineSegments = new THREE.LineSegments(geometry,new THREE.LineBasicMaterial({color:0xffffff,linewidth:1}));

points          .position.set(-20,0,0);
mesh            .position.set(-10,0,0);
line            .position.set(- 0,0,0);
lineLoop        .position.set(+10,0,0);
lineSegments    .position.set(+20,0,0);
 

scene.add( points       );
scene.add( mesh         );
scene.add( line         );
scene.add( lineLoop     );
scene.add( lineSegments );
 

//============================================================    

resize();
animate();
window.addEventListener('resize',resize);

function resize(){
  let w = window.innerWidth;
  let h = window.innerHeight;

  renderer.setSize(w,h);
  camera.aspect = w / h;
  camera.updateProjectionMatrix();
}

// Renders the scene
function animate() {

  renderer.render( scene, camera );
  controls.update();

  requestAnimationFrame( animate );

}

//containerDom.appendChild( renderer.domElement );
 