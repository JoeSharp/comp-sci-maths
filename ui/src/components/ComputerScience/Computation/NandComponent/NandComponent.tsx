import * as React from "react";
import NandChipPicker, { usePicker as useChipPicker } from "./NandChipPicker";
import useChip from "./useChip";

import "./nand.css";
import BusDisplay from "./BusDisplay";
import BusModify from "./BusModify";
import PinDisplay from "./PinDisplay";
import { Optional } from "comp-sci-maths-lib/dist/types";

export const boolToBin = (v: Optional<boolean>): string => {
  if (v === true) return "1";
  if (v === false) return "0";
  return "-";
};

const HISTORY_LENGTH = 64;

const NandComponent: React.FunctionComponent = () => {
  const { chipName, componentProps: chipPickerProps } = useChipPicker(
    "form-control"
  );

  const {
    chip,
    clock: { count, state },
    onTickTock,
    pinValueHistory,
    pins,
    buses,
    onTogglePin,
  } = useChip({ chipName, historyLength: HISTORY_LENGTH });

  return (
    <div>
      NAND Gates
      <NandChipPicker {...chipPickerProps} />
      <h2>{chipName}</h2>
      <button className="btn btn-info btn-clock" onClick={onTickTock}>
        Clock 🕒
      </button>
      <div>
        Time: {count} {state ? "+" : ""}
      </div>
      <div>
        <h3>Inputs</h3>
        <div className="pinGroup">
          {Object.entries(pins)
            .filter(([name]) => chip.inputs.includes(name))
            .map(([name, value]) => (
              <BusModify
                key={name}
                name={name}
                values={[value]}
                onTogglePin={onTogglePin}
              />
            ))}
        </div>
        <div className="busGroup">
          {Object.entries(buses)
            .filter(([name]) => chip.inputs.includes(name))
            .map(([name, values]) => (
              <BusModify
                key={name}
                name={name}
                values={values}
                onTogglePin={onTogglePin}
              />
            ))}
        </div>

        <h3>Outputs</h3>
        <div className="pinGroup">
          {Object.entries(pins)
            .filter(([name]) => chip.outputs.includes(name))
            .map(([name, value]) => (
              <BusDisplay key={name} name={name} values={[value]} />
            ))}
        </div>
        <div className="busGroup">
          {Object.entries(buses)
            .filter(([name]) => chip.outputs.includes(name))
            .map(([name, values]) => (
              <BusDisplay key={name} name={name} values={values} />
            ))}
        </div>
      </div>

      <h3>Trace</h3>
      <div>
        {pinValueHistory.map((pinHistory) => (
          <PinDisplay key={pinHistory.name} {...pinHistory} />
        ))}
      </div>
    </div>
  );
};
export default NandComponent;
