import * as styles from './index.module.css';
import * as util from './util';

const InteractiveResume = (config) => {
  InteractiveResume.config = Object.assign(InteractiveResume.config, config);
  return InteractiveResume;
};

InteractiveResume.config = {someFieldValue: true};

InteractiveResume.start = () => {
  const div = document.createElement('div');
  util.addClasses(div, styles.container);
  document.body.appendChild(div);
};
window.InteractiveResume = InteractiveResume;
