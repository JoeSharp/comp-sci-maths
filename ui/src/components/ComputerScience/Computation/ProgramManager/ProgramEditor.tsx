import React from "react";

import useDirtyState from "../../../lib/useDirtyState";

import { Props as ButtonProps } from "../../../Bootstrap/Buttons/Button";
import ButtonBar from "../../../Bootstrap/Buttons/ButtonBar";
import useSavedPrograms from "../../../lib/useSavedPrograms";

const DEFAULT_PROGRAM: string = "// New Program";

interface Props {
  program: string;
  programName: string;
  closeProgram: (name: string) => void;
}

const ProgramEditor: React.FunctionComponent<Props> = ({
  program,
  programName,
  closeProgram,
}) => {
  const { saveProgram, deleteProgram } = useSavedPrograms();
  const {
    value: editedProgram,
    setValue: setEditedProgram,
    isDirty: isEditedProgramDirty,
    setClean: setEditedProgramClean,
  } = useDirtyState(DEFAULT_PROGRAM);

  const onEditedProgramChange: React.ChangeEventHandler<HTMLTextAreaElement> = React.useCallback(
    ({ target: { value } }) => setEditedProgram(value),
    [setEditedProgram]
  );

  React.useEffect(() => {
    setEditedProgram(program);
    setEditedProgramClean();
  }, [program, setEditedProgramClean, setEditedProgram]);

  const buttons: ButtonProps[] = React.useMemo(
    () => [
      {
        onClick: () => {
          saveProgram(programName, editedProgram);
          setEditedProgramClean();
        },
        text: "Save",
        styleType: "success",
        disabled: !isEditedProgramDirty,
      },
      {
        onClick: () => {
          deleteProgram(programName);
          closeProgram(programName);
        },
        text: "Delete",
        styleType: "danger",
      },
      {
        onClick: () => closeProgram(programName),
        text: "Close",
        styleType: "warning",
      },
    ],
    [
      isEditedProgramDirty,
      editedProgram,
      programName,
      setEditedProgramClean,
      closeProgram,
      deleteProgram,
      saveProgram,
    ]
  );

  return (
    <div>
      <ButtonBar className="mt-2 mb-2" buttons={buttons} />
      <div className="form-group">
        <textarea
          className="txt-code code-text"
          value={editedProgram}
          onChange={onEditedProgramChange}
        />
      </div>
    </div>
  );
};

export default ProgramEditor;
