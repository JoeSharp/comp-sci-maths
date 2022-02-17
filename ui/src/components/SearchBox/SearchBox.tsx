import React from "react";

import "./searchBox.css";

import useItemInArray from "../lib/useLoopCounter/useItemInArray";

interface Props<T> {
  items: T[];
  filter: (item: T, criteria: string) => boolean;
  itemChosen: (item: T) => void;
  itemToString: (item: T) => string;
}

const SearchBox = <T,>({
  items,
  filter,
  itemChosen,
  itemToString,
}: Props<T>) => {
  const [criteria, setCriteria] = React.useState<string>("");

  const inputRef = React.useRef<HTMLInputElement>(null);

  const matchedItems: T[] = React.useMemo(
    () => (criteria.length > 2 ? items.filter((p) => filter(p, criteria)) : []),
    [items, criteria, filter]
  );

  const [hasFocus, setHasFocus] = React.useState<boolean>(false);

  const onCriteriaFocus: React.FocusEventHandler<HTMLInputElement> = React.useCallback(
    () => setHasFocus(true),
    [setHasFocus]
  );
  const onCriteriaBlur: React.FocusEventHandler<HTMLInputElement> = React.useCallback(
    () => setHasFocus(false),
    [setHasFocus]
  );

  const {
    item,
    index: selectedIndex,
    stepForward,
    stepBackward,
  } = useItemInArray({ items: matchedItems });

  const matchedItemsWithHandlers = React.useMemo(
    () =>
      matchedItems.map((item, i) => ({
        key: i.toString(10),
        itemStr: itemToString(item),
        onClick: () => itemChosen(item),
        className: i === selectedIndex ? "autocomplete-active" : "",
      })),
    [matchedItems, selectedIndex, itemChosen, itemToString]
  );

  const onCriteriaChange: React.ChangeEventHandler<HTMLInputElement> = React.useCallback(
    ({ target: { value } }) => setCriteria(value),
    [setCriteria]
  );

  const onCriteriaKeyDown: React.KeyboardEventHandler<HTMLInputElement> = React.useCallback(
    (e) => {
      switch (e.keyCode) {
        case 40: {
          /*If the arrow DOWN key is pressed,
            increase the currentFocus variable:*/
          stepForward();
          break;
        }
        case 38: {
          /*If the arrow UP key is pressed,
        decrease the currentFocus variable:*/
          stepBackward();
          break;
        }
        case 13: {
          /*If the ENTER key is pressed, prevent the form from being submitted,*/
          e.preventDefault();
          if (item !== undefined) {
            if (inputRef.current !== null) {
              inputRef.current.blur();
            }
            /*and simulate a click on the "active" item:*/
            itemChosen(item);
            setCriteria(itemToString(item));
          }
        }
      }
    },
    [item, setCriteria, itemToString, itemChosen, stepForward, stepBackward]
  );

  return (
    <form className="form-inline my-2 my-lg-0">
      <div className="autocomplete">
        <input
          ref={inputRef}
          className="form-control mr-sm-2"
          type="search"
          placeholder="Search"
          aria-label="Search"
          value={criteria}
          onChange={onCriteriaChange}
          onKeyDown={onCriteriaKeyDown}
          onFocus={onCriteriaFocus}
          onBlur={onCriteriaBlur}
        />
        {hasFocus && matchedItems.length > 0 && (
          <div className="autocomplete-items">
            {matchedItemsWithHandlers.map(
              ({ itemStr, onClick, key, className }) => (
                <div key={key} className={className} onMouseDown={onClick}>
                  {itemStr}
                  <input type="hidden" value={itemStr}></input>
                </div>
              )
            )}
          </div>
        )}
      </div>
      <button className="btn btn-outline-success my-2 my-sm-0" type="submit">
        Search
      </button>
    </form>
  );
};

export default SearchBox;
