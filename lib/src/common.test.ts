import { generateLineRef } from "./common"

describe('Common', () => {
    test('Line References', () => {
        const fromNothing = generateLineRef();
        expect(fromNothing.id).toBeDefined();

        const justString = generateLineRef('bob');
        expect(justString.originalLine).toBe('bob');
        expect(justString.id).toBeDefined();

        const noId = generateLineRef({
            originalLine: 'monkey',
            originalLineNumber: 56,
            sourceFilename: 'foo.bar',
            sourceId: '789'
        });
        expect(noId.id).toBeDefined();
        expect(noId.originalLine).toBe('monkey');
        expect(noId.sourceFilename).toBe('foo.bar');
        expect(noId.sourceId).toBe('789');

        const testId = 'SOME-RANDOM-ID';
        const withId = generateLineRef({
            id: testId,
            originalLine: 'foo',
        });
        expect(withId.id).toBe(testId);
        expect(withId.originalLine).toBe('foo');
        expect(withId.sourceFilename).toBeUndefined();
    })
})