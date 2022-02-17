import max from "./Max";
import add from "./Add";
import rect from "./Rect";
import multAsm from "./mult/Mult.asm";
import multCmp from "./mult/Mult.cmp";
import multTst from "./mult/Mult.tst";

export const programs = {
  "Max.asm": max,
  "Add.asm": add,
  "Rect.asm": rect,
  "Mult.asm": multAsm,
  "Mult.cmp": multCmp,
  "Mult.tst": multTst,
};
