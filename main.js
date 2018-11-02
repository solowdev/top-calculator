// | What I was working on last time? |
// ------------------------------------
// Cleaning my lists with string.match()
// Reading documentation on string.match() or other ways to check for string content efficiently

function calculator() {
  const operatorsAndNumbersButtons = Array.from(
    document.getElementsByClassName(`ope-and-num`)
  );
  const equalButton = document.getElementById(`equal`);
  const result = document.getElementById(`display`);
  const resetButton = document.getElementById(`reset`);
  let allClickedButtons = [];
  let numbersList = [];
  let operatorsList = [];

  function addToDisplay(string) {
    result.textContent += string;
  }

  function clearDisplay() {
    result.textContent = ``;
  }

  function createSeparateLists(data) {
    let i = 0;
    data.forEach(element => {
      if (element.match(/\+|-|\*|\//) !== null) {
        operatorsList[i] = element;
        i += 1;
      } else if (element.match(/\d/) !== null) {
        if (typeof numbersList[i] === `undefined`) {
          numbersList[i] = element;
        } else {
          numbersList[i] += element;
        }
      }
    });
  }

  function cleanList(list) {
    operatorsList = operatorsList.filter(currentElement => {
      if (
        currentElement.match(/\*/) !== null ||
        currentElement.match(/\//) !== null
      ) {
      }
    });
  }

  function applyPrecedence() {
    let i = 0;
    let j = 1;
    operatorsList.forEach(element => {
      if (element.match(/\*/) !== null) {
        numbersList[i] *= numbersList[j];
        numbersList.splice(j, 1);
      } else if (element.match(/\//) !== null) {
        numbersList[i] /= numbersList[j];
        numbersList.splice(j, 1);
      } else {
        i += 1;
        j += 1;
      }
    });
  }

  function operate() {}

  function listenToEvents() {
    operatorsAndNumbersButtons.forEach(button =>
      button.addEventListener(`click`, event => {
        allClickedButtons.push(event.target.textContent);
        addToDisplay(event.target.textContent);
      })
    );

    equalButton.addEventListener(`click`, () => {
      createSeparateLists(allClickedButtons);
      applyPrecedence();
      cleanList(operatorsList);
      operate();
      clearDisplay();
      addToDisplay(operatorsList);
    });

    resetButton.addEventListener(`click`, () => {
      operatorsList = [];
      numbersList = [];
      allClickedButtons = [];
      clearDisplay();
    });
  }
  listenToEvents();
}

calculator();
