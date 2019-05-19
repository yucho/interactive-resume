const {Scene, PerspectiveCamera} = THREE;

export default class Slide {
  constructor(data) {
    this.data = data;
    this.createScene();
    this.createCamera();
  }

  static instantiate(data) {
    return new this(data);
  }

  mount() {
    // render camera and scene
    this.isMount = true;
  }

  unmount() {
    // detach render
    this.isMount = false;
  }

  createScene() {
    this.scene = new Scene();
  }

  createCamera() {
    const {container} = this.data;
    // const [width, height] = [container.clientWitdth, container.clientHeight];
    const camera = new PerspectiveCamera(75, 1, 0.1, 1000);
    camera.position.z = 2;
    this.camera = camera;
  }

  render() {
    const {renderer} = this.data;
    const {scene, camera} = this;
    renderer.render(scene, camera);
  }
}
