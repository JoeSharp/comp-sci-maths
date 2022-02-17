import { readFileSync } from "fs";
import { FileLoader } from '../types';

const NAND_2_TETRIS_BASE_DIR = 'src/computation/TestScripts/nand2tetris';

export const getNand2TetrisBaseDir = (dir: string) => `${NAND_2_TETRIS_BASE_DIR}/${dir}`


export const vanillaFileLoader: FileLoader = (dir, file) =>
    readFileSync(`${dir}/${file}`, 'utf-8')
        .split('\n')
        .map(s => s.trim());

export const nand2tetrisFileLoader: FileLoader = (directory: string, filename: string) =>
    vanillaFileLoader(getNand2TetrisBaseDir(directory), filename)