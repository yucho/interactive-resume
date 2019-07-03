/**
 * A simple slide that contains a cube. Use it for debug and development
 */ 
import Slide from './slide.js';

export default class SlideCube extends Slide {
  constructor(data) {
    super(data);
    this.addCube();
    this.addLights();
  }

  createCamera() {
    super.createCamera();
    this.camera.position.y = 1;
    this.camera.position.x = 1.5;
    this.camera.lookAt(0, 0, 0);
  }

  addCube() {
    const geo = new THREE.BoxGeometry(1, 1, 1);
    const mat = new THREE.MeshPhongMaterial({ color: 0x2194ce });
    this.mesh = new THREE.Mesh(geo, mat);
    this.scene.add(this.mesh);
  }

  addLights() {
    const ambient = new THREE.AmbientLight(0x555555);
    const directional = new THREE.DirectionalLight(0xffeedd);
    directional.position.set(0.5, 3, 1);
    directional.lookAt(0, 0, 0);
    this.scene.add(ambient, directional);
  }
};
