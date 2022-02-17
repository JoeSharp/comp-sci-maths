import React from "react";

import SearchAlgorithmPicker, {
  usePicker as useSearchAlgorithmPicker,
} from "./SearchAlgorithmPicker";

import SearchSketch from "./SearchSketch";
import useSearchedData from "./useSearchData";
import useSketch from "../../../p5/useSketch";
import StepThruListControls, {
  useStepThruListControls,
} from "../../../lib/StepThruListControls";

const Search: React.FunctionComponent = () => {
  const {
    algorithm,
    componentProps: algorithmPickerProps,
  } = useSearchAlgorithmPicker("form-control");

  const [searchItem, setSearchItem] = React.useState<string>("");
  const onSearchItemChange: React.ChangeEventHandler<HTMLInputElement> = React.useCallback(
    ({ target: { value } }) => setSearchItem(value),
    [setSearchItem]
  );

  const { data, matchIndex, stages } = useSearchedData({
    algorithm,
    searchItem,
  });

  const {
    index,
    item: searchStage,
    componentProps: steppingControlProps,
  } = useStepThruListControls(stages);

  const { updateConfig, sketchContainer, refContainer } = useSketch(
    SearchSketch
  );

  // Whenever the sort is redone, tell the sketch
  React.useEffect(() => {
    updateConfig({
      data,
      matchIndex,
      searchStage,
      searchItem,
      isFinalStage: index === stages.length - 1,
    });
  }, [
    index,
    stages.length,
    data,
    matchIndex,
    searchStage,
    searchItem,
    updateConfig,
  ]);

  const { goToFirst } = steppingControlProps;
  React.useEffect(() => {
    goToFirst();
    sketchContainer.reset();
  }, [goToFirst, sketchContainer, algorithm, searchItem]);

  return (
    <div>
      <form>
        <div className="form-group">
          <label>Choose Algorithm</label>
          <SearchAlgorithmPicker {...algorithmPickerProps} />
        </div>
      </form>

      <h2>{!!algorithm ? algorithm.name : "please select algorithm"}</h2>
      <div>
        <div className="form-group">
          <label>Search Item</label>
          <input
            className="form-control"
            value={searchItem}
            onChange={onSearchItemChange}
          />
        </div>
        <StepThruListControls {...steppingControlProps} />
      </div>

      <div ref={refContainer} />
    </div>
  );
};

export default Search;
