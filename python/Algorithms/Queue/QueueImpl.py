from typing import TypeVar, List

from Algorithms.Queue.Queue import Queue

T = TypeVar('T')


class QueueImpl(Queue[T]):
    def enqueue(self, value: T) -> None:
        self.__data.insert(0, value)

    def dequeue(self) -> T or None:
        if self.is_empty():
            raise Exception('Queue Empty')
        return self.__data.pop()

    def peek(self) -> T or None:
        if self.is_empty():
            raise Exception('Queue Empty')
        return self.__data[len(self.__data) - 1]

    def is_empty(self) -> bool:
        return len(self.__data) is 0

    __data: List[T]

    def __init__(self):
        self.__data = []

    def __repr__(self):
        return "{}".format(self.__data)