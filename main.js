/* eslint-disable no-eval */

function calculator() {
  // Buttons
  const numbersAndOperatorsButtons = Array.from(
    document.getElementsByClassName(`ope-num`)
  );
  const equalButton = document.getElementById(`equal`);
  const deleteAllButton = document.getElementById(`delete-all`);
  const deleteLastButton = document.getElementById(`delete-last`);
  const displayBox = document.getElementById(`display`);

  // Data
  let result = [];

  // RegExp
  const butRegExp = /\d|\.|\+|-|\*|\//;
  const opeRegExp = /\+|-|\*|\//;
  const numRegExp = /\d|\./;
  const mulDivRegExp = /\*|\//;

  function modifyDisplayBox(content) {
    displayBox.textContent = content;
  }

  function equal() {
    if (
      opeRegExp.test(result.slice(-1)) === true ||
      typeof result[0] === `undefined`
    );
    else {
      result = `${Math.round(eval(result.join(``)) * 100000) / 100000}`;
      modifyDisplayBox(result);
      result = result.split(``);
    }
  }

  function display(content) {
    if (
      opeRegExp.test(content) === true &&
      mulDivRegExp.test(result.slice(-1)) === false
    ) {
      result.push(` ${content} `);
    } else if (numRegExp.test(content) === true) {
      result.push(content);
    }
    modifyDisplayBox(result.join(``));
  }

  function deleteAll() {
    result = [];
    modifyDisplayBox(``);
  }

  function deleteLast() {
    result.pop();
    modifyDisplayBox(result.join(``));
  }

  function listenToEvents() {
    // Buttons
    numbersAndOperatorsButtons.map(element => {
      element.addEventListener(`click`, event => {
        const content = event.target.id;
        display(content);
      });
      return true;
    });

    equalButton.addEventListener(`click`, () => {
      equal();
    });

    deleteAllButton.addEventListener(`click`, () => {
      deleteAll();
    });

    deleteLastButton.addEventListener(`click`, () => {
      deleteLast();
    });

    // Keyboard
    window.addEventListener(`keydown`, keyboardEvent => {
      if (butRegExp.test(keyboardEvent.key) === true) {
        const content = keyboardEvent.key;
        display(content);
      } else if (keyboardEvent.key === `Enter`) {
        equal();
      } else if (keyboardEvent.key === `Delete`) {
        deleteAll();
      } else if (keyboardEvent.key === `Backspace`) {
        deleteLast();
      }
    });
  }

  listenToEvents();
}

calculator();
