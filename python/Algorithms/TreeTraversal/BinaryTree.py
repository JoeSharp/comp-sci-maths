from __future__ import annotations
from abc import ABC, abstractmethod
from typing import TypeVar, Generic, List, Optional

T = TypeVar('T', str, int, float)


class BinaryTree(Generic[T], ABC):
    """
    Interface for a graph, edges can be added,
    and then the set of related vertices can be queried
    """

    """
    Add a node to the binary tree,
    this is done recursively until a leaf node can be created.
    Returns the tree node that will contain the value
    """
    @abstractmethod
    def add(self, from_v: T) -> BinaryTree[T]:
        pass

    """
    Explicitly set the value
    """
    def set_value(self, value: Optional[T]) -> None:
        pass

    """
    Explicitly set the right branch
    Returns the created branch
    """
    def set_right(self, value: Optional[T]) -> BinaryTree[T]:
        pass

    """
    Explicitly set the left branch
    Returns the created branch
    """
    def set_left(self, value: Optional[T]) -> BinaryTree[T]:
        pass

    """
    Retrieve the right branch of this node, could return None
    """
    @abstractmethod
    def get_right(self) -> BinaryTree[T] or None:
        pass

    """
    Retrieve the left branch of this node, could return None
    """
    @abstractmethod
    def get_left(self) -> BinaryTree[T] or None:
        pass

    """
    Get the value associated with this node
    """
    @abstractmethod
    def get_value(self) -> T or None:
        pass

    """
    Return a list of nodes using pre-order traversal
    """
    @abstractmethod
    def pre_order(self) -> List[T]:
        pass

    """
    Return a list of nodes using in-order traversal
    """
    @abstractmethod
    def in_order(self) -> List[T]:
        pass

    """
    Return a list of nodes using post-order traversal
    """
    @abstractmethod
    def post_order(self) -> List[T]:
        pass
