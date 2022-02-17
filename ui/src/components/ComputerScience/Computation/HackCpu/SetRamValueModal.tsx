import React from "react";
import ModalDialog from "../../../Bootstrap/ModalDialog";
import ButtonBar, {
  Props as ButtonBarProps,
} from "../../../Bootstrap/Buttons/ButtonBar";

interface NewProps {
  onConfirm: (address: number, values: number[]) => void;
}

interface Props extends ReactModal.Props {
  startAddress: number;
  onStartAddressChange: React.ChangeEventHandler<HTMLInputElement>;
  memoryValue: string;
  onMemoryValueChange: React.ChangeEventHandler<HTMLInputElement>;
  onConfirm: () => void;
  onCloseDialog: () => void;
}

const SetRamValueModal: React.FunctionComponent<Props> = ({
  startAddress,
  onStartAddressChange,
  memoryValue,
  onMemoryValueChange,
  onCloseDialog,
  onConfirm,
  ...rest
}) => {
  const buttonBarProps: ButtonBarProps = React.useMemo(
    () => ({
      buttons: [
        {
          text: "Cancel",
          styleType: "primary",
          onClick: onCloseDialog,
        },
        {
          text: "Confirm",
          styleType: "danger",
          onClick: () => {
            onConfirm();
            onCloseDialog();
          },
        },
      ],
    }),
    [onConfirm, onCloseDialog]
  );

  return (
    <ModalDialog
      {...rest}
      header={<h3>Set a value in RAM</h3>}
      content={
        <form>
          <div className="form-group">
            <label>Start Address</label>
            <input
              className="form-control"
              value={startAddress}
              onChange={onStartAddressChange}
            />
          </div>
          <div className="form-group">
            <label>Memory Value(s) CSV</label>
            <input
              className="form-control"
              value={memoryValue}
              onChange={onMemoryValueChange}
            />
          </div>
        </form>
      }
      actions={<ButtonBar {...buttonBarProps} />}
    />
  );
};

interface UseSetRamValueModal {
  componentProps: Props;
  showDialog: () => void;
}

const useSetRamValueModal = ({ onConfirm }: NewProps): UseSetRamValueModal => {
  const [isOpen, setIsOpen] = React.useState<boolean>(false);
  const [startAddress, setStartAddress] = React.useState<number>(0);
  const [memoryValue, setMemoryValue] = React.useState<string>("0");

  const onStartAddressChange: React.ChangeEventHandler<HTMLInputElement> = React.useCallback(
    ({ target: { value } }) => setStartAddress(parseInt(value, 10)),
    [setStartAddress]
  );
  const onMemoryValueChange: React.ChangeEventHandler<HTMLInputElement> = React.useCallback(
    ({ target: { value } }) => setMemoryValue(value),
    [setMemoryValue]
  );

  const _onConfirm = React.useCallback(() => {
    const memoryValues = memoryValue.split(",").map((s) => parseInt(s, 10));
    console.log("FOO ", memoryValues);
    onConfirm(startAddress, memoryValues);
  }, [onConfirm, startAddress, memoryValue]);

  const _onCloseDialog = React.useCallback(() => {
    setIsOpen(false);
  }, [setIsOpen]);

  const _showDialog = React.useCallback(() => {
    setIsOpen(true);
  }, [setIsOpen]);

  return {
    componentProps: {
      isOpen,
      startAddress,
      onStartAddressChange,
      memoryValue,
      onMemoryValueChange,
      onConfirm: _onConfirm,
      onCloseDialog: _onCloseDialog,
    },
    showDialog: _showDialog,
  };
};

export default SetRamValueModal;

export { useSetRamValueModal };
