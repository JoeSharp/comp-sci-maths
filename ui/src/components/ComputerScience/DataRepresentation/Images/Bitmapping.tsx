import React from "react";
import useBitmapData from "./useBitmapData";
import ColourPalette, { useColourPallete } from "./ColourPalette";

import "./bitmapping.css";
import useGroupUp from "../../../lib/useGroupUp";

const DEFAULT_WIDTH: number = 10;
const DEFAULT_HEIGHT: number = 10;
const DEFAULT_COLOUR_DEPTH: number = 8;
const AVAILABLE_COLOUR_DEPTHS: number[] = [1, 2, 4, 8];

const Bitmapping: React.FunctionComponent = () => {
  const [width, setWidth] = React.useState<number>(DEFAULT_WIDTH);
  const [height, setHeight] = React.useState<number>(DEFAULT_HEIGHT);
  const [colourDepth, setColourDepth] = React.useState<number>(
    DEFAULT_COLOUR_DEPTH
  );

  const { componentProps: paletteProps } = useColourPallete({
    colourDepth,
  });
  const { value: currentColour, availableColours } = paletteProps;

  const onWidthChange: React.ChangeEventHandler<HTMLInputElement> = React.useCallback(
    ({ target: { value } }) => setWidth(parseInt(value)),
    [setWidth]
  );
  const onHeightChange: React.ChangeEventHandler<HTMLInputElement> = React.useCallback(
    ({ target: { value } }) => setHeight(parseInt(value)),
    [setHeight]
  );
  const onColourDepthChange: React.ChangeEventHandler<HTMLSelectElement> = React.useCallback(
    ({ target: { value } }) => setColourDepth(parseInt(value)),
    [setColourDepth]
  );

  const { pixels, rawData, setColour, randomiseColours } = useBitmapData({
    width,
    height,
    colourDepth,
    availableColours,
  });

  const pixelsWithHandlers = React.useMemo(
    () =>
      pixels.map((row, x) =>
        row.map((colour, y) => ({
          backgroundColor: availableColours[colour],
          onClick: () => setColour(x, y, currentColour),
        }))
      ),
    [currentColour, pixels, availableColours, setColour]
  );

  const { itemGroups: rawDataSplit } = useGroupUp({
    items: rawData.split(""),
    groupSize: 8,
  });
  const rawDataInWords = React.useMemo(
    () => rawDataSplit.map((r) => r.join("")).join(" "),
    [rawDataSplit]
  );

  return (
    <div>
      <div className="image-data-container">
        <table className="bitmap-table">
          <tbody>
            {pixelsWithHandlers.map((row, x) => (
              <tr key={x}>
                {row.map(({ backgroundColor, onClick }, y) => (
                  <td
                    key={y}
                    style={{ backgroundColor }}
                    onClick={onClick}
                  ></td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>

        <div className="binary-data">{rawDataInWords}</div>
      </div>

      <button className="btn btn-primary mt-3 mb-3" onClick={randomiseColours}>
        Randomise
      </button>

      <h4>
        Available Colours 2<sup>{colourDepth}</sup> ={" "}
        {Object.keys(availableColours).length}
      </h4>
      <ColourPalette {...paletteProps} />

      <h4>Metadata</h4>
      <form>
        <div className="form-group">
          <label>Width</label>
          <input
            className="form-control"
            type="number"
            min={4}
            max={20}
            onChange={onWidthChange}
            value={width}
          />
        </div>
        <div className="form-group">
          <label>Height</label>
          <input
            className="form-control"
            type="number"
            min={4}
            max={20}
            onChange={onHeightChange}
            value={height}
          />
        </div>
        <div className="form-group">
          <label>Colour Depth</label>
          <select
            className="form-control"
            value={colourDepth}
            onChange={onColourDepthChange}
          >
            {AVAILABLE_COLOUR_DEPTHS.map((a) => (
              <option key={a} value={a}>
                {a}
              </option>
            ))}
          </select>
        </div>
      </form>
    </div>
  );
};

export default Bitmapping;
