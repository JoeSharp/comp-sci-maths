import React from "react";
import { useToggledInterval, UseToggledInterval } from "../useInterval";

interface NewProps {
  reset: () => void;
  iterate: () => void;
}

interface Props extends NewProps, UseToggledInterval {
}

const StepForwardControls = ({
  iterate,
  reset,
  isAutoIterating,
  setIsAutoIterating,
}: Props) => (
  <div>
    <button
      disabled={isAutoIterating}
      className="btn btn-danger mr-2"
      onClick={reset}
    >
      <span className="oi oi-media-skip-backward"></span>
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
      onClick={iterate}
    >
      <span className="oi oi-media-step-forward"></span>
    </button>
  </div>
);

interface UseStepForwardControls {
  componentProps: Props;
}

export const useStepForwardControls = ({ iterate, reset }: NewProps): UseStepForwardControls => {
  const toggledInterval = useToggledInterval({
    iterate,
    interval: 500,
  });

  return {
    componentProps: React.useMemo(
      () => ({
        ...toggledInterval,
        iterate,
        reset
      }),
      [reset, iterate, toggledInterval]
    ),
  };
};

export default StepForwardControls;
