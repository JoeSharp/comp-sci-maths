import NandTestRunner from "./NandTestRunner";
import { getNand2TetrisBaseDir, vanillaFileLoader } from "../../TestScripts/nand2tetris/nand2tetrisFileLoader";
import Chip from "../Chip";
import And from "../Logic/And";
import Or from "../Logic/Or";
import Xor from "../Logic/Xor";
import Not from "../Logic/Not";
import { Producer } from "../../../types";

interface ChipTest {
  testFile: string;
  directory: string;
  chipProducer: Producer<Chip>;
}

const TEST_CASES: ChipTest[] = [
  {
    testFile: "And.tst",
    directory: getNand2TetrisBaseDir("01"),
    chipProducer: () => new And(),
  },
  {
    testFile: "Or.tst",
    directory: getNand2TetrisBaseDir("01"),
    chipProducer: () => new Or(),
  },
  {
    testFile: "Xor.tst",
    directory: getNand2TetrisBaseDir("01"),
    chipProducer: () => new Xor(),
  },
  {
    testFile: "Not.tst",
    directory: getNand2TetrisBaseDir("01"),
    chipProducer: () => new Not(),
  },
];

describe("NAND Test Runner", () => {
  TEST_CASES.forEach(({ testFile, directory, chipProducer }) => {
    test(`Test Script - ${testFile}`, () => {
      const testScriptRaw = vanillaFileLoader(directory, testFile);
      const chip = chipProducer();
      const runner = new NandTestRunner(chip, directory, vanillaFileLoader);
      runner.loadScript(testScriptRaw);
      runner.runToEnd();
    });
  });
});
