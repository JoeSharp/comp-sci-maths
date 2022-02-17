import BigOMeasure from "./BigONotation";
import BigOCompare from "./CompareBigO";
import { Page } from "../../../../types";

export const page1: Page = {
  href: "/computerScience/algorithms/measureBigO",
  title: "Big-O Notation - Measure",
  description:
    "Measure and visualise performance of algorithms by counting their key operations with respect to input size",
  component: BigOMeasure,
};

export const page2: Page = {
  href: "/computerScience/algorithms/compareBigO",
  title: "Big-O Notation - Compare",
  description: "Compare the known Big-O Notations visually",
  component: BigOCompare,
};

export default BigOCompare;
