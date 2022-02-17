export interface UseListReducer<T> {
  items: T[];
  receiveItems: (items: T[]) => void;
  addItem: (item: T) => void;
  removeItem: (matcher: (i: T) => boolean) => void;
  clearItems: () => void;
  updateItem: (matcher: (i: T) => boolean, newValue: T) => void;
  updateItemAtIndex: (index: number, newValue: T) => void;
  removeItemAtIndex: (index: number) => void;
}
