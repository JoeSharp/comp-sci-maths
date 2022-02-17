import RunLengthEncoder from "./RunLengthEncoder";

describe("Run-Length Encoding", () => {
    test("Simple Numbers", () => {
        const encoder = new RunLengthEncoder<number>();
        encoder.update(5, 5, 5, 5, 6, 6, 7, 7, 7, 1, 1, 1, 1);
        encoder.update(1, 1, 2, 2, 2, 2, 5);
        encoder.update(5, 5, 5, 5, 5);
        const rle = encoder.getEncoded();

        expect(rle.length).toBe(6);
        expect(rle[0].value).toBe(5);
        expect(rle[0].count).toBe(4);
        expect(rle[1].value).toBe(6);
        expect(rle[1].count).toBe(2);
        expect(rle[2].value).toBe(7);
        expect(rle[2].count).toBe(3);
        expect(rle[3].value).toBe(1);
        expect(rle[3].count).toBe(6);
        expect(rle[4].value).toBe(2);
        expect(rle[4].count).toBe(4);
        expect(rle[5].value).toBe(5);
        expect(rle[5].count).toBe(6);
    });

    test("Characters", () => {
        const encoder = new RunLengthEncoder<string>();
        encoder.update(..."aaaaaabbbccc");
        encoder.update(..."cdddeeeeef");
        const rle = encoder.getEncoded();

        expect(rle.length).toBe(6);
        expect(rle[0].value).toBe('a');
        expect(rle[0].count).toBe(6);
        expect(rle[1].value).toBe('b');
        expect(rle[1].count).toBe(3);
        expect(rle[2].value).toBe('c');
        expect(rle[2].count).toBe(4);
        expect(rle[3].value).toBe('d');
        expect(rle[3].count).toBe(3);
        expect(rle[4].value).toBe('e');
        expect(rle[4].count).toBe(5);
        expect(rle[5].value).toBe('f');
        expect(rle[5].count).toBe(1);
    });
})