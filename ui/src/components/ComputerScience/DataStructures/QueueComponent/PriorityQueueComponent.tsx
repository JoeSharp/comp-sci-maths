import React from "react";

import { loremIpsum } from 'lorem-ipsum';

import {
  priorityQueueReducer,
  getInitialPriorityQueueState,
  PrioritisedItem,
} from "@comp-sci-maths/lib/dist/dataStructures/queue/priorityQueueReducer";

import ButtonBar, {
  Props as ButtonBarProps,
} from "../../../Bootstrap/Buttons/ButtonBar";
import LinkedListDisplayComponent from "../LinkedList/LinkedListDisplayComponent";
import { LinkedListState } from "@comp-sci-maths/lib/dist/dataStructures/linkedList/linkedListReducer";

const INITIAL_STATE = getInitialPriorityQueueState<PrioritisedItem<string>>();

const generateWord = () => loremIpsum({ units: 'word', count: 1 });

const StackComponent: React.FunctionComponent = () => {
  const [state, dispatch] = React.useReducer(priorityQueueReducer, INITIAL_STATE);

  const [newItem, setNewItem] = React.useState<string>(generateWord());
  const [newPriority, setNewPriority] = React.useState<number>(1);

  const onNewItemChange: React.ChangeEventHandler<HTMLInputElement> = React.useCallback(
    ({ target: { value } }) => setNewItem(value),
    [setNewItem]
  );

  const onNewPriorityChange: React.ChangeEventHandler<HTMLInputElement> = React.useCallback(
    ({ target: { value } }) => setNewPriority(parseInt(value, 10)),
    [setNewPriority]
  );

  const onReset = React.useCallback(() => dispatch({ type: 'reset' }), []);

  const onEnqueue = React.useCallback(() => {
    dispatch({ type: 'enqueue', value: newItem, priority: newPriority })
    setNewItem(generateWord());
  }, [newItem, newPriority, setNewItem]);

  const onDequeue = React.useCallback(() => dispatch({ type: 'dequeue' }), []);

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

      <LinkedListDisplayComponent
        itemToString={({ value, priority }: PrioritisedItem<string>) => `${value} - ${priority}`}
        linkedListState={state as LinkedListState<PrioritisedItem<string>>} />
    </div>
  );
};

export default StackComponent;
