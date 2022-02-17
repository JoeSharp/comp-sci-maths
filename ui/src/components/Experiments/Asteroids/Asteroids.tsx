import React from "react";

import Sketch from "./Sketch";
import useSketch from "../../p5/useSketch";

const Graphs: React.FunctionComponent = () => {
  const { refContainer } = useSketch(Sketch);

  return <div ref={refContainer} />;
};

export default Graphs;
