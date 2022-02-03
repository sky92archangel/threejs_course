 

// import * as THREE from '../libs/three.module.js';
// import {GLTFLoader} from '../libs/GLTFLoader.js';
// import {OrbitControls} from '../libs/OrbitControls.js';
 

import * as THREE from '../../build/three.module.js';
import {GLTFLoader} from '../../jsm/loaders/GLTFLoader.js';
// import { OrbitControls } from '../../jsm/controls/OrbitControls.js';


var modelPath = '../../model/monkey.gltf' ;
var containerDom = document.querySelector("#container");
 
var width = window.innerWidth,
height = window.innerHeight;

// Create a renderer and add it to the DOM.
var renderer = new THREE.WebGLRenderer();
renderer.setSize(width, height);
renderer.setClearColor(0x11023f);
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
var light = new THREE.PointLight(0xf00fff);
light.position.set(-100,200,100);
scene.add(light);

// Add OrbitControls so that we can pan around with the mouse.
//var controls = new THREE.OrbitControls(camera, renderer.domElement);

// Add axes
var axes = new THREE.AxisHelper(50);
scene.add( axes );

//================================================= 
// var geometry = new THREE.BoxGeometry(5,5,1);
// var cubeMaterial = new THREE.MeshNormalMaterial(); 

// var mesh = new THREE.Mesh( geometry, cubeMaterial );
// mesh.position.set(1,3,0);
// mesh.scale.multiplyScalar(4);
// mesh.rotation.x = Math.PI/2;
// scene.add( mesh ); 
//================================================= 
const loader = new GLTFLoader();
loader.load(
    modelPath ,
    function(gltf){
        scene.add(gltf.scene);
        //renderer
        renderer.render(scene,camera); 
    },
    function(xhr){
        console.log((xhr.loaded/xhr.total)+'% loaded');
    },  
    function(error){
       console.log('error');
    }
);
//================================================= 

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
  //controls.update();

  requestAnimationFrame( animate );

}

//containerDom.appendChild( renderer.domElement );
 