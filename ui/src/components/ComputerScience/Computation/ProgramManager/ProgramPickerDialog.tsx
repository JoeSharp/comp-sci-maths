import React from "react";
import ModalDialog from "../../../Bootstrap/ModalDialog";
import { Props as ButtonProps } from "../../../Bootstrap/Buttons/Button";
import ButtonBar from "../../../Bootstrap/Buttons/ButtonBar";
import useSavedPrograms from "../../../lib/useSavedPrograms";

interface Props {
  selectedProgram: string;
  onSelectChange: React.ChangeEventHandler<HTMLSelectElement>;
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

const ProgramPickerDialog: React.FunctionComponent<Props> = (props) => {
  const { selectedProgram, onSelectChange, onConfirm, onCancel } = props;

  const { names } = useSavedPrograms();

  const buttons: ButtonProps[] = React.useMemo(
    () => [
      {
        text: "Load",
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
        <div className="form-group">
          <label>Program</label>
          <select
            className="form-control"
            value={selectedProgram}
            onChange={onSelectChange}
          >
            {names.map((name) => (
              <option key={name} value={name}>
                {name}
              </option>
            ))}
          </select>
        </div>
      }
      actions={<ButtonBar buttons={buttons} />}
    />
  );
};

interface UseDialog {
  showDialog: () => void;
  componentProps: Props;
}

export const useDialog = (
  onConfirm: (programName: string, program: string) => void
): UseDialog => {
  const [isOpen, setIsOpen] = React.useState<boolean>(false);

  const { names, programs } = useSavedPrograms();

  const [selectedProgram, setProgramName] = React.useState<string>(names[0]);

  const onSelectChange: React.ChangeEventHandler<HTMLSelectElement> = React.useCallback(
    ({ target: { value } }) => {
      setProgramName(value);
    },
    [setProgramName]
  );

  const onCancel = React.useCallback(() => setIsOpen(false), [setIsOpen]);
  const showDialog = React.useCallback(() => setIsOpen(true), [setIsOpen]);
  const _onConfirm = React.useCallback(() => {
    onConfirm(selectedProgram, programs[selectedProgram]);
    onCancel();
  }, [selectedProgram, programs, onConfirm, onCancel]);

  return {
    showDialog,
    componentProps: {
      isOpen,
      onSelectChange,
      selectedProgram,
      onConfirm: _onConfirm,
      onCancel,
    },
  };
};

export default ProgramPickerDialog;
