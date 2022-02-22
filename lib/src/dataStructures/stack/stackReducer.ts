import {
    LinearDataStructureMessages,
    LinearStructureAction,
    LinearStructureState,
    DEFAULT_CAPACITY,
    getInitialLinearStructureState
} from "../Queue/linearDataStructure";

export interface StackState<T> extends LinearStructureState<T> {
    stackPointer: number;
}

export const getInitialStackState = <T>(capacity: number = DEFAULT_CAPACITY): StackState<T> => ({
    ...getInitialLinearStructureState(capacity),
    stackPointer: 0,
})

export const stackPush = <T>(state: StackState<T>, value: T): StackState<T> => {
    if (state.stackPointer === state.capacity) {
        return {
            ...state,
            lastResult: null,
            lastMessage: LinearDataStructureMessages.full
        }
    }

    const contents = [...state.contents];
    contents[state.stackPointer] = value;

    return {
        ...state,
        contents,
        stackPointer: state.stackPointer + 1,
        lastMessage: LinearDataStructureMessages.pushed
    }
}

export const stackPop = <T>(state: StackState<T>): StackState<T> => {
    if (state.stackPointer === 0) {
        return {
            ...state,
            lastResult: null,
            lastMessage: LinearDataStructureMessages.empty
        }
    }

    // Locate the item
    const lastResult = state.contents[state.stackPointer - 1];

    return {
        ...state,
        stackPointer: state.stackPointer - 1,
        lastResult,
        lastMessage: LinearDataStructureMessages.popped
    }
}

export const stackPeek = <T>(state: StackState<T>): StackState<T> => {
    if (state.stackPointer === 0) {
        return {
            ...state,
            lastMessage: LinearDataStructureMessages.empty
        }
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
const stackReducer = <T>(state: StackState<T>, action: LinearStructureAction<T>) => {
    switch (action.type) {
        case 'push': return stackPush(state, action.value);
        case 'pop': return stackPop(state);
        case 'peek': return stackPeek(state);
    }
}

export default stackReducer;