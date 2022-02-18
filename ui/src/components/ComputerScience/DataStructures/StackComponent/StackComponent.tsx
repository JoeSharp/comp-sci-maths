import React from "react";
import { v4 as uuidv4 } from "uuid";

import Stack from "@comp-sci-maths/lib/dist/dataStructures/stack/Stack";

import "./stack.css";
import useSketch from "../../../p5/useSketch";
import { ArraySketchNumber, Orientation } from "../QueueComponent/ArraySketch";
import { NumberDataItem } from "../../../p5/Boid/types";
import ButtonBar, {
  Props as ButtonBarProps,
} from "../../../Bootstrap/Buttons/ButtonBar";

const StackComponent: React.FunctionComponent = () => {
  const stack = React.useRef<Stack<NumberDataItem>>(new Stack());

  const [items, setItems] = React.useState<NumberDataItem[]>([]);
  const [newItem, setNewItem] = React.useState<number>(0);
  const [lastRetrievedItem, setLastRetrievedItem] = React.useState<NumberDataItem | null>(null);

  const onNewItemChange: React.ChangeEventHandler<HTMLInputElement> = React.useCallback(
    ({ target: { value } }) => setNewItem(parseInt(value)),
    [setNewItem]
  );

  const updateItems = React.useCallback(
    () => setItems(stack.current.getItems()),
    [setItems]
  );

  const onReset = React.useCallback(() => {
    stack.current.empty();
    setItems([]);
    setLastRetrievedItem(null);
    setNewItem(0);
    updateItems();
  }, [setNewItem, setItems, setLastRetrievedItem, updateItems]);

  const onPush = React.useCallback(() => {
    stack.current.push({
      key: uuidv4(),
      label: newItem.toString(),
      value: newItem,
    });
    setNewItem(newItem + 1);
    updateItems();
  }, [newItem, setNewItem, updateItems]);

  const onPop = React.useCallback(() => {
    try {
      setLastRetrievedItem(stack.current.pop());
      updateItems();
    } catch (e) {
      // erm...
    }
  }, [updateItems, setLastRetrievedItem]);

  const { updateConfig, refContainer } = useSketch(ArraySketchNumber);

  React.useEffect(
    () =>
      updateConfig({
        orientation: Orientation.vertical,
        dataItems: items,
        lastRetrievedItem,
      }),
    [items, lastRetrievedItem, updateConfig]
  );

  const buttonBarProps: ButtonBarProps = React.useMemo(
    () => ({
      buttons: [
        {
          text: "Push",
          onClick: onPush,
          styleType: "primary",
        },
        {
          text: "Pop",
          onClick: onPop,
          styleType: "primary",
        },
        {
          text: "Reset",
          onClick: onReset,
          styleType: "danger",
        },
      ],
    }),
    [onPush, onPop, onReset]
  );

  return (
    <div>
      <p></p>

      <form>
        <div className="form-group">
          <label>New Item</label>
          <input
            className="form-control"
            value={newItem}
            type="number"
            onChange={onNewItemChange}
          />
        </div>
      </form>

      <ButtonBar {...buttonBarProps} />

      <div ref={refContainer} />
    </div>
  );
};

export default StackComponent;
