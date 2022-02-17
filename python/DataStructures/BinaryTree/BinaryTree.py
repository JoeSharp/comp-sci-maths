from __future__ import annotations
from typing import TypeVar, Generic, Callable
from abc import abstractmethod

T = TypeVar('T')


class BinaryTree(Generic[T]):
    is_to_left: Callable[[T, T], bool]
    value: T or None
    left_branch: BinaryTree[T] or None
    right_branch: BinaryTree[T] or None

    def __init__(self,
                 is_to_left: Callable[[T, T], bool] = lambda a, b: a < b,
                 value: T = None):
        self.is_to_left = is_to_left
        self.value = value
        self.left_branch = None
        self.right_branch = None

    def __repr__(self):
        return "({} {} {})".format(self.left_branch, self.value, self.right_branch)

    def contains(self, item: T) -> bool:
        if self.value == item:
            return True
        elif self.left_branch is not None and self.left_branch.contains(item):
            return True
        elif self.right_branch is not None and self.right_branch.contains(item):
            return True
        else:
            return False

    def add(self, item: T) -> None:
        if self.value is None:
            self.value = item
        elif self.is_to_left(item, self.value):
            if self.left_branch:
                self.left_branch.add(item)
            else:
                self.left_branch = BinaryTree(self.is_to_left, item)
        else:
            if self.right_branch:
                self.right_branch.add(item)
            else:
                self.right_branch = BinaryTree(self.is_to_left, item)


class Traverse(Generic[T]):
    __name: str
    __tree: BinaryTree[T]

    def __init__(self, name: str):
        self.__name = name

    def get_name(self) -> str:
        return self.__name

    @abstractmethod
    def traverse(self, tree: BinaryTree[T], callback: Callable[[T], None]):
        pass


class TraverseInOrder(Generic[T], Traverse[T]):
    def __init__(self):
        Traverse.__init__(self, 'In Order')

    def traverse(self, tree: BinaryTree[T], visit: Callable[[T], None]):
        if tree.left_branch is not None:
            self.traverse(tree.left_branch, visit)
        if tree.value is not None:
            visit(tree.value)
        if tree.right_branch is not None:
            self.traverse(tree.right_branch, visit)


class TraversePreOrder(Generic[T], Traverse[T]):
    def __init__(self):
        Traverse.__init__(self, 'Pre Order')

    def traverse(self, tree: BinaryTree[T], visit: Callable[[T], None]):
        if tree.value is not None:
            visit(tree.value)
        if tree.left_branch is not None:
            self.traverse(tree.left_branch, visit)
        if tree.right_branch is not None:
            self.traverse(tree.right_branch, visit)


class TraversePostOrder(Generic[T], Traverse[T]):
    def __init__(self):
        Traverse.__init__(self, 'Post Order')

    def traverse(self, tree: BinaryTree[T], visit: Callable[[T], None]):
        if tree.left_branch is not None:
            self.traverse(tree.left_branch, visit)
        if tree.right_branch is not None:
            self.traverse(tree.right_branch, visit)
        if tree.value is not None:
            visit(tree.value)
