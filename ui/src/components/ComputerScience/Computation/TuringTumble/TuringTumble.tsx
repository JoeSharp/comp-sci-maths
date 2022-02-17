import React from 'react';

import challenges from './challenges';

const TuringTumble: React.FunctionComponent = () => {

    return <table className='table table-bordered table-striped'>
        <thead>
            <tr>
                <th>Number</th>
                <th>Name</th>
                <th>Starting Position</th>
                <th>Solution</th>
            </tr>
        </thead>
        <tbody>
            {challenges.map((challenge, i) => (<tr key={i}>
                <td>{i}</td>
                <td>{challenge.title}</td>
                <td><a href={challenge.start} rel='noreferrer' target='_blank'>Attempt</a></td>
                <td><a href={challenge.solution} rel='noreferrer' target='_blank'>Solution</a></td>
            </tr>))}
        </tbody>
    </table>
}

export default TuringTumble;