

// import * as THREE from '../libs/three.module.js';
// import { OrbitControls } from '../libs/OrbitControls.js';

import * as THREE from '../../build/three.module.js'; 
import { OrbitControls } from '../../jsm/controls/OrbitControls.js';
// import {GLTFLoader} from '../../jsm/loaders/GLTFLoader.js';

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
var pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(5, 5, 10);
scene.add(pointLight);

const ambientLight = new THREE.AmbientLight(0x111111);
scene.add(ambientLight);

// Add OrbitControls so that we can pan around with the mouse.
//var controls = new THREE.OrbitControls(camera, renderer.domElement);
// var controls = new PointerLockControls(camera, renderer.domElement);
var controls = new OrbitControls(camera, renderer.domElement);

 
document.onkeydown = function (event) {
  
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

const torusGeometry = new THREE.TorusGeometry(2, 1, 16, 20);
// const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });

//===================================================== 
 
//=====================================================
const rawShaderMat = new THREE.RawShaderMaterial(
  {
    uniforms: {
      time: { value: 1.0 }
    },
    vertexShader: document.getElementById('vertexShader').textContent,
    fragmentShader: document.getElementById('fragmentShader').textContent,
    // vertexShader: document.querySelector('#vertexShader').textContent,
    // fragmentShader: document.querySelector('#fragmentShader').textContent,

  }
);
const shaderObject = new THREE.Mesh(torusGeometry, rawShaderMat);

shaderObject.position.set(0, 0, 0);
scene.add(shaderObject);
//=====================================================

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

  shaderObject.rotation.x += 0.01;
  shaderObject.rotation.y += 0.01;
  shaderObject.rotation.z += 0.01;
  rawShaderMat.uniforms.time.value += 0.5;

  renderer.render(scene, camera);
  controls.update();

  requestAnimationFrame(animate);

}

 //containerDom.appendChild( renderer.domElement );
