import React from "react";
import SavedProgramsContext from "./SavedProgramsContext";

const useSavedPrograms = () => {
  return React.useContext(SavedProgramsContext);
};

export default useSavedPrograms
