from typing import List, Iterator, Tuple
from DataStructures.Stack.Stack import Stack
from DataStructures.Stack.StackImpl import StackImpl
from DataStructures.Graph.WeightedGraph import WeightedGraph, T


def depth_first_search(graph: WeightedGraph, start_vertex: T) -> List[T]:
    pending_stack: Stack[T] = StackImpl()
    items: List[T] = []

    vertex: T = start_vertex
    while True:
        # Get the related edges which are also in the unvisited set
        if vertex not in items:
            items.append(vertex)
            pending_stack.push(vertex)

        # Filter out the unvisited ones
        related: Iterator[Tuple[T, float]] = iter(filter(
            lambda x: x not in items,
            graph.get_relationships(vertex)
        ))

        # Pick any from these unvisited related vertices
        try:
            vertex: T = next(related)[0]  # discard the weight
        except StopIteration:
            vertex = pending_stack.pop()

        # Have we run out of items?
        if pending_stack.is_empty():
            break

    return items
