import {
  CpuTestInstruction,
  CpuTestInstructionType,
  CpuTestScript,
  CpuTestTickTockInstruction,
} from "@comp-sci-maths/lib/dist/computation/TestScripts/types";
import { Optional } from "@comp-sci-maths/lib/dist/types";
import React from "react";

interface Props {
  lastInstruction: Optional<CpuTestInstruction>;
  testScript: Optional<CpuTestScript>;
}

const DEFAULT_TEST_INSTRUCTION: CpuTestTickTockInstruction = {
  type: CpuTestInstructionType.ticktock,
  lineContent: "ticktock",
  lineNumber: 0,
};

const DEFAULT_TEST_SCRIPT: CpuTestScript = {
  compareTo: "",
  testInstructions: [],
  load: "",
  outputFile: "",
  loadAll: true
};

const TestScriptTable: React.FunctionComponent<Props> = ({
  lastInstruction = DEFAULT_TEST_INSTRUCTION,
  testScript = DEFAULT_TEST_SCRIPT,
}) => {
  return (
    <React.Fragment>
      <div className="form-group">
        <label>Line Number</label>
        <input
          className="form-control"
          readOnly
          value={lastInstruction.lineNumber}
        />
      </div>
      <div className="form-group">
        <table className="cpu-table code-text">
          <thead>
            <tr>
              <th>Line</th>
              <th>Instruction</th>
            </tr>
          </thead>
          <tbody>
            {((!!testScript && testScript.testInstructions) || []).map(
              ({ lineContent, lineNumber }, i) => (
                <tr
                  key={i}
                  className={
                    lastInstruction.lineNumber === lineNumber
                      ? "highlighted"
                      : ""
                  }
                >
                  <td>{lineNumber}</td>
                  <td>{lineContent}</td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>
    </React.Fragment>
  );
};

export default TestScriptTable;
