import React from "react";

import useInterval from "./useInterval";

export interface Props {
  iterate: () => any;
  interval?: number;
}

export interface UseToggledInterval {
  isAutoIterating: boolean;
  setIsAutoIterating: (value: boolean) => void;
  onAutoIteratingChange: React.ChangeEventHandler<HTMLInputElement>;
}

export const useToggledInterval = ({
  iterate,
  interval = 1000,
}: Props): UseToggledInterval => {
  const [isAutoIterating, setIsAutoIterating] = React.useState<boolean>(false);

  const onAutoIteratingChange: React.ChangeEventHandler<HTMLInputElement> = React.useCallback(
    ({ target: { checked } }) => setIsAutoIterating(checked),
    [setIsAutoIterating]
  );

  const autoIterate = React.useCallback(() => isAutoIterating && iterate(), [
    isAutoIterating,
    iterate,
  ]);

  useInterval(autoIterate, interval);

  return { setIsAutoIterating, isAutoIterating, onAutoIteratingChange };
};
