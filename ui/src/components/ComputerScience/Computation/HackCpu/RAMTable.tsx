import React from "react";

import { HackCpu } from "comp-sci-maths-lib";
import { INumberBase } from "comp-sci-maths-lib/dist/dataRepresentation/numberBases/types";
import { Props as ButtonProps } from "../../../Bootstrap/Buttons/Button";
import SetRamValueModal, { useSetRamValueModal } from "./SetRamValueModal";
import StartAddressDialog, {
  useDialog as useStartAddressDialog,
} from "./StartAddressDialog";
import { MAX_TABLE_ROWS, SetRamValues } from "./types";
import ButtonBar from "../../../Bootstrap/Buttons/ButtonBar";

interface Props {
  cpu: HackCpu;
  numberBase: INumberBase;
  setRamValue: SetRamValues;
}

const RAMTable: React.FunctionComponent<Props> = ({
  cpu: { addressRegister, memory },
  numberBase,
  setRamValue,
}) => {
  const {
    componentProps: setRamValueProps,
    showDialog: showSetRamValueDialog,
  } = useSetRamValueModal({
    onConfirm: React.useCallback(
      (address: number, values: number[]) => {
        setRamValue(address, values);
      },
      [setRamValue]
    ),
  });

  const {
    startAddress,
    showDialog: showStartAddressDialog,
    componentProps: startAddressProps,
  } = useStartAddressDialog({
    numberBase,
    maxAddress: memory.contents.length,
  });

  const buttons: ButtonProps[] = React.useMemo(
    () => [
      {
        text: "Search",
        onClick: showStartAddressDialog,
        styleType: "primary",
      },
      {
        text: "Write",
        onClick: showSetRamValueDialog,
        styleType: "primary",
      },
    ],
    [showSetRamValueDialog, showStartAddressDialog]
  );

  return (
    <div>
      <h4>
        RAM
        <ButtonBar className="title-button" buttons={buttons} />
      </h4>

      <div className="form-group">
        <label>A</label>
        <input
          className="form-control"
          readOnly
          value={numberBase.toString(addressRegister)}
        />
      </div>
      <table className="cpu-table code-text">
        <thead>
          <tr>
            <th>Address</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          {memory.contents
            .filter(
              (p, i) => i >= startAddress && i < startAddress + MAX_TABLE_ROWS
            )
            .map((p, i) => (
              <tr
                key={i}
                className={
                  startAddress + i === addressRegister ? "highlighted" : ""
                }
              >
                <td>{numberBase.toString(startAddress + i)}</td>
                <td>{numberBase.base === 10 ? p : numberBase.toString(p)}</td>
              </tr>
            ))}
        </tbody>
      </table>
      <SetRamValueModal {...setRamValueProps} />
      <StartAddressDialog {...startAddressProps} />
    </div>
  );
};

export default RAMTable;
