import React from 'react';
import { PinNamedValueHistory } from './usePinValueHistory';

const PULSE_DIM = 30;

const PinDisplay: React.FunctionComponent<PinNamedValueHistory> = ({ name, values }) => {
    return <div>
        <span>{name}</span>
        <svg className='pin-display'>
            {values.map((v, x) => {
                const y = v ? PULSE_DIM : 2 * PULSE_DIM;
                let verticalEdge;
                if (x > 0 && values[x-1] !== v) {
                    verticalEdge = <line 
                        x1={x * PULSE_DIM} x2={x * PULSE_DIM} 
                        y1={PULSE_DIM} y2={2 * PULSE_DIM}
                        stroke="blue" strokeWidth="5"></line>
                }

                return <React.Fragment key={x}>
                    {verticalEdge}
                    <line
                        x1={x * PULSE_DIM} 
                        x2={(x + 1) * PULSE_DIM} 
                        y1={y} y2={y} 
                        stroke="blue" strokeWidth="5" />
                        </React.Fragment>
            })}
        </svg>
    </div>
}

export default PinDisplay;