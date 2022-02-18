import {
  CpuInstruction,
  CpuInstructionType,
  ComputeComputation,
  ComputeDestination,
  ComputeJump,
} from "./types";
import { Optional, RawLineRef } from "../../types";
import stripComment from "../stripComment";
import { generateLineRef } from "../../common";

const LABEL_REGEX = /\((?<label>[_A-Za-z0-9\.]+)\)/;
const A_INSTRUCTION_DIRECT_REGEX = /^@(?<address>[0-9]+)\s*(?:\/\/(?<comment>.*)){0,1}$/;
const A_INSTRUCTION_NAMED_REGEX = /^@(?<label>[_A-Za-z0-9._]+)\s*(?:\/\/(?<comment>.*)){0,1}$/;

// https://stackoverflow.com/questions/3446170/escape-string-for-use-in-javascript-regex
function escapeRegExp(input: string) {
  return input.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
}

const createRegExpOptions = (o: object): string =>
  Object.values(o)
    .map((s) => escapeRegExp(s))
    .join("|");
const DEST_OPTS = createRegExpOptions(ComputeDestination);
const COMP_OPTS = createRegExpOptions(ComputeComputation);
const JUMP_OPTS = createRegExpOptions(ComputeJump);

const C_INSTRUCTION_REGEX = new RegExp(
  `^(?:(?:(?<destination>${DEST_OPTS})=)|=){0,1}(?<computation>${COMP_OPTS})(?:;(?<jump>${JUMP_OPTS})){0,1}\\s*(?:\/\/(?<comment>.*)){0,1}$`
);

const parseHackAsm = (
  rawLineRef: RawLineRef
): Optional<CpuInstruction> => {
  const ref = generateLineRef(rawLineRef);

  // strip comment
  const input = stripComment(ref.originalLine);

  // Blank lines...
  if (input.length === 0) return;

  // Is this a label?
  const label = input.match(LABEL_REGEX);
  if (label !== null) {
    return {
      ref,
      type: CpuInstructionType.label,
      label: label.groups.label,
    };
  }

  // Is this an address instruction with direct value?
  const aDirect = input.match(A_INSTRUCTION_DIRECT_REGEX);
  if (aDirect !== null) {
    return {
      ref,
      type: CpuInstructionType.directAddress,
      address: parseInt(aDirect.groups.address, 10),
    };
  }

  // Is this an address instruction with named value?
  const aNamed = input.match(A_INSTRUCTION_NAMED_REGEX);
  if (aNamed !== null) {
    return {
      ref,
      type: CpuInstructionType.namedAddress,
      label: aNamed.groups.label,
    };
  }

  // Is this a computation?
  const compute = input.match(C_INSTRUCTION_REGEX);
  if (compute !== null) {
    return {
      ref,
      type: CpuInstructionType.compute,
      destination: compute.groups.destination as ComputeDestination,
      computation: compute.groups.computation as ComputeComputation,
      jump: compute.groups.jump as ComputeJump,
    };
  }

  throw new Error(`Invalid Hack ASM Line: ${input}`);
};

export default parseHackAsm;