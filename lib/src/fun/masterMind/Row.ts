import { pickRandom, simpleLogger, simpleSwap } from "common";
import { DEFAULT_CELL_VALUE } from "./constants";
import { CountByPin, Pin } from './Pin';

/**
 * Encapsulates a single row in the game, as guessed by the player.
 */
class Row {
    values: number[];

    constructor(size: number) {
        this.values = Array(size).fill(DEFAULT_CELL_VALUE);
    }

    /**
     * Create a copy of this row.
     * @returns A complete copy of the row.
     */
    copy(): Row {
        return new Row(this.values.length).withValues(...this.values);
    }

    static createRandom(options: number[], size: number) {
        return new Row(size)
            .withValues(...Array(size).fill(null).map(() => pickRandom(options)));
    }

    withValues(...values: number[]): this {
        if (values.length !== this.values.length) {
            throw new Error('Mismatched number of values for this row');
        }

        values.forEach((v, i) => this.withValue(i, v));
        return this;
    }

    withValue(index: number, value: number): this {
        // Guard against invalid index value
        if (index < 0 || index > this.values.length)
            throw new Error('Invalid Index for MM Row')

        this.values[index] = value;
        return this;
    }

    // 0200 target
    // 0020 this
    evaluate(target: Row): CountByPin {
        // Guard against the 'correct' row not matching our size.
        if (target.values.length !== this.values.length) {
            throw new Error('Invalid correct row length for this row');
        }

        let correct = 0;
        let incorrectPlace = 0;
        const wrongPlaceConsidered: boolean[] = this.values.map(() => false);

        target.values.forEach((correctValue, index) => {
            if (this.values[index] === correctValue) {
                correct++;
            } else {
                this.values.forEach((thisValue, tIndex) => {
                    // If this has already been considered as a 'incorrect place' for another one, skip it
                    if (wrongPlaceConsidered[tIndex]) return;
                    // Don't compare to itself
                    if (tIndex === index) return;
                    // If this forward one is correct, leave it alone
                    if (thisValue === target.values[tIndex]) return;
                    // If it's on that is incorrect, but matches the one we are looking at, it can be considered 'wrong place'
                    if (thisValue === correctValue) {
                        incorrectPlace++;
                        wrongPlaceConsidered[tIndex] = true;
                    }
                })
            }
        });

        const incorrect = this.values.length - (correct + incorrectPlace);

        const count: CountByPin = {
            [Pin.correct]: correct,
            [Pin.incorrectPlace]: incorrectPlace,
            [Pin.incorrect]: incorrect,
        }

        return count;
    }
}

export default Row;