/**
 * The most primitive sequential logic chip we have is the single bit register.
 * Calling this function is the equivalent of a 'clock'.
 */
export default (
  input: boolean,
  load: boolean,
  previousOutput: boolean = false
) => (load ? input : previousOutput);
