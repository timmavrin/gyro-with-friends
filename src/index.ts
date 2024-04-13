import { Gyro } from './gyro';

const _gyroRef = new Gyro();
let _ctx: CanvasRenderingContext2D | null;
let _ctxPoint: CanvasRenderingContext2D | null;

window.onload = () => {
  // Setup

  const canvas = document.getElementById('canvas') as HTMLCanvasElement;
  const pointerCanvas = document.getElementById('pointer-canvas') as HTMLCanvasElement;
  const size = Math.min(window.innerHeight, window.innerWidth);
  canvas.width = canvas.height = size;
  pointerCanvas.width = pointerCanvas.height = size;

  _ctx = canvas.getContext('2d');
  _ctxPoint = (document.querySelector('#pointer-canvas') as HTMLCanvasElement)?.getContext('2d');
  if (window.DeviceOrientationEvent) {
    window.addEventListener(
      'deviceorientation',
      (e: DeviceOrientationEvent) => {
        if (e.alpha && e.beta && e.gamma) {
          let beta = e.beta - _gyroRef.beta;
          let gamma = e.gamma - _gyroRef.gamma;
          let centerX = size / 2;
          let centerY = size / 2;

          let xPos = centerX + (size / 20) * gamma;
          let yPos = centerY + (size / 20) * beta;
          if (_ctx && _gyroRef.isDrawing) {
            _ctx.beginPath();
            _ctx.arc(xPos, yPos, 5, 0, 2 * Math.PI, true);
            _ctx.fillStyle = '#000';
            _ctx.fill();
          }
          if (_ctxPoint) {
            _ctxPoint.clearRect(0, 0, size, size);
            _ctxPoint.beginPath();
            _ctxPoint.arc(xPos, yPos, 20, 0, 2 * Math.PI, true);
            _ctxPoint.strokeStyle = '#333';
            _ctxPoint.stroke();

            _ctxPoint.beginPath();
            _ctxPoint.arc(xPos, yPos, 5, 0, 2 * Math.PI, true);
            _ctxPoint.fillStyle = '#000';
            _ctxPoint.fill();
          }
        }
      },
      false
    );
  }
  document.querySelector('#draw-button')?.addEventListener('pointerdown', (e) => {
    _gyroRef.isDrawing = true;
  });
  document.querySelector('#draw-button')?.addEventListener('pointerup', (e) => {
    _gyroRef.isDrawing = false;
  });
};
