from __future__ import annotations
from typing import List, TypeVar, Generic, Optional
from DataStructures.HashTable.hashFunction import hash_function

T = TypeVar('T')


class LinkedItem(Generic[T]):
    __value: T
    __next_item: Optional[LinkedItem[T]]

    def __init__(self, value):
        self.__value = value
        self.__next_item = None

    def __repr__(self):
        return "{} -> {}".format(self.__value, self.__next_item)

    def get_next_item(self) -> Optional[LinkedItem[T]]:
        return self.__next_item

    def set_next_item(self, item: T):
        if self.__next_item is None:
            self.__next_item = LinkedItem(item)
        else:
            self.__next_item.set_next_item(item)

    def get_value(self) -> T:
        return self.__value


class HashTable(Generic[T]):
    __data: List[Optional[LinkedItem]]

    def __init__(self, capacity: int = 100):
        self.__data = [None] * capacity

    def __repr__(self):
        return str(self.__data)

    def add_item(self, item: T):
        # Calculate a hash for the string representation of the item
        the_hash: int = hash_function(str(item), len(self.__data))

        if self.__data[the_hash] is None:
            # If we do not have anything in the array at this index, create a new item
            self.__data[the_hash] = LinkedItem(item)
        else:
            # otherwise set the next item on that list to this new item
            self.__data[the_hash].set_next_item(item)

