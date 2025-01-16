import { experiments } from 'webpack';
import { ship, boardInit, players } from './shipFactories';

let boardT = boardInit();
let playersT = players();

test('Places ship', () => {
  boardT.placeShip([1, 3], [1, 6], 4);
  expect(boardT.showBoard()[1][4][1]).toBe('No hit');
});

test('Sends warning on collision', () => {
  expect(boardT.placeShip([1, 3], [2, 3], 2)).toBe('collides');
});

test('Sends warning on negative numbers and numbers more than ten. ', () => {
  expect(boardT.placeShip([-1, 3], [0, 3], 2)).toBe('invalid');
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
  expect(boardT.receiveAttack([1, 4])).toBe('invalid');
});

test('Shows player boards', () => {
  expect(playersT.human.board.showBoard()).toBeDefined;
  expect(playersT.computer.board.showBoard()).toBeDefined;
});

test('Returns random coord', () => {
  expect(playersT.human.board.randomShip(2)).toBe('a');
});

// test('Tracks hits individually per board', () => {
//   playersT.human.board.placeShip([1, 3], [1, 4], 2);
//   playersT.computer.board.placeShip([1, 3], [1, 4], 2);
//   playersT.human.board.receiveAttack([1, 3]);
//   expect(playersT.human.board.receiveAttack([1, 4])).toBe('All ships sunk!');
//   expect(playersT.computer.board.receiveAttack([1, 4])).toBe('Hit!');
// });

// test('Returns random attack', () => {
//   expect(playersT.human.board.computerAttack()).toBe('a');
// });
