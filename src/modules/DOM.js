import { ship, boardInit, players } from './shipFactories';

function domManipulator() {
  const gridOne = document.getElementById('gridOne');
  const gridTwo = document.getElementById('gridTwo');
  const gridLetters = document.querySelectorAll('#gridLetters');
  const gridNumbers = document.querySelectorAll('#gridNumbers');
  let letters = [];
  let numbers = [];
  let playGrid = [];

  function createTen(arr) {
    for (let i = 0; i < 10; i++) {
      const createBox = document.createElement('div');
      arr.push(createBox);
    }
  }

  function classAdd(arr, className) {
    arr.forEach((element) => {
      element.classList.add(className);
    });
  }

  function contentLetter(arr) {
    let charCode = 65;
    arr.forEach((element) => {
      element.textContent = String.fromCharCode(charCode++);
    });
  }

  function contentNumber(arr, first, second = '') {
    arr.forEach((element) => {
      element.textContent = `${first++}` + `${second}`;
    });
  }

  createTen(letters);
  classAdd(letters, 'letters');
  contentLetter(letters);

  createTen(numbers);
  classAdd(numbers, 'numbers');
  contentNumber(numbers, 0);

  console.log(numbers[9].textContent);
}

export { domManipulator };
