/**
 * Logical operators that take in two busses and spit out another have a consistent shape.
 */
export type BusLogicalOperator = (a: boolean[], b: boolean[]) => boolean[];

/**
 * Each operator will have a factory for creating new ones.
 */
export type BusLogicalOperatorFactory = () => BusLogicalOperator;
