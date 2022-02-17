import { vanillaFileLoader, getNand2TetrisBaseDir } from "../TestScripts/nand2tetris/nand2tetrisFileLoader";
import HackCpuTestRunner from "./HackCpuTestRunner";

describe("Hack CPU Test Script Runner", () => {
  test("Multiplication", () => {
    const testScriptRaw = vanillaFileLoader(getNand2TetrisBaseDir("04/mult/"), "Mult.tst");

    const runner = new HackCpuTestRunner(getNand2TetrisBaseDir(`/04/mult/`), vanillaFileLoader);
    runner.loadScript(testScriptRaw);

    runner.runToEnd();
  });
});
