import { experiments } from 'webpack';
import { ship, boardInit, players } from './shipFactories';

let shipT = ship(1);
let boardT = boardInit();
let playersT = players();

test('Initialize ship with length', () => {
  expect(shipT.length).toBe(1);
});

test('Sinks initialized battleship', () => {
  shipT.hit();
  expect(shipT.isSunk()).toBe(true);
});

test('Stops coordinates outside the board', () => {
  expect(boardT.coordChecker([11, 0], [1, 0])).toBe(false);
});

test('Place ship', () => {
  expect(boardT.fullCoordinate([0, 3], [0, 6])).toStrictEqual([
    [0, 3],
    [0, 4],
    [0, 5],
    [0, 6],
  ]);
});

test('Checks collision', () => {
  boardT.currentCoordAdder([0, 3], [0, 6]);
  boardT.shipLocationsAdder();
  expect(
    boardT.collisionChecker([
      [0, 0],
      [0, 10],
      [0, 7],
      [0, 1],
      [0, 3],
    ])
  ).toBe(true);
});

test('Places ship', () => {
  boardT.placeShip([1, 3], [1, 6], 4);
  expect(boardT.showBoard()[1][4][1]).toBe('No hit');
});

test('Places ship of different length', () => {
  boardT.placeShip([2, 3], [2, 4], 2);
  expect(boardT.showBoard()[2][4][1]).toBe('No hit');
});

test('Hits ship', () => {
  expect(boardT.receiveAttack([1, 4])).toBe('Hit!');
});

test('Misses ship', () => {
  expect(boardT.receiveAttack([0, 0])).toBe('Miss!');
});

test('Sinks ship', () => {
  boardT.receiveAttack([1, 5]);
  boardT.receiveAttack([1, 6]);
  expect(boardT.receiveAttack([1, 3])).toBe('Ship sunk!');
});

test('Sinks all ships', () => {
  boardT.receiveAttack([2, 3]);
  expect(boardT.receiveAttack([2, 4])).toBe('All ships sunk!');
});

test('Returns invalid result on repeat coordinate', () => {
  expect(boardT.receiveAttack([1, 4])).toBe('Invalid coordinate, please choose another.');
});

test('Shows player boards', () => {
  expect(playersT.human.board.showBoard()).toBeDefined;
  expect(playersT.computer.board.showBoard()).toBeDefined;
});

test('Tracks hits individually per board', () => {
  playersT.human.board.placeShip([1, 3], [1, 4], 2);
  playersT.computer.board.placeShip([1, 3], [1, 4], 2);
  playersT.human.board.receiveAttack([1, 3]);
  expect(playersT.human.board.receiveAttack([1, 4])).toBe('All ships sunk!');
  expect(playersT.computer.board.receiveAttack([1, 4])).toBe('Hit!');
});
