import or from "../or/or";

/**
 * 8-way Or:
 * out = (in[0] or in[1] or ... or in[7])
 */
export default (input: boolean[]): boolean =>
  input.reduce((acc, curr) => or(acc, curr), false);
