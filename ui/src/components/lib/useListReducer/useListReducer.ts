import React from "react";

import { UseListReducer } from "./types";

/**
 * This file exports a custom hook that can be used to manage a list
 * with a reducer. It handles a few simple use cases for reducer based lists
 * that were common to a number of components.
 */

interface ReceivedAction<T> {
  type: "itemsReceived";
  items: T[];
}
interface AddAction<T> {
  type: "itemAdded";
  item: T;
}
interface RemovedAction<T> {
  type: "itemRemoved";
  matcher: (i: T) => boolean;
}
interface ClearedAction {
  type: "itemsCleared";
}
interface UpdatedAction<T> {
  type: "itemUpdated";
  matcher: (i: T) => boolean;
  newValue: T;
}
interface UpdatedAtIndexAction<T> {
  type: "itemUpdatedAtIndex";
  index: number;
  newValue: T;
}
interface RemovedByIndexAction {
  type: "itemRemovedByIndex";
  index: number;
}

const createListReducer = <T>() => {
  return (
    state: T[],
    action:
      | ReceivedAction<T>
      | AddAction<T>
      | UpdatedAction<T>
      | RemovedAction<T>
      | UpdatedAtIndexAction<T>
      | RemovedByIndexAction
      | ClearedAction
  ): T[] => {
    switch (action.type) {
      case "itemsReceived":
        return action.items;
      case "itemAdded":
        return [...state, action.item];
      case "itemUpdated":
        return state.map((i) => (action.matcher(i) ? action.newValue : i));
      case "itemRemoved":
        return state.filter((u) => !action.matcher(u));
      case "itemUpdatedAtIndex":
        return state.map((u, i) => (i === action.index ? action.newValue : u));
      case "itemRemovedByIndex":
        return state.filter((u, i) => i !== action.index);
      case "itemsCleared":
        return [];
      default:
        return state;
    }
  };
};

const useListReducer = <T extends {}>(
  initialItems: T[] = []
): UseListReducer<T> => {
  const [items, dispatch] = React.useReducer(
    createListReducer<T>(),
    initialItems
  );

  return {
    items,
    receiveItems: React.useCallback(
      (items: T[]) =>
        dispatch({
          type: "itemsReceived",
          items,
        }),
      [dispatch]
    ),
    addItem: React.useCallback(
      (item: T) =>
        dispatch({
          type: "itemAdded",
          item,
        }),
      [dispatch]
    ),
    removeItem: React.useCallback(
      (matcher: (i: T) => boolean) =>
        dispatch({
          type: "itemRemoved",
          matcher,
        }),
      [dispatch]
    ),
    clearItems: React.useCallback(() => dispatch({ type: "itemsCleared" }), [
      dispatch,
    ]),
    updateItem: React.useCallback(
      (matcher: (i: T) => boolean, newValue: T) =>
        dispatch({
          type: "itemUpdated",
          matcher,
          newValue,
        }),
      [dispatch]
    ),
    updateItemAtIndex: React.useCallback(
      (index: number, newValue: T) =>
        dispatch({ type: "itemUpdatedAtIndex", index, newValue }),
      [dispatch]
    ),
    removeItemAtIndex: React.useCallback(
      (index: number) =>
        dispatch({
          type: "itemRemovedByIndex",
          index,
        }),
      [dispatch]
    ),
  };
};

export default useListReducer;
