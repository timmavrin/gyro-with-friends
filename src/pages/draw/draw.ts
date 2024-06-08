import { Gyro } from '../../gyro';
import { GyroCanvas } from '../../gyroCanvas';
import { create } from '../../helpers';

let _gyroRef: Gyro | undefined;
let _canvas: GyroCanvas | undefined;

export const removeDraw = () => {
  document.querySelector('#draw-page')?.remove();
  document.body.replaceChildren();
};

export const renderDraw = () => {
  _gyroRef = new Gyro();
  _canvas = new GyroCanvas();
  const page = create('div', { id: 'draw-page' });
  const canvasContainer = create('div', { id: 'canvas-container' });
  _canvas.registerParent(canvasContainer);
  const colorCanvas = create('canvas', { id: 'color-canvas' });
  const calibrateButton = create('button', { id: 'calibrate-button', innerText: 'Calibrate' });

  page.append(canvasContainer, colorCanvas, calibrateButton);
  document.body.appendChild(page);

  let colorContext = colorCanvas.getContext('2d')!;
  const gradient = colorContext?.createLinearGradient(0, 200, 400, 200);
  gradient?.addColorStop(0, 'red');
  gradient?.addColorStop(0.125, 'orange');
  gradient?.addColorStop(0.25, 'yellow');
  gradient?.addColorStop(0.375, 'green');
  gradient?.addColorStop(0.5, 'blue');
  gradient?.addColorStop(0.625, 'purple');
  gradient?.addColorStop(0.75, 'black');
  gradient?.addColorStop(1, 'black');

  colorContext.fillStyle = gradient;
  colorContext.fillRect(0, 0, 400, 400);

  colorCanvas.ontouchstart = (e) => {
    let xPos = e.touches[0].clientX;
    if (_canvas) {
      _canvas.isDrawing = true;
      let id = colorContext.getImageData((xPos * 300) / _canvas.squarePixels, 0, 1, 1).data;
      _canvas.color = `rgb(${id[0]},${id[1]},${id[2]})`;
    }
  };

  colorCanvas.ontouchmove = (e) => {
    let xPos = e.touches[0].clientX;
    if (_canvas) {
      // Keep setting the color
      let id = colorContext.getImageData((xPos * 300) / _canvas.squarePixels, 0, 1, 1).data;
      _canvas.color = `rgb(${id[0]},${id[1]},${id[2]})`;
    }
  };

  colorCanvas.ontouchend = () => {
    if (_canvas) {
      _canvas.isDrawing = false;
    }
  };

  _gyroRef.listen();
  calibrateButton.addEventListener('touchstart', (e) => {
    if (_gyroRef) {
      _gyroRef.startCalibration();
    }
  });
  calibrateButton.addEventListener('touchend', (e) => {
    if (_gyroRef) {
      _gyroRef.endCalibration();
    }
  });

  window.requestAnimationFrame(draw);
};

const getHSL = (clientX: number) => {
  return `hsl(${(360 * clientX) / window.innerWidth} 100 50)`;
};

const draw = () => {
  if (_gyroRef?.isCalibrating()) {
    _gyroRef.calibrateMax();
  } else if (_canvas && _gyroRef) {
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
