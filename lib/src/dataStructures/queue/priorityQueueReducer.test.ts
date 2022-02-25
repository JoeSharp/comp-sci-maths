import {
    getInitialPriorityQueueState,
    priorityQueueReducer
} from "./priorityQueueReducer";

describe("Priority Queue", () => {
    test("Priority Queue", () => {
        let state = getInitialPriorityQueueState<string>(20);

        state = priorityQueueReducer(state, { type: 'enqueue', value: "Indigo", priority: 10 });
        state = priorityQueueReducer(state, { type: 'enqueue', value: "Joe", priority: 4 });
        state = priorityQueueReducer(state, { type: 'enqueue', value: "Kate", priority: 7 });
        state = priorityQueueReducer(state, { type: 'dequeue' });
        const { lastResult: { value: a } } = state; // Indigo
        state = priorityQueueReducer(state, { type: 'enqueue', value: "Tom", priority: 9 });
        state = priorityQueueReducer(state, { type: 'enqueue', value: "Kirsten", priority: 3 });
        state = priorityQueueReducer(state, { type: 'dequeue' });
        const { lastResult: { value: b } } = state; // Tom
        state = priorityQueueReducer(state, { type: 'enqueue', value: "Nina", priority: 4 });
        state = priorityQueueReducer(state, { type: 'dequeue' });
        const { lastResult: { value: c } } = state; // Kate
        state = priorityQueueReducer(state, { type: 'enqueue', value: "Gaz", priority: 5 });
        state = priorityQueueReducer(state, { type: 'dequeue' });
        const { lastResult: { value: d } } = state; // Gaz
        state = priorityQueueReducer(state, { type: 'enqueue', value: "Steve", priority: 2 });
        state = priorityQueueReducer(state, { type: 'dequeue' });
        const { lastResult: { value: e } } = state; // Joe
        state = priorityQueueReducer(state, { type: 'enqueue', value: "Louise", priority: 8 });
        state = priorityQueueReducer(state, { type: 'enqueue', value: "Chris", priority: 7 });
        state = priorityQueueReducer(state, { type: 'dequeue' });
        const { lastResult: { value: f } } = state; // Louise
        state = priorityQueueReducer(state, { type: 'dequeue' });
        const { lastResult: { value: g } } = state; // Chris
        state = priorityQueueReducer(state, { type: 'dequeue' });
        const { lastResult: { value: h } } = state; // Nina

        state = priorityQueueReducer(state, { type: 'enqueue', value: "Jenny", priority: 12 });
        state = priorityQueueReducer(state, { type: 'enqueue', value: "Nick", priority: 1 });

        state = priorityQueueReducer(state, { type: 'dequeue' });
        const { lastResult: { value: i } } = state; // Jenny
        state = priorityQueueReducer(state, { type: 'dequeue' });
        const { lastResult: { value: j } } = state; // Kirsten
        state = priorityQueueReducer(state, { type: 'dequeue' });
        const { lastResult: { value: k } } = state; // Steve
        state = priorityQueueReducer(state, { type: 'dequeue' });
        const { lastResult: { value: l } } = state; // Nick

        expect(a).toEqual({ value: "Indigo", priority: 10 });
        expect(b).toEqual({ value: "Tom", priority: 9 });
        expect(c).toEqual({ value: "Kate", priority: 7 });
        expect(d).toEqual({ value: "Gaz", priority: 5 });
        expect(e).toEqual({ value: "Joe", priority: 4 });
        expect(f).toEqual({ value: "Louise", priority: 8 });
        expect(g).toEqual({ value: "Chris", priority: 7 });
        expect(h).toEqual({ value: "Nina", priority: 4 });
        expect(i).toEqual({ value: "Jenny", priority: 12 });
        expect(j).toEqual({ value: "Kirsten", priority: 3 });
        expect(k).toEqual({ value: "Steve", priority: 2 });
        expect(l).toEqual({ value: "Nick", priority: 1 });
    });
})