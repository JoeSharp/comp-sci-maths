import React from 'react';

import {
    LinearStructureAction
} from "@comp-sci-maths/lib/dist/dataStructures/queue/linearDataStructure";

import ButtonBar, {
    Props as ButtonBarProps,
} from "../../../Bootstrap/Buttons/ButtonBar";

import LDSDisplayTables, { Props as LDSProps } from './LDSDisplayTables';

import "./linearDataStructure.css";

interface Props extends LDSProps {
    dispatch: (action: LinearStructureAction<number>) => void;
}

const LinearDataStructureComponent: React.FunctionComponent<Props> = (
    { dispatch, ...lds }) => {
    const [newItem, setNewItem] = React.useState<number>(0);

    const onNewItemChange: React.ChangeEventHandler<HTMLInputElement> = React.useCallback(
        ({ target: { value } }) => setNewItem(parseInt(value)),
        [setNewItem]
    );

    const onReset = React.useCallback(() => {
        dispatch({ type: 'reset' })
    }, [dispatch]);

    const onEnqueue = React.useCallback(() => {
        dispatch({ type: 'push', value: newItem })
        setNewItem(newItem + 1);
    }, [newItem, setNewItem, dispatch]);

    const onDequeue = React.useCallback(() => {
        dispatch({ type: 'pop' })
    }, [dispatch]);

    const buttonBarProps: ButtonBarProps = React.useMemo(
        () => ({
            buttons: [
                {
                    text: "Enqueue",
                    onClick: onEnqueue,
                    styleType: "primary",
                },
                {
                    text: "Dequeue",
                    onClick: onDequeue,
                    styleType: "primary",
                },
                {
                    text: "Reset",
                    onClick: onReset,
                    styleType: "danger",
                },
            ],
        }),
        [onEnqueue, onDequeue, onReset]
    );

    return (
        <div>
            <form>
                <div className="form-group">
                    <label>New Item</label>
                    <input
                        className="form-control"
                        value={newItem}
                        type="number"
                        onChange={onNewItemChange}
                    />
                </div>
            </form>

            <ButtonBar {...buttonBarProps} />

            <LDSDisplayTables {...lds} />
        </div>
    );
}

export default LinearDataStructureComponent;