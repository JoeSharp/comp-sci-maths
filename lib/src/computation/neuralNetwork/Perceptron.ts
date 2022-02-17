import { generateRandomNumber } from "common";
import ActivationFunction from "./ActivationFunction";
import TrainingTest from "./TrainingTest";

class Perceptron {
    weights: number[];
    activationFunction: ActivationFunction;
    learningConstant: number;

    constructor(size: number, activationFunction: ActivationFunction, learningConstant: number = 0.1) {
        this.weights = Array(size).fill(null).map(() => generateRandomNumber(-1, +1));
        this.activationFunction = activationFunction;
        this.learningConstant = learningConstant;
    }

    feedForward(inputs: number[]): number {
        if (inputs.length !== this.weights.length)
            throw new Error(`Input Size ${inputs.length} does not match Perceptrons Weights ${this.weights.length}`);

        return this.activationFunction(inputs.map((x, i) => x * this.weights[i]).reduce((acc, curr) => acc + curr, 0));
    }

    train({ inputs, desired }: TrainingTest): void {
        const guess = this.feedForward(inputs);
        const error: number = desired - guess;
        for (let i = 0; i < this.weights.length; i++) {
            this.weights[i] += this.learningConstant * error * inputs[i];
        }
    }
}

export default Perceptron;