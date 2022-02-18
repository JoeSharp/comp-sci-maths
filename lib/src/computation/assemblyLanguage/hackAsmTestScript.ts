import {
  CpuTestInstruction,
  CpuTestInstructionType,
  CpuTestOutputInstruction,
  CpuTestRepeat,
  CpuTestScript,
  CpuTestSetNamedRegister,
  CpuTestSetOutput,
  CpuTestSetNamedRegisterAtIndex,
  CpuTestTickTockInstruction,
  CpuTestVmStepInstruction
} from "../TestScripts/types";
import { Optional } from "../../types";
import Stack from "../../dataStructures/stack/Stack";
import { TestOutputFragment } from "../TestScripts/types";
import { isStartOfOutput, parseOutputFormat, parseOutputInstruction, parseRequiredFile } from "../TestScripts/parseTestScripts";
import stripComment from "../stripComment";

const SET_NAMED_REGISTER_AT_INDEX_REGEX = /^(set\s(?<namedRegister>[A-Za-z]+)\[)(?<index>[0-9]+)+(\]\s)(?<value>\-{0,1}[0-9]+)(,|;)\s*(?:\/\/(?<comment>.*)){0,1}$/;
const SET_NAMED_REGISTER_REGEX = /^(set\s(?<namedRegister>[A-Za-z]+)\s)(?<value>[0-9]+)(,|;)\s*(?:\/\/(?<comment>.*)){0,1}$/;
const TICKTOCK_REGEX = /^\s*(ticktock;)$/;
const VMSTEP_REGEX = /^\s*(vmstep;)$/;
const REPEAT_START_REGEX = /^\s*(?:repeat)\s*(?<count>[0-9]+)\s*(?:\{)\s*(?:\/\/(?<comment>.*)){0,1}$/;
const REPEAT_END_REGEX = /^\s*(\})\s*$/;
const LOAD_ALL_REGEX = /^\s*(load)[;,]{0,1}\s*$/

export const parseSetNamedRegisterAtIndex = (
  input: string,
  lineNumber: number
): Optional<CpuTestSetNamedRegisterAtIndex> => {
  const match = input.match(SET_NAMED_REGISTER_AT_INDEX_REGEX);
  if (!!match) {
    return {
      type: CpuTestInstructionType.setNamedRegisterIndex,
      lineContent: input,
      lineNumber,
      registerName: match.groups.namedRegister,
      index: parseInt(match.groups.index, 10),
      value: parseInt(match.groups.value, 10),
    };
  }

  return;
};

export const parseSetNamedRegister = (
  input: string,
  lineNumber: number
): Optional<CpuTestSetNamedRegister> => {
  const match = input.match(SET_NAMED_REGISTER_REGEX);
  if (!!match) {
    return {
      type: CpuTestInstructionType.setNamedRegister,
      lineContent: input,
      lineNumber,
      registerName: match.groups.namedRegister,
      value: parseInt(match.groups.value, 10),
    };
  }

  return;
};

export const parseTickTockInstruction = (input: string): boolean =>
  input.match(TICKTOCK_REGEX) !== null;

export const parseVmStepInstruction = (input: string): boolean =>
  input.match(VMSTEP_REGEX) !== null;

export const parseLoadAllInstruction = (input: string): boolean =>
  input.match(LOAD_ALL_REGEX) !== null;

export const parseRepeatStart = (
  input: string,
  lineNumber: number
): Optional<CpuTestRepeat> => {
  const match = input.match(REPEAT_START_REGEX);

  if (!!match) {
    return {
      type: CpuTestInstructionType.repeat,
      lineNumber,
      lineContent: input,
      count: parseInt(match.groups.count, 10),
      instructions: [],
    };
  }

  return;
};

export const parseRepeatEnd = (input: string): boolean =>
  input.match(REPEAT_END_REGEX) !== null;

export const parseTestScript = (input: string[]): CpuTestScript => {
  let outputFile: string;
  let compareTo: string;
  let load: string;
  let loadAll: boolean;
  let outputList: TestOutputFragment[] = [];
  const testInstructions: CpuTestInstruction[] = [];

  const stackInstructions: Stack<CpuTestInstruction[]> = new Stack();
  stackInstructions.push(testInstructions);

  let stillCollectingOutput = true;
  let startedCollectingOutput = false;

  input
    .map((s, i) => ({ lineContent: stripComment(s), lineNumber: i }))
    .filter(({ lineContent }) => lineContent.length > 0) // Get rid of empty lines
    .forEach(({ lineContent, lineNumber }) => {
      // Check for load file (if not already seen)
      const checkLoad = parseRequiredFile(lineContent, "load");
      if (!!checkLoad) {
        load = checkLoad;
        return;
      }

      const checkLoadAll = parseLoadAllInstruction(lineContent);
      if (checkLoadAll) {
        loadAll = true;
        return;
      }

      // Check for output file (if not already seen)
      const checkOutputFile = parseRequiredFile(lineContent, "outputFile");
      if (!!checkOutputFile) {
        outputFile = checkOutputFile;
        return;
      }

      // Check for output file (if not already seen)
      if (!compareTo) {
        compareTo = parseRequiredFile(lineContent, "compareTo");
        if (!!compareTo) return;
      }

      // Now we are into commands
      // Repeat Start
      const repeatCommand = parseRepeatStart(lineContent, lineNumber);
      if (!!repeatCommand) {
        stackInstructions.peek().push(repeatCommand);
        stackInstructions.push(repeatCommand.instructions);
        return;
      }

      // Repeat End
      if (parseRepeatEnd(lineContent)) {
        stackInstructions.pop();
        return;
      }

      // Tick Tock
      if (parseTickTockInstruction(lineContent)) {
        const tickTock: CpuTestTickTockInstruction = {
          type: CpuTestInstructionType.ticktock,
          lineContent,
          lineNumber,
        };
        stackInstructions.peek().push(tickTock);
        return;
      }

      if (parseVmStepInstruction(lineContent)) {
        const vmstep: CpuTestVmStepInstruction = {
          type: CpuTestInstructionType.vmstep,
          lineContent,
          lineNumber
        }
        stackInstructions.peek().push(vmstep);
        return;
      }

      // Output
      if (parseOutputInstruction(lineContent)) {
        const output: CpuTestOutputInstruction = {
          type: CpuTestInstructionType.output,
          lineContent,
          lineNumber,
        };
        stackInstructions.peek().push(output);
        return;
      }

      // Check for Set RAM
      const setRam = parseSetNamedRegisterAtIndex(lineContent, lineNumber);
      if (!!setRam) {
        stackInstructions.peek().push(setRam);
        return;
      }

      // Check for Set PC
      const setPC = parseSetNamedRegister(lineContent, lineNumber);
      if (!!setPC) {
        stackInstructions.peek().push(setPC);
        return;
      }

      // Output format
      if (isStartOfOutput(lineContent)) {
        outputList = [];
      }

      if (stillCollectingOutput || isStartOfOutput(lineContent)) {
        const { isValidOutput, stillCollecting } = parseOutputFormat(lineContent, startedCollectingOutput, outputList);

        stillCollectingOutput = stillCollecting;
        if (!stillCollecting) {
          const setOutput: CpuTestSetOutput = {
            type: CpuTestInstructionType.setOutput,
            outputList,
            lineContent,
            lineNumber,
          }
          stackInstructions.peek().push(setOutput);
        }
        if (isValidOutput) {
          startedCollectingOutput = true;
          return;
        }
      }

      // Not recognised in any way...throw error
      throw new Error(
        `Invalid test script line: ${lineContent} on line ${lineNumber}`
      );
    });

  return {
    outputFile,
    compareTo,
    load,
    loadAll,
    testInstructions,
  };
};
