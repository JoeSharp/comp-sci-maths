import React from "react";

import "./sieve.css";

interface Props {
  limit: number;
  primeNumbers: number[];
}

const PrimesListing: React.FunctionComponent<Props> = ({
  limit,
  primeNumbers,
}) => {
  return (
    <div className="primeListing">
      {Array(limit)
        .fill(undefined)
        .map((_, i) => ({ i, isPrime: primeNumbers.includes(i) }))
        .filter(({ i }) => i > 1)
        .map(({ i, isPrime }) => {
          const classNames = ["primeListing__number"];
          if (isPrime) {
            classNames.push("primeListing__isPrime");
          }
          return (
            <span key={i} className={classNames.join(" ")}>
              {i}
            </span>
          );
        })}
    </div>
  );
};
export default PrimesListing;
