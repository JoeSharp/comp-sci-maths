import * as crypto from "crypto";

export type HashFunction = (t: string) => string;

export const generateSha256: HashFunction = (t: string): string =>
  crypto.createHash("sha256").update(t).digest("hex");
