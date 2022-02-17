import React from "react";
import p5 from "p5";

import Tetronimo from "./Drawables/Tetronimo";
import Triforce from "./Drawables/Triforce";
import { NoteBoid } from "./Drawables/types";
import Piano from "./Drawables/Piano";
import { PlayNoteFn } from "./types";

const NOTE_MIN = 21;
const NOTE_MAX = 108;
const NUMBER_NOTES = NOTE_MAX - NOTE_MIN;

const TETRIS_MODE = 0;
const ZELDA_MODE = 1;

interface Note {
  note: number;
  velocity: number;
  noteIsDown: boolean;
}

export class SketchContainer {
  blockWidth: number = 0;
  pendingNotes: Note[] = [];
  drawables: NoteBoid[] = [];
  width: number = 0;
  mode: number = TETRIS_MODE;
  piano: Piano = new Piano();
  playNote: PlayNoteFn;

  constructor() {
    this.playNote = () => { };
  }

  setWidth(w: number) {
    this.width = w;
  }

  noteOn(note: number, velocity: number) {
    this.pendingNotes.push({ note, velocity, noteIsDown: true });

    switch (note) {
      case 21:
        this.mode = TETRIS_MODE;
        break;
      case 22:
        this.mode = ZELDA_MODE;
        break;
    }
  }

  noteOff(note: number) {
    this.drawables
      .filter((t) => t.note === note)
      .forEach((t) => (t.noteIsDown = false));
    this.pendingNotes
      .filter((p) => p.note === note)
      .forEach((p) => (p.noteIsDown = false));
  }

  sketch(s: p5) {
    const that = this;

    s.setup = function () {
      s.createCanvas(that.width, 600);
      s.frameRate(15);
      s.colorMode(s.HSB, s.width);
      that.blockWidth = Math.round(s.width / NUMBER_NOTES);
    };

    s.keyPressed = function () {
      switch (s.keyCode) {
        case 37: // Left Arrow
          that.mode = TETRIS_MODE;
          break;
        case 39: // Right Arrow
          that.mode = ZELDA_MODE;
          break;
        default:
          let note = s.keyCode;
          that.noteOn(note, 50);
          break;
      }
    };

    s.keyReleased = function () {
      let note = s.keyCode;
      that.noteOff(note);
      return false; // prevent any default behavior
    }

    s.draw = function () {
      switch (that.mode) {
        case TETRIS_MODE:
          s.background("darkblue");
          break;
        case ZELDA_MODE:
          s.background("darkgreen");
          break;
      }

      that.pendingNotes.forEach(({ note, velocity, noteIsDown }) => {
        let x = (note - NOTE_MIN) * that.blockWidth;
        let y = 0;
        let colour = s.color(x, s.width, s.width);
        let newDrawable: NoteBoid | undefined = undefined;
        switch (that.mode) {
          case TETRIS_MODE:
            newDrawable = new Tetronimo(
              note,
              velocity,
              s.createVector(x, y),
              that.blockWidth,
              colour,
              noteIsDown
            );
            break;
          case ZELDA_MODE:
            newDrawable = new Triforce(
              note,
              velocity,
              s.createVector(x, y),
              that.blockWidth,
              colour,
              noteIsDown
            );
        }

        if (!!newDrawable) {
          that.drawables.unshift(newDrawable);
        }
      });
      that.pendingNotes = [];

      that.piano.update(s);
      that.drawables.forEach((t) => t.update(s));

      that.piano.draw(s);
      that.drawables.forEach((t) => t.draw(s));

      // Filter out any tetronimos that have fallen off the bottom of the screen
      that.drawables = that.drawables.filter((t) => t.position.y < s.height);
    };
  }
}

interface UseMidiSketch {
  sketchContainer: SketchContainer;
  noteOn: (note: number, velocity: number) => void;
  noteOff: (note: number) => void;
}

export function useMidiSketch(): UseMidiSketch {
  const sketchContainer = React.useMemo(() => new SketchContainer(), []);

  return {
    sketchContainer,
    noteOn: sketchContainer.noteOn.bind(sketchContainer),
    noteOff: sketchContainer.noteOff.bind(sketchContainer),
  };
}
