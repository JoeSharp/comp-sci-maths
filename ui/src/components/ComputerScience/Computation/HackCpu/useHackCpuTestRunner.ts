import React from "react";
import cogoToast from "cogo-toast";

import { HackCpu, HackCpuTestRunner } from "@comp-sci-maths/lib";
import useSavedPrograms from "../../../lib/useSavedPrograms";
import { LoadProgram } from "./types";

interface UseHackCpuTestRunner {
  version: number;
  cpuTestRunner: HackCpuTestRunner;
  loadScript: LoadProgram;
  tick: () => void;
  reset: () => void;
}

const useHackCpuTestRunner = (cpu: HackCpu): UseHackCpuTestRunner => {
  const { programs } = useSavedPrograms();

  const [version, incrementVersion] = React.useReducer((a) => a + 1, 0);
  const cpuTestRunnerRef = React.useRef<HackCpuTestRunner>(
    new HackCpuTestRunner("", (d: string) => {
      if (!(d in programs)) {
        cogoToast.error(
          `Could not find ${d} in saved programs, required by test script`
        );
        return [""];
      }
      return programs[d].split('\n');
    })
  );

  const loadScript = React.useCallback(
    (programName: string, program: string) => {
      try {
        cpuTestRunnerRef.current.loadScript(program.split('\n'));
        incrementVersion();
        cogoToast.info(`Test Script Loaded ${programName}`);
      } catch (e) {
        cogoToast.error('Error Loading Test Script');
      }
    },
    [cpuTestRunnerRef]
  );

  const tick = React.useCallback(() => {
    cpuTestRunnerRef.current.step();
    incrementVersion();
  }, [incrementVersion]);

  const reset = React.useCallback(() => {
    cpuTestRunnerRef.current.reset();
    incrementVersion();
  }, [incrementVersion]);

  return {
    version,
    cpuTestRunner: cpuTestRunnerRef.current,
    loadScript,
    tick,
    reset,
  };
};

export default useHackCpuTestRunner;
