from typing import Optional, List
from Algorithms.Searching.common import \
    Searchable, \
    Criteria, \
    MatchFunction, \
    CompareFunction, \
    NO_MATCH


# noinspection PyUnusedLocal
def linear_search(input_list: List[Searchable],
                  criteria: Criteria,
                  match: MatchFunction,
                  compare: CompareFunction) -> int:
    """
    Searches through a list by comparing every item to the criteria.
    """
    for index, item in enumerate(input_list):
        if match(criteria, item) == 0:
            return index

    return NO_MATCH
