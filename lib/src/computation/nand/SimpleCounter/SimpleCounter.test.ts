import Counter from "./SimpleCounter"

describe('Simple Counter', () => {
    test('Increment', () => {
        const counter = new Counter();
        expect(counter.getCount()).toBe(0);

        counter.increment();
        expect(counter.getCount()).toBe(1);

        counter.increment(3);
        expect(counter.getCount()).toBe(4);

        counter.increment();
        expect(counter.getCount()).toBe(5);
    })
})