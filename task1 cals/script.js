const display = document.getElementById('display');

function appendValue(val) {
  display.value += val;
}

function clearDisplay() {
  display.value = '';
}

function calculate() {
  try {
    display.value = eval(display.value);
  } catch {
    display.value = 'Error';
  }
}

function squareRoot() {
  try {
    display.value = Math.sqrt(eval(display.value));
  } catch {
    display.value = 'Error';
  }
}

function appendTrig(func) {
  try {
    const val = eval(display.value);
    let result;
    switch(func) {
      case 'sin': result = Math.sin(toRadians(val)); break;
      case 'cos': result = Math.cos(toRadians(val)); break;
      case 'tan': result = Math.tan(toRadians(val)); break;
    }
    display.value = result.toFixed(5);
  } catch {
    display.value = 'Error';
  }
}

function toRadians(deg) {
  return deg * Math.PI / 180;
}
