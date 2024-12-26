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
  let shipPlacement = [];

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

  function placementAdder(start, end) {}

  function collisionChecker(start, end) {}

  function placeShip(start, end, length) {
    shipPlacement.push([start, end]);
    board[start[0]][start[1]].push(ship(length));
    if (start[0] == end[0]) {
      for (let i = start[1] + 1; i <= end[1]; i++) {
        board[start[0]][start[i]].push();
      }
    }
  }

  return { fullCoordinate };
}

export { ship, boardInit };
