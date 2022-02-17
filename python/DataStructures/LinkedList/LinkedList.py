from __future__ import annotations
from typing import Tuple, TypeVar, Generic, Callable

T = TypeVar('T')


class ListItem(Generic[T]):
    __value: T
    __next_item: ListItem[T] or None

    def __init__(self, value: T):
        self.__value = value
        self.__next_item = None

    def set_next(self, next_item: T):
        self.__next_item = next_item

    def get_value(self) -> T:
        return self.__value

    def get_next_item(self) -> ListItem[T]:
        return self.__next_item

    def __repr__(self):
        return str(self.__value)


class LinkedListIterator(Generic[T]):
    __current: ListItem[T]
    __index: int

    def __init__(self, start_item: ListItem[T]):
        self.__current = start_item
        self.__index = 0

    def __next__(self) -> Tuple[T, int]:
        if self.__current is None:
            raise StopIteration
        item: ListItem[T] = self.__current
        index: int = self.__index
        self.__current = item.get_next_item()
        self.__index += 1
        return item.get_value(), index


class LinkedList(Generic[T]):
    __start_item: ListItem[T] or None

    def __init__(self):
        self.__start_item = None

    def __iter__(self) -> T:
        return LinkedListIterator(self.__start_item)

    def is_empty(self) -> bool:
        return self.__start_item is None

    def insert(self, index: int, item: T) -> bool:
        new_item: ListItem[T] = ListItem(item)
        if index == 0:
            new_item.set_next(self.__start_item)
            self.__start_item = new_item
            return True
        else:
            _index: int = 1
            curr_item: ListItem[T] = self.__start_item
            while curr_item is not None:
                if _index == index:
                    new_item.set_next(curr_item.get_next_item())
                    curr_item.set_next(new_item)
                    return True
                curr_item = curr_item.get_next_item()
                _index += 1
        return False

    def append(self, item: T):
        if self.__start_item is None:
            self.__start_item = ListItem(item)
        else:
            curr_item: ListItem[T] = self.__start_item
            while curr_item.get_next_item() is not None:
                curr_item = curr_item.get_next_item()
            curr_item.set_next(ListItem[T](item))

    def get(self, index: int) -> T or None:
        for item, _index in self:
            if index == _index:
                return item
        return None

    def remove(self, index: int) -> bool:
        if index == 0:
            if self.__start_item is not None:
                self.__start_item = self.__start_item.get_next_item()
                return True
        else:
            _index: int = 1
            curr_item: ListItem[T] = self.__start_item
            while curr_item.get_next_item() is not None:
                if _index == index:
                    _to_remove: ListItem[T] = curr_item.get_next_item()
                    if _to_remove is not None:
                        curr_item.set_next(_to_remove.get_next_item())
                        return True
                    else:
                        return False
                curr_item = curr_item.get_next_item()
                _index += 1
        return False

    def iterate_items(self, callback: Callable[[T, int], None]):
        curr_item: ListItem[T] = self.__start_item
        index: int = 0
        while curr_item is not None:
            callback(curr_item.get_value(), index)
            curr_item = curr_item.get_next_item()

    def __repr__(self):
        as_str: str = ''
        curr_item: ListItem[T] = self.__start_item
        while curr_item is not None:
            as_str += ' ' + str(curr_item.get_value())
            curr_item = curr_item.get_next_item()
        return as_str

