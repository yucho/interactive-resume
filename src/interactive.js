import { EventEmitter } from 'events';
import * as styles from './css/styles.module.css';
import { addClasses } from './util.js';
import ControllerMain from './controllers/controller-main.js'
import Rainy from './slides/slide-rainy.js';
import Tornado from './slides/slide-tornado.js';

export default class Interactive extends EventEmitter {
  constructor() {
    super();
    this.initializeWebGLRenderer();
    this.initializeSlides();
    this.controller = new ControllerMain(this);
    this.currentSlideIndex = 0;
    this.render = this.render.bind(this);
  }

  play() {
    this.emit('play');
    document.body.appendChild(this.container);
    this.playing = true;
    this.currentSlide.emitEnter();
    enableScrollJack();
    this.render();
  }

  pause() {
    this.playing = false;
    this.currentSlide.prevTimestamp = null;
    this.emit('pause');
    if (document.body.contains(this.container)) {
      document.body.removeChild(this.container);
    }
    disableScrollJack();
    this.currentSlide.emitExit();
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
    this.slides.push(new Rainy(this));
    this.slides.push(new Tornado(this));
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
      this.currentSlide.emitExit();
      this.currentSlideIndex += 1;
      this.currentSlide.emitEnter();
      this.emit('next');
    }
  }

  prev() {
    if (this.currentSlideIndex > 0) {
      this.currentSlide.emitExit();
      this.currentSlideIndex -= 1;
      this.currentSlide.emitEnter();
      this.emit('prev');
    }
  }
};

const disableTouchScroll = (e) => e.preventDefault();

const enableScrollJack = () => {
  document.body.classList.add(styles.scrollJack);
  document.body.addEventListener('touchmove', disableTouchScroll);
};

const disableScrollJack = () => {
  document.body.classList.remove(styles.scrollJack);
  document.body.removeEventListener('touchmove', disableTouchScroll);
};
