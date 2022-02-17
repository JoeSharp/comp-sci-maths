import { Optional } from "comp-sci-maths-lib/dist/types";
import React from "react";
import { boolToBin } from "./NandComponent";

interface Props {
  name: string;
  values: Optional<boolean>[];
  onTogglePin: (name: string, index: number) => void;
}

const BusModify: React.FunctionComponent<Props> = ({
  name,
  values,
  onTogglePin,
}) => {
  return (
    <div className="busDisplay">
      <h4>{name}</h4>
      <div>
        {values
          .map((value, index) => ({ value, index }))
          .reverse()
          .map(({ value, index }) => (
            <span
              key={index}
              className="binary-digit clickable"
              onClick={() => onTogglePin(name, index)}
            >
              {boolToBin(value)}
            </span>
          ))}
      </div>
    </div>
  );
};

export default BusModify;
