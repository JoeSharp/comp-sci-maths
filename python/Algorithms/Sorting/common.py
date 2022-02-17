from typing import List, Callable, TypeVar

Sortable = TypeVar('Sortable')

CompareFunction = Callable[[Sortable, Sortable], int]
SortFunction = Callable[[List[Sortable], CompareFunction], List[Sortable]]


def swap(arr: List[Sortable], i, j):
    s: Sortable = arr[i]
    arr[i] = arr[j]
    arr[j] = s


def primitive_compare(x, y):
    """
    Compares two items and returns some indication of their relative position
        :param x: The item to check that is current at the lower index
        :param y: The item to check that is currently at the higher index
        :return: -1 if they are in the wrong order, +1 if they are in the right order, 0 if identical
    """
    if x == y:
        return 0
    elif x < y:
        return 1
    else:
        return -1


def primitive_reverse_compare(x, y):
    return primitive_compare(x, y) * -1
