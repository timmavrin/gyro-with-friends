export class Gyro implements Disposable {
  private _isCalibrating: boolean = false;

  /** Is the gyroscope in calibration mode? */
  readonly isCalibrating = () => this._isCalibrating;
  /** Y-Axis, Percentage of current beta angle from calibrated 0 - Max angle. */
  betaPercent: number = 0;
  /** X-Axis, Percentage of current gamma angle from calibrated 0 - Max angle. */
  gammaPercent: number = 0;

  // Internal Stuff
  private beta: number = 0;
  private betaOffset: number = 0;
  private betaMax: number = 45;
  private gamma: number = 0;
  private gammaOffset: number = 0;
  private gammaMax: number = 45;

  constructor() {
    this.calibrateCenter();
    window.addEventListener('deviceorientation', this.listenToOrientation.bind(this), true);
  }

  [Symbol.dispose](): void {
    window.removeEventListener('deviceorientation', this.listenToOrientation.bind(this), true);
  }

  private listenToOrientation(e: DeviceOrientationEvent) {
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
  }

  /**Calibrates the starting angles that correspond to the reticle being at the center of the screen.*/
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

  startCalibration() {
    this._isCalibrating = true;
    this.calibrateCenter();
    this.betaMax = 5;
    this.gammaMax = 5;
  }

  endCalibration() {
    this._isCalibrating = false;
  }

  /**In calibration mode, this function is called multiple times.
   * As the user tilts the device at comfortable angles, an absolute value of the angles are recorded.
   * Calibrating for small tilts makes it more sensitive.
   * Calibrating big tilts make it more precise
   */
  calibrateMax() {
    this.betaMax = Math.max(this.betaMax, Math.abs(this.beta));
    this.gammaMax = Math.max(this.gammaMax, Math.abs(this.gamma));
  }
}
