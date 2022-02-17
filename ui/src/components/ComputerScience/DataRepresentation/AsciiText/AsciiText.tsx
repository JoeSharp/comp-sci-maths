import React from "react";

import "./asciiText.css";
import AsciiTable from "./AsciiTable";

const CYBERCHEF_LINK =
  "https://gchq.github.io/CyberChef/#recipe=To_Hexdump(16,false,false)&input=VGhlIHF1aWNrIGJyb3duIGZveCBqdW1wZWQgb3ZlciB0aGUgbGF6eSBkb2c";

const AsciiDemo: React.FunctionComponent = () => {
  const [text, setText] = React.useState<string>(
    "The quick brown fox jumped over the lazy dog"
  );

  const onTextChange: React.ChangeEventHandler<HTMLInputElement> = React.useCallback(
    ({ target: { value } }) => setText(value),
    [setText]
  );

  const asAscii: string = React.useMemo(
    () =>
      text
        .split("")
        .map((t) => t.charCodeAt(0))
        .map((d) => d.toString(16))
        .join(""),
    [text]
  );

  return (
    <div>
      <form>
        <div className="form-group">
          <label>Text</label>
          <input
            className="form-control"
            value={text}
            onChange={onTextChange}
          />
        </div>
        <div className="form-group">
          <label>Raw Hex</label>
          <div className="form-control hexDump">{asAscii}</div>
        </div>
      </form>

      <p>
        Whilst this is a cute little demo, there is a far superior tool for
        observing this form of representation{" "}
        <a target="_blank" rel="noopener noreferrer" href={CYBERCHEF_LINK}>
          here
        </a>
      </p>

      <h2>ASCII Character Table</h2>
      <AsciiTable />
    </div>
  );
};

export default AsciiDemo;
