import { Optional } from "../../types";

export enum LinearDataStructureMessages {
    newStructure = 'New Data Structure Created',
    full = 'Structure was Full',
    empty = 'Structure was Empty',
    popped = 'Item Popped',
    pushed = 'Item Pushed',
    peeked = 'Item Peeked'
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

export type LinearStructureAction<T> = LinearStructureActionPush<T> | LinearStructureActionPop | LinearStructureActionPeek;

export interface LinearStructureState<T> {
    contents: Optional<T>[];
    capacity: number,
    lastResult: T | null;
    lastMessage: LinearDataStructureMessages;
}

export const DEFAULT_CAPACITY = 10;

export const getInitialLinearStructureState = <T>(capacity: number = DEFAULT_CAPACITY): LinearStructureState<T> => ({
    contents: Array(capacity).fill(null),
    capacity,
    lastResult: null,
    lastMessage: LinearDataStructureMessages.newStructure
})

export const linearStructureError = <STATE extends LinearStructureState<any>>(state: STATE, lastMessage: LinearDataStructureMessages): STATE => ({
    ...state,
    lastMessage,
    lastResult: null
})