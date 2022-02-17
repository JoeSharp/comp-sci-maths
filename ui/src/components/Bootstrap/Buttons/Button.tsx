import React from "react";

export interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
  styleType:
    | "primary"
    | "secondary"
    | "success"
    | "danger"
    | "warning"
    | "info"
    | "light"
    | "dark"
    | "link";
  onClick: React.MouseEventHandler;
}

const Button: React.FunctionComponent<Props> = ({
  text,
  styleType,
  onClick,
  ...rest
}) => (
  <button
    {...rest}
    className={`btn btn-${styleType} ${rest.className}`}
    onClick={onClick}
  >
    {text}
  </button>
);

export default Button;
