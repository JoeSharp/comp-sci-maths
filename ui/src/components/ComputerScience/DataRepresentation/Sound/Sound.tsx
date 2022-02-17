import React from "react";

import Sketch, { signalTypes } from "./Sketch";
import useSketch from "../../../p5/useSketch";

const AnalogueSignals: React.FunctionComponent = () => {
  const {
    config: {
      samplingRate,
      resolution,
      signalFrequency,
      signalType,
      plotSignal,
      plotSamples,
      plotQuantisation,
      plotSquareWave,
    },
    updateConfig,
    onNumericConfigChange,
    onBooleanConfigChange,
    refContainer,
  } = useSketch(Sketch);

  const onSamplingRateChange = React.useMemo(
    () => onNumericConfigChange("samplingRate"),
    [onNumericConfigChange]
  );
  const onResolutionChange = React.useMemo(
    () => onNumericConfigChange("resolution"),
    [onNumericConfigChange]
  );
  const onSignalFrequencyChange = React.useMemo(
    () => onNumericConfigChange("signalFrequency"),
    [onNumericConfigChange]
  );

  const onPlotSignalChange = React.useMemo(
    () => onBooleanConfigChange("signalFrequency"),
    [onBooleanConfigChange]
  );
  const onPlotSamplesChange = React.useMemo(
    () => onBooleanConfigChange("plotSamples"),
    [onBooleanConfigChange]
  );
  const onPlotQuantisationChange = React.useMemo(
    () => onBooleanConfigChange("plotQuantisation"),
    [onBooleanConfigChange]
  );
  const onPlotSquareWaveChange = React.useMemo(
    () => onBooleanConfigChange("plotSquareWave"),
    [onBooleanConfigChange]
  );
  const onSignalTypeChange: React.ChangeEventHandler<HTMLSelectElement> = React.useCallback(
    ({ target: { value } }) => updateConfig({ signalType: value }),
    [updateConfig]
  );

  return (
    <div>
      <form>
        <div className="form-group">
          <label htmlFor="signalType">Signal Type</label>
          <select
            className="custom-select"
            id="signalType"
            value={signalType}
            onChange={onSignalTypeChange}
          >
            {signalTypes.map((signalType) => (
              <option key={signalType} value={signalType}>
                {signalType}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="samplingRate">Sampling Rate (Hertz)</label>
          <input
            type="number"
            className="form-control"
            id="samplingRate"
            placeholder="Sampling Rate"
            value={samplingRate}
            onChange={onSamplingRateChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="quantisationStep">
            Resolution (audio bit depth){" "}
          </label>
          <input
            type="number"
            className="form-control"
            id="resolution"
            placeholder="Resolution"
            value={resolution}
            onChange={onResolutionChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="signalFrequency">Signal Frequency (Hertz)</label>
          <input
            type="number"
            className="form-control"
            id="signalFrequency"
            placeholder="Signal Frequency"
            step="0.1"
            value={signalFrequency}
            onChange={onSignalFrequencyChange}
          />
        </div>
        <h4>Plot</h4>
        <div className="form-check form-check-inline">
          <input
            className="form-check-input"
            type="checkbox"
            checked={plotSignal}
            onChange={onPlotSignalChange}
            id="chkPlotSignal"
          />
          <label className="form-check-label" htmlFor="chkPlotSignal">
            Signal
          </label>
        </div>
        <div className="form-check form-check-inline">
          <input
            className="form-check-input"
            type="checkbox"
            checked={plotSamples}
            onChange={onPlotSamplesChange}
            id="chkPlotSamples"
          />
          <label className="form-check-label" htmlFor="chkPlotSamples">
            Samples
          </label>
        </div>
        <div className="form-check form-check-inline">
          <input
            className="form-check-input"
            type="checkbox"
            checked={plotQuantisation}
            onChange={onPlotQuantisationChange}
            id="chkPlotQuantisation"
          />
          <label className="form-check-label" htmlFor="chkPlotQuantisation">
            Quantisation
          </label>
        </div>
        <div className="form-check form-check-inline">
          <input
            className="form-check-input"
            type="checkbox"
            checked={plotSquareWave}
            onChange={onPlotSquareWaveChange}
            id="chkPlotSquareWave"
          />
          <label className="form-check-label" htmlFor="chkPlotSquareWave">
            Square Wave
          </label>
        </div>
      </form>
      <div className="sketch" ref={refContainer} />
    </div>
  );
};

export default AnalogueSignals;
