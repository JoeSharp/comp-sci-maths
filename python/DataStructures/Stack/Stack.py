from abc import ABC, abstractmethod
from typing import TypeVar, Generic

T = TypeVar('T')


class Stack(Generic[T], ABC):
    """
    Interface for a queue
    """
    @abstractmethod
    def push(self, value: T) -> None:
        pass

    @abstractmethod
    def pop(self) -> T or None:
        pass

    @abstractmethod
    def peek(self) -> T or None:
        pass

    @abstractmethod
    def is_empty(self) -> bool:
        pass

    @abstractmethod
    def size(self) -> int:
        pass
