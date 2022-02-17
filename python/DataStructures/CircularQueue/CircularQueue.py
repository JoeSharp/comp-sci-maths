from typing import List, TypeVar, Generic

T = TypeVar('T')


class CircularQueue(Generic[T]):
    capacity: int
    data: List[T or None]
    front_pointer: int
    rear_pointer: int
    size: int

    def __init__(self, capacity: int):
        self.capacity = capacity
        self.data = [None]*capacity
        self.front_pointer = 0
        self.rear_pointer = 0
        self.size = 0

    def __str__(self):
        return "{}".format(self.data)

    def is_full(self):
        return self.size == self.capacity

    def is_empty(self):
        return self.size == 0

    def enqueue(self, item: T):
        if self.is_full():
            raise Exception('Queue Full')

        self.data[self.rear_pointer] = item
        self.rear_pointer += 1
        self.rear_pointer %= self.capacity
        self.size += 1

    def dequeue(self) -> T:
        if self.is_empty():
            raise Exception('Queue Empty')

        item: T = self.data[self.front_pointer]
        self.front_pointer += 1
        self.front_pointer %= self.capacity
        self.size -= 1
        return item


