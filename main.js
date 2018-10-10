function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function divide(a, b) {
  return a / b;
}

function multiply(a, b) {
  return a * b;
}

function operate(operator, a, b) {
  switch (operator) {
    case `+`:
      add(a, b);
      break;
    case `-`:
      subtract(a, b);
      break;
    case `*`:
      multiply(a, b);
      break;
    case `/`:
      divide(a, b);
      break;
    default:
      console.log('Problem in operate');
      break;
  }
}

function addToDisplay(text) {
  const result = document.getElementById('result');
  result.textContent += text;
}

function storeNumbers(text) {
  const numbers = [];
  numbers.push(text);
  addToDisplay(numbers.join());
}

const numberButtons = document.getElementsByClassName('number');

function listenToEvents() {
  for (let i = 0; i < numberButtons.length; i += 1) {
    numberButtons[i].addEventListener(`click`, event =>
      storeNumbers(event.target.textContent)
    );
  }
}

listenToEvents();
