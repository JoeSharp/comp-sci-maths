import React from "react";

interface Props {
  scriptOutput: string[];
}

const TestScriptOutput: React.FunctionComponent<Props> = ({ scriptOutput }) => {
  return (
    <table className="cpu-table code-text">
      <thead>
        <tr>
          <th>Line Number</th>
          <th>Content</th>
        </tr>
      </thead>
      <tbody>
        {scriptOutput.map((c, i) => (
          <tr key={i}>
            <td>{i}</td>
            <td>{c}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TestScriptOutput;
