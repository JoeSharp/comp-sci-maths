import React from "react";

import SortingAlgorithmPicker, {
  usePicker as useSortingAlgorithmPicker,
} from "./SortingAlgorithmPicker";
import useSketch from "../../../p5/useSketch";
import SortingSketch from "./SortingSketch";
import useSortedData from "./useSortedData";
import StepThruListControls, {
  useStepThruListControls,
} from "../../../lib/StepThruListControls";

const Sorting: React.FunctionComponent = () => {
  const {
    algorithm,
    componentProps: algorithmPickerProps,
  } = useSortingAlgorithmPicker("form-control");

  const { stages } = useSortedData({ algorithm });

  const {
    item: sortStage,
    componentProps: steppingControlProps,
  } = useStepThruListControls(stages);
  const { goToFirst } = steppingControlProps;

  const { updateConfig, sketchContainer, refContainer } = useSketch(
    SortingSketch
  );

  // Whenever the sort is redone, tell the sketch
  React.useEffect(() => {
    updateConfig({ sortStage });
  }, [sortStage, updateConfig]);

  React.useEffect(() => {
    goToFirst();
    sketchContainer.reset();
  }, [goToFirst, sketchContainer, algorithm]);

  return (
    <div>
      <form>
        <div className="form-group">
          <label>Choose Algorithm</label>
          <SortingAlgorithmPicker {...algorithmPickerProps} />
        </div>
      </form>

      <h2>{!!algorithm ? algorithm.name : "please select algorithm"}</h2>
      <StepThruListControls {...steppingControlProps} />
      <div ref={refContainer} />
    </div>
  );
};

export default Sorting;
