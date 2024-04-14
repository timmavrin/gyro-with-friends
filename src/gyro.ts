export class Gyro {
  isCalibrating: boolean = false;
  isDrawing: boolean = false;

  betaOffset: number = 0;
  gammaOffset: number = 0;

  betaMax: number = 45;
  gammaMax: number = 45;
  calBetaMax: number = 0;
  calGammaMax: number = 0;

  beta: number = 0;
  gamma: number = 0;

  betaPercent: number = 0;
  gammaPercent: number = 0;

  constructor() {
    this.calibrateCenter();
    window.addEventListener(
      'deviceorientation',
      (e: DeviceOrientationEvent) => {
        if (e.beta && e.gamma) {
          this.beta = e.beta - this.betaOffset;
          if (this.beta > 180) this.beta = -180 - this.beta;
          else if (this.beta < -180) this.beta = -(180 - this.beta);

          this.gamma = e.gamma - this.gammaOffset;
          if (this.gamma > 90) this.gamma = -90 - this.gamma;
          else if (this.gamma < -90) this.gamma = -(90 - this.gamma);

          this.betaPercent = 0;
          if (this.beta < 0) this.betaPercent = Math.max(-this.betaMax, this.beta) / this.betaMax;
          else if (this.beta > 0) this.betaPercent = Math.min(this.betaMax, this.beta) / this.betaMax;

          this.gammaPercent = 0;
          if (this.gamma < 0) this.gammaPercent = Math.max(-this.gammaMax, this.gamma) / this.gammaMax;
          else if (this.gamma > 0) this.gammaPercent = Math.min(this.gammaMax, this.gamma) / this.gammaMax;
        }
      },
      false
    );
  }

  calibrateCenter() {
    window.addEventListener(
      'deviceorientation',
      (e: DeviceOrientationEvent) => {
        this.betaOffset = e.beta ?? 0;
        this.gammaOffset = e.gamma ?? 0;
      },
      { once: true }
    );
  }

  calibrateMax() {
    this.calBetaMax = Math.max(this.calBetaMax, Math.abs(this.beta));
    this.calGammaMax = Math.max(this.calGammaMax, Math.abs(this.gamma));
  }
}
