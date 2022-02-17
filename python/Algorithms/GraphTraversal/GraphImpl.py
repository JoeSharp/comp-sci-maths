from typing import TypeVar, Dict, Set, List, Iterable, Iterator

from Algorithms.GraphTraversal.Graph import Graph
from Algorithms.Queue.Queue import Queue
from Algorithms.Queue.QueueImpl import QueueImpl
from DataStructures.Stack.Stack import Stack
from DataStructures.Stack.StackImpl import StackImpl

T = TypeVar('T', str, int, float)


class GraphImpl(Graph[T]):
    __data: Dict[T, Set[T]]

    def __init__(self):
        self.__data = {}

    def __repr__(self):
        return "{}".format(self.__data)

    def __ensure_key_exists(self, vertex: T):
        if vertex not in self.__data:
            self.__data[vertex] = set()

    def add_edge(self, from_v: T, to_v: T) -> None:
        self.__ensure_key_exists(from_v)
        self.__ensure_key_exists(to_v)

        from_links: Set[T] = self.__data[from_v]
        from_links.add(to_v)

        to_links: Set[T] = self.__data[to_v]
        to_links.add(from_v)

    def get_related(self, from_v: T) -> Set[T]:
        return self.__data[from_v]

    def breadth_first_search(self, start_vertex: T) -> List[T]:
        pending_queue: Queue[T] = QueueImpl()
        items: List[T] = []

        # Visit the starting vertex
        pending_queue.enqueue(start_vertex)
        items.append(start_vertex)

        vertex: T = start_vertex
        while True:
            # Get the related edges which are also in the unvisited set
            related: Iterable[T] = iter(filter(
                lambda x: x not in items,
                self.get_related(vertex)
            ))

            # If we have related edges, add them all to the items,
            # remove them from unvisited and push them to the queue
            any_seen: bool = False
            for other in related:
                items.append(other)
                pending_queue.enqueue(other)
                any_seen = True

            if not any_seen:
                vertex = pending_queue.dequeue()

            if pending_queue.is_empty():
                break

        return items

    def depth_first_search(self, start_vertex: T) -> List[T]:
        pending_stack: Stack[T] = StackImpl()
        items: List[T] = []

        vertex: T = start_vertex
        while True:
            # Get the related edges which are also in the unvisited set
            if vertex not in items:
                items.append(vertex)
                pending_stack.push(vertex)

            # Filter out the unvisited ones
            related: Iterator[T] = iter(filter(
                lambda x: x not in items,
                self.get_related(vertex)
            ))

            try:
                vertex: T = next(related)
            except StopIteration:
                vertex = pending_stack.pop()

            if pending_stack.is_empty():
                break

        return items
