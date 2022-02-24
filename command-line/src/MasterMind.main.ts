import { MainFunction } from "./types";
import simpleLogger from "./simpleLogger";
import MasterMind from "@comp-sci-maths/lib/dist/fun/masterMind/MasterMind";
import chalk from 'chalk';
import Row from "@comp-sci-maths/lib/dist/fun/masterMind/Row";
import { CountByPin, Pin } from "@comp-sci-maths/lib/dist/fun/masterMind/Pin";
import simplePrompt from "./simplePrompt";
import { ROW_SIZE } from "@comp-sci-maths/lib/dist/fun/masterMind/constants";

const COLOURS = [chalk.red, chalk.blue, chalk.green, chalk.yellow, chalk.magenta, chalk.white]

const rowToString = (row: Row): string => {
    return row.values.map(v => COLOURS[v](v)).join(' ');
}

const resultToString = (result: CountByPin): string => {
    return `Correct: ${result[Pin.correct]}, Incorrect Place: ${result[Pin.incorrectPlace]}`;
}

const boardToString = (mastermind: MasterMind): string => {
    return `Master Mind\n${mastermind.validatedRows.map(({ row, result }) => `${rowToString(row)}\t${resultToString(result)}`).join('\n')}`;
}

const keyToString = (): string => COLOURS.map((c, i) => c(i.toString(10))).join(' ');

const main: MainFunction = (args: string[]) => {
    const mastermind = new MasterMind(ROW_SIZE, COLOURS.map((_, i) => i));
    simpleLogger.info("Welcome to MasterMind");

    while (mastermind.gameContinues()) {
        simpleLogger.info(boardToString(mastermind));
        simpleLogger.info("Key of Colours: " + keyToString());
        const guessRaw = simplePrompt("Enter your selection as a 4-digit number (no spaces): ");
        try {
            if (guessRaw === 'quit') return;
            if (guessRaw.length !== 4) throw new Error('Invalid length of input');
            const row = guessRaw.split('').map(c => parseInt(c, 10));
            if (mastermind.submitRow(new Row(ROW_SIZE).withValues(...row))) {
                simpleLogger.info('You Won!');
            } else {
                simpleLogger.info('Keep going')
            }
        } catch (e) {
            simpleLogger.warn(e);
        }
    }

    simpleLogger.info(`The answer was ${rowToString(mastermind.target)}`);
}

export default main;