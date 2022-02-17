import { booleanToBinArray, numberToBinary } from "../../dataRepresentation/numberBases/simpleBinary";
import { ComputeComputation, ComputeDestination, ComputeJump, CpuInstruction, CpuInstructionType } from "./types";

const assemble = (input: CpuInstruction): string => {
    switch (input.type) {
        case CpuInstructionType.directAddress:
            return `0${booleanToBinArray(numberToBinary(input.address, 15))}`;
        case CpuInstructionType.compute:
            let a: string = '0';
            let comp: string = '0000000';
            let dest: string = '000';
            let jump: string = '000';

            switch (input.computation) {
                case ComputeComputation.ZERO: a = '0'; comp = '101010'; break;
                case ComputeComputation.ONE: a = '0'; comp = '111111'; break;
                case ComputeComputation.NEGATIVE_ONE: a = '0'; comp = '111010'; break;
                case ComputeComputation.D: a = '0'; comp = '001100'; break;
                case ComputeComputation.A: a = '0'; comp = '110000'; break;
                case ComputeComputation.NOT_D: a = '0'; comp = '001101'; break;
                case ComputeComputation.NOT_A: a = '0'; comp = '110001'; break;
                case ComputeComputation.NEGATIVE_D: a = '0'; comp = '001111'; break;
                case ComputeComputation.NEGATIVE_A: a = '0'; comp = '110011'; break;
                case ComputeComputation.D_PLUS_ONE: a = '0'; comp = '011111'; break;
                case ComputeComputation.A_PLUS_ONE: a = '0'; comp = '110111'; break;
                case ComputeComputation.D_MINUS_ONE: a = '0'; comp = '001110'; break;
                case ComputeComputation.A_MINUS_ONE: a = '0'; comp = '110010'; break;
                case ComputeComputation.D_PLUS_A: a = '0'; comp = '000010'; break;
                case ComputeComputation.D_MINUS_A: a = '0'; comp = '010011'; break;
                case ComputeComputation.A_MINUS_D: a = '0'; comp = '000111'; break;
                case ComputeComputation.D_AND_A: a = '0'; comp = '000000'; break;
                case ComputeComputation.D_OR_A: a = '0'; comp = '010101'; break;
                case ComputeComputation.M: a = '1'; comp = '110000'; break;
                case ComputeComputation.NOT_M: a = '1'; comp = '110001'; break;
                case ComputeComputation.M_PLUS_ONE: a = '1'; comp = '110111'; break;
                case ComputeComputation.M_MINUS_ONE: a = '1'; comp = '110010'; break;
                case ComputeComputation.D_PLUS_M: a = '1'; comp = '000010'; break;
                case ComputeComputation.D_MINUS_M: a = '1'; comp = '010011'; break;
                case ComputeComputation.M_MINUS_D: a = '1'; comp = '000111'; break;
                case ComputeComputation.D_AND_M: a = '1'; comp = '000000'; break;
                case ComputeComputation.D_OR_M: a = '1'; comp = '010101'; break;
            }

            switch (input.destination) {
                case ComputeDestination.M: dest = '001'; break;
                case ComputeDestination.D: dest = '010'; break;
                case ComputeDestination.MD: dest = '011'; break;
                case ComputeDestination.A: dest = '100'; break;
                case ComputeDestination.AM: dest = '101'; break;
                case ComputeDestination.AD: dest = '110'; break;
                case ComputeDestination.AMD: dest = '111'; break;
            }

            switch (input.jump) {
                case ComputeJump.JGT: jump = '001'; break;
                case ComputeJump.JEQ: jump = '010'; break;
                case ComputeJump.JGE: jump = '011'; break;
                case ComputeJump.JLT: jump = '100'; break;
                case ComputeJump.JNE: jump = '101'; break;
                case ComputeJump.JLE: jump = '110'; break;
                case ComputeJump.JMP: jump = '111'; break;
            }

            return `111${a}${comp}${dest}${jump}`;
        case CpuInstructionType.namedAddress:
            throw new Error('Named Address commands need to be translated to direct before use')
        case CpuInstructionType.label:
            throw new Error('Label command need to be used to determine addresses then discarded')
    }
}

export default assemble;