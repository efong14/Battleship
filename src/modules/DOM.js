import { ship, boardInit, players } from './shipFactories';

function domManipulator() {
  const gridOne = document.getElementById('gridOne');
  const gridTwo = document.getElementById('gridTwo');
  const compStatus = document.getElementById('compStatus');
  const playerStatus = document.getElementById('playerStatus');
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

  function attributeCoord(arr) {
    let arrValue = 0;
    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 10; j++) {
        arr[arrValue].setAttribute('coord', `${i},${j}`);
        arrValue++;
      }
    }
  }

  function clickEvent(el) {
    const coordinate = el.getAttribute(`coord`).split(',');
    const attack = playersDOM.computer.board.receiveAttack(coordinate);
    el.classList.add(playersDOM.computer.board.showStatus(coordinate));
    return attack;
  }

  function computerTurn() {
    let computerTarget = playersDOM.human.board.computerAttack();
    let domTarget = document.querySelectorAll(`[coord="${computerTarget[0].toString()}"]`)[0];
    domTarget.classList.add(playersDOM.human.board.showStatus(computerTarget[0]));
    return computerTarget[1];
  }

  function clickBinder(arr) {
    arr.forEach((element) => {
      element.onclick = () => {
        playerStatus.textContent = clickEvent(element);
        if (playerStatus.textContent !== 'Invalid Target') {
          compStatus.textContent = computerTurn();
        }
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
      translated.push(document.querySelectorAll(`[coord="${element.toString()}"]`)[player]);
    });
    return translated;
  }

  function showShipsDOM() {
    let shipsOne = coordToDOM(playersDOM.human.board.showShips(), 0);
    let shipsTwo = coordToDOM(playersDOM.computer.board.showShips(), 1);

    classAdd(shipsOne, 'ship');
    classAdd(shipsTwo, 'ship');
  }

  gridCreator(lettersOne, createTen, 'letters', contentLetter, gridLetters[0]);
  gridCreator(lettersTwo, createTen, 'letters', contentLetter, gridLetters[1]);
  gridCreator(numbersOne, createTen, 'numbers', contentNumber, gridNumbers[0]);
  gridCreator(numbersTwo, createTen, 'numbers', contentNumber, gridNumbers[1]);
  gridCreator(playGridOne, createHundred, 'playGridOne', attributeCoord, gridOne);
  gridCreator(playGridTwo, createHundred, 'playGridTwo', attributeCoord, gridTwo);

  playersDOM.human.board.placeRandom();
  playersDOM.computer.board.placeRandom();
  showShipsDOM();
}

export { domManipulator };
