import { Coordinate } from "../types/coordinate";
import { GraphNode, GraphQueue } from "../types/graph";
import { Canvas } from "./canvas";
import { Cell } from "./cell";

export class CanvasGraphHelper {
  public graphNodes: GraphNode<Cell>[][] = [];
  public height: number;
  public width: number;

  constructor(canvas: Canvas) {
    this.height = canvas.height;
    this.width = canvas.width;

    // init graphNodes array
    this.graphNodes = new Array<GraphNode<Cell>[]>(this.height);
    for (let i = 0; i < canvas.height; i++) {
      this.graphNodes[i] = new Array<GraphNode<Cell>>(this.width);
      for (let j = 0; j < canvas.width; j++) {
        const cell: Cell = canvas[i][j];
        this.graphNodes[i]![j] = new GraphNode<Cell>(cell);
      }
    }
  }

  private _isCoordValid(coord: Coordinate): boolean {
    return (
      coord.x > 0 &&
      coord.x <= this.width &&
      coord.y > 0 &&
      coord.y <= this.height
    );
  }

  public getNode(coord: Coordinate): GraphNode<Cell> | undefined {
    return this.graphNodes[coord.y]?.[coord.x];
  }

  private getNeighbours(node: GraphNode<Cell>): GraphNode<Cell>[] {
    const coord = node.item.coordinate;
    const neighbours: Coordinate[] = [
      { x: coord.x, y: coord.y - 1 },
      { x: coord.x, y: coord.y + 1 },
      { x: coord.x - 1, y: coord.y },
      { x: coord.x + 1, y: coord.y },
    ];
    const validNeighbours: GraphNode<Cell>[] = [];

    // check for valid (in-bound) neighbours
    for (let neighbour of neighbours) {
      if (this._isCoordValid(neighbour)) {
        let neibourNode: GraphNode<Cell> | undefined = this.getNode(neighbour);
        if (neibourNode !== undefined) {
          validNeighbours.push(neibourNode);
        }
      }
    }
    return validNeighbours;
  }

  runBFS(from: Cell): Coordinate[] {
    const target = from.content;

    const result: Coordinate[] = [];
    const queue: GraphQueue<Cell> = new GraphQueue<Cell>();
    const distance = 0;

    queue.enqueue(this.getNode(from.coordinate)!);
    while (queue.length > 0) {
      const node: GraphNode<Cell> = queue.dequeue()!;

      node.status = "processing";
      node.distance = distance;

      for (let neighbour of this.getNeighbours(node)) {
        if (
          neighbour.status === "unprocessed" &&
          node.item.content === target
        ) {
          neighbour.distance = distance + 1;
          neighbour.parent = node;
          queue.enqueue(neighbour);
        }
      }

      node.status = "processed";
      result.push(node.item.coordinate);
    }
    return result;
  }
}
