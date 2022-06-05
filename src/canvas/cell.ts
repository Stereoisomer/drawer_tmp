import { Coordinate } from "../types/coordinate";

export enum CELL_SYMBOL {
  EMPTY = " ",
  LINE = "x",
}

export class Cell {
  constructor(
    public coordinate: Coordinate,
    public content: CELL_SYMBOL | string = " "
  ) {}
}
