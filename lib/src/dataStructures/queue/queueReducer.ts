import {
    LinearDataStructureMessages,
    LinearStructureAction,
    LinearStructureState,
    DEFAULT_CAPACITY,
    getInitialLinearStructureState,
    linearStructureError
} from "../linearDataStructure/linearDataStructure";

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

export const isQueueEmpty = ({ front }: QueueState<any>): boolean => front === FRONT_IF_EMPTY;
export const isQueueFull = ({ front, rear }: QueueState<any>): boolean => front === rear;

export const queuePush = <T>(state: QueueState<T>, value: T): QueueState<T> => {
    if (isQueueFull(state)) {
        return linearStructureError(state, LinearDataStructureMessages.full);
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
        size: state.size + 1,
        contents,
        front,
        rear,
        lastMessage: LinearDataStructureMessages.added
    }
}

export const queuePop = <T>(state: QueueState<T>): QueueState<T> => {
    if (isQueueEmpty(state)) {
        return linearStructureError(state, LinearDataStructureMessages.empty);
    }

    // Locate the item
    const contents = [...state.contents]
    const lastResult = contents[state.front];

    // Clear this spot in the array, not technically necessary but it looks nicer on the UI
    contents[state.front] = undefined;

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
        size: state.size - 1,
        contents,
        front,
        lastResult,
        lastMessage: LinearDataStructureMessages.removed
    }
}

export const queuePeek = <T>(state: QueueState<T>): QueueState<T> => {
    if (isQueueEmpty(state)) {
        return linearStructureError(state, LinearDataStructureMessages.empty);
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
export const queueReducer = <T>(state: QueueState<T>, action: LinearStructureAction<T>): QueueState<T> => {
    switch (action.type) {
        case 'push': return queuePush(state, action.value);
        case 'pop': return queuePop(state);
        case 'peek': return queuePeek(state);
        case 'reset': return getInitialQueueState();
    }
}

export default queueReducer;