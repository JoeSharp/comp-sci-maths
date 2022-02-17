import { Chip } from 'comp-sci-maths-lib';
import { Optional } from 'comp-sci-maths-lib/dist/types';
import React from 'react';

interface Props {
    chip: Chip;
    historyLength: number;
}

interface PinNamedValue {
    name: string;
    value: Optional<boolean>;
}

export interface PinNamedValueHistory {
    name: string;
    values: Optional<boolean>[];
}

interface PinValueHistoryState {
    chip: Chip;
    historyLength: number;
    values: PinNamedValueHistory[];
}

interface SetChipAction {
    type: 'setchip';
    chip: Chip;
    historyLength: number;
}

interface TickTockAction {
    type: 'ticktock';
}

type PinHistoryAction = SetChipAction | TickTockAction;

const getPinValues = (chip: Chip): PinNamedValue[] => {
    const values: PinNamedValue[] = Object.entries(chip.pins).map(([name, binaryPin]) => ({
        name,
        value: binaryPin.lastOutput
    }));

    Object.entries(chip.buses).forEach(([name, binaryBus]) => {
        binaryBus.pins.forEach((binaryPin, i) => {
            values.push({ name: `${name}[${i}]`, value: binaryPin.lastOutput });
        });
    })

    return values;
}

const pinValueHistoryReducer = (state: PinValueHistoryState, action: PinHistoryAction): PinValueHistoryState => {
    switch (action.type) {
        case 'setchip': {
            const values: PinNamedValueHistory[] =
                getPinValues(action.chip)
                    .map(({ name, value }) => ({
                        name,
                        values: Array(action.historyLength).fill(null).map((_, i) => i === 0 ? value : undefined)
                    }));
            return {
                chip: action.chip,
                historyLength: action.historyLength,
                values
            }
        }
        case 'ticktock': {
            const newValues = getPinValues(state.chip);
            return {
                chip: state.chip,
                historyLength: state.historyLength,
                values: state.values
                    .map(({ name, values }) =>
                    ({
                        name, values: Array(state.historyLength).fill(null).map((_, i) => {
                            if (i === 0) return newValues.find(n => n.name === name)?.value
                            if ((i - 1) < values.length) return values[i - 1];
                            return undefined;
                        })
                    }))
            }
        }
    }
}

interface UsePinValueHistory {
    pinHistory: PinValueHistoryState;
    ticktockHistory: () => void;
}

const usePinValueHistory = ({ chip, historyLength }: Props): UsePinValueHistory => {
    const [pinHistory, dispatch] = React.useReducer(pinValueHistoryReducer, { chip, historyLength, values: [] });
    React.useEffect(() => dispatch({ type: 'setchip', chip, historyLength }), [chip, historyLength]);

    const ticktockHistory = React.useCallback(() => dispatch({ type: 'ticktock' }), []);

    return {
        pinHistory,
        ticktockHistory
    }
}

export default usePinValueHistory;