import * as styles from './css/styles.module.css';
import {addClasses} from './util.js';
import tornado from './slides/slide-tornado';

const data = {
  current: {
    slide: 0
  },
  queue: [],
  previousFrameStamp: 0
};

export const initialize = () => {
  const div = document.createElement('div');
  addClasses(div, styles.container);
  data.container = div;

  const renderer = new THREE.WebGLRenderer();
  renderer.setPixelRatio(devicePixelRatio);
  div.appendChild(renderer.domElement);
  data.renderer = renderer;

  const [width, height] = [div.clientWidth, div.clientHeight];
  const currentViewport = [0, 0, width, height];
  data.current.viewport = currentViewport;
}

export const instantiateSlides = (config) => {
  data.config = config;

  const slideClasses = {
    tornado
  };

  const slides = [];
  for (const name of config.slides) {
    if (slideClasses[name]) {
      const slide = slideClasses[name].instantiate(data);
      slides.push(slide);
    } else {
      console.warn(`$(name) slide does not exist`);
    }
  }

  data.slides = slides;
};

export const fadeInContainer = () => {
  const {container} = data;
  document.body.appendChild(container);
};

export const fadeOutContainer = () => {

};

export const render = (now) => {
  data.requestId = requestAnimationFrame(render);
  setCurrentRenderCycle(now);

  data.renderer.clear();
  data.renderer.setViewport(...data.currentRenderCycle.currentViewport);
  data.slides[data.current.slide].render();
  // if(isTransition) {
  //   renderer.setViewport(...queue[0].viewport)
  // }
  clearCurrentRenderCycle();
};

const setCurrentRenderCycle = (now) => {
  const delta = normalizeFrame(now);
  const {container, renderer} = data;
  const [width, height] = [container.clientWidth, container.clientHeight];
  data.currentRenderCycle = {stamp: now, delta, width, height};

  renderer.setSize(width, height);
  const [currentViewport, nextViewport] = calculateTransitionViewports();
  Object.assign(data.currentRenderCycle, {currentViewport, nextViewport});
};

const clearCurrentRenderCycle = () => {
  data.previousFrameStamp = data.currentRenderCycle.stamp;
  data.currentRenderCycle = {};
}

const addControlListeners = () => {
  const {renderer} = data;
  renderer.addEventListener('keydown', keydownEventListener);
};

const removeControlListeners = () => {
  const { renderer } = data;
  renderer.removeEventListener('keydown', keydownEventListener);
};

const keydownEventListener = (e) => {
  const { current, queue } = data;
  const next = queue.length ? queue[queue.length - 1].slide : current.slide;
  switch (e.code) {
    case 40:
    case 83:
      switchSlide(next + 1);
      break;
    case 38:
    case 87:
      switchSlide(next - 1);
      break;
  }
};

export const switchSlide = (next) => {
  const {config, container, current,
    isTransitionRecovered, queue, slides} = data;
  const direction = next - current.slide;
  if (direction === 0 || queue.length >= config.transitionQueueMax ||
    !isTransitionRecovered || next < 0 || next > slides.length) {
    return;
  }

  data.isTransitionRecovered = false;
  setTimeout(() => { data.isTransitionRecovered = true },
    config.transitionRecovery
  );

  const [width, height] = [container.clientWidth, container.clientHeight];
  let nextViewport;
  if(direction > 0) {
    nextViewport = [0, height, width, height * 2];
  } else {
    nextViewport = [0, -height * 2, width, -height];
  }
  data.queue.push({slide: next, viewport: nextViewport, timePassed: 0});
  Object.assign(data, {isTransition:true});
};

const normalizeFrame = (now) => {
  let delta = now - data.previousFrameStamp;
  return delta > 100 ? 100 : delta;
};

const calculateTransitionViewports = () => {
  const {isTransition, currentRenderCycle} = data;
  const {width, height} = currentRenderCycle;
  if(!isTransition) {
    const currentViewport = [0, 0, width, height];
    const nextViewport = [0, 0, 0, 0];
    return [currentViewport, nextViewport];
  }

  // const { transitionTime, transitionPauseBetweenQueue } = data.config;
  // const { timePassed } = data.queue[0];
  // if (timePassed <= transitionTime)
  // const unitDirVector = 
};
