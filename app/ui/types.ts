export enum Block {
  I = "I",
  L = "L",
  J = "J",
  S = "S",
  T = "T",
  Z = "Z",
  O = "O",
}

export const enum EmptyCell {
  Empty = "Empty",
}

export type CellOptions = Block | EmptyCell | 'hidden-cell';

export type BoardShape = CellOptions[][];
export type BlockShape = boolean[][];

export const SHAPES = {
  I: {
    shape: [
      [true, true, true, true],
      [false, false, false, false],
      [false, false, false, false],
      [false, false, false, false]
    ]
  },
  J: {
    shape: [[false, false, false], [true, false, false], [true, true, true]]
  },
  L: {
    shape: [[false, false, false], [false, false, true], [true, true, true]]
  },
  S: {
    shape: [[false, false, false], [false, true, true], [true, true, false]]
  },
  T: {
    shape: [[false, false, false], [false, true, false], [true, true, true]]
  },
  Z: {
    shape: [[false, false, false], [true, true, false], [false, true, true]]
  },
  O: {
    shape: [[true, true], [true, true]]
  },
};
