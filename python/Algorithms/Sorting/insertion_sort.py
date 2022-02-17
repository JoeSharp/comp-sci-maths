from typing import List
from Algorithms.Sorting.common import CompareFunction, Sortable, swap


def insertion_sort(input_list: List[Sortable],
                   comparator: CompareFunction) -> List[Sortable]:
    """"
    Sorts the input list, using the provided comparator
    to decide if two elements are in the correct order.
    Returns a copy of the list sorted, makes no changes to input list
    """
    output_list: List[Sortable] = list(input_list)

    for index in range(1, len(output_list)):
        item_to_place: Sortable = output_list[index]
        item_place: int = index

        while item_place > 0:
            lower: int = item_place - 1
            upper: int = item_place
            comparison: int = comparator(output_list[lower], item_to_place)

            # The comparator returns -1 if the first item is 'greater than' the second one
            if comparison < 0:
                # Temporary variable to prevent overwrites
                swap(output_list, lower, upper)
            else:
                # Item to place can be placed early
                item_place = upper
                break
            item_place -= 1

        output_list[item_place] = item_to_place

    return output_list
