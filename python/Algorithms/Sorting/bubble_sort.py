from typing import List
from Algorithms.Sorting.common import CompareFunction, Sortable, swap


def bubble_sort(input_list: List[Sortable],
                comparator: CompareFunction) -> List[Sortable]:
    """"
    Sorts the input list, using the provided comparator
    to decide if two elements are in the correct order.
    Returns a copy of the list sorted, makes no changes to input list
    """
    output_list: List[Sortable] = list(input_list)

    # The top points to the highest as yet unsorted position
    for top in range(len(input_list), 1, -1):
        # Use this variable to detect a pass requiring no swaps i.e. list sorted
        swap_made: bool = False

        # The current points to the position to evaluate in this sub iteration
        for current in range(top - 1):
            # The comparator returns -1 if the first item is 'greater than' the second one
            comparison: int = comparator(
                output_list[current], output_list[current + 1])
            if comparison < 0:
                swap_made = True
                # Temporary variable to prevent overwrites
                swap(output_list, current, current+1)

        # early exit, list already sorted
        if not swap_made:
            break
    return output_list
