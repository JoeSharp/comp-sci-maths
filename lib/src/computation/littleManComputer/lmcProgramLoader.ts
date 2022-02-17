import { vanillaFileLoader } from "../TestScripts/nand2tetris/nand2tetrisFileLoader";
import { LmcInstruction, parseLMCProgram } from "./InstructionSet";

const LMC_BASE_DIR = 'src/computation/littleManComputer/lmcPrograms';

export const lmcFileLoader = (filename: string): string[] =>
    vanillaFileLoader(LMC_BASE_DIR, filename)

export const loadLMCProgram = (filename: string): LmcInstruction[] => parseLMCProgram(lmcFileLoader(filename));
