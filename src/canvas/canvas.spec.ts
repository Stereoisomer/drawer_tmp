import { Canvas } from "./canvas";

describe("Canvas test", () => {
  beforeAll(() => {});

  describe("creating Canvas instances", () => {
    describe("positive width and height", () => {
      const width = 5;
      const height = 5;

      const expected: string[] = ["     ", "     ", "     ", "     ", "     "];
      it("should initialize string array of correct size (width: 5, height: 5)", () => {
        const canvas = new Canvas(width, height);
        expect(canvas.canvas).toEqual(expected);
      });
    });

    describe("positive width and zero height", () => {
      const width = 5;
      const height = 0;

      const expected: string[] = [];
      it("should initialize empty array", () => {
        const canvas = new Canvas(width, height);
        expect(canvas.canvas).toEqual(expected);
      });
    });

    describe("zero width and poditive height", () => {
      const width = 0;
      const height = 5;

      const expected: string[] = ["", "", "", "", ""];
      it("should initialize array of empty strings", () => {
        const canvas = new Canvas(width, height);
        expect(canvas.canvas).toEqual(expected);
      });
    });

    describe("zero width and zero height", () => {
      const width = 0;
      const height = 0;

      const expected: string[] = [];
      it("should initialize empty array", () => {
        const canvas = new Canvas(width, height);
        expect(canvas.canvas).toEqual(expected);
      });
    });

    describe("negative width and negative height", () => {
      const width = -8;
      const height = -8;

      const expected = "Invalid size";
      it("should throw Error", () => {
        expect(() => new Canvas(width, height)).toThrow(expected);
      });
    });

    describe("invalid values", () => {
      const width = ["invalid stirng"];
      const height = { invalid: "string" };

      const expected = "Invalid params";
      it("should throw Error", () => {
        expect(
          () =>
            new Canvas(width as unknown as number, height as unknown as number)
        ).toThrow(expected);
      });
    });
  });
});
