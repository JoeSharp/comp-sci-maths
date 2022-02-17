import React from "react";

type AnyCallback = () => void;

function useInterval(callback: AnyCallback, delay: number | null) {
  const savedCallback = React.useRef<AnyCallback>(() => {});

  // Remember the latest callback.
  React.useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  React.useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    } else {
      return () => {};
    }
  }, [delay]);
}

export default useInterval;
