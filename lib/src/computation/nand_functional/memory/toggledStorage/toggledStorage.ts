export interface Output<T> {
  now: T;
  prev: T;
}

export type OutputSupplier<T> = () => Output<T>;

/**
 * Create a storage system that hands between two instances which are created once and re-used.
 * Used for sequential logic circuits to allow data from previous clock cycle to influence data in this clock cycle.
 *
 * @param factory A function to create initial values
 * @returns A function that can be used to switch between instances
 */
export const createToggledStorage = <T>(
  factory: () => T
): OutputSupplier<T> => {
  const a: T = factory();
  const b: T = factory();
  let toggle = false;

  // Create a persistent structure to store the now/prev values.
  const output: Output<T> = {
    now: a,
    prev: a,
  };

  return () => {
    // Flip the toggle
    toggle = !toggle;

    // Select now/prev, should be the opposite each time called
    output.now = toggle ? a : b;
    output.prev = toggle ? b : a;

    // Return the same structure
    return output;
  };
};

export default createToggledStorage;
