import { create } from './helpers';

export class GyroCanvas {
  readonly squarePixels = 1000;
  isDrawing: boolean = false;
  color: string = 'rgb(0,0,0)';
  drawCtx: CanvasRenderingContext2D;
  pointerCtx: CanvasRenderingContext2D;
  constructor() {
    const drawLayer = create('canvas', {
      id: 'canvas',
      className: 'canvas',
      width: this.squarePixels,
      height: this.squarePixels,
    });
    const pointerLayer = create('canvas', {
      id: 'pointer-canvas',
      className: 'canvas',
      width: this.squarePixels,
      height: this.squarePixels,
    });
    this.drawCtx = drawLayer.getContext('2d') as CanvasRenderingContext2D;
    this.pointerCtx = pointerLayer.getContext('2d') as CanvasRenderingContext2D;
  }

  registerParent(parent: Element | null) {
    if (parent) {
      const cssSize = Math.min(window.innerHeight, window.innerWidth);
      document.body.style.setProperty('--canvas-size', cssSize + 'px');

      parent.appendChild(this.drawCtx.canvas);
      parent.appendChild(this.pointerCtx.canvas);
    }
  }
}
