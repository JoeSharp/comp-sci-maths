import {
    LinkedListState,
    getInitialLinkedListState,
    linkedListReducer,
    linkedListGet,
    linkedListTraverse,
    LinkedListItem,
    INVALID_PTR
} from '../linkedList/linkedListReducer';
import { DEFAULT_CAPACITY, LinearDataStructureMessages } from './linearDataStructure';

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

export const priorityQueueEnqueue = <T>(state: PriorityQueueState<T>, newItem: PrioritisedItem<T>): PriorityQueueState<T> => {
    let insertIndex = INVALID_PTR;

    linkedListTraverse(state,
        (item, logicalIndex) => {
            // Should we insert ahead of this one?
            if (item.value.priority < newItem.priority) {
                insertIndex = logicalIndex;
                return true;
            }
            return false;
        })

    if (insertIndex === INVALID_PTR) {
        return linkedListReducer(state, { type: 'append', value: newItem });
    } else {
        return linkedListReducer(state, { type: 'insert', logicalIndex: insertIndex, value: newItem });
    }
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
        case 'enqueue': return priorityQueueEnqueue(state, { value: action.value, priority: action.priority });
        case 'dequeue': return priorityQueueDequeue(state);
        case 'peek': return priorityQueuePeek(state);
        case 'reset': return getInitialLinkedListState();
    }
}
