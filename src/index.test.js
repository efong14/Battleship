import { experiments } from 'webpack';
import { ship, boardInit } from './index.js';

let shipT = ship(1);
let boardT = boardInit();

test('Initialize ship with length', () => {
  expect(shipT.length).toBe(1);
});

test('Battleship sunk', () => {
  shipT.hit();
  expect(shipT.isSunk()).toBe(true);
});

test('Place ship', () => {
  expect(boardT.fullCoordinate([0, 3], [0, 6])).toBe(true);
});
