import React from "react";

interface Props {
  id: string;
  label: string | React.ReactElement;
  checked: boolean;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
}

const Checkbox: React.FunctionComponent<Props> = ({
  id,
  label,
  checked,
  onChange,
}) => (
  <div className="form-check">
    <input
      className="form-check-input"
      type="checkbox"
      checked={checked}
      onChange={onChange}
      id={id}
    />
    <label className="form-check-label" htmlFor={id}>
      {label}
    </label>{" "}
  </div>
);

export default Checkbox;
