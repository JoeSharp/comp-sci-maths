import DictionaryEncoder from "./DictionaryEncoder";

interface TestCase {
    name: string,
    text: string;
}

const TEST_CASES: TestCase[] = [
    {
        name: "Simple Sentence",
        text: `Raindrops the size of bullets thundered on the castle windows for days on end; the lake rose, the flower beds turned into muddy streams, and Hagrid's pumpkins swelled to the size of garden sheds`
    }, {
        name: "Odd Whitespace",
        text: `Foo   Bar
        Charlie Foo Foo Foo Foo Foo Foo Foo Bar Bar Bar Bar`
    }, {
        name: "Repeating Lines",
        text: `I must not tell lies
        I must not tell lies
        I must not tell lies
        I must not tell lies
        I must not tell lies
        I must not tell lies
        I must not tell lies
        I must not tell lies
        I must not tell lies
        I must not tell lies
        I must not tell lies
        I must not tell lies
        I must not tell lies
        I must not tell lies
        I must not tell lies
        I must not tell lies
        I must not tell lies
        I must not tell lies
        I must not tell lies
        I must not tell lies
        I must not tell lies
        I must not tell lies
        I must not tell lies
        I must not tell lies
        I must not tell lies
        I must not tell lies
        I must not tell lies
        I must not tell lies
        I must not tell lies
        I must not tell lies
        I must not tell lies
        I must not tell lies
        I must not tell lies
        I must not tell lies
        I must not tell lies
        I must not tell lies`
    }
]

describe("Dictionary Encoder", () => {
    TEST_CASES.forEach(({ name, text }) => {
        test(name, () => {
            const encoder = new DictionaryEncoder()
                .withText(text);

            const rebuiltText = encoder.rebuild();
            expect(rebuiltText).toBe(text);

            const encoded = encoder.encode();
            const newEncoder = DictionaryEncoder.decode(encoded);
            const rebuiltFromAfar = newEncoder.rebuild();
            expect(rebuiltFromAfar).toBe(text);

            const efficiency = encoder.assessEfficiency();
            // expect(efficiency).toBeGreaterThan(1.0);
        })
    })
});