import { simpleLogger } from "common";
import { MainFunction } from "types";
import montyHall from "./montyHall";

const main: MainFunction = (args: string[]) => {

    const iterations = (args.length === 0) ? 1000 : parseInt(args[0], 10);

    simpleLogger.info(`Monty Hall Simulation with ${iterations} iterations`);

    [true, false].forEach(switchStrategy => {
        let successes = 0;

        for (let i = 0; i < iterations; i++) {
            if (montyHall(switchStrategy)) {
                successes++;
            }
        }

        const successPercent = 100 * successes / iterations;
        simpleLogger.info(`Switch? ${switchStrategy ? 'yes' : 'no'} yields Success Rate of ${successPercent.toFixed(2)}%`)
    })
}

export default main;