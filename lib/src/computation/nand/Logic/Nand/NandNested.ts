import Chip from "../../Chip";
import { PIN_A, PIN_B, PIN_OUTPUT } from "../../types";
import Nand from "./Nand";

class NandNested extends Chip {
    nand: Nand

    constructor() {
        super('Nand', [PIN_A, PIN_B], [PIN_OUTPUT]);

        this.nand = new Nand();

        // External Wiring
        this.createPin(PIN_A, this.nand.getPin(PIN_A));
        this.createPin(PIN_B, this.nand.getPin(PIN_B));
        this.createPin(PIN_OUTPUT, this.nand.getPin(PIN_OUTPUT));
    }
}

export default NandNested;