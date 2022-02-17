from abc import ABC, abstractmethod
from typing import List


class RegularPolygon(ABC):

    def __init__(self, name: str, side_length: int):
        self.__name = name
        self.side_length = side_length

    @abstractmethod
    def get_area(self) -> float:
        pass

    def to_string(self):
        return "Shape: {}, side length: {}, area: {}".format(self.__name, self.side_length, self.get_area())


class Triangle(RegularPolygon):
    def __init__(self, side_length: int):
        super().__init__('triangle', side_length)

    def get_area(self) -> float:
        return self.side_length**2 / 2


class Square(RegularPolygon):
    def __init__(self, side_length: int):
        super().__init__('square', side_length)

    def get_area(self) -> float:
        return self.side_length**2


myShapes: List[RegularPolygon] = [
    Square(30),
    Triangle(20),
    Square(15),
    Triangle(15)
]

print("Printing My Shapes {}".format(len(myShapes)))
for s in myShapes:
    print(s.to_string())

# https://www.visual-paradigm.com/guide/uml-unified-modeling-language/uml-aggregation-vs-composition/