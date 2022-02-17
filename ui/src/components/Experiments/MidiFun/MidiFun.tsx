import React from "react";
import Select from "react-select";
import p5 from "p5";

import useMidi from "./useMidi";
import { useMidiSketch } from "./midiSketch";

const MidiFun: React.FunctionComponent = () => {
  const refContainer = React.useRef(null);

  const { sketchContainer, noteOn, noteOff } = useMidiSketch();

  const {
    inputDevices,
    error,
    selectedInputDeviceId,
    onInputDeviceSelected,
  } = useMidi({ noteOn, noteOff });

  const inputOptions = React.useMemo(() => {
    const options = [];

    for (let [key, value] of inputDevices.entries()) {
      options.push({ value: key, label: value.name });
    }

    return options;
  }, [inputDevices]);

  const selectedValue = React.useMemo(
    () =>
      inputOptions.find(
        (inputOption) => inputOption.value === selectedInputDeviceId
      ),
    [selectedInputDeviceId, inputOptions]
  );
  const onSelectedInputChange = React.useCallback(
    (e) => {
      if (!!e.value) {
        onInputDeviceSelected(e.value);
      }
    },
    [onInputDeviceSelected]
  );

  React.useEffect(() => {
    let sketchInUse: p5;

    if (!!refContainer) {
      sketchContainer.setWidth(
        ((refContainer.current as unknown) as HTMLElement).clientWidth
      );
      sketchInUse = new p5(
        sketchContainer.sketch.bind(sketchContainer),
        (refContainer.current as unknown) as HTMLElement
      );
    }

    return () => {
      if (!!sketchInUse) {
        sketchInUse.remove();
      }
    };
  }, [sketchContainer, refContainer]);

  return (
    <div>
      <p>{error}</p>

      <Select
        value={selectedValue}
        onChange={onSelectedInputChange}
        options={inputOptions}
      />
      <div ref={refContainer} />
    </div>
  );
};

export default MidiFun;
