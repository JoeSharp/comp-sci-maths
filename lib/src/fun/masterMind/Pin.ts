
export enum Pin {
    correct,
    incorrectPlace,
    incorrect
}

export type CountByPin = {
    [t in Pin]: number
}