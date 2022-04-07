import React from "react";

import { Optional } from "@comp-sci-maths/lib/dist/types";

import useSketch from "../../../../p5/useSketch";
import GridSketch from "./GridSketch";
import useGridGraph, { pointToStr } from "./useGridGraph";
import useRoutingAlgorithm from "../useRoutingAlgorithm";

import "./routing.css";
import StepThruListControls, {
  useStepThruListControls,
} from "../../../../lib/StepThruListControls";
import RouteObserverStage from "../RouteObserverStage";
import HeuristicCostTable from "../../../../ComputerScience/Algorithms/Routing/HeuristicCostTable";
import ButtonBar, {
  Props as ButtonBarProps,
} from "../../../../Bootstrap/Buttons/ButtonBar";
import p5 from "p5";

const GridRouting: React.FunctionComponent = () => {
  const { refContainer, updateConfig, sketchContainer } = useSketch(GridSketch);

  const {
    graph,
    topLeft,
    bottomRight,
    toggleConnection,
  } = useGridGraph({
    rows: 8,
    columns: 15,
  });

  const sourceNode = React.useMemo(() => pointToStr(topLeft), [topLeft]);
  const destinationNode = React.useMemo(() => pointToStr(bottomRight), [bottomRight]);

  const getPositionOfNode = React.useCallback(
    (d: string): Optional<p5.Vector> => {
      const boid = sketchContainer.getBoid(d);
      return !!boid ? boid.position : undefined;
    },
    [sketchContainer]
  );

  const {
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
    updateConfig({
      graph,
      path: currentStage !== undefined ? currentStage.pathFrom : [],
      toggleConnection,
    });
  }, [currentStage, graph, updateConfig, toggleConnection]);

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
      <div ref={refContainer} />

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
        <RouteObserverStage currentStage={currentStage} />
      )}
    </div>
  );
};

export default GridRouting;
