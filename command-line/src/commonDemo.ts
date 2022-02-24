import { generateRandomLetters } from "@comp-sci-maths/lib/dist/common";
import simpleLogger from './simpleLogger'

const letters = generateRandomLetters(5, { unique: true });

simpleLogger.info(`Generated Random Unique Letters ${letters}`);
