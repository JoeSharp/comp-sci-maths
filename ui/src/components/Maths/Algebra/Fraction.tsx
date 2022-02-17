import React from "react";

interface Props {
  numerator: number;
  denominator: number;
}

const Fraction: React.FunctionComponent<Props> = ({ numerator, denominator }) =>
  denominator === 1 ? (
    <span>{numerator}</span>
  ) : (
    <span>
      {numerator}&frasl;{denominator}
    </span>
  );

export default Fraction;
