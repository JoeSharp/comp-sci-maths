import { generateRandomLetters, simpleLogger } from "./common";

const letters = generateRandomLetters(5, { unique: true });

simpleLogger.info(`Generated Random Unique Letters ${letters}`);
