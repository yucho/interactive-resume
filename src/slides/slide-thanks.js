import Slide from './slide.js';

class Thanks extends Slide {
  constructor(data) {
    super(data);
    this.createText();
  }

  createCamera() {
    super.createCamera();
    this.camera.position.set(-50, 30, 0);
    this.camera.lookAt(0, 0, -100);
  }

  createText() {
    this.scene.background = new THREE.Color(0xf0f0f0);
    const loader = new THREE.FontLoader();
    loader.load('helvetiker_regular.typeface.json', (font) => {
      let xMid, text;
      const color = 0x006699;
      const matDark = new THREE.LineBasicMaterial({
        color: color,
        side: THREE.DoubleSide
      });
      const matLite = new THREE.MeshBasicMaterial({
        color: color,
        transparent: true,
        opacity: 0.4,
        side: THREE.DoubleSide
      });
      const message = "Thanks for Playing";
      const shapes = font.generateShapes(message, 10);
      const geometry = new THREE.ShapeBufferGeometry(shapes);
      geometry.computeBoundingBox();
      xMid = - 0.5 * (geometry.boundingBox.max.x - geometry.boundingBox.min.x);
      geometry.translate(xMid, 0, 0);
      // make shape ( N.B. edge view not visible )
      text = new THREE.Mesh(geometry, matLite);
      text.position.z = - 100;
      this.scene.add(text);
      // make line shape ( N.B. edge view remains visible )
      const holeShapes = [];
      for (let i = 0; i < shapes.length; i++) {
        const shape = shapes[i];
        if (shape.holes && shape.holes.length > 0) {
          for (let j = 0; j < shape.holes.length; j++) {
            const hole = shape.holes[j];
            holeShapes.push(hole);
          }
        }
      }
      shapes.push.apply(shapes, holeShapes);
      const lineText = new THREE.Object3D();
      for (let i = 0; i < shapes.length; i++) {
        const shape = shapes[i];
        const points = shape.getPoints();
        const geometry = new THREE.BufferGeometry().setFromPoints(points);
        geometry.translate(xMid, 0, 0);
        const lineMesh = new THREE.Line(geometry, matDark);
        lineText.add(lineMesh);
      }
      this.scene.add(lineText);
    });
  }

  animate(delta) {
    const time = Date.now() * 0.0005
    this.camera.position.set(-50 + 20 * Math.sin(time), 30 + -40 * Math.cos(time * 0.2), 0);
    this.camera.lookAt(0, 0, -100);
  }
}

export default Thanks;
