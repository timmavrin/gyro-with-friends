type RGB = [number, number, number];
type GradientDefinition = {
  [index: number]: RGB | undefined;
  getColors: (percent: number) => [RGB | undefined, RGB | undefined];
  pickColor: (percent: number) => RGB;
};

export class GyroCanvas {
  readonly squarePixels = 1000;
  readonly gradient: GradientDefinition = {
    // Red
    0: [255, 0, 0],
    1: [255, 0, 0],
    // Yellow
    2: [255, 255, 0],
    // Green
    3: [0, 128, 0],
    // Blue
    4: [0, 0, 255],
    // Purple
    5: [128, 0, 128],
    // Black
    6: [0, 0, 0],
    7: [0, 0, 0],
    /**
     * Gets the 2 closest color codes for that percentage range.
     * @param percent a number from 0-1
     * */
    getColors(percent: number) {
      let marker = 7 * percent;
      if (marker === 7) return [this[4], this[5]];
      else if (marker === 0) return [this[0], this[1]];
      else return [this[Math.floor(marker)], this[Math.ceil(marker)]];
    },
    pickColor(percent: number) {
      const [color1, color2] = this.getColors(percent);
      if (color1 === undefined || color2 === undefined) return [0, 0, 0]; //Black
      var w1 = percent;
      var w2 = 1 - w1;
      return [
        Math.round(color1[0] * w1 + color2[0] * w2),
        Math.round(color1[1] * w1 + color2[1] * w2),
        Math.round(color1[2] * w1 + color2[2] * w2),
      ];
    },
  };
  isDrawing: boolean = false;
  color: string = 'rgb(0,0,0)';
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

  registerParent(parent: Element | null) {
    if (parent) {
      const parentElement = parent as HTMLElement;
      const cssSize = Math.min(window.innerHeight, window.innerWidth);
      parentElement.style.setProperty('--canvas-size', cssSize + 'px');
      parent.appendChild(this.drawCtx.canvas);
      parent.appendChild(this.pointerCtx.canvas);
    }
  }
}
