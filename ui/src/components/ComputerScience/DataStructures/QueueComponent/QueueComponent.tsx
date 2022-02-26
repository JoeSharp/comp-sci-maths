import React from "react";

import {
  queueReducer,
  QueueState,
  getInitialQueueState
} from "@comp-sci-maths/lib/dist/dataStructures/queue/queueReducer";

import LinearDataStructureComponent from "./LinearDataStructureComponent";

const INITIAL_STATE: QueueState<string> = getInitialQueueState<string>();

const QueueComponent: React.FunctionComponent = () => {
  const [state, dispatch] = React.useReducer(
    queueReducer,
    INITIAL_STATE
  );
  const { front, rear } = state;
  const specificProps = React.useMemo(() => ([
    { name: 'Front', value: front },
    { name: 'Rear', value: rear }
  ]), [front, rear])

  return <LinearDataStructureComponent
    state={state as QueueState<string>}
    dispatch={dispatch}
    specificProps={specificProps} />
};

export default QueueComponent;
