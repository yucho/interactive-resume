import Slide from './slide.js';

const {
  DoubleSide, Face3, Geometry, Group, Mesh, MeshNormalMaterial, Vector3
} = THREE;


class SlideTornado extends Slide {
  constructor(data) {
    super(data);
    this.tornadoes = [new Tornado(this.scene)];
    this.spawnTornado = this.spawnTornado.bind(this);
    setTimeout(this.spawnTornado, 300 + Math.random() * 1200)
  }

  createCamera() {
    super.createCamera();
    this.camera.position.y = 2;
    this.camera.lookAt(0, 0, 0);
  }

  spawnTornado() {
    if (this.tornadoes.length < 10) {
      this.tornadoes.push(new Tornado(this.scene));
    }
    setTimeout(this.spawnTornado, 300 + Math.random() * 1200);
  }

  render() {
    const delta = this.data.currentRenderCycle.delta;
    for (let i = this.tornadoes.length -1; i >= 0; i--) {
      if (this.tornadoes[i].move(delta)) {
        this.scene.remove(this.tornadoes[i].group);
        this.tornadoes.splice(i, 1);
      } 
    }
    this.data.renderer.render(this.scene, this.camera);
  }
}


class Tornado {
  constructor(scene) {
    this.scene = scene;
    this.material = new MeshNormalMaterial();
    this.material.side = DoubleSide;
    this.group = new Group();
    this.group.position.set(-2 + Math.random() * 4, 0, -2 + Math.random() * 4);
    this.scene.add(this.group);
    this.shards = [];
    this.wastedDelta = 0;
    this.timeLived = 0;
    this.generateShards(2);
  }

  generateShards(number) {
    for (let i = 0; i < number; i++) {
      const shard = new Shard(this.material);
      this.shards.push(shard);
      this.group.add(shard.mesh);
    }
  }

  move(delta) {
    if (this.timeLived < 4000) {
      const scaledDelta = delta / 16 + this.wastedDelta;
      const intDelta = Math.floor(scaledDelta);
      this.wastedDelta = scaledDelta - intDelta;
      this.generateShards(intDelta);
    }
    this.timeLived += delta;
    for (let i = this.shards.length - 1; i >= 0; i--) {
      if (this.shards[i].move(delta)) {
        this.group.remove(this.shards[i].mesh);
        this.shards.splice(i, 1);
      }
    }
    if (!this.shards.length) {
      return true;
    }
  }
}


class Shard {
  constructor(material) {
    this.life = 3000 + Math.random() * 2000;
    this.spin = 500 + Math.random() * 200;
    this.geometry = new Geometry();
    this.geometry.vertices = [
      new Vector3(-0.05 * Math.random(), 0.05, 0),
      new Vector3(0.05 * Math.random(), -0.05, 0),
      new Vector3(0, 0.05 * Math.random() - 0.02, 0)
    ];
    this.geometry.faces = [new Face3(0, 1, 2)];
    this.geometry.computeFaceNormals();
    this.mesh = new Mesh(this.geometry, material);
  }

  move(delta) {
    this.life -= delta;
    if (this.life < 0) {
      return true;
    }

    this.mesh.rotation.x += delta / this.spin;
    this.mesh.rotation.y += delta / this.spin;
    this.mesh.rotation.z += delta / this.spin;

    const y = this.mesh.position.y + delta / 2000;
    this.mesh.position.y = y;
    this.mesh.position.x = 0.2 * Math.sqrt(y) * Math.sin(this.life / 300);
    this.mesh.position.z = 0.2 * Math.sqrt(y) * Math.cos(this.life / 300);
  }
}

export default SlideTornado;
