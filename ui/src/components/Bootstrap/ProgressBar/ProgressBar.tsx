import React from 'react';

interface Props {
    value: number,
    min?: number,
    max: number
}

const ProgressBar: React.FunctionComponent<Props> = ({ value, min = 0, max }) => {
    return (<div className="progress">
        <div className="progress-bar"
            role="progressbar"
            style={{ width: `${100 * (value - min) / (max - min)}%` }}
            aria-valuenow={value}
            aria-valuemin={min}
            aria-valuemax={max}>{value}</div>
    </div>)
}

export default ProgressBar;