export class GyroCanvas {
  readonly squarePixels = 1000;
  drawCtx: CanvasRenderingContext2D;
  pointerCtx: CanvasRenderingContext2D;
  constructor() {
    const drawLayer = document.createElement('canvas');
    const pointerLayer = document.createElement('canvas');
    this.drawCtx = drawLayer.getContext('2d') as CanvasRenderingContext2D;
    this.pointerCtx = pointerLayer.getContext('2d') as CanvasRenderingContext2D;
    // Assign canvas pixel size
    drawLayer.height = drawLayer.width = pointerLayer.height = pointerLayer.width = this.squarePixels;
    drawLayer.className = pointerLayer.className = 'canvas';
    drawLayer.id = 'canvas';
    pointerLayer.id = 'pointerCanvas';
  }

  registerParent = (parent: Element | null) => {
    if (parent) {
      const parentElement = parent as HTMLElement;
      const cssSize = Math.min(window.innerHeight, window.innerWidth);
      parentElement.style.setProperty('--canvas-size', cssSize + 'px');
      parent.appendChild(this.drawCtx.canvas);
      parent.appendChild(this.pointerCtx.canvas);
    }
  };
}
