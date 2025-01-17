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
  let totalShips = 0;
  let shipsSunk = 0;
  let attackedList = [];

  for (let i = 0; i < 10; i++) {
    board.push([]);
    for (let j = 0; j < 10; j++) {
      board[i].push([]);
    }
  }

  function showBoard() {
    return board;
  }

  function showShips() {
    return shipLocations;
  }

  function showStatus(coord) {
    return board[coord[0]][coord[1]][1];
  }

  function coordChecker(start, end) {
    let a = start.concat(end);
    if (!end) {
      a = start;
    }
    return a.every((e) => e < 10 && e >= 0);
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
    if (!coordChecker(start, end)) return 'invalid';

    currentCoordAdder(start, end);

    if (collisionChecker(currentCoord) == true) {
      return 'collides';
    }

    totalShips++;

    board[currentCoord[0][0]][currentCoord[0][1]] = [ship(length), 'No hit'];
    for (let i = 1; i < currentCoord.length; i++) {
      board[currentCoord[i][0]][currentCoord[i][1]] = [currentCoord[0], 'No hit'];
    }

    shipLocationsAdder();
  }

  function receiveAttack(coordinate) {
    let boardCoord = board[coordinate[0]][coordinate[1]];

    if (boardCoord[1] == 'hit' || boardCoord[1] == 'miss') {
      return 'Invalid Target';
    }

    if (!boardCoord[0]) {
      boardCoord[1] = 'miss';
      return 'Miss!';
    }

    if (Array.isArray(boardCoord[0])) {
      let shipObj = board[boardCoord[0][0]][boardCoord[0][1]][0];
      boardCoord[1] = 'hit';
      shipObj.hit();

      if (shipObj.isSunk()) {
        shipsSunk++;
        if (shipsSunk == totalShips) return 'All ships sunk!';
        return 'Ship sunk!';
      }

      return 'Hit!';
    }

    if (typeof boardCoord[0] == 'object') {
      boardCoord[0].hit();
      boardCoord[1] = 'hit';

      if (boardCoord[0].isSunk()) {
        shipsSunk++;
        if (shipsSunk == totalShips) return 'All ships sunk!';
        return 'Ship sunk!';
      }

      return 'Hit!';
    }
  }

  function randomCoordinate(max) {
    return [Math.floor(Math.random() * (max - 0) + 0), Math.floor(Math.random() * (max - 0) + 0)];
  }

  function randomShipCoordinate(length) {
    let direction = Math.random() < 0.5 ? 'vertical' : 'horizontal';
    let firstCoord = randomCoordinate(10 - length);
    let secondCoord;
    if (direction == 'vertical') {
      secondCoord = [firstCoord[0] + length - 1, firstCoord[1]];
    } else {
      secondCoord = [firstCoord[0], firstCoord[1] + length - 1];
    }
    return [firstCoord, secondCoord];
  }

  function randomShipPlacer(length) {
    let generatedCoord = randomShipCoordinate(length);
    let generatedFull = fullCoordinate(generatedCoord[0], generatedCoord[1]);

    while (collisionChecker(generatedFull) == true) {
      generatedCoord = randomShipCoordinate(length);
      generatedFull = fullCoordinate(generatedCoord[0], generatedCoord[1]);
    }

    return placeShip(generatedCoord[0], generatedCoord[1], length);
  }

  function computerAttack() {
    let coord = randomCoordinate(10);
    while (arrContains(attackedList, coord)) {
      coord = randomCoordinate(10);
    }
    attackedList.push(coord);

    return [coord, receiveAttack(coord)];
  }

  function placeRandom() {
    randomShipPlacer(5);
    randomShipPlacer(4);
    randomShipPlacer(3);
    randomShipPlacer(2);
    randomShipPlacer(2);
  }

  return {
    showBoard,
    showShips,
    showStatus,
    placeShip,
    receiveAttack,
    computerAttack,
    randomShipPlacer,
    placeRandom,
  };
}

function players() {
  const human = {
    board: boardInit(),
  };

  const computer = {
    board: boardInit(),
  };

  return { human, computer };
}

export { ship, boardInit, players };
