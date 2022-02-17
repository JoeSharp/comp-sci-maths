from abc import ABC, abstractmethod
from typing import TypeVar, Generic

T = TypeVar('T')


class Queue(Generic[T], ABC):
    """
    Interface for a queue
    """
    @abstractmethod
    def enqueue(self, value: T) -> None:
        pass

    @abstractmethod
    def dequeue(self) -> T or None:
        pass

    @abstractmethod
    def peek(self) -> T or None:
        pass

    @abstractmethod
    def is_empty(self) -> bool:
        pass
