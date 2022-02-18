import { boolToBin } from "../../dataRepresentation/numberBases/simpleBinary";
import { Optional } from "../../types";
import stripComment from "../stripComment";
import { TestOutputFragment } from "./types";

const LOAD_REGEX = /^(?:load)\s(?<load>.+)(?:,|;)$/;
const OUTPUT_FILE_REGEX = /^(?:output\-file)\s(?<outputFile>.+)(?:,|;)$/;
const COMPARE_TO_REGEX = /^(?:compare\-to)\s(?<compareTo>.+)(?:,|;)$/;

const OUTPUT_RAM_FRAGMENT_REGEX = /^(?:RAM\[)(?<address>[0-9]+)(?:\]\%(?<format>[A-Z]))(?<spacing>(?:[0-9]\.)*(?:[0-9]+))$/;
const OUTPUT_VAR_FRAGMENT_REGEX = /^(?<variable>[^\%\%\[\]]+)\%(?<format>[A-Z])(?<spacing>(?:[0-9]\.)*(?:[0-9]+))$/;
const OUTPUT_REGEX = /^\s*(output;)$/;

export interface NamedRegExps {
  load: RegExp;
  outputFile: RegExp;
  compareTo: RegExp;
}

const REQUIRED_FILE_REGEXES: NamedRegExps = {
  load: LOAD_REGEX,
  outputFile: OUTPUT_FILE_REGEX,
  compareTo: COMPARE_TO_REGEX,
};

export const parseRequiredFile = (
  rawInput: string,
  name: keyof NamedRegExps
): Optional<string> => {
  const input = stripComment(rawInput);

  const match = input.match(REQUIRED_FILE_REGEXES[name]);
  if (!!match) {
    return match.groups[name];
  }
};

const OUTPUT_LIST_START = 'output-list ';
const CODE_LINE_END = ';';

interface OutputFormatParsed {
  isValidOutput: boolean;
  stillCollecting: boolean;
}

export const isStartOfOutput = (rawInput: string) => stripComment(rawInput).startsWith(OUTPUT_LIST_START);

export const parseOutputFormat = (
  rawInput: string,
  startedCollectingOutput: boolean,
  results: TestOutputFragment[]
): OutputFormatParsed => {
  const input = stripComment(rawInput);

  const isValidOutput = startedCollectingOutput || input.startsWith(OUTPUT_LIST_START);
  const stillCollecting = !input.endsWith(CODE_LINE_END);
  if (isValidOutput) {

    const parts = input.replace(OUTPUT_LIST_START, '')
      .replace(CODE_LINE_END, '')
      .split(' ')
      .map(t => t.trim());

    parts
      .map((p) => p.match(OUTPUT_RAM_FRAGMENT_REGEX))
      .filter((m) => m !== null)
      .map((m) => ({
        heading: `RAM[${m.groups.address}]`,
        address: parseInt(m.groups.address, 10),
        format: m.groups.format,
        spacing: m.groups.spacing.split(".").map((s) => parseInt(s, 10)),
      }))
      .forEach((of) => results.push(of));
    parts
      .map((p) => p.match(OUTPUT_VAR_FRAGMENT_REGEX))
      .filter((m) => m !== null)
      .map((m) => ({
        heading: m.groups.variable,
        variable: m.groups.variable,
        format: m.groups.format,
        spacing: m.groups.spacing.split(".").map((s) => parseInt(s, 10)),
      }))
      .forEach((of) => results.push(of));
  }

  return {
    isValidOutput,
    stillCollecting
  };
};

export const parseOutputInstruction = (input: string): boolean =>
  stripComment(input).match(OUTPUT_REGEX) !== null;

export const spacePad = (value: string, width: number) => {
  while (value.length < width) {
    value = ` ${value}`;
  }
  return value;
};

interface RadixByCode {
  [code: string]: number;
}

const RADIX_BY_CODE: RadixByCode = {
  D: 10,
};

export const formatString = (value: string, spacing: number[]): string => {
  if (spacing.length === 3) {
    return `${spacePad("", spacing[0])}${spacePad(value, spacing[1])}${spacePad(
      "",
      spacing[2]
    )}`;
  }

  // Not sure, just dump out the value
  return value.toString();
};

export const formatNumber = (
  value: number,
  format: string,
  spacing: number[]
): string => formatString(value.toString(RADIX_BY_CODE[format]), spacing);

export const formatBoolean = (
  value: boolean,
  format: string,
  spacing: number[]
): string => formatString(boolToBin(value), spacing);
