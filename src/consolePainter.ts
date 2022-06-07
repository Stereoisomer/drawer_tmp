import { exit } from "process";
import * as readline from "readline";
import { Canvas } from "./canvas/canvas";
import { Coordinate } from "./types/coordinate";

export class ConsolePainter {
  canvas?: Canvas;

  constructor(private io: readline.Interface) {
    this.init();
  }

  init() {
    console.log(`
      Command 	Description
      C w h           Should create a new canvas of width w and height h.
      L x1 y1 x2 y2   Should create a new line from (x1,y1) to (x2,y2). Currently only
                      horizontal or vertical lines are supported. Horizontal and vertical lines
                      will be drawn using the 'x' character.
      R x1 y1 x2 y2   Should create a new rectangle, whose upper left corner is (x1,y1) and
                      lower right corner is (x2,y2). Horizontal and vertical lines will be drawn
                      using the 'x' character.
      B x y c         Should fill the entire area connected to (x,y) with "colour" c. The
                      behavior of this is the same as that of the "bucket fill" tool in paint
                      programs.
      Q               Should quit the program.\n`);
  }

  private async _askAction(): Promise<string> {
    return await new Promise((resolve) => {
      this.io.question("enter command: ", (ans) => resolve(ans));
    });
  }

  public process(command: string): void {
    const args = command.split(" ");
    switch (args[0]) {
      case "C":
        // construct or re-create new canvas
        try {
          this.canvas = new Canvas(
            parseInt(args[1] as string),
            parseInt(args[2] as string)
          );
        } catch (e) {
          // no error handling
          // console.log(e);
        }
        break;
      case "L":
        // draw straight line
        try {
          const coordFrom: Coordinate = {
            x: parseInt(args[1] as string),
            y: parseInt(args[2] as string),
          };
          const coordTo: Coordinate = {
            x: parseInt(args[3] as string),
            y: parseInt(args[4] as string),
          };
          this.canvas?.addLine(coordFrom, coordTo);
        } catch (e) {
          // no error handling
          // console.log(e);
        }
        break;
      case "R":
        // draw rectangle
        try {
          const coordA: Coordinate = {
            x: parseInt(args[1] as string),
            y: parseInt(args[2] as string),
          };
          const coordB: Coordinate = {
            x: parseInt(args[3] as string),
            y: parseInt(args[4] as string),
          };
          this.canvas?.addRectangle(coordA, coordB);
        } catch (e) {
          // no error handling
          // console.log(e);
        }
        break;
      case "B":
        // fill area
        try {
          const coord: Coordinate = {
            x: parseInt(args[1] as string),
            y: parseInt(args[2] as string),
          };
          const color: string = args[3] as string;
          this.canvas?.fillArea(coord, color);
        } catch (e) {
          // no error handling
          // console.log(e);
        }
        break;
      default:
    }
  }

  async start() {
    while (true) {
      const ans: string = await this._askAction();
      if (ans === "Q") return;
      this.process(ans);
      this.canvas?.draw();
    }
  }
}
