import React, { ChangeEventHandler, MouseEventHandler } from 'react';

import Button from '../../../Bootstrap/Buttons/Button';

import BinaryEditor from './BinaryEditor';
import Checkbox from '../../../Bootstrap/Checkbox';
import useBinaryInteger from './useBinaryInteger';

const BinaryNumbers: React.FunctionComponent = () => {
    const [isTwosComplement, onToggleTwosComplement] = React.useReducer((state) => !state, false);

    const {
        value: valueA,
        toggleBit: toggleBitA,
        shiftLeft,
        shiftRight,
        setDenaryValue,
        addition
    } = useBinaryInteger(isTwosComplement);
    const {
        value: valueB,
        toggleBit: toggleBitB,
    } = useBinaryInteger(isTwosComplement);

    const [newDenaryValue, setNewDenaryValue] = React.useState(0);

    const onAddB = React.useCallback(
        () => addition(valueB.result),
        [valueB.result, addition]);
    const onDenaryChange: ChangeEventHandler<HTMLInputElement> = React.useCallback(
        ({ target: { value } }) => setNewDenaryValue(value ? parseInt(value, 10) : 0),
        [setNewDenaryValue]);
    const onSetDenaryValue: MouseEventHandler = React.useCallback(() => setDenaryValue(newDenaryValue), [newDenaryValue, setDenaryValue]);

    return <div>
        <BinaryEditor label='A' toggleBit={toggleBitA} value={valueA} />
        <BinaryEditor label='B' toggleBit={toggleBitB} value={valueB} />

        <div className='btn-group'>
            <Button styleType='light' onClick={shiftLeft} text='Shift Left' />
            <Button styleType='light' onClick={shiftRight} text='Shift Right' />
            <Button styleType='light' onClick={onAddB} text='A = A + B' />
        </div>

        <div>
            <div className='form-group'>
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

