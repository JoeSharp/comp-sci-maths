import { LinkedListState } from '@comp-sci-maths/lib/dist/dataStructures/linkedList/linkedListReducer';
import { ToString } from '@comp-sci-maths/lib/dist/types';
import React from 'react';
import LinearDataStructureDisplay from '../LinearDataStructure/LinearDataStructureDisplay';

interface Props<T> {
    linkedListState: LinkedListState<T>;
    itemToString: ToString<T>;
}

const LinkedListDisplayComponent = <T extends any>({ itemToString, linkedListState: {
    contents,
    nextFree,
    start,
    lastMessage,
    lastResult,
    capacity,
    freeNodes }
}: Props<T>) => {
    const { stackPointer } = freeNodes;
    const freeNodesNamedIndices = React.useMemo(() => ([
        { name: 'Stack Pointer', value: stackPointer },
    ]), [stackPointer])

    return <React.Fragment>
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
                            <td>{item !== null ? itemToString(item.value) : ''}</td>
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
                        <td>{lastResult !== null ? itemToString(lastResult.value) : ''}</td>
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

            <LinearDataStructureDisplay state={freeNodes} namedIndices={freeNodesNamedIndices} />
        </div>
    </React.Fragment>
};

export default LinkedListDisplayComponent