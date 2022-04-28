import React from 'react';

import { ResultWithFlag } from '@comp-sci-maths/lib/dist/dataRepresentation/binaryNumbers/types';

import Button from '../../../Bootstrap/Buttons/Button';

import {
    bitToString,
    getDenaryFromBinaryInteger,
} from '@comp-sci-maths/lib/dist/dataRepresentation/binaryNumbers/binaryIntegers';
import {
    getDenaryFromTwosComplementInteger
} from '@comp-sci-maths/lib/dist/dataRepresentation/binaryNumbers/twosComplement';

interface Props {
    label: string;
    isTwosComplement: boolean;
    value: ResultWithFlag
    toggleBit: (digit: number) => void;
}

const BinaryEditor: React.FunctionComponent<Props> = ({ label, isTwosComplement, value: { result, flag }, toggleBit }) => {
    const bitsWithHandlers = React.useMemo(() => result.map((bit, digit) => {
        return {
            bit,
            label: bitToString(bit),
            onToggle: () => toggleBit(digit)
        }
    }), [result, toggleBit]);

    const denary = React.useMemo(() => isTwosComplement ?
        getDenaryFromTwosComplementInteger(result) : getDenaryFromBinaryInteger(result), [isTwosComplement, result]);

    return <div>
        {label}: <div className='btn-group'>
            {bitsWithHandlers.map(({ label, onToggle }) => <Button styleType='light' text={label} onClick={onToggle} />)}
        </div>

        <p>Base-10: {denary}</p>
        <p>Overflow: {bitToString(flag)}</p>
    </div>;
}

export default BinaryEditor;