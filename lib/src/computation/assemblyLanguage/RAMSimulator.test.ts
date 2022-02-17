import RAMSimulator from "./RAMSimulator"

describe('RAM Simulator', () => {
    test('Simple Set/Get', () => {
        const mem = new RAMSimulator(100);
        mem.set(4, 67);
        mem.set(78, 9);
        mem.set(96, 83);

        expect(mem.get(4)).toBe(67);
        expect(mem.get(78)).toBe(9);
        expect(mem.get(96)).toBe(83);
    });

    test('Get Default Value', () => {
        const mem = new RAMSimulator(100);
        expect(mem.get(4)).toBe(0);
        expect(mem.get(78)).toBe(0);
        expect(mem.get(96)).toBe(0);
    });

    test('Get Negative Throws Error', () => {
        const mem = new RAMSimulator(100);
        expect(() => mem.get(-9)).toThrowError();
    })

    test('Get Beyond Size Throws Error', () => {
        const mem = new RAMSimulator(100);
        expect(() => mem.get(101)).toThrowError();
    })

    test('Named Memory', () => {
        const mem = new RAMSimulator(100);
        const LABEL_1 = 'foo';
        const LABEL_2 = 'bar';
        const LABEL_3 = 'buzz';

        mem.setLabel(LABEL_1, 10);
        mem.setLabel(LABEL_2, 20);
        mem.setLabel(LABEL_3, 30);

        mem.set(10, 56);
        mem.set(20, 89);
        mem.setLabelled(LABEL_3, 1238);

        expect(mem.getLabelled(LABEL_1)).toBe(56);
        expect(mem.getLabelled(LABEL_2)).toBe(89);
        expect(mem.getLabelled(LABEL_3)).toBe(1238);
    })
})