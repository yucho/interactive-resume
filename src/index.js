import * as resume from './resume.js';

const InteractiveResume = (config) => {
  InteractiveResume.config = Object.assign(InteractiveResume.config, config);
  return InteractiveResume;
};

InteractiveResume.config = {
  slides: [
    'tornado'
  ],
  transitionQueue: true,
  transitionQueueMax: 3,
  transitionRecovery: 80,
  transitionTime: 200,
  transitionPauseBetweenQueue: 100
};

resume.initialize();

InteractiveResume.start = () => {
  const {config} = InteractiveResume;
  resume.fadeInContainer();
  resume.instantiateSlides(config);
  resume.render();
};

export default InteractiveResume;
