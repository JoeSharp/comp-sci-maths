import p5 from "p5";
import PianoKey from "./PianoKey";
import { Drawable } from "./types";



class Piano implements Drawable {
    keys: PianoKey[];

    constructor() {
        this.keys = [];

        this.keys.push(new PianoKey('C', 0));
        this.keys.push(new PianoKey('C#/Db', 1));
        this.keys.push(new PianoKey('D', 2));
        this.keys.push(new PianoKey('D#/Eb', 2));
        this.keys.push(new PianoKey('E', 3));
        this.keys.push(new PianoKey('F', 4));
        this.keys.push(new PianoKey('F#/Gb', 5));
        this.keys.push(new PianoKey('G', 6));
        this.keys.push(new PianoKey('G#/Ab', 7));
        this.keys.push(new PianoKey('A', 8));
        this.keys.push(new PianoKey('A#/Bb', 9));
        this.keys.push(new PianoKey('B', 10));
    }

    update(s: p5) {

    }

    draw(s: p5) {

    }
}

export default Piano;