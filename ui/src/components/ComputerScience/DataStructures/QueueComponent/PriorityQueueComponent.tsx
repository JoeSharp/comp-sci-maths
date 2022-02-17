import React from "react";

import { v4 as uuidv4 } from "uuid";

import PriorityQueue, {
  PrioritisedItem,
} from "comp-sci-maths-lib/dist/dataStructures/queue/PriorityQueue";
import useListReducer from "../../../lib/useListReducer";

import "./queue.css";
import useSketch from "../../../p5/useSketch";
import { ArraySketchNumber } from "./ArraySketch";
import { NumberDataItem, DisplayDataItem } from "../../../p5/Boid/types";
import ButtonBar, {
  Props as ButtonBarProps,
} from "../../../Bootstrap/Buttons/ButtonBar";

interface PrioritisedNumberDataItem
  extends DisplayDataItem<number>,
  PrioritisedItem { }

const StackComponent: React.FunctionComponent = () => {
  const queue = React.useRef<PriorityQueue<PrioritisedNumberDataItem>>(
    new PriorityQueue()
  );

  const [items, setItems] = React.useState<NumberDataItem[]>([]);
  const [newItem, setNewItem] = React.useState<number>(0);
  const [newPriority, setNewPriority] = React.useState<number>(1);

  const {
    items: poppedItems,
    addItem: addPoppedItem,
    clearItems: clearPoppedItems,
  } = useListReducer<NumberDataItem>();

  const onNewItemChange: React.ChangeEventHandler<HTMLInputElement> = React.useCallback(
    ({ target: { value } }) => setNewItem(parseInt(value)),
    [setNewItem]
  );

  const onNewPriorityChange: React.ChangeEventHandler<HTMLInputElement> = React.useCallback(
    ({ target: { value } }) => setNewPriority(parseInt(value)),
    [setNewPriority]
  );

  const updateItems = React.useCallback(
    () => setItems(queue.current.items.toArray()),
    [setItems]
  );

  const onReset = React.useCallback(() => {
    setItems([]);
    clearPoppedItems();
    setNewItem(0);
  }, [setNewItem, setItems, clearPoppedItems]);

  const onEnqueue = React.useCallback(() => {
    queue.current.enqueue({
      key: uuidv4(),
      label: `${newItem} p${newPriority}`,
      value: newItem,
      priority: newPriority,
    });
    setNewItem(newItem + 1);
    updateItems();
  }, [newItem, newPriority, setNewItem, updateItems]);

  const onDequeue = React.useCallback(() => {
    try {
      addPoppedItem(queue.current.dequeue());
      updateItems();
    } catch (e) {
    }
  }, [updateItems, addPoppedItem]);

  const { updateConfig, refContainer } = useSketch(ArraySketchNumber);

  React.useEffect(
    () =>
      updateConfig({
        dataItems: items,
        lastRetrievedItem: poppedItems.reduce<NumberDataItem | null>(
          (_, curr) => curr,
          null
        ),
      }),
    [poppedItems, items, updateConfig]
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
        <div className="form-group">
          <label>New Item Priority</label>
          <input
            className="form-control"
            value={newPriority}
            type="number"
            onChange={onNewPriorityChange}
          />
        </div>
      </form>

      <ButtonBar {...buttonBarProps} />

      <div ref={refContainer} />
    </div>
  );
};

export default StackComponent;
