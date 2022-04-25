import React, { ChangeEventHandler } from 'react';

import {
    binaryPositiveIntegerReducer, createBinaryNumber,
} from '@comp-sci-maths/lib/dist/dataRepresentation/binaryNumbers/binaryIntegers';
import {
    getTwosComplementIntegerFromDenary
} from '@comp-sci-maths/lib/dist/dataRepresentation/binaryNumbers/twosComplement';
import Button from '../../../Bootstrap/Buttons/Button';
import { DEFAULT_BIT_WIDTH, ShiftDirection } from '@comp-sci-maths/lib/dist/dataRepresentation/binaryNumbers/types';
import BinaryEditor from './BinaryEditor';
import Checkbox from '../../../Bootstrap/Checkbox';

const defaultValue = {
    result: createBinaryNumber(),
    flag: false
}

const BinaryNumbers: React.FunctionComponent = () => {
    const [valueA, dispatch] = React.useReducer(binaryPositiveIntegerReducer, defaultValue);
    const [valueB, dispatchOther] = React.useReducer(binaryPositiveIntegerReducer, defaultValue);
    const [newDenaryValue, setNewDenaryValue] = React.useState(0);
    const [isTwosComplement, onToggleTwosComplement] = React.useReducer((state) => !state, false);

    const onShiftLeft = React.useCallback(() => dispatch({ type: 'shift', gapFill: false, direction: ShiftDirection.left }), []);
    const onShiftRight = React.useCallback(() => dispatch({ type: 'shift', gapFill: false, direction: ShiftDirection.right }), []);
    const onAddOther = React.useCallback(() => dispatch({ type: 'add', other: valueB.result }), [valueB.result]);

    const onDenaryChange: ChangeEventHandler<HTMLInputElement> = React.useCallback(
        ({ target: { value } }) => setNewDenaryValue(parseInt(value, 10)),
        [setNewDenaryValue]);

    const onSetDenaryValue = React.useCallback(() => {
        if (isTwosComplement) {
            const converted = getTwosComplementIntegerFromDenary(newDenaryValue, DEFAULT_BIT_WIDTH);
            dispatch({ type: 'replace', value: converted.result, flag: converted.flag })
        } else {
            dispatch({ type: 'setDenary', value: newDenaryValue });
        }
    }, [isTwosComplement, newDenaryValue])

    return <div>
        <BinaryEditor label='A' isTwosComplement={isTwosComplement} dispatch={dispatch} value={valueA} />
        <BinaryEditor label='B' isTwosComplement={isTwosComplement} dispatch={dispatchOther} value={valueB} />

        <div className='btn-group'>
            <Button styleType='light' onClick={onShiftLeft} text='Shift Left' />
            <Button styleType='light' onClick={onShiftRight} text='Shift Right' />
            <Button styleType='light' onClick={onAddOther} text='Add A+B' />
        </div>

        <div>
            <div className='form-group'>
                <label>Two's Complement</label>
                <Checkbox id='is-twos-complement'
                    label="Is Two's Complement"
                    checked={isTwosComplement}
                    onChange={onToggleTwosComplement} />
            </div>
            <div className='form-group'>
                <label>New Denary Value</label>
                <input className='form-control' type='number' onChange={onDenaryChange} value={newDenaryValue} />
                <Button styleType='light' onClick={onSetDenaryValue} text='Set' />
            </div>
        </div>
    </div>
}

export default BinaryNumbers;

