from typing import Optional, List, Tuple
from Algorithms.Searching.common import \
    Searchable, \
    Criteria, \
    MatchFunction, \
    CompareFunction, \
    NO_MATCH
from Algorithms.TreeTraversal.BinaryTreeImpl import BinaryTree, BinaryTreeImpl


def binary_tree_search(input_list: List[Searchable],
                       criteria: Criteria,
                       match: MatchFunction,
                       compare: CompareFunction) -> int:
    """
    Searches through a list by putting all the items into a binary tree
    then navigating the tree until the item is found.
    """
    # Create a list of tuples to preserve the index alongside the original value
    tree_node: BinaryTree[Tuple[int, Searchable]] = \
        BinaryTreeImpl[Tuple[int, Searchable]](lambda x, y: compare(x[1], y[1]))

    # Insert all the tuples into the tree
    for index, item in enumerate(input_list):
        # noinspection PyTypeChecker
        tree_node.add((index, item))

    # Recurse through the tree until we hit a dead end
    while tree_node is not None:
        # Make the comparison
        comparison: int = match(criteria, tree_node.get_value()[1])
        if comparison == 0:
            # Found it!
            return tree_node.get_value()[0]
        elif comparison == 1:
            # Criteria is smaller than the root, traverse left
            tree_node = tree_node.get_left()
        else: # assume comparison == -1
            # Criteria is larger than the root, traverse right
            tree_node = tree_node.get_right()

    return NO_MATCH
