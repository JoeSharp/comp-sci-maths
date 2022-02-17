import React from "react";

import ROMTable from "./ROMTable";
import RAMTable from "./RAMTable";
import useHackCpuSimulator from "./useHackCpuSimulator";
import NumberBasePicker, {
  usePicker as useNumberBasePicker,
} from "./NumberBasePicker";

import StepForwardControls, {
  useStepForwardControls,
} from "../../../lib/StepForwardControls";

import "./cpuSimulator.css";
import ALUDisplay from "./ALUDisplay";
import TestScript from "./TestScript";
import useHackCpuTestRunner from "./useHackCpuTestRunner";

const HackCpuSimulator: React.FunctionComponent = () => {
  const { numberBase, componentProps } = useNumberBasePicker("form-control");

  const {
    version: cpuVersion,
    cpu,
    setRamValue,
    loadProgram,
    reset: resetCpu,
    tick: tickCpu,
  } = useHackCpuSimulator(numberBase);
  const {
    version: testRunnerVersion,
    cpuTestRunner,
    loadScript,
    tick: tickTestScript,
    reset: resetTestScript,
  } = useHackCpuTestRunner(cpu);

  const { componentProps: stepForwardCpuProps } = useStepForwardControls({
    reset: resetCpu,
    iterate: tickCpu,
  });

  const { componentProps: stepForwardTestProps } = useStepForwardControls({
    reset: resetTestScript,
    iterate: tickTestScript,
  });

  return (
    <div>
      <div className="row">
        <div className="col-md-2">
          <div className="form-group">
            <label>Test Script Controls</label>
            <StepForwardControls {...stepForwardTestProps} />
          </div>
        </div>

        <div className="col-md-2">
          <div className="form-group">
            <label>CPU Controls</label>
            <StepForwardControls {...stepForwardCpuProps} />
          </div>
        </div>

        <div className="col-md-2">
          <div className="form-group">
            <label>Number Base</label>
            <NumberBasePicker {...componentProps} />
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-md-4">
          <TestScript cpuTestRunner={cpuTestRunner} loadScript={loadScript} />
        </div>
        <div className="col-md-3">
          <ROMTable
            cpu={cpu}
            numberBase={numberBase}
            loadProgram={loadProgram}
          />
        </div>
        <div className="col-md-3">
          <RAMTable
            cpu={cpu}
            numberBase={numberBase}
            setRamValue={setRamValue}
          />
        </div>
        <div className="col-md-2">
          <ALUDisplay cpu={cpu} numberBase={numberBase} />
        </div>
      </div>
      <div className="hidden-version">{cpuVersion}</div>
      <div className="hidden-version">{testRunnerVersion}</div>
    </div>
  );
};

export default HackCpuSimulator;
