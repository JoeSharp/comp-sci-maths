import { nand2tetrisFileLoader } from '../../TestScripts/nand2tetris/nand2tetrisFileLoader';
import Clock from '../Clock';
import { parseHdlFile } from './hdl'
import HDLChip from './HDLChip';

const loadTestChip = (directory: string, filename: string): HDLChip => {
    const data = nand2tetrisFileLoader(directory, filename);
    const hdlFile = parseHdlFile(data);
    const clock = new Clock();
    const hdlChip = new HDLChip(hdlFile, clock);
    return hdlChip;
}

export default loadTestChip;