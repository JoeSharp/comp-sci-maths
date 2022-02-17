/**
 *
 * from https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life
 *
 * The universe of the Game of Life is an infinite, two-dimensional orthogonal grid of square cells, each of which is in one of two possible states, live or dead, (or populated and unpopulated, respectively). Every cell interacts with its eight neighbours, which are the cells that are horizontally, vertically, or diagonally adjacent. At each step in time, the following transitions occur:

    Any live cell with fewer than two live neighbours dies, as if by underpopulation.
    Any live cell with two or three live neighbours lives on to the next generation.
    Any live cell with more than three live neighbours dies, as if by overpopulation.
    Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.

    These rules, which compare the behavior of the automaton to real life, can be condensed into the following:

    Any live cell with two or three live neighbours survives.
    Any dead cell with three live neighbours becomes a live cell.
    All other live cells die in the next generation. Similarly, all other dead cells stay dead.
 */

import GoLCell from "./GoLCell";
import { GameOfLifePreset } from "./types";

class GameOfLife {
    cellRows: GoLCell[][];

    constructor(width: number, height: number, preset: GameOfLifePreset = []) {
        this.cellRows = [];

        // Create all the cells
        for (let x = 0; x < width; x++) {
            const row: GoLCell[] = [];

            for (let y = 0; y < height; y++) {
                row.push(new GoLCell());
            }

            this.cellRows.push(row);
        }

        // Tell each cell about neighbours
        for (let x = 0; x < width; x++) {
            for (let y = 0; y < height; y++) {
                const cell = this.cellRows[x][y];

                // West
                if (x > 0) cell.withNeighbour(this.cellRows[x - 1][y]);

                // East
                if (x + 1 < width) cell.withNeighbour(this.cellRows[x + 1][y]);

                // North
                if (y > 0) cell.withNeighbour(this.cellRows[x][y - 1]);

                // South
                if (y + 1 < height) cell.withNeighbour(this.cellRows[x][y + 1]);

                // South West
                if (x > 0 && y + 1 < height) cell.withNeighbour(this.cellRows[x - 1][y + 1]);

                // North West
                if (x > 0 && y > 0) cell.withNeighbour(this.cellRows[x - 1][y - 1]);

                // South East
                if (x + 1 < width && y + 1 < height) cell.withNeighbour(this.cellRows[x + 1][y + 1]);

                // North East
                if (x + 1 < width && y > 0) cell.withNeighbour(this.cellRows[x + 1][y - 1]);
            }
        }

        // Program in the preset
        preset
            .filter(([x, y]) => x >= 0 && x < width && y >= 0 && y < height)
            .forEach(([x, y]) => this.cellRows[x][y].isAlive = true)
    }

    update() {
        this.cellRows.forEach(r => r.forEach(c => c.prepare()));
        this.cellRows.forEach(r => r.forEach(c => c.iterate()));
    }

    toString() {
        return this.cellRows.map(row => row.map(c => c.isAlive).map(a => a ? 'X' : '.').join('')).join('\n')
    }
}

export default GameOfLife;