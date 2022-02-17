import React from "react";

import useListReducer from "../useListReducer";

interface Props {
  onChange: (v: string[]) => void;
  initialItems: string[];
  newItemLabel?: string;
  dataType?: string;
}

const ListBuilder: React.FunctionComponent<Props> = ({
  newItemLabel = "newItem",
  initialItems,
  onChange,
  dataType = "string",
}) => {
  const { items, addItem, removeItem } = useListReducer(initialItems);

  const [newItem, setNewItem] = React.useState<string>("");

  React.useEffect(() => onChange(items), [items, onChange]);

  const onNewItemChange: React.ChangeEventHandler<HTMLInputElement> = React.useCallback(
    ({ target: { value } }) => setNewItem(value),
    [setNewItem]
  );

  const onAddNewItem = React.useCallback(
    (e) => {
      addItem(newItem);
      e.preventDefault();
    },
    [addItem, newItem]
  );

  return (
    <div>
      <form>
        <label>{newItemLabel}</label>
        <input type={dataType} value={newItem} onChange={onNewItemChange} />
        <button onClick={onAddNewItem}>Add</button>
      </form>
      {items.map((c, i) => (
        <div key={i}>
          {c}
          <button onClick={() => removeItem((i) => i === c)}>Remove</button>
        </div>
      ))}
    </div>
  );
};

export default ListBuilder;
