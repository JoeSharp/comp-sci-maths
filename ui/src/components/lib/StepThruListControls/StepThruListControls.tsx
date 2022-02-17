import React from "react";
import { useToggledInterval, UseToggledInterval } from "../useInterval";
import useItemInArray, {
  UseItemInArray,
} from "../useLoopCounter/useItemInArray";

interface Props<T> extends UseToggledInterval, UseItemInArray<T> {
  items: T[];
}

const StepThruListControls = <T,>({
  index,
  items,
  isAutoIterating,
  setIsAutoIterating,
  stepForward,
  stepBackward,
  goToLast,
  goToFirst,
}: Props<T>) => (
  <div>
    <h4>Stepping Through Stages</h4>
    <p>
      Step {index + 1} of {items.length}
    </p>
    <div>
        <button
          disabled={isAutoIterating}
          className="btn btn-danger mr-2"
          onClick={goToFirst}
        >
          <span className="oi oi-media-skip-backward"></span>
        </button>
      <button
        disabled={isAutoIterating}
        className="btn btn-primary mr-2"
        onClick={stepBackward}
      >
        <span className="oi oi-media-step-backward"></span>
      </button>

      {isAutoIterating ? (
        <button
          className="btn btn-danger mr-2"
          onClick={() => setIsAutoIterating(false)}
        >
          <span className="oi oi-media-stop"></span>
        </button>
      ) : (
        <button
          className="btn btn-primary mr-2"
          onClick={() => setIsAutoIterating(true)}
        >
          <span className="oi oi-media-play"></span>
        </button>
      )}

      <button
        disabled={isAutoIterating}
        className="btn btn-primary mr-2"
        onClick={stepForward}
      >
        <span className="oi oi-media-step-forward"></span>
      </button>
      <button
        disabled={isAutoIterating}
        className="btn btn-danger mr-2"
        onClick={goToLast}
      >
        <span className="oi oi-media-skip-forward"></span>
      </button>
    </div>
  </div>
);

interface UseStepThruListControls<T> {
  index: number;
  item?: T;
  componentProps: Props<T>;
}

export const useStepThruListControls = <T,>(items: T[]): UseStepThruListControls<T> => {
  const itemsInArray = useItemInArray({
    items,
  });

  const { index, stepForward, item } = itemsInArray;

  // Only auto iterate forward if we aren't on the final step
  const autoStepForward = React.useCallback(() => {
    if (index < items.length - 1) {
      stepForward();
    }
  }, [index, items.length, stepForward]);

  const toggledInterval = useToggledInterval({
    iterate: autoStepForward,
    interval: 500,
  });

  return {
    index,
    item,
    componentProps: React.useMemo(
      () => ({
        ...toggledInterval,
        ...itemsInArray,
        items,
      }),
      [toggledInterval, itemsInArray, items]
    ),
  };
};

export default StepThruListControls;
