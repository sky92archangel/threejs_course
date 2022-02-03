
import * as THREE from '../../build/three.module.js'; 
// import { OrbitControls } from '../../jsm/controls/OrbitControls.js'; 
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
var camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 10000);
//var camera = new THREE.OrthographicCamera(-1000,1000,1000,-1000,0.1,10000);
camera.position.z = 50;

scene.add(camera);

// Create a light, set its position, and add it to the scene.
var light = new THREE.PointLight(0xffffff);
light.position.set(-100, 200, 100);
scene.add(light);

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
    case 'q':controls.unlock(); break;
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

const geometry = new THREE.TorusGeometry(2, 1, 16, 20);
const material = new THREE.MeshLambertMaterial({ color: 0xff0000 ,wireframe: true });
 
const mesh = new THREE.Mesh(geometry, material); 

mesh.position.set( 0, 0, 0 );
 
scene.add(mesh);

const loader = new THREE.TextureLoader();
loader.load(  
  '../texture/wood.png', function (texture) {
    console.log(texture);
    material.map=texture;
    material.needsUpdate = true;
  },
  undefined,
  function(err){
    console.error('error');
  }
);



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

  mesh.rotation.x+=0.01;
  mesh.rotation.y+=0.01;
  mesh.rotation.z+=0.01;
   
  renderer.render(scene, camera);
  //controls.update();

  requestAnimationFrame(animate);

}

 //containerDom.appendChild( renderer.domElement );
