import ActivationFunction from "./ActivationFunction";

export const signActivationFn: ActivationFunction = (a: number) => a > 0 ? +1 : -1;