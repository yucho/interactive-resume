import * as styles from '../css/dom-elements.module.css';
import { addClasses } from '../util.js';

export default class DOMElements {
  constructor(slide) {
    DOMElements.createNavigation(slide.interactive);
    this.slide = slide;
    this.elements = [];
    this.addListenersToInteractive();
  }

  addListenersToInteractive() {
    this.slide.on('enter', () => {
      for (const element of this.elements) {
        Navigator.container.addChild(element);
      }
    });
    this.slide.on('exit', () => {
      for (const element of this.elements) {
        Navigator.container.removeChild(element);
      }
    });
  }

  static createNavigation(interactive) {
    if (!Navigator.navigation) {
      const exit = document.createElement('div');
      exit.innerHTML = '\u00d7';
      addClasses(exit, styles.exit);
      exit.addEventListener('click', () => {
        interactive.pause();
      })
      Navigator.navigation = { exit };
      Navigator.interactive = interactive;
      Navigator.container = interactive.container;
      Navigator.container.appendChild(exit);
    }
  }
};
