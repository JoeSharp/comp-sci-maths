import randomBetween from "../../maths/randomBetween";

const UNIT_RADIUS = 1.0;

class MonteCarloPi {
    totalDots: number;
    numberInsideCircle: number;

    constructor() {
        this.totalDots = 0;
        this.numberInsideCircle = 0;
    }

    iterate(numberOfTimes: number = 1): this {
        for (let i = 0; i < numberOfTimes; i++) {

            // Generate dot in circle of radius 1 about the origin
            const x = randomBetween(-UNIT_RADIUS, UNIT_RADIUS);
            const y = randomBetween(-UNIT_RADIUS, UNIT_RADIUS);

            const distanceFromOrigin = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));

            if (distanceFromOrigin <= UNIT_RADIUS) {
                this.numberInsideCircle++;
            }

            this.totalDots++;
        }

        return this; // Method chaining!
    }

    calculatePi() {
        return 4 * this.numberInsideCircle / this.totalDots;
    }
}

export default MonteCarloPi;