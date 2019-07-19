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
}

export default Welcome;
