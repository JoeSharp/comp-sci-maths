export enum LinearDataStructureMessages {
    newStructure = 'New Data Structure Created',
    full = 'Structure was Full',
    empty = 'Structure was Empty',
    removed = 'Item Removed',
    added = 'Item Added',
    peeked = 'Item Peeked',
    notFound = 'Item Not Found'
}

interface LinearStructureActionPush<T> {
    type: 'push',
    value: T
}

interface LinearStructureActionPop {
    type: 'pop'
}

interface LinearStructureActionPeek {
    type: 'peek'
}

interface LinearStructureActionReset {
    type: 'reset'
}

export type LinearStructureAction<T> = LinearStructureActionPush<T> |
    LinearStructureActionPop |
    LinearStructureActionPeek |
    LinearStructureActionReset;

export interface LinearStructureState<T> {
    contents: (T | null)[];
    capacity: number,
    lastResult: T | null;
    lastMessage: LinearDataStructureMessages;
    size: number;
}

export const DEFAULT_CAPACITY = 10;

export const getInitialLinearStructureState = <T>(capacity: number = DEFAULT_CAPACITY): LinearStructureState<T> => ({
    contents: Array(capacity).fill(null),
    capacity,
    lastResult: null,
    lastMessage: LinearDataStructureMessages.newStructure,
    size: 0
})

export const linearStructureError = <STATE extends LinearStructureState<any>>(state: STATE, lastMessage: LinearDataStructureMessages): STATE => ({
    ...state,
    lastMessage,
    lastResult: null
})

export type LinearDataStructureReducer<T, STATE extends LinearStructureState<T>> = (state: STATE, action: LinearStructureAction<T>) => STATE;