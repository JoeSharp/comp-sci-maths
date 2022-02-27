import React from 'react';

import {
    LinearStructureAction
} from "@comp-sci-maths/lib/dist/dataStructures/queue/linearDataStructure";

import ButtonBar, {
    Props as ButtonBarProps,
} from "../../../Bootstrap/Buttons/ButtonBar";

import LinearDataStructureDisplay,
{
    Props as LinearDataStructureDisplayProps
} from './LinearDataStructureDisplay';

import "./linearDataStructure.css";
import { loremIpsum } from 'lorem-ipsum';

interface Props extends LinearDataStructureDisplayProps {
    pushOperationName?: string;
    popOperationName?: string;
    dispatch: (action: LinearStructureAction<string | number>) => void;
}

const generateWord = () => loremIpsum({ units: 'word', count: 1 });

const LinearDataStructureEditor: React.FunctionComponent<Props> = (
    {
        dispatch,
        pushOperationName = 'Push',
        popOperationName = 'Pop',
        ...lds
    }) => {
    const [newItem, setNewItem] = React.useState<string>(generateWord());

    const onNewItemChange: React.ChangeEventHandler<HTMLInputElement> = React.useCallback(
        ({ target: { value } }) => setNewItem(value),
        [setNewItem]
    );

    const onReset = React.useCallback(() => {
        dispatch({ type: 'reset' })
    }, [dispatch]);

    const onPush = React.useCallback(() => {
        dispatch({ type: 'push', value: newItem })
        setNewItem(generateWord());
    }, [newItem, setNewItem, dispatch]);

    const onPop = React.useCallback(() => {
        dispatch({ type: 'pop' })
    }, [dispatch]);

    const buttonBarProps: ButtonBarProps = React.useMemo(
        () => ({
            buttons: [
                {
                    text: pushOperationName,
                    onClick: onPush,
                    styleType: "primary",
                },
                {
                    text: popOperationName,
                    onClick: onPop,
                    styleType: "primary",
                },
                {
                    text: "Reset",
                    onClick: onReset,
                    styleType: "danger",
                },
            ],
        }),
        [pushOperationName, popOperationName, onPush, onPop, onReset]
    );

    return (
        <div>
            <form>
                <div className="form-group">
                    <label>New Item</label>
                    <input
                        className="form-control"
                        value={newItem}
                        onChange={onNewItemChange}
                    />
                </div>
            </form>

            <ButtonBar {...buttonBarProps} />

            <LinearDataStructureDisplay {...lds} />
        </div>
    );
}

export default LinearDataStructureEditor;