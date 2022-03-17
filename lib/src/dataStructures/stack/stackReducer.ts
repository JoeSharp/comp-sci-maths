import {
    LinearDataStructureMessages,
    LinearStructureAction,
    LinearStructureState,
    DEFAULT_CAPACITY,
    getInitialLinearStructureState,
    linearStructureError
} from "../linearDataStructure/linearDataStructure";

export interface StackState<T> extends LinearStructureState<T> {
    stackPointer: number;
}

export const getInitialStackState = <T>(capacity: number = DEFAULT_CAPACITY): StackState<T> => ({
    ...getInitialLinearStructureState(capacity),
    stackPointer: 0,
})

export const isStackEmpty = ({ stackPointer }: StackState<any>): boolean => stackPointer === 0;
export const isStackFull = ({ stackPointer, capacity }: StackState<any>): boolean => stackPointer === capacity;

export const getStackItems = ({ contents, stackPointer }: StackState<any>) => {
    return contents.filter((_, i) => i < stackPointer);
}

export const stackPush = <T>(state: StackState<T>, value: T): StackState<T> => {
    if (isStackFull(state)) {
        return linearStructureError(state, LinearDataStructureMessages.full);
    }

    const contents = [...state.contents];
    contents[state.stackPointer] = value;

    return {
        ...state,
        size: state.size + 1,
        contents,
        stackPointer: state.stackPointer + 1,
        lastMessage: LinearDataStructureMessages.added
    }
}

export const stackPop = <T>(state: StackState<T>): StackState<T> => {
    if (isStackEmpty(state)) {
        return linearStructureError(state, LinearDataStructureMessages.empty);
    }

    // Locate the item
    const contents = [...state.contents];
    const lastResult = contents[state.stackPointer - 1];

    // Clear this spot in the array, not technically necessary but it looks nicer on the UI
    contents[state.stackPointer - 1] = undefined;

    return {
        ...state,
        size: state.size - 1,
        contents,
        stackPointer: state.stackPointer - 1,
        lastResult,
        lastMessage: LinearDataStructureMessages.removed
    }
}

export const stackPeek = <T>(state: StackState<T>): StackState<T> => {
    if (isStackEmpty(state)) {
        return linearStructureError(state, LinearDataStructureMessages.empty);
    }

    return {
        ...state,
        lastResult: state.contents[state.stackPointer - 1],
        lastMessage: LinearDataStructureMessages.peeked
    }
}

/**
 * Implements a simple Stack (FIFO) in a purely functional style.
 *
 * @param state The current state of the Stack.
 * @param action The action to undertake
 * @returns The new state after the action is attempted
 */
export const stackReducer = <T>(state: StackState<T>, action: LinearStructureAction<T>): StackState<T> => {
    switch (action.type) {
        case 'push': return stackPush(state, action.value);
        case 'pop': return stackPop(state);
        case 'peek': return stackPeek(state);
        case 'reset': return getInitialStackState();
    }
}

export default stackReducer;