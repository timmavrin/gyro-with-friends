import { Gyro } from './gyro';

const _gyroRef = new Gyro();
let _alpha: HTMLElement | null;
let _beta: HTMLElement | null;
let _gamma: HTMLElement | null;
let _ctx: CanvasRenderingContext2D | null;

window.onload = () => {
  // Setup
  _alpha = document.getElementById('alpha');
  _beta = document.getElementById('beta');
  _gamma = document.getElementById('gamma');
  const canvas = document.getElementById('canvas') as HTMLCanvasElement;
  const size = Math.min(window.innerHeight, window.innerWidth);
  canvas.width = canvas.height = size;
  _ctx = canvas.getContext('2d');
  if (window.DeviceOrientationEvent) {
    window.addEventListener(
      'deviceorientation',
      (e: DeviceOrientationEvent) => {
        if (_alpha && _beta && _gamma && e.alpha && e.beta && e.gamma) {
          // _alpha.innerText = e.alpha - _gyroRef.alpha + '';
          // _beta.innerText = e.beta - _gyroRef.beta + '';
          // _gamma.innerText = e.gamma - _gyroRef.gamma + '';

          let beta = e.beta - _gyroRef.beta;
          let gamma = e.gamma - _gyroRef.gamma;
          let centerX = size / 2;
          let centerY = size / 2;

          let xPos = centerX + (size / 20) * gamma;
          let yPos = centerY + (size / 20) * beta;
          if (_ctx) {
            _ctx.clearRect(0, 0, size, size);
            _ctx.beginPath();
            _ctx.arc(xPos, yPos, 20, 0, 2 * Math.PI, true);
            _ctx.strokeStyle = '#000';
            _ctx.stroke();
          }
        }
      },
      false
    );
  }
};
