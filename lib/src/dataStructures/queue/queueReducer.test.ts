import { LinearDataStructureMessages } from "./linearDataStructure";
import queueReducer, { getInitialQueueState } from "./queueReducer";

describe("Queue (functional implementation)", () => {
    test("Simple Queue Reducer", () => {
        let queueState = getInitialQueueState<number>(6);

        queueState = queueReducer(queueState, { type: 'push', value: 5 });
        queueState = queueReducer(queueState, { type: 'push', value: 7 });
        queueState = queueReducer(queueState, { type: 'push', value: 3 });
        queueState = queueReducer(queueState, { type: 'push', value: 1 });
        queueState = queueReducer(queueState, { type: 'push', value: 9 });

        queueState = queueReducer(queueState, { type: 'pop' });
        expect(queueState.lastResult).toBe(5);
        queueState = queueReducer(queueState, { type: 'pop' });
        expect(queueState.lastResult).toBe(7);
        queueState = queueReducer(queueState, { type: 'pop' });
        expect(queueState.lastResult).toBe(3);

        queueState = queueReducer(queueState, { type: 'push', value: 8 });
        queueState = queueReducer(queueState, { type: 'push', value: 6 });

        queueState = queueReducer(queueState, { type: 'pop' });
        expect(queueState.lastResult).toBe(1);
        queueState = queueReducer(queueState, { type: 'pop' });
        expect(queueState.lastResult).toBe(9);
        queueState = queueReducer(queueState, { type: 'pop' });
        expect(queueState.lastResult).toBe(8);

        queueState = queueReducer(queueState, { type: 'push', value: 12 });
        queueState = queueReducer(queueState, { type: 'push', value: 14 });
        queueState = queueReducer(queueState, { type: 'push', value: 18 });
        queueState = queueReducer(queueState, { type: 'push', value: 21 });

        queueState = queueReducer(queueState, { type: 'pop' });
        expect(queueState.lastResult).toBe(6);

        queueState = queueReducer(queueState, { type: 'pop' });
        expect(queueState.lastResult).toBe(12);
        queueState = queueReducer(queueState, { type: 'pop' });
        expect(queueState.lastResult).toBe(14);
        queueState = queueReducer(queueState, { type: 'pop' });
        expect(queueState.lastResult).toBe(18);
        queueState = queueReducer(queueState, { type: 'pop' });
        expect(queueState.lastResult).toBe(21);
    })

    test("Empty Queue Reports Correctly", () => {
        let queueState = getInitialQueueState<number>();

        queueState = queueReducer(queueState, { type: 'push', value: 5 });
        queueState = queueReducer(queueState, { type: 'push', value: 7 });

        queueState = queueReducer(queueState, { type: 'pop' });
        queueState = queueReducer(queueState, { type: 'pop' });
        queueState = queueReducer(queueState, { type: 'pop' });
        expect(queueState.lastMessage).toBe(LinearDataStructureMessages.empty);

    })

    test("Full Queue Reports Correctly", () => {
        let queueState = getInitialQueueState<number>(6);

        queueState = queueReducer(queueState, { type: 'push', value: 5 });
        queueState = queueReducer(queueState, { type: 'push', value: 7 });
        queueState = queueReducer(queueState, { type: 'push', value: 3 });
        queueState = queueReducer(queueState, { type: 'push', value: 1 });
        queueState = queueReducer(queueState, { type: 'push', value: 9 });
        queueState = queueReducer(queueState, { type: 'push', value: 13 });
        expect(queueState.lastMessage).toBe(LinearDataStructureMessages.added);
        queueState = queueReducer(queueState, { type: 'push', value: 12 });
        expect(queueState.lastMessage).toBe(LinearDataStructureMessages.full);

    })
})