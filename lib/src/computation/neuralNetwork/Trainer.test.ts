import { signActivationFn } from "./activationFunctions";
import Perceptron from "./Perceptron";
import Trainer from "./Trainer";
import { coordinateTester } from "./trainingTests";

describe("Neural Network", () => {
    describe("Perceptron Trainer", () => {
        test("Simple Coordinates", () => {
            const INPUT_SIZE = 3;
            const coordinateGenerator = coordinateTester(400, 400, 2, -10);
            const perceptron = new Perceptron(INPUT_SIZE, signActivationFn);
            const trainer = new Trainer(INPUT_SIZE, coordinateGenerator);

            trainer.train(perceptron, 1000);
        })
    })
});