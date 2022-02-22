import { MatchFunction, Optional } from "../../types";
import {
    LinearStructureState,
    DEFAULT_CAPACITY,
    getInitialLinearStructureState,
    LinearDataStructureMessages,
    linearStructureError
} from "../queue/linearDataStructure";
import {
    getInitialStackState,
    isStackEmpty,
    stackPop,
    StackState
} from "../stack/stackReducer";

const INVALID_PTR = -1;

interface LinkedListItem<T> {
    value: T;
    nextPtr: number;
}

interface LinkedListState<T> extends LinearStructureState<LinkedListItem<T>> {
    freeNodes: StackState<number>;
    start: number;
    nextFree: number;
}

export const getInitialLinkedListState = <T>(capacity: number = DEFAULT_CAPACITY): LinkedListState<T> => ({
    ...getInitialLinearStructureState(capacity),
    freeNodes: getInitialStackState(capacity),
    nextFree: 0,
    start: INVALID_PTR
});

interface LinkedListAppendAction<T> {
    type: 'append',
    value: T
}

interface LinkedListRemoveAction {
    type: 'remove',
    index: number
}

interface LinkedListRemoveMatchAction<T> {
    type: 'removeMatch',
    match: MatchFunction<T>
}


interface LinkedListInsertAction<T> {
    type: 'insert',
    index: number,
    value: T
}

export type LinkedListAction<T> = LinkedListAppendAction<T> | LinkedListRemoveMatchAction<T> | LinkedListRemoveAction | LinkedListInsertAction<T>;


export const isListEmpty = ({ start }: LinkedListState<any>): boolean => start === INVALID_PTR;
export const isListFull = ({ capacity, nextFree, freeNodes }: LinkedListState<any>): boolean =>
    isStackEmpty(freeNodes) && nextFree >= capacity;

export const linkedListGet = <T>(state: LinkedListState<T>, index: number): Optional<LinkedListItem<T>> => {
    if (isListEmpty(state)) return undefined;

    let item = undefined;

    let indexTest = 0;
    let ptr = state.start;
    while (ptr !== INVALID_PTR && item === undefined) {
        const itemTest = state.contents[ptr];
        ptr = itemTest.nextPtr;

        if (indexTest === index) {
            item = itemTest;
        }

        indexTest++;
    }

    return item;
}

export const linkedListGetAll = <T>(state: LinkedListState<T>): T[] => {
    const items: T[] = [];

    let ptr = state.start;
    while (ptr !== INVALID_PTR) {
        const item = state.contents[ptr];
        items.push(item.value);
        ptr = item.nextPtr;
    }

    return items;
}

export const linkedListGetStoreIndex = <T>(state: LinkedListState<T>): {
    storeIndex: number | undefined,
    nextFree: number,
    freeNodes: StackState<number>
} => {
    let storeIndex = INVALID_PTR;
    let freeNodes = state.freeNodes;
    let nextFree = state.nextFree;
    if (isStackEmpty(state.freeNodes)) {
        // If our 'next free' pointer is still within range
        if (nextFree < state.capacity) {
            storeIndex = nextFree;
            nextFree += 1;
        }
    } else {
        // Just pull an item off the stack
        freeNodes = stackPop(freeNodes);
        storeIndex = freeNodes.lastResult;
    }

    return {
        storeIndex,
        nextFree,
        freeNodes
    }
}

export const linkedListAppend = <T>(state: LinkedListState<T>, value: T): LinkedListState<T> => {
    let contents = [...state.contents];
    let start = state.start;
    const newItem: LinkedListItem<T> = {
        value,
        nextPtr: INVALID_PTR
    }

    // Find the end item
    let lastItem: Optional<LinkedListItem<T>> = undefined;
    let ptr = state.start;
    while (ptr !== INVALID_PTR) {
        lastItem = state.contents[ptr];
        ptr = lastItem.nextPtr;
    }

    const {
        storeIndex,
        nextFree,
        freeNodes
    } = linkedListGetStoreIndex(state)

    // The structure is full, can this ever happen?
    if (storeIndex === INVALID_PTR) {
        return linearStructureError(state, LinearDataStructureMessages.full);
    }

    contents[storeIndex] = newItem;
    if (lastItem !== undefined) {
        lastItem.nextPtr = storeIndex;
    } else {
        start = storeIndex;
    }

    return {
        contents,
        capacity: state.capacity,
        start,
        freeNodes,
        nextFree,
        lastResult: newItem,
        lastMessage: LinearDataStructureMessages.pushed
    };
}

export const linkedListRemoveMatch = <T>(state: LinkedListState<T>, match: MatchFunction<T>): LinkedListState<T> => {

    return state;
}

export const linkedListRemove = <T>(state: LinkedListState<T>, index: number): LinkedListState<T> => {

    return state;
}

export const linkedListInsert = <T>(state: LinkedListState<T>, index: number, value: T): LinkedListState<T> => {

    return state;
}


export const linkedListReducer = <T>(state: LinkedListState<T>, action: LinkedListAction<T>): LinkedListState<T> => {
    switch (action.type) {
        case "append": return linkedListAppend(state, action.value);
        case "remove": return linkedListRemove(state, action.index);
        case "removeMatch": return linkedListRemoveMatch(state, action.match);
        case "insert": return linkedListInsert(state, action.index, action.value);
    }
}

export default linkedListReducer;