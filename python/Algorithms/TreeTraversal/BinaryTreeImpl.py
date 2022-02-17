from __future__ import annotations
from typing import TypeVar, Callable, List, Optional

from Algorithms.TreeTraversal.BinaryTree import BinaryTree

T = TypeVar('T')


class BinaryTreeImpl(BinaryTree[T]):
    __compare: Optional[Callable[[T, T], int]]
    __value: Optional[T]
    __left_branch: Optional[BinaryTree[T]]
    __right_branch: Optional[BinaryTree[T]]

    def __init__(self,
                 compare: Optional[Callable[[T, T], int]] = None,
                 value: Optional[T] = None):
        self.__compare = compare
        self.__value = value
        self.__left_branch = None
        self.__right_branch = None

    def __repr__(self):
        return "({} {} {})".format(self.__left_branch, self.__value, self.__right_branch)

    def __eq__(self, other):
        return (self.__value == other.__value)\
               and (self.__left_branch == other.__left_branch)\
               and (self.__right_branch == other.__right_branch)

    def add(self, item: T) -> BinaryTree[T]:
        if self.__compare is None:
            raise Exception("Cannot add node to tree without valid comparison function")
        if self.__value is None:
            self.__value = item
            return self
        elif self.__compare(item, self.__value) == 1:
            if self.__left_branch:
                return self.__left_branch.add(item)
            else:
                return self.set_left(item)
        else:
            if self.__right_branch:
                return self.__right_branch.add(item)
            else:
                return self.set_right(item)

    def set_value(self, value: Optional[T]) -> None:
        self.__value = value

    def set_right(self, value: Optional[T]) -> BinaryTree[T]:
        self.__right_branch = BinaryTreeImpl(self.__compare, value)
        return self.__right_branch

    def set_left(self, value: Optional[T]) -> BinaryTree[T]:
        self.__left_branch = BinaryTreeImpl(self.__compare, value)
        return self.__left_branch

    def get_right(self) -> BinaryTree[T] or None:
        return self.__right_branch

    def get_left(self) -> BinaryTree[T] or None:
        return self.__left_branch

    def get_value(self) -> T or None:
        return self.__value

    def pre_order(self) -> List[T]:
        nodes: List[T] = [self.__value]
        if self.__left_branch is not None:
            nodes.extend(self.__left_branch.pre_order())
        if self.__right_branch is not None:
            nodes.extend(self.__right_branch.pre_order())
        return nodes

    def in_order(self) -> List[T]:
        nodes: List[T] = []
        if self.__left_branch is not None:
            nodes.extend(self.__left_branch.in_order())
        nodes.append(self.__value)
        if self.__right_branch is not None:
            nodes.extend(self.__right_branch.in_order())
        return nodes

    def post_order(self) -> List[T]:
        nodes: List[T] = []
        if self.__left_branch is not None:
            nodes.extend(self.__left_branch.post_order())
        if self.__right_branch is not None:
            nodes.extend(self.__right_branch.post_order())
        nodes.append(self.__value)
        return nodes
