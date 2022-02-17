import React from "react";
import GraphFunctionSketch from "../../../p5/GraphFunctionSketch";
import { PlotConfiguration } from "../../../p5/GraphFunctionSketch/types";
import useSketch from "../../../p5/useSketch";

// function factorial(num: number): number {
//   // If the number is less than 0, reject it.
//   if (num < 0) return -1;
//   // If the number is 0, its factorial is 1.
//   else if (num === 0) return 1;
//   // Otherwise, call the recursive procedure again
//   else {
//     return num * factorial(num - 1);
//   }
// }

interface BigO extends PlotConfiguration {
  bigONotation: string;
}

const plotConfigurations: BigO[] = [
  {
    name: "Linear",
    bigONotation: "O(n)",
    colour: "cyan",
    graphFunction: (x: number) => x,
  },
  {
    name: "Logarithmic",
    colour: "green",
    bigONotation: "O(log(n))",
    graphFunction: (x: number) => Math.log(x),
  },
  {
    name: "n * Logarithmic",
    colour: "blue",
    bigONotation: "O(n * log(n))",
    graphFunction: (x: number) => x * Math.log(x),
  },
  {
    name: "Polynomial",
    bigONotation: "O(n^2)",
    colour: "orange",
    graphFunction: (x: number) => Math.pow(x, 2),
  },
  {
    name: "Exponential",
    bigONotation: "O(2^n)",
    colour: "red",
    graphFunction: (x: number) => Math.pow(2, x),
  },
  //   {
  //     name: "Factorial",
  //     colour: "purple",
  //     graphFunction: (x: number) => factorial(x),
  //   },
];

const CompareBigO: React.FunctionComponent = () => {
  const { refContainer, config, updateConfig } = useSketch(GraphFunctionSketch);

  const onStepChange: React.ChangeEventHandler<HTMLInputElement> = React.useCallback(
    ({ target: { value } }) => updateConfig({ step: parseInt(value) }),
    [updateConfig]
  );
  const onGraphFromChange: React.ChangeEventHandler<HTMLInputElement> = React.useCallback(
    ({ target: { value } }) => updateConfig({ from: parseInt(value) }),
    [updateConfig]
  );
  const onGraphToChange: React.ChangeEventHandler<HTMLInputElement> = React.useCallback(
    ({ target: { value } }) => updateConfig({ to: parseInt(value) }),
    [updateConfig]
  );

  React.useEffect(() => {
    updateConfig({
      plotConfigurations,
    });
  }, [updateConfig]);

  return (
    <div>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Name</th>
            <th>Big O Notation</th>
            <th>Colour</th>
          </tr>
        </thead>
        <tbody>
          {plotConfigurations.map(({ name, bigONotation, colour }, i) => (
            <tr key={i}>
              <td>{name}</td>
              <td>{bigONotation}</td>
              <td style={{ backgroundColor: colour }}>{colour}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div ref={refContainer} />

      <div className="row">
        <div className="form-group col-md-4">
          <label>Step</label>
          <input
            className="form-control"
            type="number"
            value={config.step}
            onChange={onStepChange}
          />
        </div>
        <div className="form-group col-md-4">
          <label>Range From</label>
          <input
            className="form-control"
            type="number"
            value={config.from}
            onChange={onGraphFromChange}
          />
        </div>
        <div className="form-group col-md-4">
          <label>Range To</label>
          <input
            className="form-control"
            type="number"
            value={config.to}
            onChange={onGraphToChange}
          />
        </div>
      </div>
    </div>
  );
};

export default CompareBigO;
