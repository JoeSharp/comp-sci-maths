from Algorithms.Sorting.common import primitive_compare


class Person:
    """"
    This class is used to test that custom comparators work with sorting objects
    """
    __name: str
    __age: int

    def __init__(self, name: str, age: int):
        self.__name = name
        self.__age = age

    def __repr__(self):
        return "{}: {}".format(self.__name, self.__age)

    def get_name(self) -> str:
        return self.__name

    def get_age(self) -> int:
        return self.__age


# Sort Functions for Person objects
def compare_name(x: Person, y: Person) -> int:
    return primitive_compare(x.get_name(), y.get_name())


def compare_age(x: Person, y: Person) -> int:
    return primitive_compare(x.get_age(), y.get_age())
