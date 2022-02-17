from abc import ABC, abstractmethod
from typing import TypeVar, Generic, Set, List

T = TypeVar('T', str, int, float)


class Graph(Generic[T], ABC):
    """
        Interface for a graph, edges can be added, and then the set of related vertices can be queried
    """

    """
    Add a new edge to the graph, since edges are undirected, it registers an unweighted edge in both directions
    """
    @abstractmethod
    def add_edge(self, from_v: T, to_v: T) -> None:
        pass

    """
    Given a vertex, this looks up all the adjacent vertices (those connected by edges) and returns the list
    """
    @abstractmethod
    def get_related(self, from_v: T) -> Set[T] or None:
        pass

    """
    Given a start vertex, runs a Breadth First Search and returns the list of vertices found
    """
    @abstractmethod
    def breadth_first_search(self, start_vertex: T) -> List[T]:
        pass

    """
    Given a start vertex, runs a Depth First Search and returns the list of vertices found
    """
    @abstractmethod
    def depth_first_search(self, start_vertex: T) -> List[T]:
        pass
