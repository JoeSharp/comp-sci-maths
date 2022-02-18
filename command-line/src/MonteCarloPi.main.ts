import { MainFunction } from "types";
import simpleLogger from "simpleLogger";
import MonteCarloPi from "@comp-sci-maths/lib/dist/fun/monteCarloPi/MonteCarloPi";
import percentageError from "@comp-sci-maths/lib/dist/maths/percentageError";

const main: MainFunction = (args: string[]) => {
    const iterations = (args.length === 0) ? 1000 : parseInt(args[0], 10);

    const mpi = new MonteCarloPi().iterate(iterations).calculatePi();
    const err = percentageError(Math.PI, mpi);

    simpleLogger.info(`Monte Carlo Pi after ${iterations} iterations\nPI: ${mpi}\nActual PI: ${Math.PI}\nPercentage Error: ${err}%`)
}

export default main;