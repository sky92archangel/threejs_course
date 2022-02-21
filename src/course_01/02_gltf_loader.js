

// import * as THREE from '../libs/three.module.js';
// import {GLTFLoader} from '../libs/GLTFLoader.js';
// import {OrbitControls} from '../libs/OrbitControls.js';


import * as THREE from '../../build/three.module.js';
import { GLTFLoader } from '../../jsm/loaders/GLTFLoader.js';
import { OrbitControls } from '../../jsm/controls/OrbitControls.js';
// import { OrbitControls } from '../../jsm/controls/OrbitControls.js';


var modelPath = '../../model/monkey.gltf';
var modelPath = '../../model/10kV-transfer.gltf';
var modelPath = '../../model/220kV-3-main-transfer.gltf';
var containerDom = document.querySelector("#container");

var width = window.innerWidth,
  height = window.innerHeight;

// Create a renderer and add it to the DOM.
var renderer = new THREE.WebGLRenderer();
renderer.setSize(width, height);
renderer.setClearColor(0xcccccc);
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
light.position.set(100, 100, 100);
scene.add(light);

// Add OrbitControls so that we can pan around with the mouse.
//var controls = new THREE.OrbitControls(camera, renderer.domElement);
var controls = new OrbitControls(camera, renderer.domElement);

// Add axes
var axes = new THREE.AxisHelper(50);
scene.add(axes);


//================================================= 
// var geometry = new THREE.BoxGeometry(5,5,1);
// var cubeMaterial = new THREE.MeshNormalMaterial(); 

// var mesh = new THREE.Mesh( geometry, cubeMaterial );
// mesh.position.set(1,3,0);
// mesh.scale.multiplyScalar(4);
// mesh.rotation.x = Math.PI/2;
// scene.add( mesh ); 
//=================================================  
var gltfGroup = new THREE.Group();
const loader = new GLTFLoader();
loader.load(
  modelPath,
  (gltf) => { 

    // scene.add(gltf.scene);    //下面的group操作可以替代仅仅把模型空间载入的动作 
 
    //将所有加载的设备子内容都加入group  然后把group加入场景
    for (let i = 0; i < gltf.scene.children.length; i++)
    {
      let item = gltf.scene.children[i];
      gltfGroup.add(item); 
    }
    scene.add(gltfGroup);
    console.log(gltfGroup); 

    //renderer
    renderer.render(scene, camera); 
  },
  function (xhr) {
    console.log((xhr.loaded / xhr.total) + '% loaded');
  },
  function (error) {
    console.log('error');
  }
);


//================================================= 

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

  gltfGroup.rotation.y += 0.01;
  console.log(gltfGroup.rotation.x);

  renderer.render(scene, camera); 
  controls.update();

  requestAnimationFrame(animate);
 
}

//containerDom.appendChild( renderer.domElement );
