import { Gyro } from './gyro';
import { GyroCanvas } from './gyroCanvas';

const _gyroRef = new Gyro();
const _canvas = new GyroCanvas();

window.onload = () => {
  _canvas.registerParent(document.querySelector('#canvas-container'));
  let _drawButton = document.querySelector('#draw-button');
  _drawButton?.addEventListener('touchstart', (e) => {
    _canvas.isDrawing = true;
    // Set color the first time
    _canvas.color = getHSL((e as TouchEvent).touches[0].clientX);
  });
  _drawButton?.addEventListener('touchmove', (e) => {
    // Keep setting the color
    _canvas.color = getHSL((e as TouchEvent).touches[0].clientX);
  });
  _drawButton?.addEventListener('touchend', () => {
    _canvas.isDrawing = false;
  });
  document.querySelector('#calibrate-button')?.addEventListener('touchstart', (e) => {
    _gyroRef.startCalibration();
  });
  document.querySelector('#calibrate-button')?.addEventListener('touchend', (e) => {
    _gyroRef.endCalibration();
  });
  window.requestAnimationFrame(draw);
};

const getHSL = (clientX: number) => {
  return `hsl(${(360 * clientX) / window.innerWidth} 100 50)`;
};

const draw = () => {
  if (_gyroRef.isCalibrating()) {
    _gyroRef.calibrateMax();
  } else {
    let centerX = _canvas.squarePixels / 2;
    let centerY = _canvas.squarePixels / 2;

    let xPos = centerX + (_canvas.squarePixels * _gyroRef.gammaPercent) / 2;
    let yPos = centerY + (_canvas.squarePixels * _gyroRef.betaPercent) / 2;
    if (_canvas.isDrawing) {
      _canvas.drawCtx.beginPath();
      _canvas.drawCtx.arc(xPos, yPos, 5, 0, 2 * Math.PI, true);
      _canvas.drawCtx.fillStyle = _canvas.color;
      _canvas.drawCtx.fill();
    }

    _canvas.pointerCtx.clearRect(0, 0, _canvas.squarePixels, _canvas.squarePixels);
    _canvas.pointerCtx.beginPath();
    _canvas.pointerCtx.arc(xPos, yPos, 20, 0, 2 * Math.PI, true);
    _canvas.pointerCtx.strokeStyle = '#333';
    _canvas.pointerCtx.stroke();

    _canvas.pointerCtx.beginPath();
    _canvas.pointerCtx.arc(xPos, yPos, 5, 0, 2 * Math.PI, true);
    _canvas.pointerCtx.fillStyle = '#000';
    _canvas.pointerCtx.fill();
  }
  window.requestAnimationFrame(draw);
};
