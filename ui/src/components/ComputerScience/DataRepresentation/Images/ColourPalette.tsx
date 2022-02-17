import React from "react";
import { ColourMap } from "./types";

interface Props {
  value: number;
  onChange: (v: number) => void;
  availableColours: ColourMap;
  colourDepth: number;
}

const ColourPalette: React.FunctionComponent<Props> = ({
  availableColours,
  colourDepth,
  value,
  onChange,
}) => {
  const availableColoursWithHandlers = React.useMemo(
    () =>
      Object.entries(availableColours).map(([code, colourHex]) => ({
        backgroundColor: colourHex,
        onClick: () => onChange(parseInt(code)),
        isCurrent: value === parseInt(code),
      })),
    [availableColours, onChange, value]
  );

  return (
    <div className="colour-palette">
      <div className="colour-palette__selector">
        {availableColoursWithHandlers.map(
          ({ backgroundColor, onClick, isCurrent }, i) => (
            <div
              key={i}
              style={{ backgroundColor }}
              onClick={onClick}
              className={isCurrent ? "current" : ""}
            ></div>
          )
        )}
      </div>
      <div className="colour-palette__current ml-3">
        <div>Binary: {value.toString(2).padStart(colourDepth, "0")}</div>
        <div>CSS: {availableColours[value]}</div>
        <div
          className="colour-palette__current--swatch"
          style={{ backgroundColor: availableColours[value] }}
        ></div>
      </div>
    </div>
  );
};

interface UseProps {
  colourDepth: number;
}

export interface UseColourPallete {
  componentProps: Props;
}

export const useColourPallete = ({
  colourDepth,
}: UseProps): UseColourPallete => {
  // Work out available colours based on depth...
  const availableColours: ColourMap = React.useMemo(() => {
    const numberColours = Math.pow(2, colourDepth);
    const spectrum: ColourMap = {};
    for (let x = 0; x < numberColours; x++) {
      const c = Math.floor((255 * x) / numberColours);
      spectrum[x] = `rgb(${c},${c},${c})`;
    }
    return spectrum;
  }, [colourDepth]);

  const [value, onChange] = React.useState<number>(0);

  return {
    componentProps: { value, onChange, availableColours, colourDepth },
  };
};

export default ColourPalette;
