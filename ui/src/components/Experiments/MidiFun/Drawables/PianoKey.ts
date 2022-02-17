import p5 from "p5";
import { Drawable } from "./types";

class PianoKey implements Drawable {
    name: string;
    note: number;
        
    constructor(name: string, note: number) {
        this.name = name;
        this.note = note;
    }

    update(s: p5) {

    }

    draw(s: p5) {

    }
}

export default PianoKey;