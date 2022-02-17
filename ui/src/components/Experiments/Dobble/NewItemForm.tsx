import React from "react";

interface Props {
  add: (item: string) => void;
}

const NewItemForm: React.FunctionComponent<Props> = ({ add }) => {
  const [newItem, setNewItem] = React.useState<string>("");
  const onNewItemChange: React.ChangeEventHandler<HTMLInputElement> = React.useCallback(
    ({ target: { value } }) => setNewItem(value),
    [setNewItem]
  );
  const onAdd = React.useCallback(() => {
    add(newItem);
    setNewItem("");
  }, [add, newItem, setNewItem]);

  return (
    <form>
      <div className="form-group">
        <label htmlFor="itemInput">Item to Add</label>
        <input
          className="form-control"
          type="text"
          id="itemInput"
          aria-describedby="itemInput"
          placeholder="Enter items"
          value={newItem}
          onChange={onNewItemChange}
        />
        <small id="itemInputHelp" className="form-text text-muted">
          Use spaces between multiple items.
        </small>
      </div>
      <button type="button" className="btn btn-primary" onClick={onAdd}>
        Add
      </button>
    </form>
  );
};

export default NewItemForm;
