import * as styles from '../css/navigator.module.css';
import { addClasses } from '../util.js';

export default class Navigator {
  constructor(slide) {
    this.interactive = slide.interactive;
    this.slide = slide;
    this.container = slide.interactive.container;
    this.title = slide.title;
  }

  get elements() {
    const { exit } = this.navigation;
    return [
      exit
    ];
  }

  get navigation() {
    if (!Navigator.navigation) {
      Navigator.navigation = Navigator.createNavigation(this.interactive);
    }
    return Navigator.navigation;
  }

  static createNavigation(interactive) {
    const exit = document.createElement('div');
    exit.innerHTML = '\u00d7';
    addClasses(exit, styles.exit);
    exit.addEventListener('click', () => {
      interactive.pause();
    })
    return { exit };
  }
};
