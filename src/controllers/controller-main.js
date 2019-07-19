export default class ControllerMain {
  constructor(interactive) {
    this.container = interactive.container;
    this.container.addEventListener('wheel', (e) => {
      if (Math.abs(e.deltaY) < 20) {
        this.flag = true;
      }
      else if (this.flag) {
        e.deltaY > 0 ? interactive.next() : interactive.prev();
        this.flag = false;
      }
    });
  }
};
