import React from "react";

import { IGuess } from "./types";

interface Props {
  value: IGuess;
}

const ValueDisplay: React.FunctionComponent<Props> = ({ value }) => (
  <div className="valueDisplay">
    {value.map((v, i) => (
      <span className="valueDisplay__digit" key={i}>
        {v}
      </span>
    ))}
  </div>
);

export default ValueDisplay;
