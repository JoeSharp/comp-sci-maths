import { MatchFunction, Optional } from "../../types";
import {
    LinearStructureState,
    DEFAULT_CAPACITY,
    getInitialLinearStructureState,
    LinearDataStructureMessages,
    linearStructureError
} from "../linearDataStructure/linearDataStructure";
import {
    getInitialStackState,
    isStackEmpty,
    stackPop,
    stackPush,
    StackState
} from "../stack/stackReducer";

export const INVALID_PTR = -1;

export interface LinkedListItem<T> {
    value: T;
    nextPtr: number;
}

export interface LinkedListState<T> extends LinearStructureState<LinkedListItem<T>> {
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
    logicalIndex: number
}

interface LinkedListRemoveMatchAction<T> {
    type: 'removeMatch',
    match: MatchFunction<T>
}


interface LinkedListInsertAction<T> {
    type: 'insert',
    logicalIndex: number,
    value: T
}

interface LinkedListResetAction {
    type: 'reset'
}

export type LinkedListAction<T> = LinkedListAppendAction<T> |
    LinkedListRemoveMatchAction<T> |
    LinkedListRemoveAction |
    LinkedListInsertAction<T> |
    LinkedListResetAction;

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
export const linkedListTraverse = <T>(state: LinkedListState<T>,
    stop: (item: LinkedListItem<T>, logicalIndex: number, physicalIndex: number) => boolean = () => false): number[] => {
    const indexes: number[] = [];

    if (isListEmpty(state)) return indexes;

    let currLogicalIndex = 0;
    let currPhysicalIndex = state.start;
    while (currPhysicalIndex !== INVALID_PTR && !stop(state.contents[currPhysicalIndex], currLogicalIndex, currPhysicalIndex)) {
        indexes.push(currPhysicalIndex);
        const itemTest = state.contents[currPhysicalIndex];
        currPhysicalIndex = itemTest.nextPtr;

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
export const linkedListGet = <T>(state: LinkedListState<T>, logicalIndex: number): Optional<LinkedListItem<T>> => {
    let physicalIndex = INVALID_PTR;
    linkedListTraverse(state, (_, currLogicalIndex, currPhysicalIndex) => {
        if (currLogicalIndex === logicalIndex) {
            physicalIndex = currPhysicalIndex;
            return true;
        }

        return false;
    });
    return physicalIndex !== INVALID_PTR ? state.contents[physicalIndex] : undefined;
}

export const linkedListGetAll = <T>(state: LinkedListState<T>): T[] => {
    return linkedListTraverse(state)
        .map(index => state.contents[index])
        .map(({ value }) => value);
}

export const linkedListGetStoreIndex = <T>(state: LinkedListState<T>): {
    newPhysicalIndex: number | undefined,
    nextFree: number,
    freeNodes: StackState<number>
} => {
    let newPhysicalIndex = INVALID_PTR;
    let freeNodes = state.freeNodes;
    let nextFree = state.nextFree;
    if (isStackEmpty(state.freeNodes)) {
        // If our 'next free' pointer is still within range
        if (nextFree < state.capacity) {
            newPhysicalIndex = nextFree;
            nextFree += 1;
        }
    } else {
        // Just pull an item off the stack
        freeNodes = stackPop(freeNodes);
        newPhysicalIndex = freeNodes.lastResult;
    }

    return {
        newPhysicalIndex,
        nextFree,
        freeNodes
    }
}

export const linkedListAppend = <T>(
    state: LinkedListState<T>,
    value: T
): LinkedListState<T> => {
    const contents = [...state.contents];
    let start = state.start;
    const newItem: LinkedListItem<T> = {
        value,
        nextPtr: INVALID_PTR
    }

    // Find the last item in the logical list
    const indexes = linkedListTraverse(state);
    const lastItem: Optional<LinkedListItem<T>> = indexes.length > 0 ?
        state.contents[indexes[indexes.length - 1]] : undefined;

    const {
        newPhysicalIndex,
        nextFree,
        freeNodes
    } = linkedListGetStoreIndex(state)

    // The structure is full, can this ever happen?
    if (newPhysicalIndex === INVALID_PTR) {
        return linearStructureError(state, LinearDataStructureMessages.full);
    }

    contents[newPhysicalIndex] = newItem;
    if (lastItem !== undefined) {
        lastItem.nextPtr = newPhysicalIndex;
    } else {
        start = newPhysicalIndex;
    }

    return {
        contents,
        capacity: state.capacity,
        start,
        freeNodes,
        nextFree,
        lastResult: newItem,
        lastMessage: LinearDataStructureMessages.added,
        size: state.size + 1
    };
}

export const linkedListRemoveLogicalIndex = <T>(state: LinkedListState<T>,
    logicalIndex: number,
    physicalIndexes: number[]
): LinkedListState<T> => {
    const physicalIndex = physicalIndexes[logicalIndex];

    const contents = [...state.contents];
    let start = state.start;
    let freeNodes = state.freeNodes;

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
    const lastResult = contents[physicalIndex];
    contents[physicalIndex] = undefined;

    return {
        ...state,
        size: state.size - 1,
        contents,
        start,
        freeNodes,
        lastResult,
        lastMessage: LinearDataStructureMessages.removed
    };
}

export const linkedListRemoveMatch = <T>(state: LinkedListState<T>, match: MatchFunction<T>): LinkedListState<T> => {
    if (isListEmpty(state)) return linearStructureError(state, LinearDataStructureMessages.empty);

    let logicalIndex = INVALID_PTR;
    let physicalIndex = INVALID_PTR;

    const physicalIndexes = linkedListTraverse(state, (_, currLogicalIndex, currPhysicalIndex) => {
        if (match(state.contents[currPhysicalIndex].value)) {
            logicalIndex = currLogicalIndex;
            physicalIndex = currPhysicalIndex;
            return true; // We can stop traversing
        }

        // Keep looking
        return false;
    });

    if (logicalIndex === INVALID_PTR || physicalIndex === INVALID_PTR) return linearStructureError(state, LinearDataStructureMessages.notFound)

    // Push the last physical index on.
    physicalIndexes.push(physicalIndex);

    return linkedListRemoveLogicalIndex(state, logicalIndex, physicalIndexes);
}

export const linkedListRemove = <T>(state: LinkedListState<T>, logicalIndex: number): LinkedListState<T> => {
    if (isListEmpty(state)) return linearStructureError(state, LinearDataStructureMessages.empty);
    const physicalIndexes = linkedListTraverse(state, (_, currLogicalIndex) => currLogicalIndex > logicalIndex);
    return linkedListRemoveLogicalIndex(state, logicalIndex, physicalIndexes);
}

export const linkedListInsert = <T>(state: LinkedListState<T>, logicalIndex: number, value: T): LinkedListState<T> => {
    // Make copies of those state items likely to change
    let start = state.start;
    const contents = [...state.contents];
    const newItem: LinkedListItem<T> = {
        value,
        nextPtr: INVALID_PTR
    }

    // Find somewhere to put the new item
    const {
        newPhysicalIndex,
        nextFree,
        freeNodes
    } = linkedListGetStoreIndex(state);

    // The structure is full, can this ever happen?
    if (newPhysicalIndex === INVALID_PTR) {
        return linearStructureError(state, LinearDataStructureMessages.full);
    }

    // Are we inserting at start?
    if (logicalIndex === 0) {
        newItem.nextPtr = state.start;
        start = newPhysicalIndex;
    } else {
        const physicalIndexes = linkedListTraverse(state, (_, currLogicalIndex,) => currLogicalIndex > logicalIndex);

        // Do we have enough items?
        if (physicalIndexes.length <= logicalIndex) return linearStructureError(state, LinearDataStructureMessages.notFound);

        // Where is the previous item held?
        const physicalIndex = physicalIndexes[physicalIndexes.length - 2];

        newItem.nextPtr = contents[physicalIndex].nextPtr;
        contents[physicalIndex].nextPtr = newPhysicalIndex;
    }

    // Place the item in the physical list
    contents[newPhysicalIndex] = newItem;

    return {
        ...state,
        size: state.size + 1,
        start,
        contents,
        nextFree,
        freeNodes,
        lastResult: newItem,
        lastMessage: LinearDataStructureMessages.added
    }
}


export const linkedListReducer = <T>(state: LinkedListState<T>, action: LinkedListAction<T>): LinkedListState<T> => {
    switch (action.type) {
        case "append": return linkedListAppend(state, action.value);
        case "remove": return linkedListRemove(state, action.logicalIndex);
        case "removeMatch": return linkedListRemoveMatch(state, action.match);
        case "insert": return linkedListInsert(state, action.logicalIndex, action.value);
        case "reset": return getInitialLinkedListState();
    }
}

export default linkedListReducer;