export interface DictionaryFile {
    wordsByNumber: {
        [id: number]: string;
    }
    encoded: number[];
}

const DICTIONARY_HEADER = '[Dictionary]';
const ENCODED_HEADER = '[Encoded]';
const PART_DELIMITER = '|';

class DictionaryEncoder {
    nextNumber: number;
    wordsByNumber: {
        [id: number]: string;
    }
    numbersByWords: {
        [word: string]: number;
    }
    encoded: number[];

    constructor() {
        this.nextNumber = 0;
        this.wordsByNumber = {};
        this.numbersByWords = {};
        this.encoded = [];
    }

    registerWord(id: number, word: string): this {
        this.wordsByNumber[id] = word;
        this.numbersByWords[word] = id;
        return this;
    }

    getWordNumber(word: string): number {
        if (this.numbersByWords[word] === undefined) {
            const id = this.nextNumber++;
            this.registerWord(id, word);
        }

        return this.numbersByWords[word];
    }

    withText(theText: string): this {
        const FIND_BITS_REGEX = /[^\s]+[\s]*/gm;
        theText.match(FIND_BITS_REGEX).forEach((word) => {
            const wordNumber = this.getWordNumber(word);
            this.encoded.push(wordNumber);
        });

        return this;
    }

    encode(): string {
        return [
            DICTIONARY_HEADER,
            ...Object.entries(this.wordsByNumber).map(([id, word]) => `${id}=${word}`),
            ENCODED_HEADER,
            ...this.encoded
        ].join(PART_DELIMITER);
    }

    /**
     * Rebuild the original text from the encoded parts.
     * @param transformWord A function that can be used to make in line changes to specific identified words.
     * This might be used by a user interface to create a version of the text with highlighting token.
     * @returns
     */
    rebuild(transformWord: (id: number, word: string) => string = (id, word) => word): string {
        return this.encoded
            .map(id => transformWord(id, this.wordsByNumber[id]))
            .join('');
    }

    /**
     *
     * @returns The rebuilt length / encoded length. It should be higher than 1 if we saved data, less than 1 if it actually cost us.
     */
    assessEfficiency(): number {
        const encoded = this.encode();
        const rebuilt = this.rebuild();
        return rebuilt.length / encoded.length;
    }

    static decode(encoded: string): DictionaryEncoder {
        const dictionaryEncoder = new DictionaryEncoder();

        const parts = encoded.split(PART_DELIMITER);
        let dictionaryDone = false;
        parts.forEach(part => {
            switch (part) {
                case DICTIONARY_HEADER:
                    break;
                case ENCODED_HEADER:
                    dictionaryDone = true;
                    break;
                default:
                    if (dictionaryDone) {
                        dictionaryEncoder.encoded.push(parseInt(part, 10));
                    } else {
                        const subParts = part.split('=');
                        if (subParts.length !== 2) {
                            throw new Error(`Invalid dictionary entry ${part}`)
                        }
                        const [idStr, word] = subParts;
                        dictionaryEncoder.registerWord(parseInt(idStr, 10), word);
                    }
                    break;
            }
        })

        return dictionaryEncoder;
    }
}

export default DictionaryEncoder;