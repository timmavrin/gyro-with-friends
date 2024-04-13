export class Gyro {
  isDrawing: boolean = false;
  alpha: number = 0;
  beta: number = 0;
  gamma: number = 0;

  constructor() {
    this.calibrateCenter();
  }

  calibrateCenter() {
    window.addEventListener(
      'deviceorientation',
      (e: DeviceOrientationEvent) => {
        this.alpha = e.alpha ?? 0;
        this.beta = e.beta ?? 0;
        this.gamma = e.gamma ?? 0;
      },
      { once: true }
    );
  }
}
