import React from 'react';

import {
    binaryPositiveIntegerReducer, createBinaryNumber,
} from '@comp-sci-maths/lib/dist/dataRepresentation/binaryNumbers/binaryIntegers';
import {
    getTwosComplementIntegerFromDenary
} from '@comp-sci-maths/lib/dist/dataRepresentation/binaryNumbers/twosComplement';
import { BinaryNumber, DEFAULT_BIT_WIDTH, ResultWithFlag, ShiftDirection } from '@comp-sci-maths/lib/dist/dataRepresentation/binaryNumbers/types';

const defaultValue = {
    result: createBinaryNumber(),
    flag: false
}

interface UseBinaryNumber {
    value: ResultWithFlag;
    toggleBit: (digit: number) => void;
    addition: (other: BinaryNumber) => void;
    setDenaryValue: (value: number) => void;
    shiftLeft: () => void;
    shiftRight: () => void;
}

/**
 * A react hook based wrapper around the functional Binary Number library.
 * 
 * @param isTwosComplement Indicates if we are using twos complement
 * @returns The API for manipulating the binary number.
 */
const useBinaryNumber = (isTwosComplement: boolean): UseBinaryNumber => {
    const [value, dispatch] = React.useReducer(binaryPositiveIntegerReducer, defaultValue);
    const toggleBit = React.useCallback((digit: number) => dispatch({ type: 'toggle', digit }), []);
    const shiftLeft = React.useCallback(() => dispatch({ type: 'shift', gapFill: false, direction: ShiftDirection.left }), []);
    const shiftRight = React.useCallback(() => dispatch({ type: 'shift', gapFill: false, direction: ShiftDirection.right }), []);
    const setDenaryValue = React.useCallback((newDenaryValue: number) => {
        if (isTwosComplement) {
            const converted = getTwosComplementIntegerFromDenary(newDenaryValue, DEFAULT_BIT_WIDTH);
            dispatch({ type: 'setBinary', value: converted.result, flag: converted.flag })
        } else {
            dispatch({ type: 'setDenary', value: newDenaryValue });
        }
    }, [isTwosComplement]);
    const addition = React.useCallback((other) => dispatch({ type: 'add', other: other.result }), []);

    return {
        value,
        toggleBit,
        shiftLeft,
        shiftRight,
        setDenaryValue,
        addition
    }
}

export default useBinaryNumber;