import {
    LinkedListState,
    getInitialLinkedListState,
    linkedListReducer,
    linkedListGet,
    linkedListTraverse,
    INVALID_PTR
} from '../linkedList/linkedListReducer';
import { DEFAULT_CAPACITY, LinearDataStructureMessages } from '../linearDataStructure/linearDataStructure';

export interface PrioritisedItem<T> {
    value: T;
    priority: number;
}

export type PriorityQueueState<T> = LinkedListState<PrioritisedItem<T>>;

export interface EnqueuePrioritisedAction<T> {
    type: 'enqueue',
    value: T,
    priority: number
}

export interface DequeuePrioritised {
    type: 'dequeue',
}

export interface PeekPrioritised {
    type: 'peek'
}

export interface ResetAction {
    type: "reset"
}

export const getInitialPriorityQueueState =
    <T>(capacity: number = DEFAULT_CAPACITY): PriorityQueueState<T> =>
        getInitialLinkedListState<PrioritisedItem<T>>(capacity);

export type PriorityQueueAction<T> = EnqueuePrioritisedAction<T> |
    DequeuePrioritised |
    PeekPrioritised |
    ResetAction;

export const priorityQueueEnqueue = <T>(state: PriorityQueueState<T>, newItem: T, priority: number): PriorityQueueState<T> => {
    let insertIndex = INVALID_PTR;
    const newPrioritisedItem: PrioritisedItem<T> = { value: newItem, priority }

    linkedListTraverse(state,
        (item, logicalIndex) => {
            // Should we insert ahead of this one?
            if (item.value.priority < priority) {
                insertIndex = logicalIndex;
                return true;
            }
            return false;
        })

    let newState;
    if (insertIndex === INVALID_PTR) {
        newState = linkedListReducer(state, { type: 'append', value: newPrioritisedItem });
    } else {
        newState = linkedListReducer(state, { type: 'insert', logicalIndex: insertIndex, value: newPrioritisedItem });
    }
    return newState;
}

export const priorityQueueDequeue = <T>(state: PriorityQueueState<T>) =>
    linkedListReducer(state, { type: 'remove', logicalIndex: 0 });

export const priorityQueuePeek = <T>(state: PriorityQueueState<T>): PriorityQueueState<T> =>
({
    ...state,
    lastResult: linkedListGet(state, 0),
    lastMessage: LinearDataStructureMessages.peeked
})

/**
 * Implements a simple Queue (FIFO) in a purely functional style.
 *
 * @param state The current state of the queue.
 * @param action The action to undertake
 * @returns The new state after the action is attempted
 */
export const priorityQueueReducer = <T>(state: PriorityQueueState<T>, action: PriorityQueueAction<T>): PriorityQueueState<T> => {
    switch (action.type) {
        case 'enqueue': return priorityQueueEnqueue(state, action.value, action.priority);
        case 'dequeue': return priorityQueueDequeue(state);
        case 'peek': return priorityQueuePeek(state);
        case 'reset': return getInitialLinkedListState();
    }
}

export default priorityQueueReducer;