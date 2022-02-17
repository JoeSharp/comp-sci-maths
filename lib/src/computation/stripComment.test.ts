import stripComment from './stripComment'

describe('Strip Comment', () => {
    test('No comment', () => {
        const s = stripComment('input something;')
        expect(s).toBe('input something;')
    })

    test('Multi-line Comment', () => {
        const s = stripComment('/** A load of')
        expect(s).toBe('')
    })

    test('Multi-line Comment', () => {
        const s = stripComment(' * This is midway')
        expect(s).toBe('')
    })

    test('Multi-line Comment', () => {
        const s = stripComment(' */')
        expect(s).toBe('')
    })


    test('Just whitespace to remove', () => {
        const s = stripComment('input something;    ');
        expect(s).toBe('input something;')
    })

    test('Remove from end', () => {
        const s = stripComment('input something; // this is some commenting fo-shizzle');
        expect(s).toBe('input something;');
    })
})