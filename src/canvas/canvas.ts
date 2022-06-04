import { Coordinate } from "../types/coordinate";

export class Canvas {
  canvas: string[][] = [];

  private LINE_SYMBOL = "x";

  constructor(public width: number = 0, public height: number = 0) {
    if (typeof width !== "number" || typeof height !== "number")
      throw "Invalid params";
    if (width < 0 || height < 0) throw "Invalid size";
    for (let i = 0; i < height; i++) {
      let line: string[] = [];
      for (let j = 0; j < width; j++) line.push(" ");
      this.canvas.push(line);
    }
  }

  draw(): void {
    console.log("-".repeat(this.width + 2));
    for (let line of this.canvas) console.log("|" + line.join("") + "|");
    console.log("-".repeat(this.width + 2));
  }

  private isCordValid(cord: Coordinate): boolean {
    return (
      cord.x > 0 && cord.x <= this.width && cord.y > 0 && cord.y <= this.height
    );
  }

  addLine(start: Coordinate, end: Coordinate): void {
    if (!this.isCordValid(start) || !this.isCordValid(end))
      throw "Invalid coordinates";
    if (start.x !== end.x && start.y !== end.y) throw "Not straight line";

    const [from, to] = [start, end].sort(Coordinate.compare);

    if (from!.x === to!.x) {
      // vertical line
      for (let y = from!.y - 1; y < to!.y; y++) {
        this.canvas[y]![from!.x - 1] = this.LINE_SYMBOL;
      }
    } else if (from!.y === to!.y) {
      // horizontal line
      for (let x = from!.x - 1; x < to!.x; x++) {
        this.canvas[from!.y - 1]![x] = this.LINE_SYMBOL;
      }
    }
  }
}
