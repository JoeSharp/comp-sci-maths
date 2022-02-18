import assemble from "@comp-sci-maths/lib/dist/computation/assemblyLanguage/assemble";
import React from "react";
import { HackCpu } from "comp-sci-maths-lib";
import { INumberBase } from "@comp-sci-maths/lib/dist/dataRepresentation/numberBases/types";
import { LoadProgram, MAX_TABLE_ROWS } from "./types";
import StartAddressDialog, {
  useDialog as useStartAddressDialog,
} from "./StartAddressDialog";
import { Props as ButtonProps } from "../../../Bootstrap/Buttons/Button";
import ButtonBar from "../../../Bootstrap/Buttons/ButtonBar";
import ProgramPickerDialog, {
  useDialog as useProgramPicker,
} from "../ProgramManager/ProgramPickerDialog";

interface Props {
  cpu: HackCpu;
  loadProgram: LoadProgram;
  numberBase: INumberBase;
}

const ProgramMemoryTable: React.FunctionComponent<Props> = ({
  cpu: { programCounter, program },
  loadProgram,
  numberBase,
}) => {
  const {
    startAddress,
    showDialog: showStartAddressDialog,
    componentProps: startAddressProps,
  } = useStartAddressDialog({
    numberBase,
    maxAddress: program.length,
  });

  const {
    showDialog: showProgramPicker,
    componentProps: programPickerProps,
  } = useProgramPicker(loadProgram);

  const buttons: ButtonProps[] = React.useMemo(
    () => [
      {
        text: "Search",
        styleType: "primary",
        onClick: showStartAddressDialog,
      },
      {
        text: "Load",
        styleType: "primary",
        onClick: showProgramPicker,
      },
    ],
    [showStartAddressDialog, showProgramPicker]
  );

  return (
    <div>
      <ProgramPickerDialog {...programPickerProps} />
      <h4>
        ROM
        <ButtonBar className="title-button" buttons={buttons} />
      </h4>
      <div className="form-group">
        <label>PC</label>
        <input
          className="form-control"
          readOnly
          value={numberBase.toString(programCounter)}
        />
      </div>
      <table className="cpu-table code-text">
        <thead>
          <tr>
            <th>Line</th>
            <th>Code</th>
          </tr>
        </thead>
        <tbody>
          {program
            .filter(
              (p, i) => i >= startAddress && i < startAddress + MAX_TABLE_ROWS
            )
            .map((p, i) => (
              <tr
                key={i}
                className={
                  startAddress + i === programCounter ? "highlighted" : ""
                }
              >
                <td>{numberBase.toString(i)}</td>
                <td>{assemble(p)}</td>
              </tr>
            ))}
        </tbody>
      </table>
      <StartAddressDialog {...startAddressProps} />
    </div>
  );
};

export default ProgramMemoryTable;
