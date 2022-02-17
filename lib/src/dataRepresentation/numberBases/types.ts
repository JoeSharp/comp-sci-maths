export interface INumberSpacing {
  character: string;
  digits: number;
}

export interface INumberBase {
  name: string;
  width: number;
  base: number;
  max: number;
  min: number;
  spacing: INumberSpacing;

  toString: (value: number) => string;
  toDigits: (value: number) => string[];
  fromDigits: (digits: string[]) => number;
  fromString: (asString: string) => number;
  withWidth: (width: number) => INumberBase;
}
