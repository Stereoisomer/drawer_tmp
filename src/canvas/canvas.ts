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

  private getCell(coord: Coordinate): string | undefined {
    return this.canvas[coord.y - 1]?.[coord.x - 1];
  }

  private setCell(coord: Coordinate, content: CELL_SYMBOL | string): void {
    if (this.isCordValid(coord))
      this.canvas[coord.y - 1]![coord.x - 1] = content;
  }

  private isCordValid(cord: Coordinate): boolean {
    return (
      cord.x > 0 && cord.x <= this.width && cord.y > 0 && cord.y <= this.height
    );
  }

  private getGraphNode(coord: Coordinate): GraphNode<Coordinate> | undefined {
    return this.graphNodes[coord.y - 1]?.[coord.x - 1];
  }
  private setGraphNode(
    coord: Coordinate,
    content: GraphNode<Coordinate>
  ): void {
    this.graphNodes[coord.y - 1]![coord.x - 1] = content;
  }
  private resetGraphNodes() {
    this.graphNodes = [];
    for (let i = 0; i < this.height; i++) {
      this.graphNodes[i] = new Array<GraphNode<Coordinate>>(this.width);
    }
  }

  addLine(start: Coordinate, end: Coordinate): void {
    if (!this.isCordValid(start) || !this.isCordValid(end))
      throw "Invalid coordinates";
    if (start.x !== end.x && start.y !== end.y) throw "Not straight line";

    const [from, to] = [start, end].sort(Coordinate.compare);

    if (from!.x === to!.x) {
      // vertical line
      for (let y = from!.y; y <= to!.y; y++) {
        this.setCell({ x: from!.x, y }, CELL_SYMBOL.LINE);
      }
    } else if (from!.y === to!.y) {
      // horizontal line
      for (let x = from!.x; x <= to!.x; x++) {
        this.setCell({ x, y: from!.y }, CELL_SYMBOL.LINE);
      }
    }
  }

  addRectangle(cornerA: Coordinate, cornerB: Coordinate): void {
    // do NOT add any line if any side could fail
    if (!this.isCordValid(cornerA) || !this.isCordValid(cornerB))
      throw "Invalid coordinates";

    const cornerC: Coordinate = { x: cornerA.x, y: cornerB.y };
    const cornerD: Coordinate = { x: cornerB.x, y: cornerA.y };

    this.addLine(cornerA, cornerC);
    this.addLine(cornerA, cornerD);
    this.addLine(cornerB, cornerC);
    this.addLine(cornerB, cornerD);
  }

  fillArea(coord: Coordinate, color: string): void {
    if (!this.isCordValid(coord)) throw "Invalid coordinates";

    const targetSymbol: string = this.getCell(coord)!;

    // reset graph nodes map for BFS
    this.resetGraphNodes();
    this.setGraphNode(coord, new GraphNode<Coordinate>(coord));

    // init BFS Queue
    const bfsQueue: GraphQueue<Coordinate> = new GraphQueue<Coordinate>();
    bfsQueue.enqueue(this.getGraphNode(coord)!);

    // BFS
    const affectedCells = BFS<Coordinate>(
      bfsQueue,
      // dynamically generate and get neighbour nodes
      (node) => {
        const { item: coord } = node;
        const neighbours: Coordinate[] = [
          { x: coord.x, y: coord.y - 1 },
          { x: coord.x, y: coord.y + 1 },
          { x: coord.x - 1, y: coord.y },
          { x: coord.x + 1, y: coord.y },
        ];
        const validNeighbours: GraphNode<Coordinate>[] = [];

        // foul invalid (out of boundary) neighbours
        for (let neighbour of neighbours) {
          if (this.isCordValid(neighbour)) {
            let neibourNode: GraphNode<Coordinate> | undefined =
              this.getGraphNode(neighbour);
            // generate new graph node
            if (neibourNode === undefined) {
              neibourNode = new GraphNode<Coordinate>(neighbour);
              this.setGraphNode(neighbour, neibourNode);
            }
            validNeighbours.push(neibourNode);
          }
        }
        return validNeighbours;
      },
      // only include similar cells (with same symbol)
      (coord) => this.getCell({ x: coord.x, y: coord.y }) === targetSymbol
    );

    for (let cell of affectedCells) {
      this.setCell({ x: cell.x, y: cell.y }, color);
    }
  }
}
