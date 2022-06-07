import * as readline from "readline";
import { stdin as mockStdin } from "mock-stdin";
import { ConsolePainter } from "./consolePainter";

const stdin = mockStdin();
const io = readline.createInterface({
  input: process.stdin,
});
jest.spyOn(console, "log").mockImplementation(() => {});

describe("Game engine test", () => {
  // invalid commands
  describe("invalid commands", () => {
    let engine: ConsolePainter;
    beforeEach(() => {
      engine = new ConsolePainter(io);
    });
    it("Canvas is undefined", () => {
      expect(engine.canvas).toBeUndefined();
    });
    describe("Input commands before canvas is created", () => {
      it("nothing should happen, and canvas is still undefined", () => {
        expect(() => stdin.send("L 1 2 1 2")).not.toThrow();
        expect(engine.canvas).toBeUndefined();
      });
    });
  });
  // valid commands with different input
  // composit commands
});
