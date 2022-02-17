import React from "react";

import NewProgramDialog, {
  useDialog as useNewProgramDialog,
} from "./NewProgramDialog";
import ProgramPickerDialog, {
  useDialog as useProgramPickerDialog,
} from "./ProgramPickerDialog";
import { Props as ButtonProps } from "../../../Bootstrap/Buttons/Button";
import ButtonBar from "../../../Bootstrap/Buttons/ButtonBar";
import ProgramEditor from "./ProgramEditor";
import useListReducer from "../../../lib/useListReducer";
import Tabs, { Tab, useTabs } from "../../../Bootstrap/Tabs/Tabs";
import ConfirmDialog, {
  useDialog as useConfirmDialog,
} from "../../../Bootstrap/ConfirmDialog";
import useSavedProgram from "../../../lib/useSavedPrograms";

interface OpenProgram {
  programName: string;
  program: string;
}

const ProgramManager: React.FunctionComponent = () => {
  const {
    createNew: createNewProgram,
    reset: resetSavedPrograms,
  } = useSavedProgram();

  const {
    items: openPrograms,
    addItem: addOpenProgram,
    removeItem: removeOpenProgram,
  } = useListReducer<OpenProgram>([]);

  const openProgram = React.useCallback(
    (programName: string, program: string) =>
      addOpenProgram({ programName, program }),
    [addOpenProgram]
  );
  const closeProgram = React.useCallback(
    (programName: string) => {
      removeOpenProgram((p) => p.programName === programName);
    },
    [removeOpenProgram]
  );

  const {
    showDialog: showProgramPicker,
    componentProps: programPickerProps,
  } = useProgramPickerDialog(openProgram);

  const tabs: Tab[] = React.useMemo(
    () =>
      openPrograms.map(({ programName, program }) => ({
        title: programName,
        content: (
          <ProgramEditor
            key={programName}
            programName={programName}
            program={program}
            closeProgram={closeProgram}
          />
        ),
      })),
    [openPrograms, closeProgram]
  );

  const tabsProps = useTabs(tabs);
  const { setSelectedTitle: setOpenTab } = tabsProps;

  const createAndOpenNewProgram = React.useCallback(
    (name: string) => {
      const content = createNewProgram(name);
      if (!!content) {
        openProgram(name, content);
        setOpenTab(name);
      }
    },
    [setOpenTab, createNewProgram, openProgram]
  );

  const {
    showDialog: showNewProgramDialog,
    componentProps: newProgramProps,
  } = useNewProgramDialog(createAndOpenNewProgram);

  const {
    showDialog: showResetConfirmation,
    componentProps: confirmResetProps,
  } = useConfirmDialog({
    getQuestion: () => "Are you sure you want to reset local program storage?",
    onConfirm: resetSavedPrograms,
  });

  const buttons: ButtonProps[] = React.useMemo(
    () => [
      {
        onClick: showNewProgramDialog,
        text: "New",
        styleType: "primary",
      },
      {
        onClick: showProgramPicker,
        text: "Open",
        styleType: "success",
      },
      {
        onClick: showResetConfirmation,
        text: "Reset All",
        styleType: "danger",
      },
    ],
    [showResetConfirmation, showProgramPicker, showNewProgramDialog]
  );

  return (
    <div>
      <h4>Program Editor</h4>

      <NewProgramDialog {...newProgramProps} />
      <ConfirmDialog {...confirmResetProps} />

      <div>
        <ProgramPickerDialog {...programPickerProps} />
        <ButtonBar buttons={buttons} />
      </div>

      <Tabs {...tabsProps} />
    </div>
  );
};

export default ProgramManager;
