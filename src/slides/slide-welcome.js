import Slide from './slide.js';

class Welcome extends Slide {
  constructor(data) {
    super(data);
    this.on('enter', this.onEnter);
  }

  onEnter() {
    console.log('entered');
  }
}

export default Welcome;
