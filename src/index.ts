class GyroReference {
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

type VirtualKeyboard = {
  boundingRect: Readonly<DOMRect>;
  overlaysContent: boolean;
  show: () => void;
  hide: () => void;
};

const _gyroRef = new GyroReference();
window.onload = () => {
  if (window.DeviceOrientationEvent) {
    window.addEventListener(
      'deviceorientation',
      (e: DeviceOrientationEvent) => {
        let alpha = document.getElementById('alpha');
        let beta = document.getElementById('beta');
        let gamma = document.getElementById('gamma');

        if (alpha && beta && gamma && e.alpha && e.beta && e.gamma) {
          alpha.innerText = e.alpha - _gyroRef.alpha + '';
          beta.innerText = e.beta - _gyroRef.beta + '';
          gamma.innerText = e.gamma - _gyroRef.gamma + '';
        }
      },
      false
    );
  }
};
