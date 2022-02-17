import { generateRandomNumber } from 'common';
import { signActivationFn } from './activationFunctions';
import { TrainingTestGenerator } from './TrainingTest';

export const coordinateTester = (width: number, height: number, m: number, c: number): TrainingTestGenerator => {

    return () => {
        const inputs = [
            generateRandomNumber(0, width),
            generateRandomNumber(0, height),
            1 // bias
        ]

        const y = m * inputs[0] + c;

        return {
            inputs,
            desired: signActivationFn(inputs[1] - y)
        }
    }
}