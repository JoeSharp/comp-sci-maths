import { LinearDataStructureMessages } from "../queue/linearDataStructure";
import stackReducer, { getInitialStackState } from "./stackReducer";

describe("Stack (functional)", () => {
    test("Simple Stack of Numbers", () => {
        let state = getInitialStackState(20);
        state = stackReducer(state, { type: 'push', value: 5 });
        state = stackReducer(state, { type: 'push', value: 7 });
        state = stackReducer(state, { type: 'push', value: 10 });
        state = stackReducer(state, { type: 'pop' });
        expect(state.lastResult).toBe(10);

        state = stackReducer(state, { type: 'push', value: 21 });
        state = stackReducer(state, { type: 'push', value: 54 });
        state = stackReducer(state, { type: 'pop' });
        expect(state.lastResult).toBe(54);

        state = stackReducer(state, { type: 'push', value: 2 });
        state = stackReducer(state, { type: 'pop' });
        expect(state.lastResult).toBe(2);

        state = stackReducer(state, { type: 'push', value: 6 });
        state = stackReducer(state, { type: 'pop' });
        expect(state.lastResult).toBe(6);

        state = stackReducer(state, { type: 'pop' });
        expect(state.lastResult).toBe(21);
        state = stackReducer(state, { type: 'pop' });
        expect(state.lastResult).toBe(7);
        state = stackReducer(state, { type: 'pop' });
        expect(state.lastResult).toBe(5);
    });

    test("Stack Empty", () => {
        let state = getInitialStackState(20);
        state = stackReducer(state, { type: 'push', value: 5 });
        state = stackReducer(state, { type: 'push', value: 7 });
        state = stackReducer(state, { type: 'pop' });
        state = stackReducer(state, { type: 'pop' });
        state = stackReducer(state, { type: 'pop' });
        expect(state.lastMessage).toBe(LinearDataStructureMessages.empty);
    })

    test("Stack Full", () => {
        let state = getInitialStackState(3);
        state = stackReducer(state, { type: 'push', value: 5 });
        state = stackReducer(state, { type: 'push', value: 7 });
        state = stackReducer(state, { type: 'push', value: 9 });
        state = stackReducer(state, { type: 'push', value: 10 });
        expect(state.lastMessage).toBe(LinearDataStructureMessages.full);

        state = stackReducer(state, { type: 'pop' });
        expect(state.lastResult).toBe(9);

    })
})