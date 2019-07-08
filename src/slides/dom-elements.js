import * as styles from '../css/dom-elements.module.css';
import { addClasses } from '../util.js';

export default class DOMElements {
  constructor(slide) {
    this.elements = [];
    this.slide = slide;
    DOMElements.createNavigation(slide.interactive);
    this.createNavigation();
    this.addListenersToInteractive();
  }

  addListenersToInteractive() {
    this.slide.on('enter', () => {
      this.elements.tab.classList.add(styles.active);
    });
    this.slide.on('exit', () => {
      this.elements.tab.classList.remove(styles.active);
    });
  }

  static createNavigation(interactive) {
    if (!DOMElements.navigation) {
      const exit = document.createElement('div');
      exit.innerHTML = '\u00d7';
      addClasses(exit, styles.exit);
      exit.addEventListener('click', () => {
        interactive.pause();
      })

      const tabContainer = document.createElement('ul');
      addClasses(tabContainer, styles.tabContainer);

      DOMElements.navigation = { exit, tabContainer };
      DOMElements.interactive = interactive;
      DOMElements.container = interactive.container;
      DOMElements.container.appendChild(exit);
      DOMElements.container.appendChild(tabContainer);
    }
  }

  createNavigation() {
    const tab = document.createElement('li');
    tab.innerHTML = "●";
    addClasses(tab, styles.tab);
    this.elements.tab = tab;
    DOMElements.navigation.tabContainer.appendChild(tab);
  }
};
