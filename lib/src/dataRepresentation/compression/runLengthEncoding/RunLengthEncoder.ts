import { EqualityCheck } from '../../../types'
import { defaultEqualityCheck } from '../../../common';

/**
 * A class the execute run length encoding on a building input.
 * It accepts more and more data accumulating an 'encoded' array.
 */
class RunLengthEncoder<T> {
    equalityCheck: EqualityCheck<T>;
    encoded: {
        value: T,
        count: number
    }[];

    constructor(equalityCheck: EqualityCheck<T> = defaultEqualityCheck) {
        this.equalityCheck = equalityCheck;
        this.encoded = [];
    }

    update(...data: T[]): this {
        // Guard statement against empty input
        if (data.length === 0) return this;

        // If this is the first data item...
        let startIndex = 0;
        if (this.encoded.length === 0) {
            this.encoded.push({
                value: data[startIndex],
                count: 1
            });
            startIndex++;
        }

        for (let i = startIndex; i < data.length; i++) {
            if (this.equalityCheck(this.encoded[this.encoded.length - 1].value, data[i])) {
                this.encoded[this.encoded.length - 1].count++;
            } else {
                this.encoded.push({
                    value: data[i],
                    count: 1
                });
            }
        }

        return this;
    }

    getEncoded() {
        return this.encoded;
    }
}

export default RunLengthEncoder;