import React from "react";

import useConversionTable from "./useConversionTable";
import { INumberBase } from "comp-sci-maths-lib/dist/dataRepresentation/numberBases/types";

interface Props {
  from: INumberBase;
  to: INumberBase;
}

const NumberBaseConversionTable: React.FunctionComponent<Props> = ({
  from,
  to,
}) => {
  const { headings, values } = useConversionTable();

  return (
    <table className="table table-striped">
      <thead>
        <tr>
          {headings.map((h) => (
            <th key={h}>{h}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {values.map(({ denaryValue, binaryValue, hexadecimalValue }) => (
          <tr key={denaryValue}>
            <td>{denaryValue}</td>
            <td>{binaryValue}</td>
            <td>{hexadecimalValue}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default NumberBaseConversionTable;
