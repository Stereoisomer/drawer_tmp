import { BFS, GraphNode, GraphQueue } from "../types/graph";
import { Coordinate } from "../types/coordinate";
import { CELL_SYMBOL } from "./cell";

export class Canvas {
  canvas: (CELL_SYMBOL | string)[][] = [];

  graphNodes: GraphNode<Coordinate>[][] = [];

  constructor(public width: number = 0, public height: number = 0) {
    if (typeof width !== "number" || typeof height !== "number")
      throw "Invalid params";
    if (width < 0 || height < 0) throw "Invalid size";

    this.canvas = new Array<(CELL_SYMBOL | string)[]>(height);
    this.graphNodes = new Array<GraphNode<Coordinate>[]>(height);

    for (let i = 0; i < height; i++) {
      // init 2d array
      this.canvas[i] = new Array<CELL_SYMBOL>(width).fill(CELL_SYMBOL.EMPTY);
      this.graphNodes[i] = new Array<GraphNode<Coordinate>>(width);
    }
  }

  draw(): void {
    console.log("-".repeat(this.width + 2));
    for (let row of this.canvas) {
      let str = "|";
      for (let cell of row) {
        str = str.concat(cell);
      }
      str = str.concat("|");
      console.log(str);
    }
    console.log("-".repeat(this.width + 2));
  }

  static from(
    width: number,
    height: number,
    content: (CELL_SYMBOL | string)[][]
  ): Canvas {
    const canvas: Canvas = new Canvas(width, height);
    for (let i = 1; i <= height; i++) {
      for (let j = 1; j <= width; j++) {
        canvas._setCell(canvas.canvas, { x: j, y: i }, content[i]![j]!);
      }
    }
    return canvas;
  }

  static getCell(
    canvas: (CELL_SYMBOL | string)[][],
    coord: Coordinate
  ): string | undefined {
    return canvas[coord.y - 1]?.[coord.x - 1];
  }

  private _setCell(
    canvas: (CELL_SYMBOL | string)[][],
    coord: Coordinate,
    content: CELL_SYMBOL | string
  ): void {
    if (this._isCoordValid(coord)) canvas[coord.y - 1]![coord.x - 1] = content;
  }

  private _applyUpdate(
    coords: Coordinate[],
    content: CELL_SYMBOL | string
  ): void {
    // init updated canvas with deep copy
    const newCanvas: (CELL_SYMBOL | string)[][] = [];
    for (let row of this.canvas) {
      newCanvas.push(row.slice());
    }
    for (let cell of coords) {
      this._setCell(newCanvas, { x: cell.x, y: cell.y }, content);
    }
    this.canvas = newCanvas;
  }

  private _isCoordValid(coord: Coordinate): boolean {
    return (
      coord.x > 0 &&
      coord.x <= this.width &&
      coord.y > 0 &&
      coord.y <= this.height
    );
  }

  private _getGraphNode(coord: Coordinate): GraphNode<Coordinate> | undefined {
    return this.graphNodes[coord.y - 1]?.[coord.x - 1];
  }

  private _setGraphNode(
    coord: Coordinate,
    content: GraphNode<Coordinate>
  ): void {
    this.graphNodes[coord.y - 1]![coord.x - 1] = content;
  }

  private _resetGraphNodes() {
    this.graphNodes = [];
    for (let i = 0; i < this.height; i++) {
      this.graphNodes[i] = new Array<GraphNode<Coordinate>>(this.width);
    }
  }

  private getNeighbourGraphNodes(coord: Coordinate): GraphNode<Coordinate>[] {
    const validNeighbours: GraphNode<Coordinate>[] = [];
    const neighbours: Coordinate[] = [
      { x: coord.x, y: coord.y - 1 },
      { x: coord.x, y: coord.y + 1 },
      { x: coord.x - 1, y: coord.y },
      { x: coord.x + 1, y: coord.y },
    ];

    // check for valid (in-bound) neighbours
    for (let neighbour of neighbours) {
      if (this._isCoordValid(neighbour)) {
        let neibourNode: GraphNode<Coordinate> | undefined =
          this._getGraphNode(neighbour);
        // dynamically generate new graph node
        if (neibourNode === undefined) {
          neibourNode = new GraphNode<Coordinate>(neighbour);
          this._setGraphNode(neighbour, neibourNode);
        }
        validNeighbours.push(neibourNode);
      }
    }
    return validNeighbours;
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
    const updateCoords: Coordinate[] = this._addLine(start, end);
    this._applyUpdate(updateCoords, CELL_SYMBOL.LINE);
  }

  addRectangle(cornerA: Coordinate, cornerB: Coordinate): void {
    if (!this._isCoordValid(cornerA) || !this._isCoordValid(cornerB))
      throw "Invalid coordinates";

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
    if (!this._isCoordValid(coord)) throw "Invalid coordinates";

    const targetSymbol: string = Canvas.getCell(this.canvas, coord)!;

    // reset graph nodes map for BFS
    this._resetGraphNodes();
    this._setGraphNode(coord, new GraphNode<Coordinate>(coord));

    // init BFS Queue
    const bfsQueue: GraphQueue<Coordinate> = new GraphQueue<Coordinate>();
    bfsQueue.enqueue(this._getGraphNode(coord)!);

    // BFS
    const affectedCells = BFS<Coordinate>(
      bfsQueue,
      // dynamically generate and return neighbour nodes
      (node) => {
        const { item: coord } = node;
        return this.getNeighbourGraphNodes(coord);
      },
      // only include similar cells (with same symbol)
      (coord) =>
        Canvas.getCell(this.canvas, { x: coord.x, y: coord.y }) === targetSymbol
    );

    this._applyUpdate(affectedCells, color);
  }
}
