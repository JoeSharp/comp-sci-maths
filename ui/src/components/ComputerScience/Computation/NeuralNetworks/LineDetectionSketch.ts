import { AbstractSketch } from "../../../p5/useSketch";
import Perceptron from '@comp-sci-maths/lib/dist/computation/neuralNetwork/Perceptron';
import { coordinateTester } from '@comp-sci-maths/lib/dist/computation/neuralNetwork/trainingTests';
import { signActivationFn } from '@comp-sci-maths/lib/dist/computation/neuralNetwork/activationFunctions';
import p5 from "p5";
import TrainingTest, { TrainingTestGenerator } from "@comp-sci-maths/lib/dist/computation/neuralNetwork/TrainingTest";
import { Queue } from "@comp-sci-maths/lib/dist";

const WIDTH = 600;
const HEIGHT = 600;
const BLOB_RADIUS = 5;
const TRAINING_HISTORY_SIZE = 100;

const LINE_M = 2;
const LINE_C = -10;
const INPUT_SIZE = 3;
const BIAS = 1;

export interface Config {
    lineM: number;
    lineC: number;
    showTraining: boolean;
}

const getDefaultConfig = (): Config => ({
    lineM: LINE_M,
    lineC: LINE_C,
    showTraining: true
});

export class LineDetectionSketch extends AbstractSketch<Config> {
    perceptron: Perceptron;
    testGenerator: TrainingTestGenerator;

    constructor() {
        super(getDefaultConfig());

        this.testGenerator = coordinateTester(WIDTH, HEIGHT, this.config.lineM, this.config.lineC);
        this.perceptron = new Perceptron(INPUT_SIZE, signActivationFn);
    }

    setConfig(config: Config) {
        super.setConfig(config);
        this.testGenerator = coordinateTester(WIDTH, HEIGHT, this.config.lineM, this.config.lineC);
    }

    sketch(s: p5) {
        const that = this;
        let points: p5.Vector[];
        const testQueue: Queue<TrainingTest> = new Queue<TrainingTest>();

        s.setup = function () {
            s.createCanvas(WIDTH, HEIGHT);
            s.colorMode(s.HSB, 255);
            s.textFont("Helvetica", 18);

            points = Array(100).fill(null).map(() => that.testGenerator()).map(({ inputs: [x, y] }) => s.createVector(x, y));
        };

        s.draw = function () {
            s.background(220);

            const lineFrom = s.createVector(0, that.config.lineC);
            const lineTo = s.createVector(s.width, s.width * that.config.lineM + that.config.lineC);

            const trainingData = that.testGenerator();
            that.perceptron.train(trainingData);

            testQueue.push(trainingData);
            while (testQueue.size() > TRAINING_HISTORY_SIZE) {
                testQueue.pop();
            }

            s.stroke('black');
            s.strokeWeight(1);
            s.line(lineFrom.x, lineFrom.y, lineTo.x, lineTo.y);

            s.strokeWeight(BLOB_RADIUS);
            points.forEach(({ x, y }) => {
                const actual = that.perceptron.feedForward([x, y, BIAS]);
                s.stroke(actual > 0 ? 'blue' : 'red');
                s.point(x, y);
            });

            if (that.config.showTraining) {
                s.stroke('green');
                for (const i of testQueue.items) {
                    const { inputs: [x, y] } = i;
                    s.point(x, y)
                }
            }
        }
    }

}
export default LineDetectionSketch;