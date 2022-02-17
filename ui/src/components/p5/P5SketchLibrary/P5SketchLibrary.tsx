import React from "react";

import SketchPicker from "../SketchPicker";
import sketches from "../sketches";
import useSketch from "../useSketch";

const P5SketchLibrary: React.FunctionComponent = () => {
  const [sketch, onSketchChange] = React.useState<string>(
    Object.keys(sketches)[0]
  );

  const { refContainer } = useSketch(sketches[sketch]);

  return (
    <div>
      <h1>Sketches</h1>
      <form>
        <div className="form-group">
          <label>Sketch</label>
          <SketchPicker
            sketchNames={Object.keys(sketches)}
            className="form-control"
            value={sketch}
            onChange={onSketchChange}
          />
        </div>
      </form>

      <div ref={refContainer} />
    </div>
  );
};

export default P5SketchLibrary;
