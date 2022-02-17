
// class HashTable(Generic[T]):
// __data: List[Optional[LinkedItem]]
import { createHash } from 'crypto';
import { defaultEqualityCheck } from 'common';
import { NO_MATCH } from '../../algorithms/search/common';
import { EqualityCheck } from 'types';

import LinkedList from "../linkedList/LinkedList";

class HashTable<T> {
    data: LinkedList<T>[];
    maxRange: number

    constructor(maxRange: number) {
        this.data = [];
        this.maxRange = maxRange;
    }

    addItem(item: T): this {
        const hash = this.getHash(item);

        if (!this.data[hash]) {
            this.data[hash] = new LinkedList();
        }

        this.data[hash].append(item);

        return this;
    }

    contains(item: T, equalityCheck: EqualityCheck<T> = defaultEqualityCheck): boolean {
        const hash = this.getHash(item);

        if (!!this.data[hash]) {
            const foundIndex = this.data[hash].findMatch((a) => equalityCheck(a, item));
            return foundIndex !== NO_MATCH;
        }

        return false;
    }

    getHash(item: T): number {
        return parseInt(createHash('sha256').update(`${item}`).digest('hex'), 16) % this.maxRange;
    }
}

export default HashTable;