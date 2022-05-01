import React from 'react';

import {
    FloatingPointNumber,
    ShiftDirection,
} from "@comp-sci-maths/lib/dist/dataRepresentation/binaryNumbers/types";
import {
    reducer,
    createFloatingPoint,
    isNormalised,
    getDenaryFromFloatingPoint,
    normalise
} from "@comp-sci-maths/lib/dist/dataRepresentation/binaryNumbers/floatingPoint";

interface UseBinaryFloatingPoint {
    value: FloatingPointNumber;
    toggleBitExponent: (digit: number) => void;
    toggleBitMantissa: (digit: number) => void;
    isNormalised: boolean;
    normalised: FloatingPointNumber
    denary: number;
    setDenary: (denary: number) => void;
    shiftLeft: () => void;
    shiftRight: () => void;
}

const defaultValue = createFloatingPoint();

/**
 * React hook wrapper around the floating point library
 */
const useBinaryFloatingPoint = (): UseBinaryFloatingPoint => {
    const [value, dispatch] = React.useReducer(reducer, defaultValue);

    const toggleBitMantissa = React.useCallback((digit: number) =>
        dispatch({ type: 'toggle', component: 'mantissa', digit }), []);
    const toggleBitExponent = React.useCallback((digit: number) =>
        dispatch({ type: 'toggle', component: 'exponent', digit }), []);

    const valueIsNormalised = React.useMemo(() => isNormalised(value), [value]);
    const normalised = React.useMemo(() => normalise(value), [value]);
    const denary = React.useMemo(() => getDenaryFromFloatingPoint(value), [value]);
    const shiftRight = React.useCallback(() => dispatch({ type: 'shift', direction: ShiftDirection.left }), []);
    const shiftLeft = React.useCallback(() => dispatch({ type: 'shift', direction: ShiftDirection.left }), []);
    const setDenary = React.useCallback((denary: number) => dispatch({ type: 'setDenary', denary }), []);

    return {
        value,
        isNormalised: valueIsNormalised,
        denary,
        normalised,
        setDenary,
        shiftRight,
        shiftLeft,
        toggleBitMantissa,
        toggleBitExponent
    }
}

export default useBinaryFloatingPoint;