import React from "react";

import { v4 as uuidv4 } from "uuid";

import Queue from "@comp-sci-maths/lib/dist/dataStructures/queue/Queue";

import "./queue.css";
import useSketch from "../../../p5/useSketch";
import { ArraySketchNumber } from "./ArraySketch";
import { NumberDataItem } from "../../../p5/Boid/types";
import ButtonBar, {
  Props as ButtonBarProps,
} from "../../../Bootstrap/Buttons/ButtonBar";

const QueueComponent: React.FunctionComponent = () => {
  const queue = React.useRef<Queue<NumberDataItem>>(new Queue());

  const [items, setItems] = React.useState<NumberDataItem[]>([]);
  const [newItem, setNewItem] = React.useState<number>(0);
  const [lastRetrievedItem, setLastRetrievedItem] = React.useState<NumberDataItem | null>(null);

  const onNewItemChange: React.ChangeEventHandler<HTMLInputElement> = React.useCallback(
    ({ target: { value } }) => setNewItem(parseInt(value)),
    [setNewItem]
  );

  const updateItems = React.useCallback(
    () => setItems(queue.current.items.toArray()),
    [setItems]
  );

  const onReset = React.useCallback(() => {
    setItems([]);
    setLastRetrievedItem(null);
    setNewItem(0);
  }, [setNewItem, setItems, setLastRetrievedItem]);

  const onEnqueue = React.useCallback(() => {
    queue.current.push({
      key: uuidv4(),
      label: newItem.toString(),
      value: newItem,
    });
    setNewItem(newItem + 1);
    updateItems();
  }, [newItem, setNewItem, updateItems]);

  const onDequeue = React.useCallback(() => {
    try {
      setLastRetrievedItem(queue.current.pop());
      updateItems();
    } catch (e) {

    }
  }, [updateItems, setLastRetrievedItem]);

  const { updateConfig, refContainer } = useSketch(ArraySketchNumber);

  React.useEffect(
    () =>
      updateConfig({
        dataItems: items,
        lastRetrievedItem,
      }),
    [lastRetrievedItem, items, updateConfig]
  );

  const buttonBarProps: ButtonBarProps = React.useMemo(
    () => ({
      buttons: [
        {
          text: "Enqueue",
          onClick: onEnqueue,
          styleType: "primary",
        },
        {
          text: "Dequeue",
          onClick: onDequeue,
          styleType: "primary",
        },
        {
          text: "Reset",
          onClick: onReset,
          styleType: "danger",
        },
      ],
    }),
    [onEnqueue, onDequeue, onReset]
  );

  return (
    <div>
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

export default QueueComponent;
