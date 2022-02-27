import React from "react";

import {
  queueReducer,
  QueueState,
  getInitialQueueState
} from "@comp-sci-maths/lib/dist/dataStructures/queue/queueReducer";

import LinearDataStructureEditor from "../LinearDataStructure/LinearDataStructureEditor";

const INITIAL_STATE: QueueState<string> = getInitialQueueState<string>();

const QueueComponent: React.FunctionComponent = () => {
  const [state, dispatch] = React.useReducer(
    queueReducer,
    INITIAL_STATE
  );
  const { front, rear } = state;
  const namedIndices = React.useMemo(() => ([
    { name: 'Front', value: front },
    { name: 'Rear', value: rear }
  ]), [front, rear])

  return <LinearDataStructureEditor
    pushOperationName="Enqueue"
    popOperationName="Dequeue"
    state={state as QueueState<string>}
    dispatch={dispatch}
    namedIndices={namedIndices} />
};

export default QueueComponent;
