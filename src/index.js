import * as interactive from './interactive.js';

const Interactive = (config) => {
  Interactive.config = Object.assign(Interactive.config, config);
  return Interactive;
};

Interactive.config = {
  slides: [
    'tornado'
  ],
  transitionQueue: true,
  transitionQueueMax: 3,
  transitionRecovery: 80,
  transitionTime: 200,
  transitionPauseBetweenQueue: 100
};

interactive.initialize();

Interactive.start = () => {
  const {config} = Interactive;
  interactive.fadeInContainer();
  interactive.instantiateSlides(config);
  interactive.render();
};

export default Interactive;
