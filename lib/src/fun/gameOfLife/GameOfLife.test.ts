import GameOfLife from "./GameOfLife";
import GoLCell from "./GoLCell";
import { gospherGliderGun } from "./presets";

describe("Game of Life", () => {
    test("GoL - Preset", () => {
        const gol = new GameOfLife(50, 50, gospherGliderGun);

        const state0 = gol.toString();
        gol.update();
        const state1 = gol.toString();
        gol.update();
        const state2 = gol.toString();
        gol.update();

        expect(state0.length > 0).toBeTruthy();
        expect(state1.length).toEqual(state0.length);
        expect(state2.length).toEqual(state0.length);

        expect(state0 === state1).toBeFalsy();
        expect(state0 === state2).toBeFalsy();
        expect(state1 === state2).toBeFalsy();
    });

    test("GoL - Still Life - Beehive", () => {
        const gol = new GameOfLife(10, 10, [
            [2, 2],
            [3, 1],
            [4, 1],
            [3, 3],
            [4, 3],
            [5, 2]
        ]);


        const state0 = gol.toString();
        for (let t = 0; t < 10; t++) {
            gol.update();
            const newState = gol.toString();
            expect(state0).toBe(newState);
        }
    })

    // Any live cell with fewer than two live neighbours dies, as if by underpopulation.
    test('Cell - Underpopulation', () => {
        const cell = new GoLCell(true)
            .withNeighbour(new GoLCell(true))
            .withNeighbour(new GoLCell(false))
            .withNeighbour(new GoLCell(false))
            .withNeighbour(new GoLCell(false));

        cell.prepare().iterate();

        expect(cell.isAlive).toBeFalsy();
    })

    // Any live cell with two or three live neighbours lives on to the next generation.
    test('Cell - Lives On', () => {
        const cell2 = new GoLCell(true)
            .withNeighbour(new GoLCell(true))
            .withNeighbour(new GoLCell(true))
            .withNeighbour(new GoLCell(false))
            .withNeighbour(new GoLCell(false));

        cell2.prepare().iterate();

        expect(cell2.isAlive).toBeTruthy();

        const cell3 = new GoLCell(true)
            .withNeighbour(new GoLCell(true))
            .withNeighbour(new GoLCell(true))
            .withNeighbour(new GoLCell(true))
            .withNeighbour(new GoLCell(false));

        cell3.prepare().iterate();

        expect(cell3.isAlive).toBeTruthy();
    })

    // Any live cell with more than three live neighbours dies, as if by overpopulation.
    test('Cell - Overpopulation', () => {
        const cell = new GoLCell(true)
            .withNeighbour(new GoLCell(true))
            .withNeighbour(new GoLCell(true))
            .withNeighbour(new GoLCell(true))
            .withNeighbour(new GoLCell(true));

        cell.prepare().iterate();

        expect(cell.isAlive).toBeFalsy();
    })

    // Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.
    test('Cell - Reproduction', () => {
        const cell = new GoLCell(false)
            .withNeighbour(new GoLCell(true))
            .withNeighbour(new GoLCell(true))
            .withNeighbour(new GoLCell(false))
            .withNeighbour(new GoLCell(true));

        cell.prepare().iterate();

        expect(cell.isAlive).toBeTruthy();
    })
});