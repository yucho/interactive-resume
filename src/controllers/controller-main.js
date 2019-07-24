export default class ControllerMain {
  constructor(interactive) {
    this.container = interactive.container;
    this.interactive = interactive;
    this.clearFlag = this.clearFlag.bind(this);
    this.addScrollControl();
    this.addKeyControl();
  }

  clearFlag() {
    const waitTime = 200;
    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => this.flag = false, waitTime);
  }

  addScrollControl() {
    let supportsWheel, prevDeltaY = 0;
    const onScroll = (e) => {
      if (e.type === 'wheel') {
        supportsWheel = true;
      } else if (supportsWheel) {
        return;
      }

      if (!this.flag && Math.abs(e.deltaY) > 5 && Math.abs(e.deltaY) > Math.abs(prevDeltaY)) {
        e.deltaY > 0 ? this.interactive.next() : this.interactive.prev();
        this.flag = true;
        this.clearFlag();
      }
      prevDeltaY = e.deltaY;
    }
    this.container.addEventListener('wheel', onScroll);
    this.container.addEventListener('mousewheel', onScroll);
    this.container.addEventListener('DOMMouseScroll', onScroll);
  }

  addKeyControl() {
    const onKeydown = (e) => {
      if (e.isComposing || e.keyCode === 229) {
        return;
      }
      const backspace = 8
      const pageUp = 33;
      const upArrow = 38;
      const deleteKey = 46;
      const w = 87;
      const numpad8 = 104;

      const enter = 13;
      const pageDown = 34;
      const downArrow = 40;
      const s = 83;
      const numpad2 = 98;
      if (!this.flag) {
        if ([backspace, pageUp, upArrow, deleteKey, w, numpad8].includes(e.keyCode)) {
          this.interactive.prev();
          this.flag = true;
          this.clearFlag();
        } else if ([enter, pageDown, downArrow, s, numpad2].includes(e.keyCode)) {
          this.interactive.next();
          this.flag = true;
          this.clearFlag();
        }
      }
    };
    document.addEventListener('keydown', onKeydown);
  }
};
