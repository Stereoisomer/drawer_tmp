import * as readline from "readline";
import { Canvas } from "./canvas/canvas";
import { Cell } from "./canvas/cell";
import { ConsolePainter } from "./consolePainter";

const io = readline.createInterface({
  input: process.stdin,
}) as jest.Mocked<readline.Interface>;

jest.spyOn(console, "log").mockImplementation(() => {});

describe("Game engine test", () => {
  describe("Happy game flow", () => {
    let engine: ConsolePainter = new ConsolePainter(io);

    describe("create canvas", () => {
      engine.process("C 20 4");

      it("canvas should be created", () => {
        expect(engine.canvas).not.toBeUndefined();
      });
    });

    describe("draw horizontal line", () => {
      it("should draw straight line", () => {
        engine.process("L 1 2 6 2");

        // prettier-ignore
        const expected: Cell[][] = Canvas.from(20, 4, [
          [" ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ",],
          ["x", "x", "x", "x", "x", "x", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ",],
          [" ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ",],
          [" ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ",],
        ]).canvas;
        expect(engine.canvas?.canvas).toEqual(expected);
      });
    });

    describe("draw vertical line", () => {
      it("should draw straight line", () => {
        engine.process("L 6 3 6 4");

        // prettier-ignore
        const expected: Cell[][] = Canvas.from(20, 4, [
          [" ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ",],
          ["x", "x", "x", "x", "x", "x", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ",],
          [" ", " ", " ", " ", " ", "x", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ",],
          [" ", " ", " ", " ", " ", "x", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ",],
        ]).canvas;
        expect(engine.canvas?.canvas).toEqual(expected);
      });
    });

    describe("draw rectangle", () => {
      it("should draw rectangle", () => {
        engine.process("R 14 1 18 3");

        // prettier-ignore
        const expected: Cell[][] = Canvas.from(20, 4, [
          [" ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", "x", "x", "x", "x", "x", " ", " ",],
          ["x", "x", "x", "x", "x", "x", " ", " ", " ", " ", " ", " ", " ", "x", " ", " ", " ", "x", " ", " ",],
          [" ", " ", " ", " ", " ", "x", " ", " ", " ", " ", " ", " ", " ", "x", "x", "x", "x", "x", " ", " ",],
          [" ", " ", " ", " ", " ", "x", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ",],
        ]).canvas;
        expect(engine.canvas?.canvas).toEqual(expected);
      });
    });

    describe("Fill area", () => {
      it("should fill the spaces surrounding the rectangles", () => {
        engine.process("B 10 3 o");

        // prettier-ignore
        const expected: Cell[][] = Canvas.from(20, 4, [
          ["o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "x", "x", "x", "x", "x", "o", "o"],
          ["x", "x", "x", "x", "x", "x", "o", "o", "o", "o", "o", "o", "o", "x", " ", " ", " ", "x", "o", "o"],
          [" ", " ", " ", " ", " ", "x", "o", "o", "o", "o", "o", "o", "o", "x", "x", "x", "x", "x", "o", "o"],
          [" ", " ", " ", " ", " ", "x", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o"],
        ]).canvas;
        expect(engine.canvas?.canvas).toEqual(expected);
      });
    });
  });

  // invalid commands
  describe("invalid commands", () => {
    let engine: ConsolePainter;
    beforeAll(() => {
      engine = new ConsolePainter(io);
    });
    it("Canvas is undefined", () => {
      expect(engine.canvas).toBeUndefined();
    });
    describe("Input commands before canvas is created", () => {
      it("error should not thrown", () => {
        expect(() => engine.process("L 1 2 1 2")).not.toThrow();
      });
      it("canvas is still undefined", () => {
        expect(engine.canvas).toBeUndefined();
      });
    });
    describe("Incorrect coordinates", () => {
      let canvasBefore: string;
      beforeAll(() => {
        engine.process("C 5 5");
        canvasBefore = engine.canvas!.toString();
      });

      it("error should not thrown", () => {
        expect(() => engine.process("L -1 2 1 2")).not.toThrow();
      });
      it("canvas should remain unchanged", () => {
        const canvasAfter = engine.canvas!.toString();
        expect(canvasAfter).toEqual(canvasBefore);
      });
    });
    describe("Unmatched command", () => {
      let canvasBefore: string;
      beforeAll(() => {
        engine.process("C 5 5");
        engine.process("L 1 2 1 4");
        canvasBefore = engine.canvas!.toString();
      });

      it("error should not thrown", () => {
        expect(() => engine.process("Z 1 3")).not.toThrow();
      });
      it("canvas should remain unchanged", () => {
        const canvasAfter = engine.canvas!.toString();
        expect(canvasAfter).toEqual(canvasBefore);
      });
    });
  });
});
