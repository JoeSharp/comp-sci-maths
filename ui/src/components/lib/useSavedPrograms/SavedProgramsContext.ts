import React from "react";

import { ProgramsById } from "./types";
import { Optional } from "comp-sci-maths-lib/dist/types";

interface UseSavedPrograms {
  names: string[];
  programs: ProgramsById;
  createNew(name: string, content?: string): Optional<string>;
  deleteProgram(name: string): void;
  saveProgram(name: string, program: string): void;
  reset: () => void;
}

export default React.createContext<UseSavedPrograms>({
  names: [],
  programs: {},
  createNew: () => {
    throw new Error("invalid context");
  },
  deleteProgram: () => {
    throw new Error("invalid context");
  },
  saveProgram: () => {
    throw new Error("invalid context");
  },
  reset: () => {
    throw new Error("invalid context");
  },
});
