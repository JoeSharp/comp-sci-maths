import React from "react";
import useSieveOfEratosthenes from "./useSieveOfEratosthenes";
import useItemInArray from "../../lib/useLoopCounter/useItemInArray";
import PrimesListing from "./PrimesListing";
import ButtonBar, {
  Props as ButtonBarProps,
} from "../../Bootstrap/Buttons/ButtonBar";

const LIMIT: number = 20;

const SieveOfEratosthenes: React.FunctionComponent = () => {
  const { primeNumbers, iterations } = useSieveOfEratosthenes({
    limit: LIMIT,
  });

  const { index, item, stepBackward, stepForward } = useItemInArray({
    items: iterations,
  });

  const { p, tickedOff } = item || { p: 0, tickedOff: [] };

  const buttonBarProps: ButtonBarProps = React.useMemo(
    () => ({
      buttons: [
        {
          text: "Decrement",
          onClick: stepBackward,
          styleType: "danger",
        },
        {
          text: "Increment",
          onClick: stepForward,
          styleType: "success",
        },
      ],
    }),
    [stepBackward, stepForward]
  );

  return (
    <div>
      <h2>Prime Numbers at Iteration</h2>
      <div>{primeNumbers.join(", ")}</div>

      <h2>
        Ticked off at Iteration {index} with p={p}
      </h2>
      <div>
        Divisible by {p}:{tickedOff.join(", ")}
      </div>

      <ButtonBar {...buttonBarProps} />

      <PrimesListing limit={LIMIT} primeNumbers={tickedOff} />
    </div>
  );
};

export default SieveOfEratosthenes;
