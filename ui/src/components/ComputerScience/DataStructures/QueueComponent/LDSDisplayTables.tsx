import React from 'react';

import {
    LinearStructureState
} from "@comp-sci-maths/lib/dist/dataStructures/queue/linearDataStructure";

export interface Props {
    state: LinearStructureState<number>;
    specificProps?: {
        name: string,
        value: number
    }[]
}

const LDSDisplayTables: React.FunctionComponent<Props> = (
    { state: { contents, capacity, lastResult, lastMessage }, specificProps = [] }
) => {

    return (<div className='linearDataStructureItems'>
        <table className='table table-striped'>
            <thead>
                <tr><td>Index</td><td>Value</td></tr>
            </thead>
            <tbody>
                {contents.map((value, i) => (
                    <tr key={i}>
                        <td>{i}</td>
                        <td>{value}</td>
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
                {specificProps.map(({ name, value }) => (
                    <tr key={name}>
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

export default LDSDisplayTables;