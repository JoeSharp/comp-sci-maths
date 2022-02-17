export interface UseObjectReducer<T> {
  value: T;
  onChange: (updates: Partial<T>) => void;
}
