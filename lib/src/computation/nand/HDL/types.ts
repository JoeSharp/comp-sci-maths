export interface HdlParameter {
    inputName: string;
    outputName: string;
    outputFrom: number;
    outputTo: number;
}

export type DIRECTION = "IN" | "OUT";

export interface HdlPinOrBus {
    name: string;
    width: number;
}

export interface HdlIOLine {
    direction: DIRECTION,
    pinsAndBuses: HdlPinOrBus[];
}

export interface HdlCodeLine {
    chipName: string;
    parameters: HdlParameter[]
}

export const parameterToString = ({inputName, outputName}: HdlParameter): string => `${inputName}=${outputName}`
export const codeLineToString = ({chipName, parameters}: HdlCodeLine): string => `${chipName}: ${parameters.map(p => parameterToString(p)).join(', ')}`

export interface HdlChip {
    name: string;
    inputSpec: HdlIOLine;
    outputSpec: HdlIOLine;
    codeLines: HdlCodeLine[];
}