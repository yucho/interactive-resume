export default class ControllerMain {
  constructor(interactive) {
    this.container = interactive.container;
    this.interactive = interactive;
    this.addScrollControl();
  }

  addScrollControl() {
    let flag, timeout, supportsWheel, prevDeltaY = 0;
    const clearFlag = () => {
      const waitTime = 200;
      clearTimeout(timeout);
      timeout = setTimeout(() => flag = false, waitTime);
    };
    const onScroll = (e) => {
      if (e.type === 'wheel') {
        supportsWheel = true;
      } else if (supportsWheel) {
        return;
      }

      if (!flag && Math.abs(e.deltaY) > 5 && Math.abs(e.deltaY) > Math.abs(prevDeltaY)) {
        e.deltaY > 0 ? this.interactive.next() : this.interactive.prev();
        flag = true;
        clearFlag();
      }
      prevDeltaY = e.deltaY;
    }
    this.container.addEventListener('wheel', onScroll);
    this.container.addEventListener('mousewheel', onScroll);
    this.container.addEventListener('DOMMouseScroll', onScroll);
  }
};
