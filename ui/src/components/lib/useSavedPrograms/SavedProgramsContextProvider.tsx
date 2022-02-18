import React from "react";
import cogoToast from "cogo-toast";

import useLocalStorage, {
  useStoreObjectFactory,
} from "../../lib/useLocalStorage";

import { programs as defaultPrograms } from "./cannedPrograms";
import SavedProgramsContext from "./SavedProgramsContext";
import { ProgramsById } from "./types";
import { Optional } from "@comp-sci-maths/lib/dist/types";

const SavedProgramsContextProvider: React.FunctionComponent = ({
  children,
}) => {
  const {
    value: programs,
    reduceValue: reducePrograms,
    setValue: setPrograms,
  } = useLocalStorage<ProgramsById>(
    "saved-programs",
    defaultPrograms,
    useStoreObjectFactory()
  );

  const names: string[] = React.useMemo(() => Object.keys(programs), [
    programs,
  ]);

  const createNew = React.useCallback(
    (name: string, content: string = "// New Program"): Optional<string> => {
      if (name.length < 3) {
        cogoToast.error("Could not save graph with short name (length < 3)");
        return;
      }

      if (names.includes(name)) {
        cogoToast.error("This name already exists");
        return;
      }

      reducePrograms((existing: ProgramsById) => ({
        ...existing,
        [name]: content,
      }));
      cogoToast.info(`New Program Created ${name}`);
      return content;
    },
    [reducePrograms, names]
  );

  const saveProgram = React.useCallback(
    (name: string, program: string) => {
      reducePrograms((existing: ProgramsById) => ({
        ...existing,
        [name]: program,
      }));
      cogoToast.info(`Program Saved ${name}`);
    },
    [reducePrograms]
  );

  const deleteProgram = React.useCallback(
    (name: string) => {
      reducePrograms((existing: ProgramsById) => {
        const updated = { ...existing };
        delete updated[name];
        return updated;
      });
      cogoToast.info(`Program Deleted ${name}`);
    },
    [reducePrograms]
  );

  const reset = React.useCallback(() => {
    setPrograms(defaultPrograms);
  }, [setPrograms]);

  return (
    <SavedProgramsContext.Provider
      value={{
        names,
        programs,
        createNew,
        deleteProgram,
        saveProgram,
        reset,
      }}
    >
      {children}
    </SavedProgramsContext.Provider>
  );
};

export default SavedProgramsContextProvider;
