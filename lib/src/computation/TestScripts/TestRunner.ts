import { FileLoader, ScriptParser, TestOutputFragment, TestScript, TestSourceFile } from "./types";
import Stack from "../../dataStructures/stack/Stack";
import { Optional } from "../../types";
import { formatString } from "./parseTestScripts";
import { readdirSync } from "fs";

export default abstract class TestRunner<
  UNDER_TEST,
  TEST_INSTRUCTION,
  TEST_SCRIPT extends TestScript<TEST_INSTRUCTION>
  > {
  scriptParser: ScriptParser<TEST_SCRIPT>;
  directory: string;
  allFilesInDirectory: string[];
  fileLoader: FileLoader;
  objectUnderTest: UNDER_TEST;
  testScript: TEST_SCRIPT;
  commandStack: Stack<TEST_INSTRUCTION[]>;
  compareTo: string[];
  testOutput: string[];
  currentOutputList: TestOutputFragment[];
  lastInstruction: Optional<TEST_INSTRUCTION>;

  constructor(
    objectUnderTest: UNDER_TEST,
    directory: string,
    fileLoader: FileLoader,
    scriptParser: ScriptParser<TEST_SCRIPT>,
    sourceFileExtension: string
  ) {
    this.fileLoader = fileLoader;
    this.directory = directory;
    this.objectUnderTest = objectUnderTest;
    this.scriptParser = scriptParser;
    this.allFilesInDirectory = readdirSync(this.directory).filter(d => d.endsWith(sourceFileExtension));
  }

  reset() {
    this.testOutput = [];
    this.commandStack = new Stack();
    this.commandStack.push([...this.testScript.testInstructions]);
    this.compareTo = this.fileLoader(this.directory, this.testScript.compareTo);
    this.currentOutputList = [];
  }

  loadScript(data: string[]) {
    this.testScript = this.scriptParser(data);

    const programs: TestSourceFile[] = [];
    if (!!this.testScript.load) {
      programs.push({
        filename: this.testScript.load,
        contents: this.fileLoader(this.directory, this.testScript.load)
      })
    } else if (!!this.testScript.loadAll) {
      this.allFilesInDirectory.forEach(p => programs.push({
        filename: p,
        contents: this.fileLoader(this.directory, p)
      }));
    }

    this.loadPrograms(...programs);

    this.reset();
  }

  abstract loadPrograms(...programs: TestSourceFile[]): void;

  addToLog(log: string, check: boolean = true) {
    if (this.testOutput.length >= this.compareTo.length) {
      throw new Error(
        `Too many log lines output from test, expecting ${this.compareTo.length}`
      );
    }

    if (check) {
      // Check against compareTo
      const nextCompareLine = this.compareTo[this.testOutput.length];
      if (nextCompareLine !== log) {
        throw new Error(
          `Comparing Failure on Line ${this.testOutput.length}\n\tExpected: \'${nextCompareLine}\'\n\tReceived: \'${log}\'`
        );
      }
    }

    // Assume all is good
    this.testOutput.push(log);
  }

  step(toEnd: boolean = false) {
    while (!this.commandStack.isEmpty()) {
      while (this.commandStack.peek().length > 0) {
        const instruction = this.commandStack.peek().shift();
        this.runInstruction(instruction);
        if (!toEnd) return; // Just run one command
      }

      this.commandStack.pop();
    }
  }

  runToEnd() {
    this.step(true);
  }

  abstract runInstruction(instruction: TEST_INSTRUCTION): void;
}
