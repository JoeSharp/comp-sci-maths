import Clock from "../Clock";
import Chip from "../Chip";
import { HdlChip } from "./types";
import chipFactory from "../chipFactory";
import BinaryPin from "../BinaryPin";
import BinaryBus from "../BinaryBus";

class HDLChip extends Chip {
    subChips: Chip[];

    constructor(hdl: HdlChip, clock: Clock) {
        super(hdl.name,
            hdl.inputSpec.pinsAndBuses.map(x => x.name),
            hdl.outputSpec.pinsAndBuses.map(x => x.name));

        // Create the Sub Chips, they will have the same index as their respective code lines
        this.subChips = hdl.codeLines.map(({ chipName }) => chipFactory[chipName](clock));

        // Create list of pins and buses
        const pinsAndBuses = [...hdl.outputSpec.pinsAndBuses, ...hdl.inputSpec.pinsAndBuses];

        // Wire up internal pins
        this.subChips.forEach((chipA, a) => {
            const codeLineA = hdl.codeLines[a];
            codeLineA.parameters.forEach(parameterA => {
                if (chipA.inputs.includes(parameterA.inputName)) return;

                this.subChips.forEach((chipB, b) => {
                    if (a === b) return;

                    const codeLineB = hdl.codeLines[b];
                    codeLineB.parameters.forEach(parameterB => {
                        if (chipB.outputs.includes(parameterB.inputName)) return;

                        if (parameterA.outputName === parameterB.outputName) {
                            chipA.getPin(parameterA.inputName).connectRecipient(chipB.getPin(parameterB.inputName))
                        }
                    });
                })
            })
        });

        pinsAndBuses.forEach(({ name, width }) => {
            if (width === 1) {
                // Find all the receivers for this pin
                const receivers: BinaryPin[] = [];
                this.subChips.forEach((chip, i) => {
                    const { parameters } = hdl.codeLines[i];
                    parameters.forEach(({ inputName, outputName, outputFrom, outputTo }) => {
                        if (outputName === name) {
                            receivers.push(chip.getPin(inputName));
                        }
                    })
                });
                this.createPin(name, ...receivers);
            } else {
                const busReceivers: BinaryPin[] = [];
                // For each pin...
                for (let p=0; p < width; p++) {
                    this.subChips.forEach((chip, i) => {
                        const {parameters} = hdl.codeLines[i];
                        parameters.forEach(({inputName, outputName, outputFrom, outputTo}) => {
                            if (outputName === name) {
                                if (p >= outputFrom && p <= outputTo) {
                                    busReceivers[p] = chip.getPin(inputName);
                                }
                            }
                        })
                    });
                }
                this.createBus(name, new BinaryBus(busReceivers));
            }
        });
    }
}

export default HDLChip