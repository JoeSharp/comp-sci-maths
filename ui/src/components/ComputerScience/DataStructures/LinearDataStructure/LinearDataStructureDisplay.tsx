import React from 'react';

import {
    LinearStructureState
} from "@comp-sci-maths/lib/dist/dataStructures/queue/linearDataStructure";

export interface Props {
    state: LinearStructureState<string | number>;
    namedIndices?: {
        name: string,
        value: number
    }[]
}

const DEFAULT_HIGHLIGHTED_ROW = -1;

const LinearDataStructureDisplay: React.FunctionComponent<Props> = ({
    state: { contents, capacity, lastResult, lastMessage },
    namedIndices = []
}) => {
    const [highlightedRow, setHighlightedRow] = React.useState<number>(DEFAULT_HIGHLIGHTED_ROW);

    const namedIndicesWithHandlers = React.useMemo(() => namedIndices.map(({ name, value }) => ({
        name,
        value,
        onClick: () => setHighlightedRow(highlightedRow === value ? DEFAULT_HIGHLIGHTED_ROW : value)
    })), [namedIndices, highlightedRow, setHighlightedRow])

    return (<div className='linearDataStructureItems'>
        <table className='data-table'>
            <thead>
                <tr><th>Index</th><th>Value</th></tr>
            </thead>
            <tbody>
                {contents.map((value, i) => (
                    <tr key={i} className={i === highlightedRow ? 'highlighted' : ''}>
                        <td>{i}</td>
                        <td>{value}</td>
                    </tr>
                ))}
            </tbody>
        </table>

        <table className='data-table'>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Value</th>
                </tr>
            </thead>
            <tbody>
                {namedIndicesWithHandlers.map(({ name, value, onClick }) => (
                    <tr key={name} onClick={onClick}>
                        <td>{name}</td>
                        <td>{value}</td>
                    </tr>
                ))}
                <tr>
                    <td>Capacity</td>
                    <td>{capacity}</td>
                </tr>
                <tr>
                    <td>Last Result</td>
                    <td>{lastResult}</td>
                </tr>
                <tr>
                    <td>Last Message</td>
                    <td>{lastMessage}</td>
                </tr>
            </tbody>
        </table>
    </div>)
}

export default LinearDataStructureDisplay;