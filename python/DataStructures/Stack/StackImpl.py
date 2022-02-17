from typing import TypeVar, List

from DataStructures.Stack.Stack import Stack

T = TypeVar('T')


class StackImpl(Stack[T]):
    def push(self, value: T) -> None:
        self.__data.append(value)

    def pop(self) -> T or None:
        if self.is_empty():
            raise Exception('Stack Empty')
        return self.__data.pop()

    def peek(self) -> T or None:
        if self.is_empty():
            raise Exception('Stack Empty')
        return self.__data[len(self.__data) - 1]

    def is_empty(self) -> bool:
        return len(self.__data) is 0

    def size(self) -> int:
        return len(self.__data)

    __data: List[T]

    def __init__(self):
        self.__data = []

    def __repr__(self):
        return "{}".format(self.__data)
