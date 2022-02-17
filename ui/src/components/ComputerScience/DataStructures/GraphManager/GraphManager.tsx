import React from "react";
import GraphBuilder from "./GraphBuilder";
import GraphPickerWithSketch, {
  usePicker as useGraphPicker,
} from "./GraphPickerWithSketch";
import { StringDataItem } from "../../../p5/Boid/types";
import DataItemBoid from "../../../p5/Boid/DataItemBoid";
import Checkbox from "../../../Bootstrap/Checkbox";
import NewGraphDialog, {
  useDialog as useNewGraphDialog,
} from "./NewGraphDialog";
import ButtonBar, {
  Props as ButtonBarProps,
} from "../../../Bootstrap/Buttons/ButtonBar";
import cogoToast from "cogo-toast";

const GraphManager: React.FunctionComponent = () => {
  const {
    graphName,
    graph,
    savedGraphUse: { createNew, save, reset },
    componentProps: graphPickerProps,
    sketchUse: { updateConfig, sketchContainer },
  } = useGraphPicker("simpleStringGraph");

  const onCreateNew = React.useCallback(
    (name: string) => {
      createNew(name);
      cogoToast.info(`Graph Created with name ${name}`);
    },
    [createNew]
  );

  const {
    showDialog: showNewGraphDialog,
    componentProps: newGraphProps,
  } = useNewGraphDialog(onCreateNew);

  const [physicsEnabled, setPhysicsEnabled] = React.useState<boolean>(false);
  const onPhysicsEnabledChange: React.ChangeEventHandler<HTMLInputElement> = React.useCallback(
    ({ target: { checked } }) => setPhysicsEnabled(checked),
    [setPhysicsEnabled]
  );

  React.useEffect(() => {
    updateConfig({ physicsEnabled });
  }, [physicsEnabled, updateConfig]);

  const onSave = React.useCallback(() => {
    const vertexPositions = graph.vertices
      .map((v) => sketchContainer.getBoid(v))
      .filter((b) => b !== undefined)
      .map((b) => b as DataItemBoid<StringDataItem>)
      .map((b: DataItemBoid<StringDataItem>) => ({
        key: b.entity.key,
        position: { x: b.position.x, y: b.position.y },
      }))
      .reduce((acc, { key, position }) => ({ ...acc, [key]: position }), {});

    save(graphName, graph, vertexPositions);
    cogoToast.info(`Graph Saved with name ${graphName}`);
  }, [save, graphName, graph, sketchContainer]);

  const buttonBarProps: ButtonBarProps = React.useMemo(
    () => ({
      buttons: [
        {
          onClick: showNewGraphDialog,
          text: "Create New",
          styleType: "primary",
        },
        {
          onClick: onSave,
          text: "Save",
          styleType: "primary",
        },
        {
          onClick: reset,
          text: "Reset",
          styleType: "danger",
        },
      ],
    }),
    [showNewGraphDialog, onSave, reset]
  );

  return (
    <div>
      <GraphPickerWithSketch {...graphPickerProps} />

      <div className="form-group">
        <Checkbox
          id="chkPhysics"
          checked={physicsEnabled}
          onChange={onPhysicsEnabledChange}
          label="Physics Enabled"
        />
      </div>
      <ButtonBar {...buttonBarProps} />

      <GraphBuilder graph={graph} />
      <NewGraphDialog {...newGraphProps} />
    </div>
  );
};

export default GraphManager;
