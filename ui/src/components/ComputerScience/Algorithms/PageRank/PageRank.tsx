import React from "react";

import usePageRank from "./usePageRank";
import CurrentRanksTable from "./CurrentRanksTable";
import RankHistoryTable from "./RankHistoryTable";
import InOrderList from "./InOrderList";
import GraphPickerWithSketch, {
  usePicker as useGraphPicker,
} from "../../DataStructures/GraphManager/GraphPickerWithSketch";
import StepForwardControls, { useStepForwardControls } from "../../../lib/StepForwardControls";

const DEFAULT_DAMPING_FACTOR = 0.85;

const PageRank: React.FunctionComponent = () => {
  const [dampingFactor, setDampingFactor] = React.useState<number>(
    DEFAULT_DAMPING_FACTOR
  );

  const { graph, componentProps: graphPickerProps } = useGraphPicker(
    "simpleStringGraph"
  );

  const { iterations, ranks, rankHistory, begin, iterate } = usePageRank({
    dampingFactor,
    graph,
  });

  const reset = React.useCallback(() => {
    begin();
    setDampingFactor(DEFAULT_DAMPING_FACTOR);
  }, [begin, setDampingFactor]);

  const onDampingFactorChange: React.ChangeEventHandler<HTMLInputElement> = React.useCallback(
    ({ target: { value } }) => setDampingFactor(parseFloat(value)),
    [setDampingFactor]
  );

  const { componentProps: stepForwardProps } = useStepForwardControls({ reset, iterate });

  return (
    <div>
      <GraphPickerWithSketch {...graphPickerProps} />

      <h4>Page Ranks after {iterations} iterations</h4>
      <div>
        <StepForwardControls {...stepForwardProps} />
        <div className="form-group">
          <label htmlFor="txtDampingFactor">Damping Factor</label>
          <input
            id="txtDampingFactor"
            className="form-control"
            type="number"
            min="0.1"
            max="2.0"
            step="0.01"
            value={dampingFactor}
            onChange={onDampingFactorChange}
          />
        </div>
      </div>
      <div className="row">
        <div className="col-md-8">
          <h2>Current Ranks</h2>
          <CurrentRanksTable pages={graph.vertices} ranks={ranks} />
        </div>
        <div className="col-md-4">
          <h2>In Order</h2>
          <InOrderList pages={graph.vertices} ranks={ranks} />
        </div>
      </div>
      <h2>All Iterations</h2>
      <RankHistoryTable pages={graph.vertices} rankHistory={rankHistory} />
    </div>
  );
};

export default PageRank;
