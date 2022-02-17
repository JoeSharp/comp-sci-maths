import React from "react";

interface Props {
  coefficient?: number | React.ReactElement;
  base: string;
  exponent: number;
}

const NumberToPower: React.FunctionComponent<Props> = ({
  coefficient = 1,
  base,
  exponent,
}) => (
  <span>
    {coefficient !== 1 ? coefficient : ""}
    {base}
    <sup>{exponent}</sup>
  </span>
);

export default NumberToPower;
