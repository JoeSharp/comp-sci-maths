import React from "react";

export interface UseDirtyState<T> {
  value: T;
  setValue: (n: T) => void;
  isDirty: boolean;
  setClean: () => void;
}

const useDirtyState = <T>(defaultValue: T): UseDirtyState<T> => {
  const [value, setValue] = React.useState<T>(defaultValue);
  const [isDirty, setIsDirty] = React.useState<boolean>(false);

  const _setValue = React.useCallback(
    (value: T) => {
      setValue(value);
      setIsDirty(true);
    },
    [setValue, setIsDirty]
  );

  const _setClean = React.useCallback(() => {
    setIsDirty(false);
  }, [setIsDirty]);

  return {
    setValue: _setValue,
    setClean: _setClean,
    isDirty,
    value,
  };
};

export default useDirtyState;
