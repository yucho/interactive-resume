import Slide from './slide.js';

const {
  DoubleSide, Face3, Geometry, Mesh, MeshNormalMaterial, Vector3
} = THREE;

class Tornado extends Slide {
  constructor(data) {
    super(data);
    
    const geometry = new Geometry();
    geometry.vertices = [
      new Vector3(-1.0, 1.0, 0),
      new Vector3(1.0, -0.5, -0.5),
      new Vector3(-0.5, -0.75, 0.25)
    ];
    geometry.faces = [new Face3(0, 1, 2)];
    geometry.computeFaceNormals();

    const material = new MeshNormalMaterial();
    const mesh = new Mesh(geometry, material);
    material.side = DoubleSide;
    mesh.position.set(0, 0, 0);

    this.scene.add(mesh);
    Object.assign(this, {geometry, material, mesh});
  }

  render() {
    const { data, scene, camera, mesh } = this;
    const { renderer } = data;
    mesh.rotation.x += 0.01
    mesh.rotation.y += 0.01
    renderer.render(scene, camera);
  }
}

export default Tornado;
