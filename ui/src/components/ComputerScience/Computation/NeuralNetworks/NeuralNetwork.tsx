import React from 'react';
import useSketch from '../../../p5/useSketch';
import LineDetectionSketch from './LineDetectionSketch';

const NeuralNetwork: React.FunctionComponent = () => {
    const { config: { lineM, lineC, showTraining }, updateConfig, onBooleanConfigChange, refContainer } = useSketch(LineDetectionSketch);

    const onLineMChange = React.useCallback(({ target: { value } }) => {
        updateConfig({
            lineM: parseFloat(value)
        })
    }, [updateConfig]);

    const onLineCChange = React.useCallback(({ target: { value } }) => {
        updateConfig({
            lineC: parseFloat(value)
        })
    }, [updateConfig]);

    const onShowTrainingChange = React.useMemo(
        () => onBooleanConfigChange("showTraining"),
        [onBooleanConfigChange]
    );

    return <div>
        <div ref={refContainer} />

        <div className='form-group'>
            <label>Line Gradient (m)</label>
            <input className='form-control' type='number' step="0.1" value={lineM} onChange={onLineMChange} />
        </div>
        <div className='form-group'>
            <label>Line y-intercept (c)</label>
            <input className='form-control' type='number' value={lineC} onChange={onLineCChange} />
        </div>
        <div className="form-check form-check-inline">
            <input
                className="form-check-input"
                type="checkbox"
                checked={showTraining}
                onChange={onShowTrainingChange} />
            <label className="form-check-label">Show Training Data</label>
        </div>

    </div>
}

export default NeuralNetwork;