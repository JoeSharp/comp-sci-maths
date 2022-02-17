import { nand2tetrisFileLoader } from '../../TestScripts/nand2tetris/nand2tetrisFileLoader';
import { parseCodeLine, parseIOLine, parseOpeningLine, parseHdlFile } from './hdl'

describe('Hardware Description Lanuage (Hack HDL)', () => {

    test("Opening Line", () => {
        const chipName = parseOpeningLine('CHIP Xor {');
        expect(chipName).toBe('Xor');
    });

    test("IO Lines - Input (pins)", () => {
        const ioLine = parseIOLine("IN a, b;");
        expect(ioLine.direction).toBe('IN');
        expect(ioLine.pinsAndBuses).toHaveLength(2);
        const [pinA, pinB] = ioLine.pinsAndBuses;
        expect(pinA.name).toBe('a');
        expect(pinA.width).toBe(1);
        expect(pinB.name).toBe('b');
        expect(pinB.width).toBe(1);
    });

    test('IO Lines - Input (buses)', () => {
        const ioLine = parseIOLine('IN a[16], b[16], c, d;');
        expect(ioLine.direction).toBe('IN');
        expect(ioLine.pinsAndBuses).toHaveLength(4);

        const [pinA, pinB, pinC, pinD] = ioLine.pinsAndBuses;
        expect(pinA.name).toBe('a');
        expect(pinA.width).toBe(16);
        expect(pinB.name).toBe('b');
        expect(pinB.width).toBe(16);
        expect(pinC.name).toBe('c');
        expect(pinC.width).toBe(1);
        expect(pinD.name).toBe('d');
        expect(pinD.width).toBe(1);
    })

    test("IO Lines - Output (pin)", () => {
        const ioLine = parseIOLine("OUT out;");
        expect(ioLine.direction).toBe('OUT');
        expect(ioLine.pinsAndBuses).toHaveLength(1);
        const [pinOut] = ioLine.pinsAndBuses;
        expect(pinOut.name).toBe('out');
    });

    test("IO Lines - Output (bus)", () => {
        const ioLine = parseIOLine("OUT out[16];");
        expect(ioLine.direction).toBe('OUT');
        expect(ioLine.pinsAndBuses).toHaveLength(1);
        const [pinOut] = ioLine.pinsAndBuses;
        expect(pinOut.name).toBe('out');
        expect(pinOut.width).toBe(16);
    });

    test("Code Line", () => {
        const { chipName, parameters } = parseCodeLine('Not(in=a, out=notA);');
        expect(chipName).toBe('Not');
        expect(parameters).toHaveLength(2);

        const [inA, outNotA] = parameters;
        expect(inA.inputName).toBe('in');
        expect(inA.outputName).toBe('a');

        expect(outNotA.inputName).toBe('out');
        expect(outNotA.outputName).toBe('notA');
    });

    test('Code Line (or 8 way)', () => {

        const { chipName, parameters } = parseCodeLine('Or(a=in[0], b=in[1], out=or1);');
        expect(chipName).toBe('Or');
        expect(parameters).toHaveLength(3);

        const [inA, inB, out] = parameters;
        expect(inA.inputName).toBe('a');
        expect(inA.outputName).toBe('in');
        expect(inA.outputFrom).toBe(0);
        expect(inA.outputTo).toBe(0);

        expect(inB.inputName).toBe('b');
        expect(inB.outputName).toBe('in');
        expect(inB.outputFrom).toBe(1);
        expect(inB.outputTo).toBe(1);

        expect(out.inputName).toBe('out');
        expect(out.outputName).toBe('or1');
        expect(out.outputFrom).toBe(0);
        expect(out.outputTo).toBe(0);
    })

    test("Code Line (spaces)", () => {
        const { chipName, parameters } = parseCodeLine('Not (in=a, out=notA);');
        expect(chipName).toBe('Not');
        expect(parameters).toHaveLength(2);

        const [inA, outNotA] = parameters;
        expect(inA.inputName).toBe('in');
        expect(inA.outputName).toBe('a');

        expect(outNotA.inputName).toBe('out');
        expect(outNotA.outputName).toBe('notA');
    });

    test('Code Line (buses)', () => {
        const { chipName, parameters } = parseCodeLine('And(a=aa[4], b=bb[15], out=outout[6]);');
        expect(chipName).toBe('And');
        expect(parameters).toHaveLength(3);
        const [pinA, pinB, pinOut] = parameters;
        expect(pinA.inputName).toBe('a');
        expect(pinA.outputName).toBe('aa');
        expect(pinA.outputFrom).toBe(4);

        expect(pinB.inputName).toBe('b');
        expect(pinB.outputName).toBe('bb');
        expect(pinB.outputFrom).toBe(15);

        expect(pinOut.inputName).toBe('out');
        expect(pinOut.outputName).toBe('outout');
        expect(pinOut.outputFrom).toBe(6);
    })

    test('Code Line (bus, precise selection)', () => {
        const { chipName, parameters } = parseCodeLine('RAM512(in=inA, out=ra, address=add[3..11], load=la);');
        expect(chipName).toBe('RAM512');

        const [pinA, pinB, pinAddress, pinLoad] = parameters;
        expect(pinA.inputName).toBe('in');
        expect(pinA.outputName).toBe('inA');

        expect(pinB.inputName).toBe('out');
        expect(pinB.outputName).toBe('ra');

        expect(pinAddress.inputName).toBe('address');
        expect(pinAddress.outputName).toBe('add');
        expect(pinAddress.outputFrom).toBe(3);
        expect(pinAddress.outputTo).toBe(11);

        expect(pinLoad.inputName).toBe('load');
        expect(pinLoad.outputName).toBe('la');
    })

    test('Code File - And16', () => {
        const data = nand2tetrisFileLoader('01', 'And16.hdl');
        const hdlFile = parseHdlFile(data);
        expect(hdlFile.name).toBe('And16');

        expect(hdlFile.inputSpec.pinsAndBuses).toHaveLength(2);
        const [pinA, pinB] = hdlFile.inputSpec.pinsAndBuses;
        expect(pinA.name).toBe('a');
        expect(pinA.width).toBe(16);
        expect(pinB.name).toBe('b');
        expect(pinB.width).toBe(16);

        expect(hdlFile.outputSpec.pinsAndBuses).toHaveLength(1);
        const [pinOut] = hdlFile.outputSpec.pinsAndBuses;
        expect(pinOut.name).toBe('out');
        expect(pinOut.width).toBe(16);
    });

    test('Code File - Or', () => {
        const data = nand2tetrisFileLoader('01', 'Or.hdl');
        const hdlFile = parseHdlFile(data);
        expect(hdlFile.name).toBe('Or');

        expect(hdlFile.inputSpec.pinsAndBuses).toHaveLength(2);
        const [pinA, pinB] = hdlFile.inputSpec.pinsAndBuses;
        expect(pinA.name).toBe('a');
        expect(pinB.name).toBe('b');

        expect(hdlFile.outputSpec.pinsAndBuses).toHaveLength(1);
        const [pinOut] = hdlFile.outputSpec.pinsAndBuses;
        expect(pinOut.name).toBe('out');

        expect(hdlFile.codeLines.length).toBe(3);

        expect(hdlFile.codeLines[0].chipName).toBe('Not');
        expect(hdlFile.codeLines[0].parameters.length).toBe(2);
        expect(hdlFile.codeLines[0].parameters[0].inputName).toBe('in');
        expect(hdlFile.codeLines[0].parameters[0].outputName).toBe('a');
        expect(hdlFile.codeLines[0].parameters[1].inputName).toBe('out');
        expect(hdlFile.codeLines[0].parameters[1].outputName).toBe('notA');

        expect(hdlFile.codeLines[1].chipName).toBe('Not');
        expect(hdlFile.codeLines[1].parameters.length).toBe(2);
        expect(hdlFile.codeLines[1].parameters[0].inputName).toBe('in');
        expect(hdlFile.codeLines[1].parameters[0].outputName).toBe('b');
        expect(hdlFile.codeLines[1].parameters[1].inputName).toBe('out');
        expect(hdlFile.codeLines[1].parameters[1].outputName).toBe('notB');
    });
});