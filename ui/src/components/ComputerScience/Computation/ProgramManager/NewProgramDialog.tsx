import React from "react";
import ModalDialog from "../../../Bootstrap/ModalDialog";

import { Props as ButtonProps } from "../../../Bootstrap/Buttons/Button";
import ButtonBar from "../../../Bootstrap/Buttons/ButtonBar";

interface Props extends ReactModal.Props {
  createProgram: (name: string) => void;
  onCloseDialog: () => void;
}

const NewProgramDialog: React.FunctionComponent<Props> = (props) => {
  const { createProgram, onCloseDialog } = props;
  const [programName, setProgramName] = React.useState<string>("");

  const onProgramNameChange: React.ChangeEventHandler<HTMLInputElement> = React.useCallback(
    ({ target: { value } }) => setProgramName(value),
    [setProgramName]
  );

  const buttons: ButtonProps[] = React.useMemo(
    () => [
      {
        text: "Create",
        styleType: "primary",
        onClick: () => {
          createProgram(programName);
          onCloseDialog();
        },
      },
      {
        text: "Cancel",
        styleType: "danger",
        onClick: onCloseDialog,
      },
    ],
    [programName, createProgram, onCloseDialog]
  );

  return (
    <ModalDialog
      {...props}
      header={<h4>New Hack ASM Program</h4>}
      content={
        <form className="form">
          <div className="form-group">
            <label htmlFor="newProgramName">Name</label>
            <input
              id="newProgramName"
              className="form-control"
              value={programName}
              onChange={onProgramNameChange}
            />
          </div>
        </form>
      }
      actions={<ButtonBar buttons={buttons} />}
    />
  );
};

interface UseDialog {
  /**
   * The owning component is ready to start a deletion process.
   * Calling this will open the dialog, and setup the UUIDs
   */
  showDialog: () => void;
  /**
   * These are the properties that the owning component can just give to the Dialog component
   * using destructing.
   */
  componentProps: Props;
}

/**
 * This is a React custom hook that sets up things required by the owning component.
 */
export const useDialog = (
  createProgram: (name: string) => void
): UseDialog => {
  const [isOpen, setIsOpen] = React.useState<boolean>(false);

  const _onCloseDialog = React.useCallback(() => setIsOpen(false), [setIsOpen]);
  const _showDialog = React.useCallback(() => setIsOpen(true), [setIsOpen]);

  return {
    componentProps: {
      isOpen,
      createProgram,
      onCloseDialog: _onCloseDialog,
    },
    showDialog: _showDialog,
  };
};

export default NewProgramDialog;
