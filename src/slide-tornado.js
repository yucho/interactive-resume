import * as THREE from 'three';
import { Vector3 } from 'three';

export const createTornado = (container) => {
  const data = initRenderer(container);
  const {scene} = data;
  data.mesh = initTornado(scene);
  animate(data)();
};

export const destroyTornado = () => {
  // cancelAnimationFrame, etc.
};

const initRenderer = (container) => {
  const [width, height] = [container.clientWidth, container.clientHeight];

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
  const renderer = new THREE.WebGLRenderer();

  camera.position.z = 2;
  camera.lookAt(0, 0, 0);
  renderer.setSize(width, height);
  container.appendChild(renderer.domElement);

  return {scene, camera, renderer};
};

const initTornado = (scene) => {
  const geometry = new THREE.Geometry();
  geometry.vertices = [
    new Vector3(-1.0, 1.0, 0),
    new Vector3(1.0, -0.5, -0.5),
    new Vector3(-0.5, -0.75, 0.25)
  ];
  geometry.faces = [new THREE.Face3(0, 1, 2)];
  geometry.computeFaceNormals();

  const material = new THREE.MeshNormalMaterial();
  const mesh = new THREE.Mesh(geometry, material);
  material.side = THREE.DoubleSide;
  mesh.position.set(0,0,0);

  scene.add(mesh);
  return mesh;
};

const animate = (data) => () => {
  const requestId = requestAnimationFrame(animate(data));
  const {scene, camera, renderer, mesh} = data;
  mesh.rotation.x += 0.01
  mesh.rotation.y += 0.01
  renderer.render(scene, camera);
};
