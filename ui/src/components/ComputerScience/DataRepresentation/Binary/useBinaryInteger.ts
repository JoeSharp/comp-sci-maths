import React from 'react';

import {
    binaryPositiveIntegerReducer, createBinaryNumber, getDenaryFromBinaryInteger,
} from '@comp-sci-maths/lib/dist/dataRepresentation/binaryNumbers/binaryIntegers';
import {
    getOnesComplement,
    getTwosComplement,
    getTwosComplementIntegerFromDenary
} from '@comp-sci-maths/lib/dist/dataRepresentation/binaryNumbers/twosComplement';
import { BinaryNumber, DEFAULT_BIT_WIDTH, ResultWithFlag, ShiftDirection } from '@comp-sci-maths/lib/dist/dataRepresentation/binaryNumbers/types';

const defaultValue = {
    result: createBinaryNumber(),
    flag: false
}

export interface UseBinaryNumber {
    value: ResultWithFlag;
    denary: number;
    onesComplement: ResultWithFlag;
    twosComplement: ResultWithFlag;
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
const useBinaryInteger = (isTwosComplement: boolean): UseBinaryNumber => {
    const [value, dispatch] = React.useReducer(binaryPositiveIntegerReducer, defaultValue);
    const denary = React.useMemo(() => getDenaryFromBinaryInteger(value.result), [value.result]);
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
    const addition = React.useCallback((other: BinaryNumber) => dispatch({ type: 'add', other }), []);

    const onesComplement = React.useMemo(() => ({
        result: getOnesComplement(value.result),
        flag: false
    }), [value.result]);
    const twosComplement = React.useMemo(() => getTwosComplement(value.result), [value.result]);

    return {
        value,
        denary,
        onesComplement,
        twosComplement,
        toggleBit,
        shiftLeft,
        shiftRight,
        setDenaryValue,
        addition
    }
}

export default useBinaryInteger;