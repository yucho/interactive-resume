import * as styles from './css/styles.module.css';
import * as util from './util.js';
import {createTornado} from './slides/slide-tornado.js';

const InteractiveResume = (config) => {
  InteractiveResume.config = Object.assign(InteractiveResume.config, config);
  return InteractiveResume;
};

InteractiveResume.config = {someFieldValue: true};

InteractiveResume.start = () => {
  const div = document.createElement('div');
  util.addClasses(div, styles.container);
  document.body.appendChild(div);
  createTornado(div);
};

export default InteractiveResume;
