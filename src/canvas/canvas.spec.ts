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
            canvas.addLine(pointA, pointB);
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
        describe("on top-left corner", () => {
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

          /* describe("from boundary point to in-bound point", () => {
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
          }); */
          it("should draw straight line correctly", () => {
            canvas.addLine(boundaryPt, inboundPt);
            expect(canvas.canvas).toEqual(expected);
          });
        });

        describe("on bottom-right corner", () => {
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

          /* describe("from boundary point to in-bound point", () => {
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
          }); */
          it("should draw straight line correctly", () => {
            canvas.addLine(boundaryPt, inboundPt);
            expect(canvas.canvas).toEqual(expected);
          });
        });
      });

      describe("boundary points and boundary point", () => {
        describe("on upper bound", () => {
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

          /* describe("from A to B", () => {
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
          }); */
          it("should draw straight line correctly", () => {
            canvas.addLine(boundaryPtB, boundaryPtA);
            expect(canvas.canvas).toEqual(expected);
          });
        });

        describe("on lower bound", () => {
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

          /* describe("from A to B", () => {
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
          }); */
          it("should draw straight line correctly", () => {
            canvas.addLine(boundaryPtB, boundaryPtA);
            expect(canvas.canvas).toEqual(expected);
          });
        });
      });

      describe("in-bound points and out-bound point", () => {
        describe("across left boundary", () => {
          let inboundPt: Coordinate;
          let outboundPt: Coordinate;

          const expected: string = "Invalid coordinates";

          beforeEach(() => {
            inboundPt = { x: 3, y: 3 };
            outboundPt = { x: 0, y: 3 };
          });

          /* describe("from in-bound point to out-bound point", () => {
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
          }); */
          it("should throw error", () => {
            expect(() => canvas.addLine(outboundPt, inboundPt)).toThrow(
              expected
            );
          });
        });

        describe("across right boundary", () => {
          let inboundPt: Coordinate;
          let outboundPt: Coordinate;

          const expected: string = "Invalid coordinates";

          beforeEach(() => {
            inboundPt = { x: 3, y: 3 };
            outboundPt = { x: width + 1, y: 3 };
          });

          /* describe("from in-bound point to out-bound point", () => {
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
          }); */
          it("should throw error", () => {
            expect(() => canvas.addLine(outboundPt, inboundPt)).toThrow(
              expected
            );
          });
        });
      });

      describe("boundary points and out-bound point", () => {
        describe("across left boundary at top-left corner", () => {
          let boundaryPt: Coordinate;
          let outboundPt: Coordinate;

          const expected: string = "Invalid coordinates";

          beforeEach(() => {
            boundaryPt = { x: 1, y: 1 };
            outboundPt = { x: 0, y: 1 };
          });

          /* describe("from boundary point to out-bound point", () => {
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
          }); */
          it("should throw error", () => {
            expect(() => canvas.addLine(outboundPt, boundaryPt)).toThrow(
              expected
            );
          });
        });

        describe("across left boundary at bottom-left corner", () => {
          let boundaryPt: Coordinate;
          let outboundPt: Coordinate;

          const expected: string = "Invalid coordinates";

          beforeEach(() => {
            boundaryPt = { x: 1, y: height };
            outboundPt = { x: 0, y: height };
          });

          /* describe("from boundary point to out-bound point", () => {
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
          }); */
          it("should throw error", () => {
            expect(() => canvas.addLine(outboundPt, boundaryPt)).toThrow(
              expected
            );
          });
        });

        describe("across right boundary at top-right corner", () => {
          let boundaryPt: Coordinate;
          let outboundPt: Coordinate;

          const expected: string = "Invalid coordinates";

          beforeEach(() => {
            boundaryPt = { x: width, y: 1 };
            outboundPt = { x: width + 1, y: 1 };
          });

          /* describe("from boundary point to out-bound point", () => {
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
          }); */
          it("should throw error", () => {
            expect(() => canvas.addLine(outboundPt, boundaryPt)).toThrow(
              expected
            );
          });
        });

        describe("across right boundary at bottom-right corner", () => {
          let boundaryPt: Coordinate;
          let outboundPt: Coordinate;

          const expected: string = "Invalid coordinates";

          beforeEach(() => {
            boundaryPt = { x: width, y: height };
            outboundPt = { x: width + 1, y: height };
          });

          /* describe("from boundary point to out-bound point", () => {
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
          }); */
          it("should throw error", () => {
            expect(() => canvas.addLine(outboundPt, boundaryPt)).toThrow(
              expected
            );
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
            canvas.addLine(pointA, pointB);
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

      describe("boundary points and in-bound points", () => {
        describe("on top-left corner", () => {
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

          /* describe("from boundary point to in-bound point", () => {
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
          }); */
          it("should draw straight line correctly", () => {
            canvas.addLine(boundaryPt, inboundPt);
            expect(canvas.canvas).toEqual(expected);
          });
        });

        describe("on bottom-right corner", () => {
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

          /* describe("from boundary point to in-bound point", () => {
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
          }); */
          it("should draw straight line correctly", () => {
            canvas.addLine(boundaryPt, inboundPt);
            expect(canvas.canvas).toEqual(expected);
          });
        });
      });

      describe("boundary points and boundary points", () => {
        describe("on left boundary", () => {
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

          /* describe("from A to B", () => {
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
          }); */
          it("should draw straight line correctly", () => {
            canvas.addLine(boundaryPtB, boundaryPtA);
            expect(canvas.canvas).toEqual(expected);
          });
        });

        describe("on right boundary", () => {
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

          /* describe("from A to B", () => {
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
          }); */
          it("should draw straight line correctly", () => {
            canvas.addLine(boundaryPtB, boundaryPtA);
            expect(canvas.canvas).toEqual(expected);
          });
        });
      });

      describe("in-bound points and out-bound points", () => {
        describe("across upper bound", () => {
          let inboundPt: Coordinate;
          let outboundPt: Coordinate;

          const expected: string = "Invalid coordinates";

          beforeEach(() => {
            inboundPt = { x: 3, y: 3 };
            outboundPt = { x: 3, y: 0 };
          });

          /* describe("from in-bound point to out-bound point", () => {
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
          }); */
          it("should throw error", () => {
            expect(() => canvas.addLine(outboundPt, inboundPt)).toThrow(
              expected
            );
          });
        });

        describe("across lower bound", () => {
          let inboundPt: Coordinate;
          let outboundPt: Coordinate;

          const expected: string = "Invalid coordinates";

          beforeEach(() => {
            inboundPt = { x: 3, y: 3 };
            outboundPt = { x: 3, y: height + 1 };
          });

          /* describe("from in-bound point to out-bound point", () => {
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
          }); */
          it("should throw error", () => {
            expect(() => canvas.addLine(outboundPt, inboundPt)).toThrow(
              expected
            );
          });
        });
      });

      describe("boundary points and out-bound points", () => {
        describe("across upper bound at top-left corner", () => {
          let boundaryPt: Coordinate;
          let outboundPt: Coordinate;

          const expected: string = "Invalid coordinates";

          beforeEach(() => {
            boundaryPt = { x: 1, y: 1 };
            outboundPt = { x: 1, y: 0 };
          });

          /* describe("from boundary point to out-bound point", () => {
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
          }); */
          it("should throw error", () => {
            expect(() => canvas.addLine(outboundPt, boundaryPt)).toThrow(
              expected
            );
          });
        });

        describe("across lower bound at bottom-left corner", () => {
          let boundaryPt: Coordinate;
          let outboundPt: Coordinate;

          const expected: string = "Invalid coordinates";

          beforeEach(() => {
            boundaryPt = { x: 1, y: height };
            outboundPt = { x: 1, y: height + 1 };
          });

          /* describe("from boundary point to out-bound point", () => {
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
          }); */
          it("should throw error", () => {
            expect(() => canvas.addLine(outboundPt, boundaryPt)).toThrow(
              expected
            );
          });
        });

        describe("across upper bound at top-right corner", () => {
          let boundaryPt: Coordinate;
          let outboundPt: Coordinate;

          const expected: string = "Invalid coordinates";

          beforeEach(() => {
            boundaryPt = { x: width, y: 1 };
            outboundPt = { x: width, y: 0 };
          });

          /* describe("from boundary point to out-bound point", () => {
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
          }); */
          it("should throw error", () => {
            expect(() => canvas.addLine(outboundPt, boundaryPt)).toThrow(
              expected
            );
          });
        });

        describe("across lower bound at bottom-right corner", () => {
          let boundaryPt: Coordinate;
          let outboundPt: Coordinate;

          const expected: string = "Invalid coordinates";

          beforeEach(() => {
            boundaryPt = { x: width, y: height };
            outboundPt = { x: width, y: height + 1 };
          });

          /* describe("from boundary point to out-bound point", () => {
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
          }); */
          it("should throw error", () => {
            expect(() => canvas.addLine(outboundPt, boundaryPt)).toThrow(
              expected
            );
          });
        });
      });
    });

    describe("diagonals", () => {
      let width: number = 5;
      let height: number = 5;
      let canvas: Canvas;

      describe("two points inside boundary", () => {
        let pointA: Coordinate;
        let pointB: Coordinate;

        // const expected: string[][] = [
        //   [" ", " ", " ", " ", " "],
        //   [" ", "x", " ", " ", " "],
        //   [" ", " ", "x", " ", " "],
        //   [" ", " ", " ", "x", " "],
        //   [" ", " ", " ", " ", " "],
        // ];
        const expected = "Not straight line";

        beforeEach(() => {
          canvas = new Canvas(width, height);
          pointA = { x: 2, y: 2 };
          pointB = { x: 3, y: 4 };
        });

        describe("from A to B", () => {
          // it("should draw straight line correctly", () => {
          //   canvas.addLine(pointA, pointB);
          //   expect(canvas.canvas).toEqual(expected);
          // });
          it("should throw error", () => {
            expect(() => canvas.addLine(pointA, pointB)).toThrow(expected);
          });
        });

        describe("from B to A", () => {
          // it("should draw straight line correctly", () => {
          //   canvas.addLine(pointB, pointA);
          //   expect(canvas.canvas).toEqual(expected);
          // });
          it("should throw error", () => {
            expect(() => canvas.addLine(pointB, pointA)).toThrow(expected);
          });
        });
      });

      describe("boundary points and in-bound points", () => {
        describe("on top-left corner", () => {
          let boundaryPt: Coordinate;
          let inboundPt: Coordinate;

          // const expected: string[][] = [
          //   ["x", " ", " ", " ", " "],
          //   [" ", "x", " ", " ", " "],
          //   [" ", " ", "x", " ", " "],
          //   [" ", " ", " ", " ", " "],
          //   [" ", " ", " ", " ", " "],
          // ];
          const expected = "Not straight line";

          beforeEach(() => {
            canvas = new Canvas(width, height);
            boundaryPt = { x: 1, y: 1 };
            inboundPt = { x: 3, y: 3 };
          });

          /* describe("from boundary point to in-bound point", () => {
            // it("should draw straight line correctly", () => {
            //   canvas.addLine(boundaryPt, inboundPt);
            //   expect(canvas.canvas).toEqual(expected);
            // });
            it("should throw error", () => {
              expect(() => canvas.addLine(boundaryPt, inboundPt)).toThrow(
                expected
              );
            });
          });

          describe("from in-bound point to boundary point", () => {
            // it("should draw straight line correctly", () => {
            //   canvas.addLine(boundaryPt, inboundPt);
            //   expect(canvas.canvas).toEqual(expected);
            // });
            it("should throw error", () => {
              expect(() => canvas.addLine(inboundPt, boundaryPt)).toThrow(
                expected
              );
            });
          }); */

          // it("should draw straight line correctly", () => {
          //   canvas.addLine(boundaryPt, inboundPt);
          //   expect(canvas.canvas).toEqual(expected);
          // });
          it("should throw error", () => {
            expect(() => canvas.addLine(inboundPt, boundaryPt)).toThrow(
              expected
            );
          });
        });

        describe("on bottom-right corner", () => {
          let boundaryPt: Coordinate;
          let inboundPt: Coordinate;

          // const expected: string[][] = [
          //   [" ", " ", " ", " ", " "],
          //   [" ", " ", " ", " ", " "],
          //   [" ", " ", "x", " ", " "],
          //   [" ", " ", " ", "x", " "],
          //   [" ", " ", " ", " ", "x"],
          // ];
          const expected = "Not straight line";

          beforeEach(() => {
            canvas = new Canvas(width, height);
            boundaryPt = { x: 3, y: 3 };
            inboundPt = { x: width, y: height };
          });

          /* describe("from boundary point to in-bound point", () => {
            // it("should draw straight line correctly", () => {
            //   canvas.addLine(boundaryPt, inboundPt);
            //   expect(canvas.canvas).toEqual(expected);
            // });
            it("should throw error", () => {
              expect(() => canvas.addLine(boundaryPt, inboundPt)).toThrow(
                expected
              );
            });
          });

          describe("from in-bound point to boundary point", () => {
            // it("should draw straight line correctly", () => {
            //   canvas.addLine(boundaryPt, inboundPt);
            //   expect(canvas.canvas).toEqual(expected);
            // });
            it("should throw error", () => {
              expect(() => canvas.addLine(inboundPt, boundaryPt)).toThrow(
                expected
              );
            });
          }); */

          // it("should draw straight line correctly", () => {
          //   canvas.addLine(boundaryPt, inboundPt);
          //   expect(canvas.canvas).toEqual(expected);
          // });
          it("should throw error", () => {
            expect(() => canvas.addLine(inboundPt, boundaryPt)).toThrow(
              expected
            );
          });
        });
      });

      describe("boundary points and boundary points", () => {
        describe("the '\\' diagonal", () => {
          let boundaryPtA: Coordinate;
          let boundaryPtB: Coordinate;

          // const expected: string[][] = [
          //   ["x", " ", " ", " ", " "],
          //   [" ", "x", " ", " ", " "],
          //   [" ", " ", "x", " ", " "],
          //   [" ", " ", " ", "x", " "],
          //   [" ", " ", " ", " ", "x"],
          // ];
          const expected = "Not straight line";

          beforeEach(() => {
            canvas = new Canvas(width, height);
            boundaryPtA = { x: 1, y: 1 };
            boundaryPtB = { x: width, y: height };
          });

          /* describe("from A to B", () => {
            // it("should draw straight line correctly", () => {
            //   canvas.addLine(boundaryPtA, boundaryPtB);
            //   expect(canvas.canvas).toEqual(expected);
            // });
            it("should throw error", () => {
              expect(() => canvas.addLine(boundaryPtA, boundaryPtB)).toThrow(
                expected
              );
            });
          });
          describe("from B to A", () => {
            // it("should draw straight line correctly", () => {
            //   canvas.addLine(boundaryPtB, boundaryPtA);
            //   expect(canvas.canvas).toEqual(expected);
            // });
            it("should throw error", () => {
              expect(() => canvas.addLine(boundaryPtB, boundaryPtA)).toThrow(
                expected
              );
            });
          }); */

          // it("should draw straight line correctly", () => {
          //   canvas.addLine(boundaryPtB, boundaryPtA);
          //   expect(canvas.canvas).toEqual(expected);
          // });
          it("should throw error", () => {
            expect(() => canvas.addLine(boundaryPtB, boundaryPtA)).toThrow(
              expected
            );
          });
        });
        describe("the '/' diagonal", () => {
          let boundaryPtA: Coordinate;
          let boundaryPtB: Coordinate;

          // const expected: string[][] = [
          //   [" ", " ", " ", " ", "x"],
          //   [" ", " ", " ", "x", " "],
          //   [" ", " ", "x", " ", " "],
          //   [" ", "x", " ", " ", " "],
          //   ["x", " ", " ", " ", " "],
          // ];
          const expected = "Not straight line";

          beforeEach(() => {
            canvas = new Canvas(width, height);
            boundaryPtA = { x: width, y: 1 };
            boundaryPtB = { x: 1, y: height };
          });

          /* describe("from A to B", () => {
            // it("should draw straight line correctly", () => {
            //   canvas.addLine(boundaryPtA, boundaryPtB);
            //   expect(canvas.canvas).toEqual(expected);
            // });
            it("should throw error", () => {
              expect(() => canvas.addLine(boundaryPtA, boundaryPtB)).toThrow(
                expected
              );
            });
          });
          describe("from B to A", () => {
            // it("should draw straight line correctly", () => {
            //   canvas.addLine(boundaryPtB, boundaryPtA);
            //   expect(canvas.canvas).toEqual(expected);
            // });
            it("should throw error", () => {
              expect(() => canvas.addLine(boundaryPtB, boundaryPtA)).toThrow(
                expected
              );
            });
          }); */

          // it("should draw straight line correctly", () => {
          //   canvas.addLine(boundaryPtB, boundaryPtA);
          //   expect(canvas.canvas).toEqual(expected);
          // });
          it("should throw error", () => {
            expect(() => canvas.addLine(boundaryPtB, boundaryPtA)).toThrow(
              expected
            );
          });
        });
      });

      describe("in-bound points and out-bound points", () => {
        describe("across upper bound", () => {
          let inboundPt: Coordinate;
          let outboundPt: Coordinate;

          const expected: string = "Invalid coordinates";

          beforeEach(() => {
            canvas = new Canvas(width, height);
            inboundPt = { x: 3, y: 3 };
            outboundPt = { x: 0, y: 0 };
          });

          /* describe("from in-bound point to out-bound point", () => {
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
          }); */
          it("should throw error", () => {
            expect(() => canvas.addLine(outboundPt, inboundPt)).toThrow(
              expected
            );
          });
        });

        describe("across lower bound", () => {
          let inboundPt: Coordinate;
          let outboundPt: Coordinate;

          const expected: string = "Invalid coordinates";

          beforeEach(() => {
            canvas = new Canvas(width, height);
            inboundPt = { x: 3, y: 3 };
            outboundPt = { x: width + 1, y: height + 1 };
          });

          /* describe("from in-bound point to out-bound point", () => {
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
          }); */
          it("should throw error", () => {
            expect(() => canvas.addLine(outboundPt, inboundPt)).toThrow(
              expected
            );
          });
        });
      });

      describe("boundary points and out-bound points", () => {
        describe("across top-left corner", () => {
          let boundaryPt: Coordinate;
          let outboundPt: Coordinate;

          const expected: string = "Invalid coordinates";

          beforeEach(() => {
            canvas = new Canvas(width, height);
            boundaryPt = { x: 1, y: 1 };
            outboundPt = { x: 0, y: 0 };
          });

          /* describe("from boundary point to out-bound point", () => {
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
          }); */
          it("should throw error", () => {
            expect(() => canvas.addLine(outboundPt, boundaryPt)).toThrow(
              expected
            );
          });
        });
        describe("across bottom-left corner", () => {
          let boundaryPt: Coordinate;
          let outboundPt: Coordinate;

          const expected: string = "Invalid coordinates";

          beforeEach(() => {
            canvas = new Canvas(width, height);
            boundaryPt = { x: 1, y: height };
            outboundPt = { x: 0, y: height + 1 };
          });

          /* describe("from boundary point to out-bound point", () => {
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
          }); */
          it("should throw error", () => {
            expect(() => canvas.addLine(outboundPt, boundaryPt)).toThrow(
              expected
            );
          });
        });
        describe("across top-right corner", () => {
          let boundaryPt: Coordinate;
          let outboundPt: Coordinate;

          const expected: string = "Invalid coordinates";

          beforeEach(() => {
            canvas = new Canvas(width, height);
            boundaryPt = { x: width, y: 1 };
            outboundPt = { x: width + 1, y: 0 };
          });

          /* describe("from boundary point to out-bound point", () => {
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
          }); */
          it("should throw error", () => {
            expect(() => canvas.addLine(outboundPt, boundaryPt)).toThrow(
              expected
            );
          });
        });
        describe("across bottom-right corner", () => {
          let boundaryPt: Coordinate;
          let outboundPt: Coordinate;

          const expected: string = "Invalid coordinates";

          beforeEach(() => {
            canvas = new Canvas(width, height);
            boundaryPt = { x: width, y: height };
            outboundPt = { x: width + 1, y: height + 1 };
          });

          /* describe("from boundary point to out-bound point", () => {
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
          }); */
          it("should throw error", () => {
            expect(() => canvas.addLine(outboundPt, boundaryPt)).toThrow(
              expected
            );
          });
        });
      });
    });
  });

  describe("draw rectangles", () => {
    let width: number = 5;
    let height: number = 5;
    let canvas: Canvas;

    describe("within boundary", () => {
      let pointA: Coordinate;
      let pointB: Coordinate;
      let pointC: Coordinate;
      let pointD: Coordinate;

      const expected: string[][] = [
        [" ", " ", " ", " ", " "],
        [" ", "x", "x", "x", " "],
        [" ", "x", " ", "x", " "],
        [" ", "x", "x", "x", " "],
        [" ", " ", " ", " ", " "],
      ];

      beforeEach(() => {
        canvas = new Canvas(width, height);
        pointA = { x: 2, y: 2 };
        pointB = { x: 2, y: 4 };
        pointC = { x: 4, y: 4 };
        pointD = { x: 4, y: 2 };
      });

      describe("points at \\ diagonal", () => {
        it("should draw rectangle correctly", () => {
          canvas.addRectangle(pointA, pointC);
          expect(canvas.canvas).toEqual(expected);
        });
      });

      describe("points at / diagonal", () => {
        it("should draw rectangle correctly", () => {
          canvas.addRectangle(pointB, pointD);
          expect(canvas.canvas).toEqual(expected);
        });
      });
    });

    /* describe("on boundary", () => {
      describe("on upper boundary", () => {
        let pointA: Coordinate;
        let pointB: Coordinate;
        let pointC: Coordinate;
        let pointD: Coordinate;

        const expected: string[][] = [
          [" ", "x", "x", "x", " "],
          [" ", "x", " ", "x", " "],
          [" ", "x", "x", "x", " "],
          [" ", " ", " ", " ", " "],
          [" ", " ", " ", " ", " "],
        ];

        beforeEach(() => {
          canvas = new Canvas(width, height);
          pointA = { x: 2, y: 1 };
          pointB = { x: 2, y: 3 };
          pointC = { x: 4, y: 3 };
          pointD = { x: 4, y: 1 };
        });

        describe("points at \\ diagonal", () => {
          it("should draw rectangle correctly", () => {
            canvas.addRectangle(pointA, pointC);
            expect(canvas.canvas).toEqual(expected);
          });
        });

        describe("points at / diagonal", () => {
          it("should draw rectangle correctly", () => {
            canvas.addRectangle(pointB, pointD);
            expect(canvas.canvas).toEqual(expected);
          });
        });
      });

      describe("on top-right corner", () => {
        let pointA: Coordinate;
        let pointB: Coordinate;
        let pointC: Coordinate;
        let pointD: Coordinate;

        const expected: string[][] = [
          [" ", " ", "x", "x", "x"],
          [" ", " ", "x", " ", "x"],
          [" ", " ", "x", "x", "x"],
          [" ", " ", " ", " ", " "],
          [" ", " ", " ", " ", " "],
        ];

        beforeEach(() => {
          canvas = new Canvas(width, height);
          pointA = { x: 3, y: 1 };
          pointB = { x: 3, y: 3 };
          pointC = { x: width, y: 3 };
          pointD = { x: width, y: 1 };
        });

        describe("points at \\ diagonal", () => {
          it("should draw rectangle correctly", () => {
            canvas.addRectangle(pointA, pointC);
            expect(canvas.canvas).toEqual(expected);
          });
        });

        describe("points at / diagonal", () => {
          it("should draw rectangle correctly", () => {
            canvas.addRectangle(pointB, pointD);
            expect(canvas.canvas).toEqual(expected);
          });
        });
      });

      describe("on right boundary", () => {
        let pointA: Coordinate;
        let pointB: Coordinate;
        let pointC: Coordinate;
        let pointD: Coordinate;

        const expected: string[][] = [
          [" ", " ", " ", " ", " "],
          [" ", " ", "x", "x", "x"],
          [" ", " ", "x", " ", "x"],
          [" ", " ", "x", "x", "x"],
          [" ", " ", " ", " ", " "],
        ];

        beforeEach(() => {
          canvas = new Canvas(width, height);
          pointA = { x: 3, y: 2 };
          pointB = { x: 3, y: 4 };
          pointC = { x: width, y: 4 };
          pointD = { x: width, y: 2 };
        });

        describe("points at \\ diagonal", () => {
          it("should draw rectangle correctly", () => {
            canvas.addRectangle(pointA, pointC);
            expect(canvas.canvas).toEqual(expected);
          });
        });

        describe("points at / diagonal", () => {
          it("should draw rectangle correctly", () => {
            canvas.addRectangle(pointB, pointD);
            expect(canvas.canvas).toEqual(expected);
          });
        });
      });

      describe("on bottom-right corner", () => {
        let pointA: Coordinate;
        let pointB: Coordinate;
        let pointC: Coordinate;
        let pointD: Coordinate;

        const expected: string[][] = [
          [" ", " ", " ", " ", " "],
          [" ", " ", " ", " ", " "],
          [" ", " ", "x", "x", "x"],
          [" ", " ", "x", " ", "x"],
          [" ", " ", "x", "x", "x"],
        ];

        beforeEach(() => {
          canvas = new Canvas(width, height);
          pointA = { x: 3, y: 3 };
          pointB = { x: 3, y: height };
          pointC = { x: width, y: height };
          pointD = { x: width, y: 3 };
        });

        describe("points at \\ diagonal", () => {
          it("should draw rectangle correctly", () => {
            canvas.addRectangle(pointA, pointC);
            expect(canvas.canvas).toEqual(expected);
          });
        });

        describe("points at / diagonal", () => {
          it("should draw rectangle correctly", () => {
            canvas.addRectangle(pointB, pointD);
            expect(canvas.canvas).toEqual(expected);
          });
        });
      });

      describe("on lower boundary", () => {
        let pointA: Coordinate;
        let pointB: Coordinate;
        let pointC: Coordinate;
        let pointD: Coordinate;

        const expected: string[][] = [
          [" ", " ", " ", " ", " "],
          [" ", " ", " ", " ", " "],
          [" ", "x", "x", "x", " "],
          [" ", "x", " ", "x", " "],
          [" ", "x", "x", "x", " "],
        ];

        beforeEach(() => {
          canvas = new Canvas(width, height);
          pointA = { x: 2, y: 3 };
          pointB = { x: 2, y: height };
          pointC = { x: 4, y: height };
          pointD = { x: 4, y: 3 };
        });

        describe("points at \\ diagonal", () => {
          it("should draw rectangle correctly", () => {
            canvas.addRectangle(pointA, pointC);
            expect(canvas.canvas).toEqual(expected);
          });
        });

        describe("points at / diagonal", () => {
          it("should draw rectangle correctly", () => {
            canvas.addRectangle(pointB, pointD);
            expect(canvas.canvas).toEqual(expected);
          });
        });
      });

      describe("on bottom-left corner", () => {
        let pointA: Coordinate;
        let pointB: Coordinate;
        let pointC: Coordinate;
        let pointD: Coordinate;

        const expected: string[][] = [
          [" ", " ", " ", " ", " "],
          [" ", " ", " ", " ", " "],
          ["x", "x", "x", " ", " "],
          ["x", " ", "x", " ", " "],
          ["x", "x", "x", " ", " "],
        ];

        beforeEach(() => {
          canvas = new Canvas(width, height);
          pointA = { x: 1, y: 3 };
          pointB = { x: 1, y: height };
          pointC = { x: 3, y: height };
          pointD = { x: 3, y: 3 };
        });

        describe("points at \\ diagonal", () => {
          it("should draw rectangle correctly", () => {
            canvas.addRectangle(pointA, pointC);
            expect(canvas.canvas).toEqual(expected);
          });
        });

        describe("points at / diagonal", () => {
          it("should draw rectangle correctly", () => {
            canvas.addRectangle(pointB, pointD);
            expect(canvas.canvas).toEqual(expected);
          });
        });
      });

      describe("on left boundary", () => {
        let pointA: Coordinate;
        let pointB: Coordinate;
        let pointC: Coordinate;
        let pointD: Coordinate;

        const expected: string[][] = [
          [" ", " ", " ", " ", " "],
          ["x", "x", "x", " ", " "],
          ["x", " ", "x", " ", " "],
          ["x", "x", "x", " ", " "],
          [" ", " ", " ", " ", " "],
        ];

        beforeEach(() => {
          canvas = new Canvas(width, height);
          pointA = { x: 1, y: 2 };
          pointB = { x: 1, y: 4 };
          pointC = { x: 3, y: 4 };
          pointD = { x: 3, y: 2 };
        });

        describe("points at \\ diagonal", () => {
          it("should draw rectangle correctly", () => {
            canvas.addRectangle(pointA, pointC);
            expect(canvas.canvas).toEqual(expected);
          });
        });

        describe("points at / diagonal", () => {
          it("should draw rectangle correctly", () => {
            canvas.addRectangle(pointB, pointD);
            expect(canvas.canvas).toEqual(expected);
          });
        });
      });

      describe("on top-left corner", () => {
        let pointA: Coordinate;
        let pointB: Coordinate;
        let pointC: Coordinate;
        let pointD: Coordinate;

        const expected: string[][] = [
          ["x", "x", "x", " ", " "],
          ["x", " ", "x", " ", " "],
          ["x", "x", "x", " ", " "],
          [" ", " ", " ", " ", " "],
          [" ", " ", " ", " ", " "],
        ];

        beforeEach(() => {
          canvas = new Canvas(width, height);
          pointA = { x: 1, y: 1 };
          pointB = { x: 1, y: 3 };
          pointC = { x: 3, y: 3 };
          pointD = { x: 3, y: 1 };
        });

        describe("points at \\ diagonal", () => {
          it("should draw rectangle correctly", () => {
            canvas.addRectangle(pointA, pointC);
            expect(canvas.canvas).toEqual(expected);
          });
        });

        describe("points at / diagonal", () => {
          it("should draw rectangle correctly", () => {
            canvas.addRectangle(pointB, pointD);
            expect(canvas.canvas).toEqual(expected);
          });
        });
      });
    }); */

    describe("out of boundary", () => {
      beforeEach(() => {
        canvas = new Canvas(width, height);
      });

      describe("across upper and left boundary", () => {
        let pointA: Coordinate;
        let pointB: Coordinate;
        let pointC: Coordinate;
        let pointD: Coordinate;

        const expected = "Invalid coordinates";

        beforeEach(() => {
          pointA = { x: 0, y: 0 };
          pointB = { x: 0, y: 4 };
          pointC = { x: 4, y: 4 };
          pointD = { x: 4, y: 0 };
        });
        it("should throw error", () => {
          expect(() => canvas.addRectangle(pointB, pointD)).toThrow(expected);
        });
      });

      describe("across lower and right boundary", () => {
        let pointA: Coordinate;
        let pointB: Coordinate;
        let pointC: Coordinate;
        let pointD: Coordinate;

        const expected = "Invalid coordinates";

        beforeEach(() => {
          pointA = { x: 2, y: 2 };
          pointB = { x: 2, y: height + 1 };
          pointC = { x: width + 1, y: height + 1 };
          pointD = { x: width + 1, y: 2 };
        });
        it("should throw error", () => {
          expect(() => canvas.addRectangle(pointC, pointA)).toThrow(expected);
        });
      });
    });
  });
});
