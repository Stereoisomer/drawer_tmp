export class Coordinate {
  constructor(public x: number, public y: number) {}

  static compare(a: Coordinate, b: Coordinate): number {
    return a.y - b.y || a.x - b.x;
  }
}
