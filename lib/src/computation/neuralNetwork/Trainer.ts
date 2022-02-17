import Perceptron from "./Perceptron";
import TrainingTest, { TrainingTestGenerator } from "./TrainingTest";

class Trainer {
    inputSize: number;
    testData: TrainingTest[];
    generator: TrainingTestGenerator;

    constructor(inputSize: number, generator: TrainingTestGenerator) {
        this.inputSize = inputSize;
        this.generator = generator;
    }

    train(perceptron: Perceptron, iterations: number) {
        for (let i = 0; i < iterations; i++) {
            const test = this.generator();
            perceptron.train(test);
        }
    }
}

export default Trainer;