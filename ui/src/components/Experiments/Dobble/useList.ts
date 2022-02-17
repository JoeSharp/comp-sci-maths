import React from "react";

interface AddItem {
  type: "add";
  item: string;
}

interface RemoveItem {
  type: "remove";
  item: string;
}

interface ClearList {
  type: "clear";
}

type Action = AddItem | RemoveItem | ClearList;

function listReducer(state: string[], action: Action) {
  switch (action.type) {
    case "add":
      let items: string[] = action.item.split(" ");
      return [...state.filter((s) => !items.includes(s)), ...items].sort();
    case "remove":
      return state.filter((s) => s !== action.item);
    case "clear":
      return [];
  }

  return state;
}

interface ListReducer {
  add: (item: string) => void;
  remove: (item: string) => void;
  clear: () => void;
  items: string[];
}

const useList = (initialItems: string[] = []): ListReducer => {
  const [items, dispatch] = React.useReducer(listReducer, initialItems);

  const add = React.useCallback(
    (item: string) => dispatch({ type: "add", item }),
    []
  );
  const remove = React.useCallback(
    (item: string) => dispatch({ type: "remove", item }),
    []
  );
  const clear = React.useCallback(() => dispatch({ type: "clear" }), []);

  return {
    add,
    remove,
    clear,
    items,
  };
};

export default useList;
