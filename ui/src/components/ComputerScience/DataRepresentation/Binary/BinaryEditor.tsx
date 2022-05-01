import React from 'react';

import { ResultWithFlag } from '@comp-sci-maths/lib/dist/dataRepresentation/binaryNumbers/types';

import Button from '../../../Bootstrap/Buttons/Button';

import {
    bitToString,
} from '@comp-sci-maths/lib/dist/dataRepresentation/binaryNumbers/binaryIntegers';

import './binary.css'

interface Props {
    label: string;
    value: ResultWithFlag
    toggleBit: (digit: number) => void;
}

const NO_OP = () => { };

const BinaryEditor: React.FunctionComponent<Props> = ({ label, value: { result, flag }, toggleBit }) => {
    const bitsWithHandlers = React.useMemo(() => result.map((bit, digit) => {
        return {
            bit,
            label: bitToString(bit),
            onToggle: () => toggleBit(digit)
        }
    }), [result, toggleBit]);

    return <div className='binary'>
        {label}: <div className='btn-group'>
            <Button styleType={flag ? 'danger' : 'dark'} text={bitToString(flag)} onClick={NO_OP} />
            {bitsWithHandlers.map(({ label, onToggle }, i) => <Button key={i} styleType='light' text={label} onClick={onToggle} />)}
        </div>
    </div>;
}

export default BinaryEditor;