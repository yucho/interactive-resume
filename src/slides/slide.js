import Navigator from '../navs/navigator.js';

export default class Slide {
  constructor(interactive) {
    this.interactive = interactive;
    this.navigator = new Navigator(this);
    this.renderer = interactive.renderer;
    this.createScene();
    this.createCamera();
  }

  createScene() {
    this.scene = new THREE.Scene();
  }

  createCamera() {
    this.camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    this.camera.position.z = 2;
  }

  render(delta) {
    if (this.animate) {
      this.animate(delta);
    }
    this.renderer.render(this.scene, this.camera);
  }
};
