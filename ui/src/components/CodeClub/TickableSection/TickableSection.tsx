import React from "react";

import "./tickable.css";

interface Props {
  tickId: string;
  header: string;
}

const TickableSection: React.FunctionComponent<Props> = ({
  tickId,
  header,
  children
}) => {
  const [isComplete, setIsComplete] = React.useState<boolean>(false);

  const onIsCompleteChange: React.ChangeEventHandler<
    HTMLInputElement
  > = React.useCallback(({ target: { checked } }) => setIsComplete(checked), [
    setIsComplete
  ]);

  let chkId = React.useMemo(() => `chk${tickId}`, [tickId]);
  let className = React.useMemo(() => {
    let classNames: string[] = ["tickable-section"];
    if (isComplete) {
      classNames.push("ticked");
    }
    return classNames.join(" ");
  }, [isComplete]);

  return (
    <div className={className}>
      <div className="form-check">
        <input
          className="form-check-input"
          type="checkbox"
          checked={isComplete}
          onChange={onIsCompleteChange}
          id={chkId}
        />
        <label className="form-check-label" htmlFor={chkId}>
          <h2>{header}</h2>
        </label>
      </div>
      {children}
    </div>
  );
};

export default TickableSection;
