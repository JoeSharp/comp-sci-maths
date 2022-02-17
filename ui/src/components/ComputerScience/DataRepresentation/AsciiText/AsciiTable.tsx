import React from "react";

const AsciiTable: React.FunctionComponent = () => {
  return (
    <table className="table table-sm table-striped">
      <thead>
        <tr>
          <th>Code</th>
          <th>Character</th>
          <th>Code</th>
          <th>Character</th>
        </tr>
      </thead>

      {Array(128)
        .fill(null)
        .map((_, i) => i)
        .map((i) => (
          <tr>
            <td>0x{i.toString(16)}</td>
            <td>{String.fromCharCode(i)}</td>
            <td>0x{(2 * i).toString(16)}</td>
            <td>{String.fromCharCode(2 * i)}</td>
          </tr>
        ))}
    </table>
  );
};

export default AsciiTable;
