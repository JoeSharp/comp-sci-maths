import React from "react";

import solver from "./solver";

const SolveEquation: React.FunctionComponent = () => {
  const [a, setA] = React.useState(1);
  const [b, setB] = React.useState(2);
  const [c, setC] = React.useState(-13);
  const [numberGuesses, setNumberGuesses] = React.useState(50);

  let onAChange = React.useCallback(
    ({ target: { value } }) => setA(parseFloat(value)),
    [setA]
  );
  let onBChange = React.useCallback(
    ({ target: { value } }) => setB(parseFloat(value)),
    [setB]
  );
  let onCChange = React.useCallback(
    ({ target: { value } }) => setC(parseFloat(value)),
    [setC]
  );
  let onNumberGuessesChange = React.useCallback(
    ({ target: { value } }) => setNumberGuesses(parseInt(value)),
    [setNumberGuesses]
  );

  const f = React.useCallback((x: number) => a * Math.pow(x, 2) + b * x + c, [
    a,
    b,
    c,
  ]);

  const { guesses } = React.useMemo(() => solver(f, numberGuesses), [
    f,
    numberGuesses,
  ]);

  let givenAnswer: string = React.useMemo(
    () => (guesses.length > 0 ? guesses[0].x.toFixed(2) : "0.0"),
    [guesses]
  );

  let equationString = React.useMemo(() => `${a}x^2 + ${b}x + ${c}`, [a, b, c]);

  return (
    <div>
      <h2>Solve Equation</h2>
      <p>{equationString}</p>
      <form>
        <div className="form-row">
          <div className="col">
            <label>a</label>
            <input
              className="form-control"
              type="number"
              value={a}
              onChange={onAChange}
              placeholder="a"
            />
          </div>
          <div className="col">
            <label>b</label>
            <input
              className="form-control"
              type="number"
              value={b}
              onChange={onBChange}
              placeholder="b"
            />
          </div>
          <div className="col">
            <label>c</label>
            <input
              className="form-control"
              type="number"
              value={c}
              onChange={onCChange}
              placeholder="c"
            />
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="numberGuesses">Number Guesses</label>
          <input
            className="form-control"
            id="numberGuesses"
            type="number"
            value={numberGuesses}
            onChange={onNumberGuessesChange}
          />
        </div>
      </form>
      <div>Answer is {givenAnswer}</div>
      <table className="table">
        <thead>
          <tr>
            <th>Guess</th>
            <th>Answer</th>
          </tr>
        </thead>
        <tbody>
          {guesses.map(({ x, answer }, i) => (
            <tr key={i}>
              <td>{x}</td>
              <td>{answer}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SolveEquation;
