export const MAX_TABLE_ROWS = 32;

export type LoadProgram = (programName: string, program: string) => void;
export type SetRamValues = (address: number, values: number[]) => void;
