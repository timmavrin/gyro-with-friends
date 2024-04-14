import { Gyro } from './gyro';
import { GyroCanvas } from './gyroCanvas';

const _gyroRef = new Gyro();
const _canvas = new GyroCanvas();

window.onload = () => {
  _canvas.registerParent(document.querySelector('#canvas-container'));

  document.querySelector('#draw-button')?.addEventListener('touchstart', (e) => {
    _gyroRef.isDrawing = true;
  });
  document.querySelector('#draw-button')?.addEventListener('touchend', (e) => {
    _gyroRef.isDrawing = false;
  });
  document.querySelector('#calibrate-button')?.addEventListener('touchstart', (e) => {
    _gyroRef.betaMax = 40;
    _gyroRef.gammaMax = 40;
    _gyroRef.calibrateCenter();
    _gyroRef.isCalibrating = true;
  });
  document.querySelector('#calibrate-button')?.addEventListener('touchend', (e) => {
    _gyroRef.isCalibrating = false;
    _gyroRef.betaMax = _gyroRef.calBetaMax;
    _gyroRef.gammaMax = _gyroRef.calGammaMax;
    _gyroRef.calBetaMax = 0;
    _gyroRef.calGammaMax = 0;
  });
  window.requestAnimationFrame(draw);
};

const draw = () => {
  if (_gyroRef.isCalibrating) {
    _gyroRef.calibrateMax();
  } else {
    let centerX = _canvas.squarePixels / 2;
    let centerY = _canvas.squarePixels / 2;

    let xPos = centerX + (_canvas.squarePixels * _gyroRef.gammaPercent) / 2;
    let yPos = centerY + (_canvas.squarePixels * _gyroRef.betaPercent) / 2;
    if (_gyroRef.isDrawing) {
      _canvas.drawCtx.beginPath();
      _canvas.drawCtx.arc(xPos, yPos, 5, 0, 2 * Math.PI, true);
      _canvas.drawCtx.fillStyle = '#000';
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
