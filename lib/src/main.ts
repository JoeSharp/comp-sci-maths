import { exit } from "process";
import { simpleLogger } from "./common";

import monteCarloPi from './fun/monteCarloPi/MonteCarloPi.main';
import mastermind from './fun/masterMind/MasterMind.main';
import montyHall from './fun/montyHall/montyHall.main';
import vmCompiler from './computation/virtualMachine/vmCompiler';
import cardDeck from './fun/cardGames/CardDeck.main';
import { MainFunction } from "./types";

interface MainFunctions {
    [key: string]: MainFunction;
}

const MAIN_FUNCTIONS: MainFunctions = {
    'monte-carlo-pi': monteCarloPi,
    'monty-hall': montyHall,
    'hack-vm-compiler': vmCompiler,
    'card-deck': cardDeck,
    'mastermind': mastermind
}

simpleLogger.info("Main Program")

if (process.argv.length <= 2) {
    simpleLogger.warn("No Operation Specified");
    exit();
}

const processName = process.argv[2];

const operation = MAIN_FUNCTIONS[processName];

if (!!operation) {
    operation(process.argv.slice(3));
} else {
    simpleLogger.warn(`Unknown Operation ${processName}`);
    simpleLogger.warn(`Known Operations are: ${Object.keys(MAIN_FUNCTIONS)}`)
}

simpleLogger.info("Done")