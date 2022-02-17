from typing import Set, TypeVar, Tuple

S = TypeVar('S')
T = TypeVar('T')


def get_cartesian_product(set1: Set[S], set2: Set[T]) -> Set[Tuple[S, T]]:
    """
    Generate the cartesian product of two sets.
    :param set1: First set to combine
    :param set2: Second set to combine
    :return: Set of tuples, each tuple is a value from first set and value from second set.
    """
    output: Set[Tuple[S, T]] = set()
    for s in set1:
        for t in set2:
            output.add((s, t))

    return output
