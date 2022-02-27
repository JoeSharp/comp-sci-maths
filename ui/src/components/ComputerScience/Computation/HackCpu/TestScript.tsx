import { HackCpuTestRunner } from "@comp-sci-maths/lib/dist";
import React from "react";
import Button from "../../../Bootstrap/Buttons/Button";
import Tabs, { Tab, useTabs } from "../../../Bootstrap/Tabs/Tabs";
import ProgramPickerDialog, {
  useDialog as useProgramPicker,
} from "../ProgramManager/ProgramPickerDialog";
import TestScriptTable from "./TestScriptTable";
import TestScriptOutput from "./TestScriptOutput";
import { LoadProgram } from "./types";

interface Props {
  cpuTestRunner: HackCpuTestRunner;
  loadScript: LoadProgram;
}

const TestScript: React.FunctionComponent<Props> = ({
  cpuTestRunner,
  loadScript,
}) => {
  const loadTestScript = React.useCallback(
    (programName, program) => {
      loadScript(programName, program);
    },
    [loadScript]
  );

  const {
    showDialog: showProgramPicker,
    componentProps: programPickerProps,
  } = useProgramPicker(loadTestScript);

  const { testScript, lastInstruction, testOutput, compareTo } = cpuTestRunner;

  const tabs: Tab[] = React.useMemo(
    () => [
      {
        title: "Script",
        content: (
          <TestScriptTable
            lastInstruction={lastInstruction}
            testScript={testScript}
          />
        ),
      },
      {
        title: "Compare",
        content: <TestScriptOutput scriptOutput={compareTo || []} />,
      },
      {
        title: "Output",
        content: <TestScriptOutput scriptOutput={testOutput || []} />,
      },
    ],
    [compareTo, testOutput, lastInstruction, testScript]
  );
  const tabsProps = useTabs(tabs);

  return (
    <div>
      <ProgramPickerDialog {...programPickerProps} />
      <h4>
        Test Script
        <Button
          className="title-button"
          text="Load"
          onClick={showProgramPicker}
          styleType="primary"
        />
      </h4>
      <Tabs {...tabsProps} />
    </div>
  );
};

export default TestScript;
