window.onload = () => {
  if (window.DeviceOrientationEvent) {
    window.addEventListener(
      'deviceorientation',
      (e: DeviceOrientationEvent) => {
        let alpha = document.getElementById('alpha');
        let beta = document.getElementById('beta');
        let gamma = document.getElementById('gamma');

        if (alpha && beta && gamma) {
          alpha.innerText = e.alpha?.toString() ?? '';
          beta.innerText = e.beta?.toString() ?? '';
          gamma.innerText = e.gamma?.toString() ?? '';
        }
      },
      false
    );
  }
};
