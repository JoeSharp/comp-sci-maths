from __future__ import annotations
from typing import Generic, TypeVar, List

T = TypeVar('T')


class Tree(Generic[T]):
    __value: T
    __children: List[Tree[T]]

    def __init__(self, value: T):
        self.__value = value
        self.__children = []

    def __repr__(self):
        if len(self.__children) > 0:
            return "{} -> [{}]".format(self.__value, ",".join(str(x) for x in self.__children))
        else:
            return str(self.__value)

    def add_child_value(self, value: T) -> Tree[T]:
        return self.add_child(Tree(value))

    def add_child(self, child: Tree[T]) -> Tree[T]:
        self.__children.append(child)
        return self

    def get_value(self):
        return self.__value

    def get_children(self) -> List[Tree[T]]:
        return self.__children
