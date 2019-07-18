import Slide from './slide.js';

class Rainy extends Slide {
  constructor(data) {
    super(data);
    this.cloud = [];
    this.createCloud();
    this.createLight();
  }

  createCamera() {
    super.createCamera();
    this.camera.position.set(0, 0, 0);
    this.camera.lookAt(0, 10, 0);
  }

  createCloud() {
    const loader = new THREE.TextureLoader();
    loader.load('./smoke-1.png', (texture) => {
      const plane = new THREE.PlaneBufferGeometry(300, 300);
      const material = new THREE.MeshLambertMaterial({
        map: texture,
        transparent: true
      });
      const mesh = new THREE.Mesh(plane, material);
      mesh.position.set(0, 100, 0);
      mesh.lookAt(0, 0, 0);
      this.scene.add(mesh);
      this.cloud.push(mesh);
    });
  }
  
  createLight() {
    const ambient = new THREE.AmbientLight(0x8888ee, 10);
    this.scene.add(ambient);
  }

  animate(delta) {
    for (const cloud of this.cloud) {
      cloud.rotateZ(delta / -50000);
    }
  }
}

export default Rainy;
