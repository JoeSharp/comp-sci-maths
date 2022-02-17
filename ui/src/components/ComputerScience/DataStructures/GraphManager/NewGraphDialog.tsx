import React from "react";
import ModalDialog from "../../../Bootstrap/ModalDialog";

import { Props as ButtonProps } from "../../../Bootstrap/Buttons/Button";
import ButtonBar from "../../../Bootstrap/Buttons/ButtonBar";

interface Props extends ReactModal.Props {
  createGraph: (name: string) => void;
  onCloseDialog: () => void;
}

const NewGraphDialog: React.FunctionComponent<Props> = (props) => {
  const { createGraph, onCloseDialog } = props;
  const [graphName, setGraphName] = React.useState<string>("");

  const onGraphNameChange: React.ChangeEventHandler<HTMLInputElement> = React.useCallback(
    ({ target: { value } }) => setGraphName(value),
    [setGraphName]
  );

  const buttons: ButtonProps[] = React.useMemo(
    () => [
      {
        text: "Create",
        styleType: "primary",
        onClick: () => {
          createGraph(graphName);
          onCloseDialog();
        },
      },
      {
        text: "Cancel",
        styleType: "danger",
        onClick: onCloseDialog,
      },
    ],
    [graphName, createGraph, onCloseDialog]
  );

  return (
    <ModalDialog
      {...props}
      header={<h4>New Graph</h4>}
      content={
        <form className="form">
          <div className="form-group">
            <label htmlFor="newGraphName">Name</label>
            <input
              id="newGraphName"
              className="form-control"
              value={graphName}
              onChange={onGraphNameChange}
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
  createGraph: (name: string) => void
): UseDialog => {
  const [isOpen, setIsOpen] = React.useState<boolean>(false);

  const _onCloseDialog = React.useCallback(() => setIsOpen(false), [setIsOpen]);

  const _showDialog = React.useCallback(() => setIsOpen(true), [setIsOpen]);

  return {
    componentProps: {
      isOpen,
      createGraph,
      onCloseDialog: _onCloseDialog,
    },
    showDialog: _showDialog,
  };
};

export default NewGraphDialog;
