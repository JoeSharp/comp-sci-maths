import { nand2tetrisFileLoader } from "../TestScripts/nand2tetris/nand2tetrisFileLoader";
import HackCpu from "./HackCpu";

describe("Hack CPU", () => {
  test("ASM Code File (Add)", () => {
    const data = nand2tetrisFileLoader('06/add', 'Add.asm');

    const cpu = new HackCpu();
    cpu.loadProgram(data);

    for (let x = 0; x < 10; x++) {
      cpu.tick();
    }

    expect(cpu.memory.get(0)).toBe(5);
  });

  const runToEnd = (cpu: HackCpu, endLabel: string, tickLimit: number) => {
    const end = cpu.memory.getOrCreateLabel(endLabel);
    expect(end).toBeGreaterThan(0);
    let ticks = 0;
    while (cpu.programCounter !== end) {
      cpu.tick();
      ticks++;

      if (ticks > tickLimit) throw new Error("Took far too long to get to END");
    }
  };

  test("ASM Code File (Max)", () => {
    const data = nand2tetrisFileLoader('06/max', 'Max.asm');

    const cpu = new HackCpu();
    cpu.loadProgram(data);
    cpu.memory.set(0, 56, 73);

    runToEnd(cpu, "INFINITE_LOOP", 10000);

    expect(cpu.memory.get(2)).toBe(73);
  });

  test("ASM Code File (Mult)", () => {
    const data = nand2tetrisFileLoader('04/mult', 'Mult.asm');

    const cpu = new HackCpu();
    cpu.loadProgram(data);
    cpu.memory.set(0, 6, 8, -1);

    runToEnd(cpu, "END", 10000);

    expect(cpu.memory.get(16)).toBe(48);
  });
});
