import './style.css';

function ship(long) {
  let length = long;
  let hits = 0;

  function hit() {
    hits++;
    isSunk();
  }

  function isSunk() {
    return hits >= length;
  }

  return { length, hit, isSunk };
}

function boardInit() {
  let board = [];
  let shipLocations = [];
  let currentCoord = [];

  for (let i = 0; i < 10; i++) {
    board.push([]);
    for (let j = 0; j < 10; j++) {
      board[i].push([]);
    }
  }

  function fullCoordinate(start, end) {
    let fullCoordinates = [];
    if (start[0] == end[0]) {
      for (let i = start[1]; i <= end[1]; i++) {
        fullCoordinates.push([start[0], i]);
      }
    }
    if (start[1] == end[1]) {
      for (let i = start[0]; i <= end[0]; i++) {
        fullCoordinates.push([i, start[1]]);
      }
    }
    return fullCoordinates;
  }

  function locationAdder(start, end) {
    currentCoord = [];
    currentCoord = fullCoordinate(start, end);
    if (!shipLocations[0]) shipLocations = shipLocations.concat(currentCoord);
  }

  function arrContains(arr, value) {
    return arr.some((element) => element[0] == value[0] && element[1] == value[1]);
  }

  function collisionChecker(arr) {
    return arr.some((element) => arrContains(shipLocations, element));
  }

  function placeShip(start, end, length) {
    locationAdder;
  }

  return { fullCoordinate, locationAdder, collisionChecker };
}

export { ship, boardInit };
