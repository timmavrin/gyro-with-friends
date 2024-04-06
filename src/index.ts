import { Gyro } from './gyro';

const _gyroRef = new Gyro();
let _alpha: HTMLElement | null;
let _beta: HTMLElement | null;
let _gamma: HTMLElement | null;

window.onload = () => {
  // Setup
  _alpha = document.getElementById('alpha');
  _beta = document.getElementById('beta');
  _gamma = document.getElementById('gamma');
  if (window.DeviceOrientationEvent) {
    window.addEventListener(
      'deviceorientation',
      (e: DeviceOrientationEvent) => {
        if (_alpha && _beta && _gamma && e.alpha && e.beta && e.gamma) {
          _alpha.innerText = e.alpha - _gyroRef.alpha + '';
          _beta.innerText = e.beta - _gyroRef.beta + '';
          _gamma.innerText = e.gamma - _gyroRef.gamma + '';
        }
      },
      false
    );
  }
};
