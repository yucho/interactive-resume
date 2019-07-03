import * as styles from './css/styles.module.css';
import { addClasses } from './util.js';
import ControllerMain from './controllers/controller-main.js'
import Tornado from './slides/slide-tornado.js';
import Cube from './slides/slide-cube.js';

export default class Interactive {
  constructor() {
    this.initializeWebGLRenderer();
    this.initializeSlides();
    this.controller = new ControllerMain(this);
    this.currentSlideIndex = 0;
    this.render = this.render.bind(this);
  }

  play() {
    document.body.appendChild(this.container);
    this.playing = true;
    this.render();
  }

  pause() {
    this.playing = false;
    this.currentSlide.prevTimestamp = null;
    if (document.body.contains(this.container)) {
      document.body.removeChild(this.container);
    }
  }

  initializeWebGLRenderer() {
    this.container = document.createElement('div');
    addClasses(this.container, styles.container);
  
    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setPixelRatio(devicePixelRatio);
    this.container.appendChild(this.renderer.domElement);
  }

  initializeSlides() {
    this.slides = [];
    this.slides.push(new Tornado(this));
    this.slides.push(new Cube(this));
  }

  get currentViewport() {
    return [0, 0, this.container.clientWidth, this.container.clientHeight];
  }

  get currentSlide() {
    return this.slides[this.currentSlideIndex];
  }

  render(timestamp) {
    if (this.playing) requestAnimationFrame(this.render);

    if (timestamp) {
      this.renderer.clear();
      const [, , width, height] = this.currentViewport;
      this.renderer.setSize(width, height);
      // this.renderer.setViewport(this.currentViewport); // use this later

      if(!this.currentSlide.prevTimestamp) {
        this.currentSlide.prevTimestamp = timestamp;
      }
      const delta = timestamp - this.currentSlide.prevTimestamp;
      this.currentSlide.render(delta);
      this.currentSlide.prevTimestamp = timestamp;
    }
  }

  next() {
    if (this.currentSlideIndex < this.slides.length - 1) {
      this.currentSlideIndex += 1;
    }
  }

  prev() {
    if (this.currentSlideIndex > 0) {
      this.currentSlideIndex -= 1;
    }
  }
};
