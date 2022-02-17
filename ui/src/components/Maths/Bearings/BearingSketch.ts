import p5 from 'p5';
import { AbstractSketch } from '../../p5/useSketch';

export interface Bearing {
    distance: number;
    bearing: number;
}

export interface BearingSketchConfig {
    bearings: Bearing[];
}

const getDefaultConfig = (): BearingSketchConfig => ({ bearings: [] })

const WIDTH = 500;
const HEIGHT = 500;

class BearingSketch extends AbstractSketch<BearingSketchConfig> {

    constructor() {
        super(getDefaultConfig());

    }

    sketch(s: p5) {
        const that = this;
        let screenCentre: p5.Vector;

        s.setup = function () {
            s.createCanvas(WIDTH, HEIGHT);
            s.colorMode(s.HSB, 255);
            s.textAlign(s.CENTER, s.CENTER);
            s.angleMode(s.DEGREES);
            screenCentre = s.createVector(s.width / 2, s.height / 2);
        };

        s.draw = function () {
            s.background(230);

            const {
                bearings
            } = that.config;

            s.strokeWeight(4);
            let current = screenCentre.copy();
            s.point(current.x, current.y);

            bearings.map(({ bearing, distance }) => s.createVector(0, -1) // point north
                .mult(distance)
                .rotate(bearing)
            ).forEach(vector => {
                let next = p5.Vector.add(current, vector);
                s.line(current.x, current.y, next.x, next.y);
                current = next;
            });
        }
    }
}

export default BearingSketch;