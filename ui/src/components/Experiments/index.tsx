import React from "react";

import Asteroids from "./Asteroids";
import Dobble from "./Dobble";
import LogicPadlock from "./LogicPadlock";
import MidiFun from "./MidiFun";
import { Page } from "../../types";
import P5SketchLibrary from "../p5/P5SketchLibrary";
import CardCollection from "../Bootstrap/CardCollection";

const experimentPages: Page[] = [
  {
    component: Asteroids,
    href: "/experiments/asteroids",
    description: "A demonstration of simple game development for year 7",
    title: "Asteroids",
  },
  {
    component: Dobble,
    href: "/experiments/dobble",
    description: "Derive a card set for Dobble",
    title: "Dobble",
  },
  {
    component: LogicPadlock,
    href: "/experiments/logicPadlock",
    description:
      "Logic puzzle involving a series of rules that can be used to determine the secret combination",
    title: "Logic Padlock",
  },
  {
    component: MidiFun,
    href: "/experiments/midiFun",
    description: "A digital piano (Chrome only...I think)",
    title: "MIDI",
  },
  {
    component: P5SketchLibrary,
    href: "/experiments/sketches",
    description: "A series of random sketches in p5.js",
    title: "P5 Sketches",
  },
] as Page[];

const Experiments: React.FunctionComponent = () => (
  <CardCollection cards={experimentPages} />
);

export const page: Page = {
  href: "/experiments",
  title: "Experiments",
  description: "Random projects of my own",
  component: Experiments,
};
export const pages: Page[] = [page, ...experimentPages];
