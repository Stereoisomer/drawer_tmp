import { Canvas } from "./canvas/canvas";
import * as readline from "readline";
import { exit } from "process";

const io = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

class ConsolePainter {
  canvas?: Canvas;

  constructor() {
    this.init();
    this.start();
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

  async start() {
    while (true) {
      const ans: string = await new Promise((resolve) => {
        io.question("enter command: ", (ans) => resolve(ans));
      });
      const args = ans.split(" ");
      if (args.length > 0) {
        switch (args[0]) {
          case "C":
            // construct or re-create new canvas
            try {
              this.canvas = new Canvas(
                parseInt(args[1] as string),
                parseInt(args[2] as string)
              );
              this.canvas.draw();
            } catch (e) {
              // no error handling
            }
            break;
          case "Q":
            // quit program
            exit(0);
          default:
        }
      }
    }
  }
}

const painter = new ConsolePainter();
// exit(0);
