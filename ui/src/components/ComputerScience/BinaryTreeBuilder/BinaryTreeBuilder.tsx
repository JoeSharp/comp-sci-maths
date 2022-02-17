import React from "react";
import { UseBinaryTreeBuilder } from "./useBinaryTreeBuilder";
import useSketch from "../../p5/useSketch";
import BinaryTreeSketch from "./BinaryTreeSketch";
import ButtonBar, {
  Props as ButtonBarProps,
} from "../../Bootstrap/Buttons/ButtonBar";
import { TreeDirection } from "./types";

interface Props {
  binaryTreeBuilder: UseBinaryTreeBuilder;
}

const BinaryTreeBuilder: React.FunctionComponent<Props> = ({
  binaryTreeBuilder: { addValue, binaryTree, version, clearAll },
}) => {
  const [newValue, setNewValue] = React.useState("");

  const [treeDirection, setTreeDirection] = React.useState<TreeDirection>(
    TreeDirection.down
  );

  const onTreeDirectionChange: React.ChangeEventHandler<HTMLSelectElement> = React.useCallback(
    ({ target: { value } }) => setTreeDirection(value as TreeDirection),
    [setTreeDirection]
  );

  const onNewValueChange: React.ChangeEventHandler<HTMLInputElement> = React.useCallback(
    ({ target: { value } }) => setNewValue(value),
    [setNewValue]
  );
  const onAddNewItem: React.MouseEventHandler = React.useCallback(
    () => newValue.length > 0 && addValue(newValue),
    [addValue, newValue]
  );

  const { refContainer, updateConfig } = useSketch(BinaryTreeSketch);

  React.useEffect(() => updateConfig({ binaryTree, treeDirection }), [
    binaryTree,
    treeDirection,
    updateConfig,
  ]);

  const buttonBarProps: ButtonBarProps = React.useMemo(
    () => ({
      buttons: [
        {
          text: "Add",
          onClick: onAddNewItem,
          styleType: "primary",
        },
        {
          text: "Clear",
          styleType: "danger",
          onClick: clearAll,
        },
      ],
    }),
    [onAddNewItem, clearAll]
  );

  return (
    <div>
      <h4>Binary Tree Builder v{version}</h4>
      <form>
        <div className="form-group">
          <label>New Value</label>
          <input
            className="form-control"
            value={newValue}
            onChange={onNewValueChange}
          />
        </div>
        <div className="form-group">
          <label>Tree Direction</label>
          <select
            className="form-control"
            value={treeDirection.toString()}
            onChange={onTreeDirectionChange}
          >
            {Object.keys(TreeDirection).map((v) => (
              <option key={v} value={v}>
                {v}
              </option>
            ))}
          </select>
        </div>
      </form>

      <ButtonBar {...buttonBarProps} />

      <div ref={refContainer} />
    </div>
  );
};

export default BinaryTreeBuilder;
