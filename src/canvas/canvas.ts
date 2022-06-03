export class Canvas {
  canvas: string[] = [];

  constructor(public width: number = 0, public height: number = 0) {
    if (typeof width !== "number" || typeof height !== "number")
      throw "Invalid params";
    if (width < 0 || height < 0) throw "Invalid size";
    for (let i = 0; i < height; i++) this.canvas.push(" ".repeat(width));
  }

  draw() {
    console.log("-".repeat(this.width + 2));
    for (let line of this.canvas) console.log("|" + line + "|");
    console.log("-".repeat(this.width + 2));
  }
}
