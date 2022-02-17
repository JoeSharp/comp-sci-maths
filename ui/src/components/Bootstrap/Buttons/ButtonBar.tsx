import React from "react";

import Button, { Props as ButtonProps } from "./Button";

export interface Props {
  className?: string;
  buttons: ButtonProps[];
}

const ButtonBar: React.FunctionComponent<Props> = ({ className, buttons }) => (
  <div
    className={`btn-toolbar ${className}`}
    role="toolbar"
    aria-label="Course Actions"
  >
    {buttons.map((button, i) => (
      <div key={i} className="btn-group mr-2" role="group" aria-label="Edit">
        <Button {...button} />
      </div>
    ))}
  </div>
);

export default ButtonBar;
