import Slide from './slide.js';
import * as style from '../css/slide-welcome.module.css';
import { addClasses } from '../util.js';
import DOMElements from './dom-elements.js';

class Welcome extends Slide {
  constructor(data) {
    super(data);
    this.createDomElements();
    this.on('enter', this.onEnter);
    this.on('exit', this.onExit);
    this.createParticles();
  }

  createDomElements() {
    const welcome = document.createElement('h1');
    welcome.innerHTML = 'WELCOME';
    addClasses(welcome, style.welcome);

    this.domElements.elements.push(welcome);
  }

  onEnter() {
    for (const el of this.domElements.elements) {
      DOMElements.container.appendChild(el);
    }
  }

  onExit() {
    for (const el of this.domElements.elements) {
      DOMElements.container.removeChild(el);
    }
  }

  createParticles() {
    const uniforms = {
      pointTexture: { value: new THREE.TextureLoader().load("./spark.png") }
    };
    const vShader = `
      attribute float size;
			varying vec3 vColor;
			void main() {
				vColor = color;
				vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );
				gl_PointSize = size * ( 300.0 / -mvPosition.z );
				gl_Position = projectionMatrix * mvPosition;
			}
      `;
    const fShader = `
      uniform sampler2D pointTexture;
			varying vec3 vColor;
			void main() {
				gl_FragColor = vec4( vColor, 1.0 );
				gl_FragColor = gl_FragColor * texture2D( pointTexture, gl_PointCoord );
			}
    `;
    const material = new THREE.ShaderMaterial({
      uniforms: uniforms,
      vertexShader: vShader,
      fragmentShader: fShader,
      blending: THREE.AdditiveBlending,
      depthTest: false,
      transparent: true,
      vertexColors: true
    });
    this.numParticles = 100000;
    const radius = 200;
    const geometry = new THREE.BufferGeometry();
    const positions = [];
    const colors = [];
    const sizes = [];
    const color = new THREE.Color();
    for (let i = 0; i < this.numParticles; i++) {
      positions.push((Math.random() * 2 - 1) * radius);
      positions.push((Math.random() * 2 - 1) * radius);
      positions.push((Math.random() * 2 - 1) * radius);
      color.setHSL(i / this.numParticles, 1.0, 0.4);
      colors.push(color.r, color.g, color.b);
      sizes.push(20);
    }
    geometry.addAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
    geometry.addAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
    geometry.addAttribute('size', new THREE.Float32BufferAttribute(sizes, 1).setDynamic(true));
    this.particles = new THREE.Points(geometry, material);
    this.geometry = geometry;
    this.scene.add(this.particles);
  }

  animate(delta) {
    const time = Date.now() * 0.005;
    this.particles.rotation.z = 0.01 * time;
    var sizes = this.geometry.attributes.size.array;
    for (var i = 0; i < this.numParticles; i++) {
      sizes[i] = 10 * (1 + Math.sin(0.1 * i + time));
    }
    this.geometry.attributes.size.needsUpdate = true;
  }
}

export default Welcome;
