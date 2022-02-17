import React from "react";

import ItemTable from "./ItemTable";
import NewItemForm from "./NewItemForm";
import Cards from "./Cards";
import useList from "./useList";

const Dobble: React.FunctionComponent = () => {
  const { items, add, remove, clear } = useList(["a", "b", "c", "d", "e", "f"]);

  return (
    <div>
      <NewItemForm {...{ add }} />

      <h2>Cards to Make</h2>
      <Cards {...{ items }} />

      <h2>Registered Items (alphabetically ordered)</h2>
      <ItemTable {...{ items, remove, clear }} />
    </div>
  );
};

export default Dobble;
