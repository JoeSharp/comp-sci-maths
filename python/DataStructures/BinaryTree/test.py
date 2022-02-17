import unittest
import logging
from DataStructures.BinaryTree.BinaryTree \
    import TraverseInOrder, TraversePostOrder, TraversePreOrder, BinaryTree


def str_is_to_left(a: str, b: str) -> bool:
    return a < b


class TestStringMethods(unittest.TestCase):

    def test_adj_list_graph(self):
        my_tree: BinaryTree[str] = BinaryTree(str_is_to_left)

        my_tree.add('B')
        my_tree.add('A')
        my_tree.add('D')
        my_tree.add('E')
        my_tree.add('C')
        my_tree.add('F')

        logging.info("My Binary Tree:{}".format(my_tree))

        for t in [TraversePreOrder, TraverseInOrder, TraversePostOrder]:
            traverse: t[str] = t()
            logging.info("Traversing {}".format(traverse.get_name()))
            traverse.traverse(my_tree, lambda x: logging.info(x, end=", "))
            logging.info("")

    def test_contains(self):
        my_tree: BinaryTree[str] = BinaryTree(str_is_to_left)

        my_tree.add('B')
        my_tree.add('A')
        my_tree.add('D')
        my_tree.add('E')
        my_tree.add('C')
        my_tree.add('F')

        positive: bool = my_tree.contains('C')
        negative: bool = my_tree.contains('X')
        self.assertTrue(positive)
        self.assertFalse(negative)
