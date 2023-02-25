import Side, { Edge, RotateDirection } from "./Side";

describe("Cube Puzzle", () => {
  describe("Side", () => {
    it("parses input correctly", () => {
      const side = Side.of(`1134
                            4112
                            3131
                            4412`);

      expect(side.content).toStrictEqual([
        [1, 1, 3, 4],
        [4, 1, 1, 2],
        [3, 1, 3, 1],
        [4, 4, 1, 2],
      ]);
    });

    it("throws error correctly for mis-sized row", () => {
      expect(() =>
        Side.of(`1134
                 41125
                 3131
                 4412`)
      ).toThrow();
    });

    it.each`
      edge           | expected
      ${Edge.left}   | ${[1, 4, 3, 4]}
      ${Edge.right}  | ${[4, 2, 1, 2]}
      ${Edge.top}    | ${[1, 1, 3, 4]}
      ${Edge.bottom} | ${[4, 4, 1, 2]}
    `("gets the $edge edge correctly", ({ edge, expected }) => {
      const actual = Side.of(
        `1134
         4112
         3131
         4412`
      ).getEdge(edge);

      expect(actual).toHaveLength(4);
      expect(actual).toStrictEqual(expected);
    });

    it("rotates clockwise correctly", () => {
      const side = Side.of(`1134
                            4112
                            3131
                            4412`);

      side.rotate(RotateDirection.clockwise);

      expect(side.content).toStrictEqual([
        [4, 3, 4, 1],
        [4, 1, 1, 1],
        [1, 3, 1, 3],
        [2, 1, 2, 4],
      ]);
    });

    it("rotates anti-clockwise correctly", () => {
      const side = Side.of(`1134
                            4112
                            3131
                            4412`);

      side.rotate(RotateDirection.anticlockwise);

      expect(side.content).toStrictEqual([
        [4, 2, 1, 2],
        [3, 1, 3, 1],
        [1, 1, 1, 4],
        [1, 4, 3, 4],
      ]);
    });
  });
});
