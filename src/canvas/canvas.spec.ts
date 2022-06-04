import { Coordinate } from "../types/coordinate";
import { Canvas } from "./canvas";

describe("Canvas test", () => {
  beforeAll(() => {});

  describe("creating Canvas instances", () => {
    describe("positive width and height", () => {
      const width = 5;
      const height = 5;

      const expected: string[][] = [
        [" ", " ", " ", " ", " "],
        [" ", " ", " ", " ", " "],
        [" ", " ", " ", " ", " "],
        [" ", " ", " ", " ", " "],
        [" ", " ", " ", " ", " "],
      ];
      it("should initialize string array of correct size", () => {
        const canvas = new Canvas(width, height);
        expect(canvas.canvas).toEqual(expected);
      });
    });

    describe("positive width and zero height", () => {
      const width = 5;
      const height = 0;

      const expected: string[][] = [];
      it("should initialize empty array", () => {
        const canvas = new Canvas(width, height);
        expect(canvas.canvas).toEqual(expected);
      });
    });

    describe("zero width and poditive height", () => {
      const width = 0;
      const height = 5;

      const expected: string[][] = [[], [], [], [], []];
      it("should initialize array of empty strings", () => {
        const canvas = new Canvas(width, height);
        expect(canvas.canvas).toEqual(expected);
      });
    });

    describe("zero width and zero height", () => {
      const width = 0;
      const height = 0;

      const expected: string[][] = [];
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

  describe("draw straight lines", () => {
    describe("horizontal line", () => {
      let width: number = 5;
      let height: number = 5;
      let canvas: Canvas;

      beforeEach(() => {
        canvas = new Canvas(width, height);
      });
      describe("two points inside boundary", () => {
        let pointA: Coordinate;
        let pointB: Coordinate;

        const expected: string[][] = [
          [" ", " ", " ", " ", " "],
          [" ", "x", "x", "x", " "],
          [" ", " ", " ", " ", " "],
          [" ", " ", " ", " ", " "],
          [" ", " ", " ", " ", " "],
        ];

        beforeEach(() => {
          pointA = { x: 2, y: 2 };
          pointB = { x: 4, y: 2 };
        });

        describe("from A to B", () => {
          it("should draw straight line correctly", () => {
            console.log(pointA, pointB);
            canvas.addLine(pointA, pointB);
            console.log(canvas.canvas);
            expect(canvas.canvas).toEqual(expected);
          });
        });
        describe("from B to A", () => {
          it("should draw straight line correctly", () => {
            canvas.addLine(pointB, pointA);
            expect(canvas.canvas).toEqual(expected);
          });
        });
      });
      describe("same point inside boundary", () => {
        const pointA = { x: 1, y: 2 };

        const expected: string[][] = [
          [" ", " ", " ", " ", " "],
          ["x", " ", " ", " ", " "],
          [" ", " ", " ", " ", " "],
          [" ", " ", " ", " ", " "],
          [" ", " ", " ", " ", " "],
        ];
        it("should draw straight line correctly", () => {
          canvas.addLine(pointA, pointA);
          expect(canvas.canvas).toEqual(expected);
        });
      });
      describe("boundary points and in-bound point", () => {
        describe("{x = 1, y = 1} and in-bound point", () => {
          let boundaryPt: Coordinate;
          let inboundPt: Coordinate;

          const expected: string[][] = [
            ["x", "x", "x", " ", " "],
            [" ", " ", " ", " ", " "],
            [" ", " ", " ", " ", " "],
            [" ", " ", " ", " ", " "],
            [" ", " ", " ", " ", " "],
          ];

          beforeEach(() => {
            boundaryPt = { x: 1, y: 1 };
            inboundPt = { x: 3, y: 1 };
          });

          describe("from boundary point to in-bound point", () => {
            it("should draw straight line correctly", () => {
              canvas.addLine(boundaryPt, inboundPt);
              expect(canvas.canvas).toEqual(expected);
            });
          });
          describe("from in-bound point to boundary point", () => {
            it("should draw straight line correctly", () => {
              canvas.addLine(boundaryPt, inboundPt);
              expect(canvas.canvas).toEqual(expected);
            });
          });
        });
        describe("{x = width, y = height} and in-bound point", () => {
          let boundaryPt: Coordinate;
          let inboundPt: Coordinate;

          const expected: string[][] = [
            [" ", " ", " ", " ", " "],
            [" ", " ", " ", " ", " "],
            [" ", " ", " ", " ", " "],
            [" ", " ", " ", " ", " "],
            [" ", " ", "x", "x", "x"],
          ];

          beforeEach(() => {
            boundaryPt = { x: width, y: height };
            inboundPt = { x: 3, y: height };
          });

          describe("from boundary point to in-bound point", () => {
            it("should draw straight line correctly", () => {
              canvas.addLine(boundaryPt, inboundPt);
              expect(canvas.canvas).toEqual(expected);
            });
          });
          describe("from in-bound point to boundary point", () => {
            it("should draw straight line correctly", () => {
              canvas.addLine(boundaryPt, inboundPt);
              expect(canvas.canvas).toEqual(expected);
            });
          });
        });
      });
      describe("boundary points and boundary point", () => {
        describe("{x = 1, y = 1} and {x = width, y = 1}", () => {
          let boundaryPtA: Coordinate;
          let boundaryPtB: Coordinate;

          const expected: string[][] = [
            ["x", "x", "x", "x", "x"],
            [" ", " ", " ", " ", " "],
            [" ", " ", " ", " ", " "],
            [" ", " ", " ", " ", " "],
            [" ", " ", " ", " ", " "],
          ];

          beforeEach(() => {
            boundaryPtA = { x: 1, y: 1 };
            boundaryPtB = { x: width, y: 1 };
          });

          describe("from A to B", () => {
            it("should draw straight line correctly", () => {
              canvas.addLine(boundaryPtA, boundaryPtB);
              expect(canvas.canvas).toEqual(expected);
            });
          });
          describe("from B to A", () => {
            it("should draw straight line correctly", () => {
              canvas.addLine(boundaryPtB, boundaryPtA);
              expect(canvas.canvas).toEqual(expected);
            });
          });
        });
        describe("{x = 1, y = width} and {x = width, y = height}", () => {
          let boundaryPtA: Coordinate;
          let boundaryPtB: Coordinate;

          const expected: string[][] = [
            [" ", " ", " ", " ", " "],
            [" ", " ", " ", " ", " "],
            [" ", " ", " ", " ", " "],
            [" ", " ", " ", " ", " "],
            ["x", "x", "x", "x", "x"],
          ];

          beforeEach(() => {
            boundaryPtA = { x: 1, y: height };
            boundaryPtB = { x: width, y: height };
          });

          describe("from A to B", () => {
            it("should draw straight line correctly", () => {
              canvas.addLine(boundaryPtA, boundaryPtB);
              expect(canvas.canvas).toEqual(expected);
            });
          });
          describe("from B to A", () => {
            it("should draw straight line correctly", () => {
              canvas.addLine(boundaryPtB, boundaryPtA);
              expect(canvas.canvas).toEqual(expected);
            });
          });
        });
      });
      describe("boundary points and out-bound point", () => {
        describe("{x = 1, y = 1} and {x = 0, y = 1}", () => {
          let boundaryPt: Coordinate;
          let outboundPt: Coordinate;

          const expected: string = "Invalid coordinates";

          beforeEach(() => {
            boundaryPt = { x: 1, y: 1 };
            outboundPt = { x: 0, y: 1 };
          });

          describe("from boundary point to out-bound point", () => {
            it("should throw error", () => {
              expect(() => canvas.addLine(boundaryPt, outboundPt)).toThrow(
                expected
              );
            });
          });
          describe("from out-bound point to boundary point", () => {
            it("should throw error", () => {
              expect(() => canvas.addLine(outboundPt, boundaryPt)).toThrow(
                expected
              );
            });
          });
        });
        describe("{x = 1, y = height} and {x = 0, y = height}", () => {
          let boundaryPt: Coordinate;
          let outboundPt: Coordinate;

          const expected: string = "Invalid coordinates";

          beforeEach(() => {
            boundaryPt = { x: 1, y: height };
            outboundPt = { x: 0, y: height };
          });

          describe("from boundary point to out-bound point", () => {
            it("should throw error", () => {
              expect(() => canvas.addLine(boundaryPt, outboundPt)).toThrow(
                expected
              );
            });
          });
          describe("from out-bound point to boundary point", () => {
            it("should throw error", () => {
              expect(() => canvas.addLine(outboundPt, boundaryPt)).toThrow(
                expected
              );
            });
          });
        });
        describe("{x = width, y = 1} and {x = width + 1, y = 1}", () => {
          let boundaryPt: Coordinate;
          let outboundPt: Coordinate;

          const expected: string = "Invalid coordinates";

          beforeEach(() => {
            boundaryPt = { x: width, y: 1 };
            outboundPt = { x: width + 1, y: 1 };
          });

          describe("from boundary point to out-bound point", () => {
            it("should throw error", () => {
              expect(() => canvas.addLine(boundaryPt, outboundPt)).toThrow(
                expected
              );
            });
          });
          describe("from out-bound point to boundary point", () => {
            it("should throw error", () => {
              expect(() => canvas.addLine(outboundPt, boundaryPt)).toThrow(
                expected
              );
            });
          });
        });
        describe("{x = width, y = height} and {x = width + 1, y = height}", () => {
          let boundaryPt: Coordinate;
          let outboundPt: Coordinate;

          const expected: string = "Invalid coordinates";

          beforeEach(() => {
            boundaryPt = { x: width, y: height };
            outboundPt = { x: width + 1, y: height };
          });

          describe("from boundary point to out-bound point", () => {
            it("should throw error", () => {
              expect(() => canvas.addLine(boundaryPt, outboundPt)).toThrow(
                expected
              );
            });
          });
          describe("from out-bound point to boundary point", () => {
            it("should throw error", () => {
              expect(() => canvas.addLine(outboundPt, boundaryPt)).toThrow(
                expected
              );
            });
          });
        });
      });
      describe("in-bound points and out-bound point", () => {
        describe("{x = 3, y = 3} and {x = 0, y = 3}", () => {
          let inboundPt: Coordinate;
          let outboundPt: Coordinate;

          const expected: string = "Invalid coordinates";

          beforeEach(() => {
            inboundPt = { x: 3, y: 3 };
            outboundPt = { x: 0, y: 3 };
          });

          describe("from in-bound point to out-bound point", () => {
            it("should throw error", () => {
              expect(() => canvas.addLine(inboundPt, outboundPt)).toThrow(
                expected
              );
            });
          });
          describe("from out-bound point to in-bound point", () => {
            it("should throw error", () => {
              expect(() => canvas.addLine(outboundPt, inboundPt)).toThrow(
                expected
              );
            });
          });
        });

        describe("{x = 3, y = 3} and {x = width + 1, y = 3}", () => {
          let inboundPt: Coordinate;
          let outboundPt: Coordinate;

          const expected: string = "Invalid coordinates";

          beforeEach(() => {
            inboundPt = { x: 3, y: 3 };
            outboundPt = { x: width + 1, y: 3 };
          });

          describe("from in-bound point to out-bound point", () => {
            it("should throw error", () => {
              expect(() => canvas.addLine(inboundPt, outboundPt)).toThrow(
                expected
              );
            });
          });
          describe("from out-bound point to in-bound point", () => {
            it("should throw error", () => {
              expect(() => canvas.addLine(outboundPt, inboundPt)).toThrow(
                expected
              );
            });
          });
        });
      });
    });
    describe("vertical line", () => {
      let width: number = 5;
      let height: number = 5;
      let canvas: Canvas;

      beforeEach(() => {
        canvas = new Canvas(width, height);
      });
      describe("two points inside boundary", () => {
        let pointA: Coordinate;
        let pointB: Coordinate;

        const expected: string[][] = [
          [" ", " ", " ", " ", " "],
          [" ", " ", "x", " ", " "],
          [" ", " ", "x", " ", " "],
          [" ", " ", "x", " ", " "],
          [" ", " ", " ", " ", " "],
        ];

        beforeEach(() => {
          pointA = { x: 3, y: 2 };
          pointB = { x: 3, y: 4 };
        });

        describe("from A to B", () => {
          it("should draw straight line correctly", () => {
            console.log(pointA, pointB);
            canvas.addLine(pointA, pointB);
            console.log(canvas.canvas);
            expect(canvas.canvas).toEqual(expected);
          });
        });
        describe("from B to A", () => {
          it("should draw straight line correctly", () => {
            canvas.addLine(pointB, pointA);
            expect(canvas.canvas).toEqual(expected);
          });
        });
      });
      describe("same point inside boundary", () => {
        const pointA = { x: 1, y: 2 };

        const expected: string[][] = [
          [" ", " ", " ", " ", " "],
          ["x", " ", " ", " ", " "],
          [" ", " ", " ", " ", " "],
          [" ", " ", " ", " ", " "],
          [" ", " ", " ", " ", " "],
        ];
        it("should draw straight line correctly", () => {
          canvas.addLine(pointA, pointA);
          expect(canvas.canvas).toEqual(expected);
        });
      });
      describe("boundary points and in-bound point", () => {
        describe("{x = 1, y = 1} and in-bound point", () => {
          let boundaryPt: Coordinate;
          let inboundPt: Coordinate;

          const expected: string[][] = [
            ["x", " ", " ", " ", " "],
            ["x", " ", " ", " ", " "],
            ["x", " ", " ", " ", " "],
            [" ", " ", " ", " ", " "],
            [" ", " ", " ", " ", " "],
          ];

          beforeEach(() => {
            boundaryPt = { x: 1, y: 1 };
            inboundPt = { x: 1, y: 3 };
          });

          describe("from boundary point to in-bound point", () => {
            it("should draw straight line correctly", () => {
              canvas.addLine(boundaryPt, inboundPt);
              expect(canvas.canvas).toEqual(expected);
            });
          });
          describe("from in-bound point to boundary point", () => {
            it("should draw straight line correctly", () => {
              canvas.addLine(boundaryPt, inboundPt);
              expect(canvas.canvas).toEqual(expected);
            });
          });
        });
        describe("{x = width, y = height} and in-bound point", () => {
          let boundaryPt: Coordinate;
          let inboundPt: Coordinate;

          const expected: string[][] = [
            [" ", " ", " ", " ", " "],
            [" ", " ", " ", " ", " "],
            [" ", " ", " ", " ", "x"],
            [" ", " ", " ", " ", "x"],
            [" ", " ", " ", " ", "x"],
          ];

          beforeEach(() => {
            boundaryPt = { x: width, y: 3 };
            inboundPt = { x: width, y: height };
          });

          describe("from boundary point to in-bound point", () => {
            it("should draw straight line correctly", () => {
              canvas.addLine(boundaryPt, inboundPt);
              expect(canvas.canvas).toEqual(expected);
            });
          });
          describe("from in-bound point to boundary point", () => {
            it("should draw straight line correctly", () => {
              canvas.addLine(boundaryPt, inboundPt);
              expect(canvas.canvas).toEqual(expected);
            });
          });
        });
      });
      describe("boundary points and boundary point", () => {
        describe("{x = 1, y = 1} and {x = 1, y = height}", () => {
          let boundaryPtA: Coordinate;
          let boundaryPtB: Coordinate;

          const expected: string[][] = [
            ["x", " ", " ", " ", " "],
            ["x", " ", " ", " ", " "],
            ["x", " ", " ", " ", " "],
            ["x", " ", " ", " ", " "],
            ["x", " ", " ", " ", " "],
          ];

          beforeEach(() => {
            boundaryPtA = { x: 1, y: 1 };
            boundaryPtB = { x: 1, y: height };
          });

          describe("from A to B", () => {
            it("should draw straight line correctly", () => {
              canvas.addLine(boundaryPtA, boundaryPtB);
              expect(canvas.canvas).toEqual(expected);
            });
          });
          describe("from B to A", () => {
            it("should draw straight line correctly", () => {
              canvas.addLine(boundaryPtB, boundaryPtA);
              expect(canvas.canvas).toEqual(expected);
            });
          });
        });
        describe("{x = width, y = 1} and {x = width, y = height}", () => {
          let boundaryPtA: Coordinate;
          let boundaryPtB: Coordinate;

          const expected: string[][] = [
            [" ", " ", " ", " ", "x"],
            [" ", " ", " ", " ", "x"],
            [" ", " ", " ", " ", "x"],
            [" ", " ", " ", " ", "x"],
            [" ", " ", " ", " ", "x"],
          ];

          beforeEach(() => {
            boundaryPtA = { x: width, y: 1 };
            boundaryPtB = { x: width, y: height };
          });

          describe("from A to B", () => {
            it("should draw straight line correctly", () => {
              canvas.addLine(boundaryPtA, boundaryPtB);
              expect(canvas.canvas).toEqual(expected);
            });
          });
          describe("from B to A", () => {
            it("should draw straight line correctly", () => {
              canvas.addLine(boundaryPtB, boundaryPtA);
              expect(canvas.canvas).toEqual(expected);
            });
          });
        });
      });
      describe("boundary points and out-bound point", () => {
        describe("{x = 1, y = 1} and {x = 1, y = 0}", () => {
          let boundaryPt: Coordinate;
          let outboundPt: Coordinate;

          const expected: string = "Invalid coordinates";

          beforeEach(() => {
            boundaryPt = { x: 1, y: 1 };
            outboundPt = { x: 1, y: 0 };
          });

          describe("from boundary point to out-bound point", () => {
            it("should throw error", () => {
              expect(() => canvas.addLine(boundaryPt, outboundPt)).toThrow(
                expected
              );
            });
          });
          describe("from out-bound point to boundary point", () => {
            it("should throw error", () => {
              expect(() => canvas.addLine(outboundPt, boundaryPt)).toThrow(
                expected
              );
            });
          });
        });
        describe("{x = 1, y = height} and {x = 1, y = height + 1}", () => {
          let boundaryPt: Coordinate;
          let outboundPt: Coordinate;

          const expected: string = "Invalid coordinates";

          beforeEach(() => {
            boundaryPt = { x: 1, y: height };
            outboundPt = { x: 1, y: height + 1 };
          });

          describe("from boundary point to out-bound point", () => {
            it("should throw error", () => {
              expect(() => canvas.addLine(boundaryPt, outboundPt)).toThrow(
                expected
              );
            });
          });
          describe("from out-bound point to boundary point", () => {
            it("should throw error", () => {
              expect(() => canvas.addLine(outboundPt, boundaryPt)).toThrow(
                expected
              );
            });
          });
        });
        describe("{x = width, y = 1} and {x = width, y = 0}", () => {
          let boundaryPt: Coordinate;
          let outboundPt: Coordinate;

          const expected: string = "Invalid coordinates";

          beforeEach(() => {
            boundaryPt = { x: width, y: 1 };
            outboundPt = { x: width, y: 0 };
          });

          describe("from boundary point to out-bound point", () => {
            it("should throw error", () => {
              expect(() => canvas.addLine(boundaryPt, outboundPt)).toThrow(
                expected
              );
            });
          });
          describe("from out-bound point to boundary point", () => {
            it("should throw error", () => {
              expect(() => canvas.addLine(outboundPt, boundaryPt)).toThrow(
                expected
              );
            });
          });
        });
        describe("{x = width, y = height} and {x = width, y = height + 1}", () => {
          let boundaryPt: Coordinate;
          let outboundPt: Coordinate;

          const expected: string = "Invalid coordinates";

          beforeEach(() => {
            boundaryPt = { x: width, y: height };
            outboundPt = { x: width, y: height + 1 };
          });

          describe("from boundary point to out-bound point", () => {
            it("should throw error", () => {
              expect(() => canvas.addLine(boundaryPt, outboundPt)).toThrow(
                expected
              );
            });
          });
          describe("from out-bound point to boundary point", () => {
            it("should throw error", () => {
              expect(() => canvas.addLine(outboundPt, boundaryPt)).toThrow(
                expected
              );
            });
          });
        });
      });
      describe("in-bound points and out-bound point", () => {
        describe("{x = 3, y = 3} and {x = 3, y = 0}", () => {
          let inboundPt: Coordinate;
          let outboundPt: Coordinate;

          const expected: string = "Invalid coordinates";

          beforeEach(() => {
            inboundPt = { x: 3, y: 3 };
            outboundPt = { x: 3, y: 0 };
          });

          describe("from in-bound point to out-bound point", () => {
            it("should throw error", () => {
              expect(() => canvas.addLine(inboundPt, outboundPt)).toThrow(
                expected
              );
            });
          });
          describe("from out-bound point to in-bound point", () => {
            it("should throw error", () => {
              expect(() => canvas.addLine(outboundPt, inboundPt)).toThrow(
                expected
              );
            });
          });
        });

        describe("{x = 3, y = 3} and {x = 3, y = height + 1}", () => {
          let inboundPt: Coordinate;
          let outboundPt: Coordinate;

          const expected: string = "Invalid coordinates";

          beforeEach(() => {
            inboundPt = { x: 3, y: 3 };
            outboundPt = { x: 3, y: height + 1 };
          });

          describe("from in-bound point to out-bound point", () => {
            it("should throw error", () => {
              expect(() => canvas.addLine(inboundPt, outboundPt)).toThrow(
                expected
              );
            });
          });
          describe("from out-bound point to in-bound point", () => {
            it("should throw error", () => {
              expect(() => canvas.addLine(outboundPt, inboundPt)).toThrow(
                expected
              );
            });
          });
        });
      });
    });
  });
});
