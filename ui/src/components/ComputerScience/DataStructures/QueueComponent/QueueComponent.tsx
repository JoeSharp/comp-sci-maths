import React from "react";

import {
  queueReducer,
  QueueState,
  getInitialQueueState
} from "@comp-sci-maths/lib/dist/dataStructures/queue/queueReducer";

import LinearDataStructureComponent from "./LinearDataStructureComponent";
import { LinearStructureAction } from "@comp-sci-maths/lib/dist/dataStructures/queue/linearDataStructure";

const INITIAL_STATE: QueueState<number> = getInitialQueueState<number>();

const QueueComponent: React.FunctionComponent = () => {
  const [state, dispatch] = React.useReducer(
    queueReducer as React.Reducer<QueueState<number>, LinearStructureAction<number>>,
    INITIAL_STATE
  );
  const { front, rear } = state;
  const specificProps = React.useMemo(() => ([
    { name: 'Front', value: front },
    { name: 'Rear', value: rear }
  ]), [front, rear])

  return <LinearDataStructureComponent
    state={state as QueueState<number>}
    dispatch={dispatch}
    specificProps={specificProps} />
};

export default QueueComponent;
