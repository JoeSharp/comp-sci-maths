import { arithmeticComparator } from "@comp-sci-maths/lib/dist/common";
import React from "react";
import Checkbox from "../../../Bootstrap/Checkbox";
import useSketch from "../../../p5/useSketch";
import SearchAlgorithmPicker, {
  usePicker as useSearchAlgorithmPicker,
} from "../Search/SearchAlgorithmPicker";
import SortAlgorithmPicker, {
  usePicker as useSortAlgorithmPicker,
} from "../Sorting/SortingAlgorithmPicker";

import AlgorithmTypePicker, {
  usePicker as useAlgorithmTypePicker,
} from "./AlgorithmTypePicker";
import BigOSketch from "./BigOSketch";

import useAlgorithmMeasure from "./useAlgorithmMeasure";

const DEFAULT_STEP: number = 40;
const DEFAULT_START_SIZE: number = 10;
const DEFAULT_END_SIZE: number = 1000;

const BigONotation: React.FunctionComponent = () => {
  const { componentProps: algorithmTypePickerProps } = useAlgorithmTypePicker(
    "form-control"
  );

  const {
    algorithm: searchAlgorithm,
    componentProps: searchAlgorithmPickerProps,
  } = useSearchAlgorithmPicker("form-control");
  const {
    algorithm: sortAlgorithm,
    componentProps: sortAlgorithmPickerProps,
  } = useSortAlgorithmPicker("form-control");

  const [step, setStep] = React.useState<number>(DEFAULT_STEP);
  const [startSize, setStartSize] = React.useState<number>(DEFAULT_START_SIZE);
  const [endSize, setEndSize] = React.useState<number>(DEFAULT_END_SIZE);
  const [playing, togglePlaying] = React.useReducer((p) => !p, false);

  const algorithmWrapper = React.useCallback(
    (inputList: number[]) => {
      let numberOfComparisons: number = 0;
      if (algorithmTypePickerProps.value === "search" && !!searchAlgorithm) {
        const indexToFind = Math.floor(Math.random() * inputList.length);
        searchAlgorithm.search(inputList, inputList[indexToFind], {
          compare: (a, b) => {
            numberOfComparisons++;
            return arithmeticComparator(a, b);
          },
        });
      } else if (algorithmTypePickerProps.value === "sort" && !!sortAlgorithm) {
        sortAlgorithm.sort(inputList, {
          compare: (a, b) => {
            numberOfComparisons++;
            return arithmeticComparator(a, b);
          },
        });
      }

      return numberOfComparisons;
    },
    [algorithmTypePickerProps.value, sortAlgorithm, searchAlgorithm]
  );

  const measurements = useAlgorithmMeasure({
    playing,
    startSize,
    endSize,
    step,
    algorithmWrapper,
  });

  const onStepChange: React.ChangeEventHandler<HTMLInputElement> = React.useCallback(
    ({ target: { value } }) => setStep(parseInt(value)),
    [setStep]
  );
  const onStartSizeChange: React.ChangeEventHandler<HTMLInputElement> = React.useCallback(
    ({ target: { value } }) => setStartSize(parseInt(value)),
    [setStartSize]
  );
  const onEndSizeChange: React.ChangeEventHandler<HTMLInputElement> = React.useCallback(
    ({ target: { value } }) => setEndSize(parseInt(value)),
    [setEndSize]
  );

  const { refContainer, updateConfig } = useSketch(BigOSketch);

  React.useEffect(() => updateConfig({ startSize, endSize, measurements }), [
    startSize,
    endSize,
    measurements,
    updateConfig,
  ]);

  return (
    <div>
      <div className="form-group">
        <label>Step</label>
        <input
          className="form-control"
          type="number"
          value={step}
          onChange={onStepChange}
        />
      </div>
      <div className="form-group">
        <label>Start Size</label>
        <input
          className="form-control"
          type="number"
          value={startSize}
          onChange={onStartSizeChange}
        />
      </div>
      <div className="form-group">
        <label>End Size</label>
        <input
          className="form-control"
          type="number"
          value={endSize}
          onChange={onEndSizeChange}
        />
      </div>

      <div className="form-group">
        <label>Algorithm Type</label>
        <AlgorithmTypePicker {...algorithmTypePickerProps} />
      </div>

      {algorithmTypePickerProps.value === "sort" && (
        <div className="form-group">
          <label>Sort Algorithm</label>
          <SortAlgorithmPicker {...sortAlgorithmPickerProps} />
        </div>
      )}

      {algorithmTypePickerProps.value === "search" && (
        <div className="form-group">
          <label>Search Algorithm</label>
          <SearchAlgorithmPicker {...searchAlgorithmPickerProps} />
        </div>
      )}

      <Checkbox
        id="chkPlaying"
        label="playing"
        checked={playing}
        onChange={togglePlaying}
      />

      <div ref={refContainer} />

      <table className="table table-striped">
        <thead>
          <tr>
            <th>Input Size</th>
            <th>Average Comparisons</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(measurements).map((k) => (
            <tr key={k[0]}>
              <td>{k[0]}</td>
              <td>{k[1]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BigONotation;
