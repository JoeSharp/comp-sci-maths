from typing import List, Callable, TypeVar, Optional
from Algorithms.Sorting.common import CompareFunction

Criteria = TypeVar('Criteria')
Searchable = TypeVar('Searchable')

"""
A match function is given the criteria, and a searchable item.
    :param criteria: The criteria to apply
    :param searchable: The item to check the criteria against
    :return: True if the criteria matches the item, otherwise False
"""
MatchFunction = Callable[[Criteria, Searchable], int]

"""
A search function requires
    :param input_list: The raw list of items, assumed unsorted
    :param criteria: The criteria to pass to match
    :param match: A function used to match the criteria to each item
    :return: The index of the matching item, or -1 if it cannot be found
"""
SearchFunction = Callable[[List[Searchable],
                           Criteria,
                           MatchFunction,
                           CompareFunction], int]

NO_MATCH: int = -1
