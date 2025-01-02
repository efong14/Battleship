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

  function showBoard() {
    return board;
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

  function currentCoordAdder(start, end) {
    currentCoord = [];
    currentCoord = fullCoordinate(start, end);
  }

  function shipLocationsAdder() {
    shipLocations = shipLocations.concat(currentCoord);
  }

  function arrContains(arr, value) {
    return arr.some((element) => element[0] == value[0] && element[1] == value[1]);
  }

  function collisionChecker(arr) {
    return arr.some((element) => arrContains(shipLocations, element));
  }

  function placeShip(start, end, length) {
    currentCoordAdder(start, end);

    if (collisionChecker(currentCoord) == true) {
      return 'Ship collides with another, please choose different coordinates.';
    }

    board[currentCoord[0][0]][currentCoord[0][1]] = [ship(length), 'No hit'];
    for (let i = 1; i < currentCoord.length; i++) {
      board[currentCoord[i][0]][currentCoord[i][1]] = [currentCoord[0], 'No hit'];
    }

    shipLocationsAdder();
  }

  function receiveAttack(arr) {
    let boardCoord = board[arr[0]][arr[1]];

    if (boardCoord[1] == 'hit' || boardCoord[0] == 'miss') {
      return 'Invalid coordinate, please choose another.';
    }

    if (!boardCoord[0]) {
      boardCoord[0] = 'miss';
      return 'Miss!';
    }

    if (Array.isArray(boardCoord[0])) {
      let shipObj = board[boardCoord[0][0]][boardCoord[0][1]][0];
      boardCoord[1] = 'hit';
      shipObj.hit();

      if (shipObj.isSunk()) return 'Ship sunk!';

      return 'Hit!';
    }

    if (typeof boardCoord[0] == 'object') {
      boardCoord[0].hit();
      boardCoord[1] = 'hit';

      if (boardCoord[0].isSunk()) return 'Ship sunk!';

      return 'Hit!';
    }
  }

  return {
    showBoard,
    fullCoordinate,
    currentCoordAdder,
    shipLocationsAdder,
    collisionChecker,
    placeShip,
    receiveAttack,
  };
}

export { ship, boardInit };
