import React from "react";
import { INumberBase } from "comp-sci-maths-lib/dist/dataRepresentation/numberBases/types";

import ModalDialog from "../../../Bootstrap/ModalDialog";
import cogoToast from "cogo-toast";
import { Props as ButtonProps } from "../../../Bootstrap/Buttons/Button";
import ButtonBar from "../../../Bootstrap/Buttons/ButtonBar";

interface BaseProps {
  numberBase: INumberBase;
  maxAddress: number;
}

interface Props extends BaseProps {
  isOpen: boolean;
  value: number;
  onValueChange: React.ChangeEventHandler<HTMLInputElement>;
  onConfirm: () => void;
  onCancel: () => void;
}

const StartAddressDialog: React.FunctionComponent<Props> = (props) => {
  const { value, onValueChange, numberBase, onConfirm, onCancel } = props;

  const buttons: ButtonProps[] = React.useMemo(
    () => [
      {
        text: "Go to",
        styleType: "primary",
        onClick: onConfirm,
      },
      {
        text: "Cancel",
        styleType: "danger",
        onClick: onCancel,
      },
    ],
    [onConfirm, onCancel]
  );

  return (
    <ModalDialog
      {...props}
      header={<h4>Select Address to Display</h4>}
      content={
        <form className="form">
          <div className="form-group">
            <label htmlFor="txtStartAddress">
              Start Address ({numberBase.name})
            </label>
            <input
              id="txtStartAddress"
              className="form-control"
              value={value}
              onChange={onValueChange}
            />
          </div>
        </form>
      }
      actions={<ButtonBar buttons={buttons} />}
    />
  );
};

interface UseDialog {
  startAddress: number;
  showDialog: () => void;
  componentProps: Props;
}

export const useDialog = (baseProps: BaseProps): UseDialog => {
  const { maxAddress, numberBase } = baseProps;
  const [startAddress, setStartAddress] = React.useState<number>(0);

  const [isOpen, setIsOpen] = React.useState<boolean>(false);

  const [value, setValue] = React.useState<number>(startAddress);
  const onValueChange: React.ChangeEventHandler<HTMLInputElement> = React.useCallback(
    ({ target: { value } }) => setValue(numberBase.fromString(value)),
    [numberBase, setValue]
  );

  const onCancel = React.useCallback(() => setIsOpen(false), [setIsOpen]);
  const showDialog = React.useCallback(() => setIsOpen(true), [setIsOpen]);
  const _onConfirm = React.useCallback(() => {
    if (value < 0) {
      cogoToast.error("Invalid Start Address (less than zero");
      return;
    }
    if (value > maxAddress) {
      cogoToast.error(
        `Invalid Start Address (higher than allowed max of ${maxAddress})`
      );
      return;
    }
    setStartAddress(value);
    onCancel();
  }, [value, maxAddress, setStartAddress, onCancel]);

  React.useEffect(() => setValue(startAddress), [startAddress, setValue]);

  return {
    startAddress,
    showDialog,
    componentProps: {
      ...baseProps,
      isOpen,
      value,
      onValueChange,
      onConfirm: _onConfirm,
      onCancel,
    },
  };
};

export default StartAddressDialog;
