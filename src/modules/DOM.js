import { ship, boardInit, players } from './shipFactories';

function domManipulator() {
  const gridOne = document.getElementById('gridOne');
  const gridTwo = document.getElementById('gridTwo');
  const gridLetters = document.querySelectorAll('#gridLetters');
  const gridNumbers = document.querySelectorAll('#gridNumbers');
  const playersDOM = players();
  let lettersOne = [];
  let lettersTwo = [];
  let numbersOne = [];
  let numbersTwo = [];
  let playGridOne = [];
  let playGridTwo = [];

  function createTen(arr) {
    for (let i = 0; i < 10; i++) {
      const createBox = document.createElement('div');
      arr.push(createBox);
    }
  }

  function createHundred(arr) {
    for (let i = 0; i < 100; i++) {
      const createBox = document.createElement('div');
      arr.push(createBox);
    }
  }

  function classAdd(arr, name) {
    arr.forEach((element) => {
      element.classList.add(name);
    });
  }

  function contentLetter(arr) {
    let charCode = 65;
    arr.forEach((element) => {
      element.textContent = String.fromCharCode(charCode++);
    });
  }

  function contentNumber(arr) {
    let num = 1;
    arr.forEach((element) => {
      element.textContent = `${num++}`;
    });
  }

  function contentCoord(arr) {
    let arrValue = 0;
    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 10; j++) {
        arr[arrValue].textContent = `${i},${j}`;
        arrValue++;
      }
    }
  }

  function clickBinder(arr) {
    arr.forEach((element) => {
      element.onclick = () => {
        console.log(element.textContent);
      };
    });
  }

  function htmlAppend(arr, parent) {
    arr.forEach((element) => {
      parent.appendChild(element);
    });
  }

  function gridCreator(arr, instances, className, content, parent) {
    instances(arr);
    classAdd(arr, className);
    content(arr);

    if (arr == playGridOne || arr == playGridTwo) {
      clickBinder(arr);
    }

    htmlAppend(arr, parent);
  }

  function coordToDOM(arr, player) {
    let translated = [];
    arr.forEach((element) => {
      translated.push(
        Array.from(document.querySelectorAll(`.${player}`)).find(
          (el) => el.textContent === element.toString()
        )
      );
    });
    return translated;
  }

  function showShipsDOM() {
    let shipsOne = coordToDOM(playersDOM.human.board.showShips(), 'playGridOne');
    let shipsTwo = coordToDOM(playersDOM.computer.board.showShips(), 'playGridTwo');

    classAdd(shipsOne, 'ship');
    classAdd(shipsTwo, 'ship');
  }

  gridCreator(lettersOne, createTen, 'letters', contentLetter, gridLetters[0]);
  gridCreator(lettersTwo, createTen, 'letters', contentLetter, gridLetters[1]);
  gridCreator(numbersOne, createTen, 'numbers', contentNumber, gridNumbers[0]);
  gridCreator(numbersTwo, createTen, 'numbers', contentNumber, gridNumbers[1]);
  gridCreator(playGridOne, createHundred, 'playGridOne', contentCoord, gridOne);
  gridCreator(playGridTwo, createHundred, 'playGridTwo', contentCoord, gridTwo);

  // TEST DELETE AFTER
  playersDOM.human.board.placeRandom();
  playersDOM.computer.board.placeRandom();
  showShipsDOM();
  //
}

export { domManipulator };
