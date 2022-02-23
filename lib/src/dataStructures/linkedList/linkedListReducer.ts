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
    stackPush,
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

/**
 * Retrieve the indexes of the list items up to the specified index.
 * This is the main function that traverses the pointers through the logical list.
 * 
 * @param state The current linked list state
 * @param logicalIndex The logical index of the item we traverse up to
 * @returns The indexes of the items as they appear in the underlyling array
 */
export const linkedListGetPhysicalIndexes = <T>(state: LinkedListState<T>,
    logicalIndex: Optional<number> = undefined): number[] => {
    const indexes: number[] = [];

    if (isListEmpty(state)) return indexes;

    let currLogicalIndex = 0;
    let ptr = state.start;
    while (ptr !== INVALID_PTR && (logicalIndex === undefined || currLogicalIndex <= logicalIndex)) {
        indexes.push(ptr);
        const itemTest = state.contents[ptr];
        ptr = itemTest.nextPtr;

        currLogicalIndex++;
    }

    return indexes;
}

/**
 * 
 * @param state The current linked list state
 * @param logicalIndex The index within the logical list of the item we are looking for
 * @returns 
 */
export const linkedListGet = <T>(state: LinkedListState<T>, logicalIndex: number): Optional<T> => {
    const itemIndexes = linkedListGetPhysicalIndexes(state, logicalIndex);
    return itemIndexes.length >= logicalIndex ? state.contents[itemIndexes[logicalIndex]].value : undefined;
}

export const linkedListGetAll = <T>(state: LinkedListState<T>): T[] => {
    return linkedListGetPhysicalIndexes(state)
        .map(index => state.contents[index])
        .map(({ value }) => value);
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

    // Find the last item in the logical list
    const indexes = linkedListGetPhysicalIndexes(state);
    let lastItem: Optional<LinkedListItem<T>> = indexes.length > 0 ?
        state.contents[indexes[indexes.length - 1]] : undefined;

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

export const linkedListRemove = <T>(state: LinkedListState<T>, logicalIndex: number): LinkedListState<T> => {
    if (isListEmpty(state)) return linearStructureError(state, LinearDataStructureMessages.empty);

    let contents = [...state.contents];
    let start = state.start;
    let freeNodes = state.freeNodes;
    const physicalIndexes = linkedListGetPhysicalIndexes(state, logicalIndex);
    const physicalIndex = physicalIndexes[logicalIndex];

    if (logicalIndex === 0) {
        // If we are removing the start of the list
        start = state.contents[physicalIndex].nextPtr;
    } else {
        // We are removing from end or middle of list, point the previous item at our next one
        state.contents[physicalIndexes[logicalIndex - 1]].nextPtr =
            state.contents[physicalIndexes[logicalIndex]].nextPtr;
    }

    // Clear out that item in the contents
    freeNodes = stackPush(freeNodes, physicalIndex);
    contents[physicalIndex] = undefined;

    return {
        ...state,
        contents,
        start,
        freeNodes
    };
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