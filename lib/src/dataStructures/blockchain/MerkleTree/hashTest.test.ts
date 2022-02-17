import { anyHashIsOk, topXNibblesAreZero } from './hashTest'

describe("Hash Test", () => {
    test("Any Hash is OK", () => {
        expect(anyHashIsOk('foo')).toBeTruthy();
        expect(anyHashIsOk('bar')).toBeTruthy();
        expect(anyHashIsOk('literally anything is ok')).toBeTruthy();
    })

    test("Top 1 nibble is zero", () => {
        const topNibbleIsZero = topXNibblesAreZero(1);

        expect(topNibbleIsZero('0123')).toBeTruthy();
        expect(topNibbleIsZero('0012')).toBeTruthy();
        expect(topNibbleIsZero('5645')).toBeFalsy();
    })

    test("Top 3 nibbles are zero", () => {
        const topThreeNibblesAreZero = topXNibblesAreZero(3);

        expect(topThreeNibblesAreZero('000123')).toBeTruthy();
        expect(topThreeNibblesAreZero('000012')).toBeTruthy();
        expect(topThreeNibblesAreZero('005645')).toBeFalsy();
        expect(topThreeNibblesAreZero('075645')).toBeFalsy();
        expect(topThreeNibblesAreZero('125645')).toBeFalsy();
    })
})