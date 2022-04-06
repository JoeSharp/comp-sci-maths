import React from "react";

import GraphSketch from "../../ComputerScience/DataStructures/GraphManager/GraphSketch";
import useSketch from "../../p5/useSketch";
import usePrimeFactorTree from "./usePrimeFactorTree";
import Checkbox from "../../Bootstrap/Checkbox";

class PrimeFactorSketch extends GraphSketch { }

const PrimeFactors: React.FunctionComponent = () => {
  const [value, setValue] = React.useState<number>(1001);

  const onValueChange: React.ChangeEventHandler<HTMLInputElement> = React.useCallback(
    ({ target: { value } }) => setValue(parseInt(value)),
    [setValue]
  );

  const { refContainer, updateConfig } = useSketch(PrimeFactorSketch);

  const { primeFactorTree, primeFactors } = usePrimeFactorTree(value);

  const [physicsEnabled, setPhysicsEnabled] = React.useState<boolean>(true);
  const onPhysicsEnabledChange: React.ChangeEventHandler<HTMLInputElement> = React.useCallback(
    ({ target: { checked } }) => setPhysicsEnabled(checked),
    [setPhysicsEnabled]
  );

  React.useEffect(() => {
    updateConfig({ physicsEnabled, graph: primeFactorTree });
  }, [primeFactorTree, updateConfig, physicsEnabled]);

  return (
    <div>
      <form>
        <div className="form-group">
          <label>Value</label>
          <input
            className="form-control"
            type="number"
            value={value}
            onChange={onValueChange}
          />
        </div>
      </form>

      <h2>Prime Factors</h2>
      <div>{primeFactors.join(" x ")}</div>
      <div>{primeFactorTree.toString()}</div>

      <h2>Prime Factor Tree</h2>
      <Checkbox
        id="chkPhysics"
        checked={physicsEnabled}
        onChange={onPhysicsEnabledChange}
        label="Physics Enabled"
      />
      <div ref={refContainer} />
    </div>
  );
};
export default PrimeFactors;
