import React from "react";

import {
  getInitialStackState,
  stackReducer,
  StackState
} from "@comp-sci-maths/lib/dist/dataStructures/stack/stackReducer";
import LinearDataStructureComponent from "../QueueComponent/LinearDataStructureComponent";
import { LinearStructureAction } from "@comp-sci-maths/lib/dist/dataStructures/queue/linearDataStructure";

const INITIAL_STATE: StackState<number> = getInitialStackState<number>();

const StackComponent: React.FunctionComponent = () => {
  const [state, dispatch] = React.useReducer(
    stackReducer as React.Reducer<StackState<number>, LinearStructureAction<number>>,
    INITIAL_STATE
  );
  const { stackPointer } = state;
  const specificProps = React.useMemo(() => ([
    { name: 'Stack Pointer', value: stackPointer }
  ]), [stackPointer])

  return <LinearDataStructureComponent
    state={state as StackState<number>}
    dispatch={dispatch}
    specificProps={specificProps} />
};

export default StackComponent;
