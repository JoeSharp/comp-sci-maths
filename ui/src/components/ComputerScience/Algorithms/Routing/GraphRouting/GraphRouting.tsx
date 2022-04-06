import React from "react";

import useRoutingAlgorithm from "../useRoutingAlgorithm";
import VertexPicker, {
  usePicker as useVertexPicker,
} from "../../../../ComputerScience/DataStructures/GraphManager/GraphBuilder/VertexPicker";
import StepThruListControls, {
  useStepThruListControls,
} from "../../../../lib/StepThruListControls";
import RouteObserverStage from "../RouteObserverStage";
import HeuristicCostTable from "../../../../ComputerScience/Algorithms/Routing/HeuristicCostTable";

import GraphPickerWithSketch, {
  usePicker as useGraphPicker,
} from "../../../../ComputerScience/DataStructures/GraphManager/GraphPickerWithSketch";
import ButtonBar, {
  Props as ButtonBarProps,
} from "../../../../Bootstrap/Buttons/ButtonBar";

const GraphRouting: React.FunctionComponent = () => {
  const {
    graph,
    componentProps: graphPickerProps,
    sketchUse: { sketchContainer },
  } = useGraphPicker("complexStringGraph");

  const {
    vertex: sourceNode,
    componentProps: sourcePickerProps,
  } = useVertexPicker(graph, "form-control");
  const {
    vertex: destinationNode,
    componentProps: destinationPickerProps,
  } = useVertexPicker(graph, "form-control");

  const getPositionOfNode = React.useCallback(
    (d: string) => {
      const boid = sketchContainer.getBoid(d);
      return !!boid ? boid.position : undefined;
    },
    [sketchContainer]
  );

  const {
    path,
    stages,
    onHarvestDistances,
    onResetDistances,
    heuristicCosts,
  } = useRoutingAlgorithm({
    graph,
    sourceNode,
    destinationNode,
    getPositionOfNode,
  });

  const {
    item: currentStage,
    componentProps: steppingControlProps,
  } = useStepThruListControls(stages);

  React.useEffect(() => {
    graph.vertices.forEach((v: string) => {
      if (
        (sourceNode && sourceNode === v) ||
        (destinationNode && destinationNode === v)
      ) {
        sketchContainer.setBorderWeight(v, 3);
        sketchContainer.setBorderColour(v, "black");
        sketchContainer.setColour(v, "green");
      } else if (
        currentStage !== undefined &&
        currentStage.currentItem !== undefined &&
        currentStage.currentItem.node === v
      ) {
        sketchContainer.setBorderWeight(v, 3);
        sketchContainer.setBorderColour(v, "red");
      } else if (
        currentStage !== undefined &&
        currentStage.pathFrom.includes(v)
      ) {
        sketchContainer.setBorderWeight(v, 3);
        sketchContainer.setBorderColour(v, "red");
      } else {
        sketchContainer.setBorderWeight(v, 1);
        sketchContainer.setBorderColour(v, "black");
        sketchContainer.setColour(v, "blue");
      }
    });
  }, [sourceNode, destinationNode, currentStage, graph, path, sketchContainer]);

  const buttonBarProps: ButtonBarProps = React.useMemo(
    () => ({
      buttons: [
        {
          styleType: "primary",
          onClick: onHarvestDistances,
          text: "Harvest Distances",
        },
        {
          styleType: "danger",
          onClick: onResetDistances,
          text: "Clear Distances",
        },
      ],
    }),
    [onHarvestDistances, onResetDistances]
  );

  return (
    <div>
      <GraphPickerWithSketch {...graphPickerProps} />
      <h2>Choose Endpoints</h2>
      <form>
        <div className="form-group">
          <label>Source</label>
          <VertexPicker {...sourcePickerProps} />
        </div>
        <div className="form-group">
          <label>Destination</label>
          <VertexPicker {...destinationPickerProps} />
        </div>
      </form>
      <h2>Path Found - {path.join('->')}</h2>
      <h2>A* Algorithm</h2>
      <div className="mb-3">
        <p>
          The A* algorithm is an enchancement on Dijkstras. It takes into
          account the estimated distance from a given node to the endpoint when
          calculating the cost for it's priority queue. To make use of this
          enhancement, click on 'Harvest Distances' and the euclidean distances
          from each node to the destination will be calculated and used as part
          of the routing algorithm.
        </p>
        <ButtonBar {...buttonBarProps} />
      </div>

      <HeuristicCostTable graph={graph} heuristicCostsById={heuristicCosts} />

      <StepThruListControls {...steppingControlProps} />

      {currentStage && (
        <div className="mt-3">
          <RouteObserverStage currentStage={currentStage} />
        </div>
      )}
    </div>
  );
};

export default GraphRouting;
