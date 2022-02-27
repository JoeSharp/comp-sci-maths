import React from "react";

import {
  getInitialStackState,
  stackReducer,
  StackState
} from "@comp-sci-maths/lib/dist/dataStructures/stack/stackReducer";
import LinearDataStructureEditor from "../LinearDataStructure/LinearDataStructureEditor";

const INITIAL_STATE: StackState<number> = getInitialStackState<number>();

const StackComponent: React.FunctionComponent = () => {
  const [state, dispatch] = React.useReducer(
    stackReducer,
    INITIAL_STATE
  );
  const { stackPointer } = state;
  const specificProps = React.useMemo(() => ([
    { name: 'Stack Pointer', value: stackPointer }
  ]), [stackPointer])

  return <LinearDataStructureEditor
    state={state as StackState<number>}
    dispatch={dispatch}
    specificProps={specificProps} />
};

export default StackComponent;
