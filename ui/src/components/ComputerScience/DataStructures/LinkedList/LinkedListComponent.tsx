import React from 'react';

import { loremIpsum } from 'lorem-ipsum';

import {
    linkedListReducer,
    getInitialLinkedListState,
    LinkedListAction,
    LinkedListState
} from '@comp-sci-maths/lib/dist/dataStructures/linkedList/linkedListReducer';

import ButtonBar, {
    Props as ButtonBarProps,
} from "../../../Bootstrap/Buttons/ButtonBar";
import LinkedListDisplayComponent from './LinkedListDisplayComponent';
import { defaultToString } from '@comp-sci-maths/lib/dist/common';

const INITIAL_STATE = getInitialLinkedListState<string>();

const LinkedListComponent: React.FunctionComponent = () => {
    const [state, dispatch] = React.useReducer(
        linkedListReducer as React.Reducer<LinkedListState<string>, LinkedListAction<string>>,
        INITIAL_STATE
    );

    const [newItem, setNewItem] = React.useState<string>('Bob');
    const [logicalIndex, setLogicalIndex] = React.useState<number>(0);

    const onNewItemChange: React.ChangeEventHandler<HTMLInputElement> = React.useCallback(
        ({ target: { value } }) => setNewItem(value),
        [setNewItem]
    );

    const generateNewItem = React.useCallback(() => setNewItem(loremIpsum({ count: 1, units: 'word' })), [setNewItem]);

    const onLogicalIndexChange: React.ChangeEventHandler<HTMLInputElement> = React.useCallback(
        ({ target: { value } }) => setLogicalIndex(parseInt(value, 10)),
        [setLogicalIndex]
    );

    const onReset = React.useCallback(() => {
        dispatch({ type: 'reset' })
    }, []);

    const onAppend = React.useCallback(() => {
        dispatch({ type: 'append', value: newItem })
        generateNewItem();
    }, [newItem, generateNewItem,]);

    const onInsert = React.useCallback(() => {
        dispatch({ type: 'insert', value: newItem, logicalIndex });
        generateNewItem();
    }, [newItem, logicalIndex, generateNewItem])

    const onRemove = React.useCallback(() => {
        dispatch({ type: 'remove', logicalIndex })
    }, [logicalIndex]);

    const buttonBarProps: ButtonBarProps = React.useMemo(
        () => ({
            buttons: [
                {
                    text: "Append",
                    onClick: onAppend,
                    styleType: "primary",
                },
                {
                    text: "Insert",
                    onClick: onInsert,
                    styleType: "primary",
                },
                {
                    text: "Remove",
                    onClick: onRemove,
                    styleType: "primary",
                },
                {
                    text: "Reset",
                    onClick: onReset,
                    styleType: "danger",
                },
            ],
        }),
        [onAppend, onInsert, onRemove, onReset]
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
                <div className="form-group">
                    <label>Logical Index</label>
                    <input
                        className="form-control"
                        value={logicalIndex}
                        type="number"
                        min={0}
                        max={state.capacity}
                        onChange={onLogicalIndexChange}
                    />
                </div>
            </form>

            <ButtonBar {...buttonBarProps} />

            <LinkedListDisplayComponent itemToString={defaultToString} linkedListState={state} />
        </div>
    );
}

export default LinkedListComponent;