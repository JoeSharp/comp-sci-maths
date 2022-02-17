import { PIN_VALUES, ROW_SIZE } from "./constants";
import MasterMind from "./MasterMind";

describe("MasterMind - Game", () => {
    test("Simple", () => {
        const mastermind = new MasterMind(ROW_SIZE, PIN_VALUES);
        expect(mastermind).toBeDefined();
    })
});