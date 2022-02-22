import {
    LinearDataStructureMessages,
    LinearStructureAction,
    LinearStructureState,
    DEFAULT_CAPACITY,
    getInitialLinearStructureState
} from "./linearDataStructure";

export interface QueueState<T> extends LinearStructureState<T> {
    front: number;
    rear: number;
}

const FRONT_IF_EMPTY = -1;

export const getInitialQueueState = <T>(capacity: number = DEFAULT_CAPACITY): QueueState<T> => ({
    ...getInitialLinearStructureState(capacity),
    front: FRONT_IF_EMPTY,
    rear: 0,
})

export const queuePush = <T>(state: QueueState<T>, value: T): QueueState<T> => {
    if (state.front === state.rear) {
        return {
            ...state,
            lastResult: null,
            lastMessage: LinearDataStructureMessages.full
        }
    }

    const contents = [...state.contents];
    contents[state.rear] = value;

    // Iterate the rear of the queue
    let rear = state.rear;
    rear += 1;
    rear %= state.capacity;

    // Was the queue previously empty?
    let front = state.front;
    if (front === FRONT_IF_EMPTY) {
        front = state.rear;
    }

    return {
        ...state,
        contents,
        front,
        rear,
        lastMessage: LinearDataStructureMessages.pushed
    }
}

export const queuePop = <T>(state: QueueState<T>): QueueState<T> => {
    if (state.front === FRONT_IF_EMPTY) {
        return {
            ...state,
            lastResult: null,
            lastMessage: LinearDataStructureMessages.empty
        }
    }

    // Locate the item
    const lastResult = state.contents[state.front];

    // Iterate the front of the queue
    let front = state.front;
    front += 1;
    front %= state.capacity;

    // Is the queue now empty?
    if (front === state.rear) {
        front = FRONT_IF_EMPTY;
    }

    return {
        ...state,
        front,
        lastResult,
        lastMessage: LinearDataStructureMessages.popped
    }
}

export const queuePeek = <T>(state: QueueState<T>): QueueState<T> => {
    if (state.front === FRONT_IF_EMPTY) {
        return {
            ...state,
            lastMessage: LinearDataStructureMessages.empty
        }
    }

    return {
        ...state,
        lastResult: state.contents[state.front],
        lastMessage: LinearDataStructureMessages.peeked
    }
}

/**
 * Implements a simple Queue (FIFO) in a purely functional style.
 * 
 * @param state The current state of the queue.
 * @param action The action to undertake
 * @returns The new state after the action is attempted
 */
const queueReducer = <T>(state: QueueState<T>, action: LinearStructureAction<T>) => {
    switch (action.type) {
        case 'push': return queuePush(state, action.value);
        case 'pop': return queuePop(state);
        case 'peek': return queuePeek(state);
    }
}

export default queueReducer;