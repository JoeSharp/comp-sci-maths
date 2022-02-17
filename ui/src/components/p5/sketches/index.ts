import gravityOrbits from "./gravityOrbits";
import rainbowFlowField from "./rainbowFlowField";
import gravityDemo from "./gravityDemo";

interface SketchByName {
  [name: string]: any;
}

const sketches: SketchByName = {
  gravityOrbits,
  rainbowFlowField,
  gravityDemo,
};

export default sketches;