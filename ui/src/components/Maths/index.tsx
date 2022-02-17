import React from "react";
import { Page } from "../../types";

import { page as divisibilityPage } from "./Divisibility";
import { page as primeFactorsPage } from "./PrimeFactors";
import { page as negativeNumbersPage } from "./NegativeNumbers";
import { page as bearings } from "./Bearings";
import { page as algebra } from "./Algebra";
import { page as sievePage } from "./SieveOfEratosthenes";
import { page as solveEqPage } from "./SolveEquation";
import { page as sudokuPage } from "./Sudoku";
import CardCollection from "../Bootstrap/CardCollection";

const primeNumberPages = [divisibilityPage, primeFactorsPage, sievePage];
const miscPages = [
  solveEqPage,
  algebra,
  negativeNumbersPage,
  bearings,
  sudokuPage,
];

const Maths: React.FunctionComponent = () => (
  <div>
    <h2>Prime Numbers</h2>
    <CardCollection cards={primeNumberPages} />

    <h2>Miscellaneous</h2>
    <CardCollection cards={miscPages} />
  </div>
);

export const page: Page = {
  href: "/maths",
  title: "Maths",
  description: "Explore some KS3 Maths algorithms",
  component: Maths,
};

export const pages: Page[] = [page, ...primeNumberPages, ...miscPages];

export default Maths;
