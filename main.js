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
  const letRegExp = /[A-Za-z]/;

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
    } else if (
      numRegExp.test(content) === true &&
      letRegExp.test(content) === false
    ) {
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
window.addEventListener(`load`, () => {
  setTimeout(() => {
    // This hides the address bar:
    window.scrollTo(0, 1);
  }, 0);
});
// window.addEventListener(`DOMContentLoaded`, () => {
//   const n = document.getElementById(`calc`);
//   n.requestFullscreen
//     ? n.requestFullscreen()
//     : n.mozRequestFullScreen
//       ? n.mozRequestFullScreen()
//       : n.webkitRequestFullscreen
//         ? n.webkitRequestFullscreen()
//         : n.msRequestFullscreen && n.msRequestFullscreen();
// });

function fullscreen(win) {
  const doc = win.document;

  // If there's a hash, or addEventListener is undefined, stop here
  if (!win.navigator.standalone && !location.hash && win.addEventListener) {
    // scroll to 1
    win.scrollTo(0, 1);
    let scrollTop = 1;

    const getScrollTop = function() {
      return (
        win.pageYOffset ||
        (doc.compatMode === `CSS1Compat` && doc.documentElement.scrollTop) ||
        doc.body.scrollTop ||
        0
      );
    };

    // reset to 0 on bodyready, if needed

    var bodycheck = setInterval(() => {
      if (doc.body) {
        clearInterval(bodycheck);
        scrollTop = getScrollTop();
        win.scrollTo(0, scrollTop === 1 ? 0 : 1);
      }
    }, 15);

    win.addEventListener(
      `load`,
      () => {
        setTimeout(() => {
          // at load, if user hasn't scrolled more than 20 or so...
          if (getScrollTop() < 20) {
            // reset to hide addr bar at onload
            win.scrollTo(0, scrollTop === 1 ? 0 : 1);
          }
        }, 0);
      },
      false
    );
  }
}
fullscreen();
