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
import LDSDisplayTables from '../QueueComponent/LDSDisplayTables';

const INITIAL_STATE = getInitialLinkedListState<string>();

const LinkedListComponent: React.FunctionComponent = () => {
    const [{
        capacity,
        contents,
        freeNodes,
        lastMessage,
        lastResult,
        nextFree,
        start
    }, dispatch] = React.useReducer(
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

    const { stackPointer } = freeNodes;
    const freeNodesSpecificProps = React.useMemo(() => ([
        { name: 'Stack Pointer', value: stackPointer },
    ]), [stackPointer])

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
                        max={capacity}
                        onChange={onLogicalIndexChange}
                    />
                </div>
            </form>

            <ButtonBar {...buttonBarProps} />

            <div className='linearDataStructureItems'>
                <table className='table table-striped'>
                    <thead>
                        <tr>
                            <td>Index</td>
                            <td>Value</td>
                            <td>Next Ptr</td>
                        </tr>
                    </thead>
                    <tbody>
                        {contents.map((item, i) => (
                            <tr key={i}>
                                <td>{i}</td>
                                <td>{item !== null ? item.value : ''}</td>
                                <td>{item !== null ? item.nextPtr : ''}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <table className='table table-striped'>
                    <thead>
                        <tr>
                            <td>Name</td>
                            <td>Value</td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Next Free</td>
                            <td>{nextFree}</td>
                        </tr>
                        <tr>
                            <td>Start</td>
                            <td>{start}</td>
                        </tr>
                        <tr>
                            <td>Capacity</td>
                            <td>{capacity}</td>
                        </tr>
                        <tr>
                            <td>Last Result</td>
                            <td>{lastResult !== null ? lastResult.value : ''}</td>
                        </tr>
                        <tr>
                            <td>Last Message</td>
                            <td>{lastMessage}</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div>
                <h2>Queue of Free Nodes</h2>

                <LDSDisplayTables state={freeNodes} specificProps={freeNodesSpecificProps} />
            </div>
        </div>
    );
}

export default LinkedListComponent;