window.onload = () => {
  var testInput = document.getElementById('test-input') as HTMLInputElement | null;
  testInput?.addEventListener('input', (e: Event) => {
    var inputElement = e.target as HTMLInputElement;
    var output = document.getElementById('test-input-result') as HTMLHeadingElement | null;

    if (output) {
      output.innerText = inputElement.value;
    }
  });
};
