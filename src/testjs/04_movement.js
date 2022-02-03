


import * as THREE from '../../build/three.module.js'; 
import { OrbitControls } from '../../jsm/controls/OrbitControls.js';
// import {GLTFLoader} from '../../jsm/loaders/GLTFLoader.js';
//import * as THREE from 'E:/_project/threejs/build/three.module.js'; 

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
var controls = new OrbitControls(camera, renderer.domElement);

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


document.onkeydown=function(event){
  if(event.altKey == false){
    switch(event.key){
      case 'w': line.rotation.x+=0.05; break;
      case 's': line.rotation.x-=0.05; break;
      case 'a': line.rotation.y+=0.05; break;
      case 'd': line.rotation.y-=0.05; break;
    }
  }
  else{
    switch(event.key){
      case 'w': line.rotation.z+=0.05; break;
      case 's': line.rotation.z-=0.05; break;
      case 'a': line.rotation.z+=0.05; break;
      case 'd': line.rotation.z-=0.05; break;
    }
  }
}

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
 
  lineLoop.rotation.x += 0.008;
  renderer.render(scene, camera);
  controls.update();

  requestAnimationFrame(animate);

}

 //containerDom.appendChild( renderer.domElement );
