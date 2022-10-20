export interface ControlledInput<T> {
    value: T | undefined;
    onChange: (s: T) => void;
}
  