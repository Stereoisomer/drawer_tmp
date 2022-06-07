import { Coordinate } from "../types/coordinate";
import { Cell, CELL_SYMBOL } from "./cell";
import { CanvasGraphHelper } from "./canvas.graph";

export class Canvas {
  canvas: Cell[][] = [];

  constructor(public width: number = 0, public height: number = 0) {
    if (typeof width !== "number" || typeof height !== "number")
      throw "Invalid params";
    if (width < 0 || height < 0) throw "Invalid size";

    this.canvas = new Array<Cell[]>(height);

    for (let i = 0; i < height; i++) {
      // init 2d array
      this.canvas[i] = new Array<Cell>(width);
      for (let j = 0; j < width; j++) {
        this.canvas[i]![j] = {
          coordinate: { x: j, y: i },
          content: CELL_SYMBOL.EMPTY,
        };
      }
    }
  }

  draw(): void {
    console.log(this.toString());
  }

  toString(): string {
    return "-"
      .repeat(this.width + 2)
      .concat("\n")
      .concat(
        this.canvas
          .map((row) =>
            "|".concat(row.map((cell) => cell.content).join("")).concat("|\n")
          )
          .join("")
      )
      .concat("-".repeat(this.width + 2))
      .concat("\n");
  }

  static from(
    width: number,
    height: number,
    content: (CELL_SYMBOL | string)[][]
  ): Canvas {
    const canvas: Canvas = new Canvas(width, height);
    for (let i = 0; i < height; i++) {
      for (let j = 0; j < width; j++) {
        canvas._setCell(canvas.canvas, { x: j, y: i }, content[i]![j]!);
      }
    }
    return canvas;
  }

  public getCell(coord: Coordinate): Cell | undefined {
    return this.canvas[coord.y]?.[coord.x];
  }

  private _setCell(
    canvas: Cell[][],
    coord: Coordinate,
    content: CELL_SYMBOL | string
  ): void {
    if (this._isCoordValid(coord)) canvas[coord.y]![coord.x]!.content = content;
    else throw "Invalid coordinates";
  }

  private _applyUpdate(
    coords: Coordinate[],
    content: CELL_SYMBOL | string
  ): void {
    // init updated canvas with deep copy
    const newCanvas: Cell[][] = [];
    for (let row of this.canvas) {
      newCanvas.push(row.slice());
    }
    for (let cell of coords) {
      this._setCell(newCanvas, { x: cell.x, y: cell.y }, content);
    }
    this.canvas = newCanvas;
  }

  private _transformCoordinate(coord: Coordinate): void {
    coord.x--;
    coord.y--;
  }

  private _isCoordValid(coord: Coordinate): boolean {
    return (
      coord.x >= 0 &&
      coord.x < this.width &&
      coord.y >= 0 &&
      coord.y < this.height
    );
  }

  private _addLine(start: Coordinate, end: Coordinate): Coordinate[] {
    if (!this._isCoordValid(start) || !this._isCoordValid(end))
      throw "Invalid coordinates";
    if (start.x !== end.x && start.y !== end.y) throw "Not straight line";

    const coords: Coordinate[] = [];
    const [from, to] = [start, end].sort(Coordinate.compare);

    if (from!.x === to!.x) {
      // vertical line
      for (let y = from!.y; y <= to!.y; y++) {
        coords.push({ x: from!.x, y });
      }
    } else if (from!.y === to!.y) {
      // horizontal line
      for (let x = from!.x; x <= to!.x; x++) {
        coords.push({ x, y: from!.y });
      }
    }
    return coords;
  }

  addLine(start: Coordinate, end: Coordinate): void {
    this._transformCoordinate(start);
    this._transformCoordinate(end);
    const updateCoords: Coordinate[] = this._addLine(start, end);
    this._applyUpdate(updateCoords, CELL_SYMBOL.LINE);
  }

  addRectangle(cornerA: Coordinate, cornerB: Coordinate): void {
    this._transformCoordinate(cornerA);
    this._transformCoordinate(cornerB);
    const cornerC: Coordinate = { x: cornerA.x, y: cornerB.y };
    const cornerD: Coordinate = { x: cornerB.x, y: cornerA.y };

    let updateCoords: Coordinate[] = [];

    updateCoords = updateCoords
      .concat(this._addLine(cornerA, cornerC))
      .concat(this._addLine(cornerA, cornerD))
      .concat(this._addLine(cornerB, cornerC))
      .concat(this._addLine(cornerB, cornerD));

    this._applyUpdate(updateCoords, CELL_SYMBOL.LINE);
  }

  fillArea(coord: Coordinate, color: string): void {
    this._transformCoordinate(coord);
    if (!this._isCoordValid(coord)) throw "Invalid coordinates";

    const helper = new CanvasGraphHelper(this);

    const cell = this.getCell(coord)!;

    const affectedCells = helper.fillAreaBFS(cell);

    this._applyUpdate(affectedCells, color);
  }
}
