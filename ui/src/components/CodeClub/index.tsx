import React from "react";

import TopDownCar from "./TopDownCar";
import MovingWithKeyboard from "./MovingWithKeyboard";
import UsingClasses from "./UsingClasses";
import SafeCracker from "./SafeCracker";
import { Page } from "../../types";
import CardCollection from "../Bootstrap/CardCollection";

const gameSeries: Page[] = [
  {
    href: "/codeClub/movingWithKeyboard",
    title: "Session 1 - Moving With Keyboard",
    description:
      "Learn how to intercept keyboard events and use them to move an object around the screen",
    component: MovingWithKeyboard,
  },
  {
    href: "/codeClub/topDownCar",
    title: "Session 2 - Top Down Car",
    component: TopDownCar,
    description:
      "Learn how to use keyboard events to build a top down driving control scheme",
  },
  {
    href: "/codeClub/usingClasses",
    title: "Session 3 - Using Classes",
    component: UsingClasses,
    description:
      "Learn how to use Object Oriented Programming to encapsulate game objects.",
  },
];
const miscPages: Page[] = [
  {
    href: "/codeClub/safeCracker",
    title: "Session 99 - Safe Cracker",
    component: SafeCracker,
    description: "Learn how to write a program to brute force a digital safe",
  },
];

const CodeClub: React.FunctionComponent = () => (
  <div>
    <h2>Game Series</h2>
    <CardCollection cards={gameSeries} />

    <h2>Miscellaneous</h2>
    <CardCollection cards={miscPages} />
  </div>
);

export const page: Page = {
  href: "/codeClub",
  title: "Code Club",
  description: "Some projects to teach coding to KS3",
  component: CodeClub,
};

export const pages: Page[] = [page, ...gameSeries, ...miscPages];
