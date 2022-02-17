from typing import Set, Dict, List, Tuple, TypeVar, Generic
import math

T = TypeVar('T', str, int, float)


class WeightedGraph(Generic[T]):

    __data: Dict[T, Set[Tuple[T, float]]]
    __flat: List[T]

    def __init__(self):
        self.__data = {}
        self.__flat = []

    def __ensure_key_exists(self, vertex: T):
        if vertex not in self.__data:
            self.__data[vertex] = set()
        if vertex not in self.__flat:
            self.__flat.append(vertex)

    def add_relationship(self, from_v: T, to_v: T, weight: float = 1.0):
        self.__ensure_key_exists(from_v)
        self.__ensure_key_exists(to_v)

        self.__data[from_v].add((to_v, weight))

    def get_relationships(self, from_v: T):
        if from_v not in self.__data:
            raise Exception("Graph Does Not Contain {}".format(from_v))
        return self.__data[from_v]

    def get_relationship_weight(self, from_v: T, to_v: T):
        from_data: Set[Tuple[T, float]] = self.__data[from_v]

        if from_data is not None:
            for to_data in from_data:
                if to_v is to_data[0]:
                    return to_data[1]

        return math.inf

    def generate_adjacency_matrix(self) -> List[List[float]]:
        matrix: List[List[float]] = [[math.inf for y in self.__flat] for x in self.__flat]

        for key, edges in self.__data.items():
            key_index: int = self.__flat.index(key)
            for edge in edges:
                dest_index: int = self.__flat.index(edge[0])
                weight: float = edge[1]
                matrix[key_index][dest_index] = weight

        return matrix

    def get_known_items(self) -> List[T]:
        return self.__flat

    def __repr__(self):
        return "{}".format(self.__data)

