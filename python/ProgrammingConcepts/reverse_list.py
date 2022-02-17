from typing import List


def reverse_list(input_list: List) -> List:
    """"
    Reverses the order of items in a list.
    Returns the reversed copy
    """
    output_list: List = list(input_list)

    bottom: int = 0
    top: int = len(output_list) - 1

    while bottom < top:
        swap = output_list[bottom]
        output_list[bottom] = output_list[top]
        output_list[top] = swap
        bottom += 1
        top -= 1

    return output_list
