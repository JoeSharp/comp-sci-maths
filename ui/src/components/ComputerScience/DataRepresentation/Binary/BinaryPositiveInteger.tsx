import React from 'react';

import {
    binaryPositiveIntegerReducer,
    bitToString,
    createBinaryNumber
} from '@comp-sci-maths/lib/dist/dataRepresentation/binaryNumbers/binaryIntegers';
import Button from '../../../Bootstrap/Buttons/Button';
import { ShiftDirection } from '@comp-sci-maths/lib/dist/dataRepresentation/binaryNumbers/types';

const defaultValue = {
    result: createBinaryNumber(),
    flag: false
}

const BinaryPositiveInteger: React.FunctionComponent = () => {
    const [{ result, flag }, dispatch] = React.useReducer(binaryPositiveIntegerReducer, defaultValue);

    const bitsWithHandlers = React.useMemo(() => result.map((value, digit) => {
        return {
            value,
            label: bitToString(value),
            onToggle: () => dispatch({ type: 'toggle', digit })
        }
    }), [result]);

    const onShiftLeft = React.useCallback(() => dispatch({ type: 'shift', gapFill: false, direction: ShiftDirection.left }), []);
    const onShiftRight = React.useCallback(() => dispatch({ type: 'shift', gapFill: false, direction: ShiftDirection.right }), []);

    return <div>
        <div className='btn-group'>
            {bitsWithHandlers.map(({ label, onToggle }) => <Button styleType='light' text={label} onClick={onToggle} />)}
        </div>
        <p>Overflow: {flag}</p>
        <div className='btn-group'>
            <Button styleType='light' onClick={onShiftLeft} text='Shift Left' />
            <Button styleType='light' onClick={onShiftRight} text='Shift Right' />
        </div>
    </div>
}

export default BinaryPositiveInteger;

