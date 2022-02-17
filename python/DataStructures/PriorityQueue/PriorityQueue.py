from typing import Tuple, List, TypeVar, Generic

T = TypeVar('T')


class PriorityQueue(Generic[T]):
    __items: List[Tuple[T, int]]

    def __init__(self):
        self.__items = []

    def __repr__(self):
        return "{}".format(self.__items)

    def is_empty(self):
        return len(self.__items) == 0

    def enqueue(self, item: T, priority: int):
        for index, prioritisedItem in enumerate(self.__items):
            if priority > prioritisedItem[1]:
                self.__items.insert(index, (item, priority))
                return
        self.__items.append((item, priority))

    def dequeue(self) -> Tuple[T, int] or None:
        if self.is_empty():
            raise Exception('Queue Empty')

        return self.__items.pop(0)



