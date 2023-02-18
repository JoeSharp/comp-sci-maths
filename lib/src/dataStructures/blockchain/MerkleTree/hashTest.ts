export type HashTest = (hash: string) => boolean;

export const anyHashIsOk: HashTest = () => true;

export const topXNibblesAreZero =
  (nibbles: number): HashTest =>
  (t: string) => {
    let isOk = true;

    for (let nibble = 0; nibble < nibbles; nibble++) {
      if (t[nibble] !== "0") isOk = false;
    }

    return isOk;
  };
