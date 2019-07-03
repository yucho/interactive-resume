export default class ControllerMain {
  constructor(interactive) {
    this.container = interactive.container;
    this.container.addEventListener('mousewheel', (e) => {
      if (Math.abs(e.deltaY) > 20) {
        e.deltaY > 0 ? interactive.next() : interactive.prev();
      }
    });
  }
};
