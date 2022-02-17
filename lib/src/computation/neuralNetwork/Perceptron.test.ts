import { signActivationFn } from "./activationFunctions";
import Perceptron from "./Perceptron"

describe("Neural Network", () => {

    describe("Perceptron", () => {
        test("Simple Calculation Ability", () => {
            const p = new Perceptron(3, signActivationFn);
            const result = p.feedForward([7, 9, 1]);
            expect(result).not.toBeNaN();
        })

        test("Mis Match in Input Size", () => {
            const p = new Perceptron(3, signActivationFn);
            expect(() => p.feedForward([8, 9, 1, 4])).toThrowError();
        })
    })
})