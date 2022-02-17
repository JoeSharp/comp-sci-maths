import React from "react";

interface Props {
  items: string[];
  remove: (item: string) => void;
  clear: () => void;
}

const ItemTable: React.FunctionComponent<Props> = ({
  items,
  remove,
  clear,
}) => {
  const itemsWithHandlers = React.useMemo(
    () => items.map((item) => ({ item, onRemove: () => remove(item) })),
    [items, remove]
  );

  return (
    <table className="table table-sm">
      <thead>
        <tr>
          <th scope="col">Name</th>
          <th scope="col">
            <button
              type="button"
              className="btn btn-sm btn-outline-danger"
              onClick={clear}
            >
              Clear All
            </button>
          </th>
        </tr>
      </thead>
      <tbody>
        {itemsWithHandlers.map(({ item, onRemove }) => (
          <tr key={item}>
            <td>{item}</td>
            <td>
              <button
                type="button"
                className="btn btn-sm btn-outline-danger"
                onClick={onRemove}
              >
                Remove
              </button>
            </td>
          </tr>
        ))}
        <tr />
      </tbody>
    </table>
  );
};

export default ItemTable;
