import Controller from './controller';

class ControllerMouseFollow extends Controller {
  constructor({ camera }) {
    super();
    this.camera = camera;
    this.initialPosition = camera.position;
    this.initialRotation = camera.rotation;
  }

};
