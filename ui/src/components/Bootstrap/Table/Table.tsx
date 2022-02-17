import React from "react";

interface Props<T> {
  headings: (keyof T)[];
  data: T[];
  expansionCutOff?: number;
}

const expandReducer = (state: boolean): boolean => !state;

const Table = <T,>({ headings, data, expansionCutOff = 5 }: Props<T>) => {
  const [isExpanded, toggledExpanded] = React.useReducer(expandReducer, false);

  return (
    <table className="table table-striped table-sm table-bordered">
      <thead>
        <tr>
          {headings.map((h, i) => (
            <th key={i}>{h}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data
          .filter((d, i) => isExpanded || i <= expansionCutOff)
          .map((d, i) => (
            <tr key={i}>
              {headings.map((h, ih) => (
                <td key={ih}>{d[h]}</td>
              ))}
            </tr>
          ))}
        {data.length > expansionCutOff && (
          <tr>
            <td colSpan={headings.length}>
              <button className="btn" onClick={toggledExpanded}>
                {isExpanded
                  ? "hide"
                  : `show ${data.length - expansionCutOff - 1} more`}
              </button>
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default Table;
