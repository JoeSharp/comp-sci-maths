export interface IClocked {
  tick: () => void;
  tock: () => void;
}

export default class Clock implements IClocked {
  count: number;
  state: boolean;
  chips: IClocked[];

  constructor() {
    this.count = 0;
    this.state = false;
    this.chips = [];
  }

  tick() {
    this.state = true;
    this.chips.forEach((c) => c.tick());
  }

  tock() {
    this.state = false;
    this.count++;
    this.chips.forEach((c) => c.tock());
  }

  ticktock() {
    this.tick();
    this.tock();
  }

  registerClocked(clocked: IClocked) {
    this.chips.push(clocked);
  }
}
