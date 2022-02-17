import logging
from pytest import raises
from typing import List, Optional
from random import randint
from Algorithms.Sorting.bubble_sort import bubble_sort
from Algorithms.Sorting.quick_sort import quick_sort
from Algorithms.Sorting.merge_sort import merge_sort
from Algorithms.Sorting.insertion_sort import insertion_sort
from Algorithms.Sorting.common import SortFunction, primitive_compare, primitive_reverse_compare
from Algorithms.Sorting.Person import Person, compare_name, compare_age


SORT_FUNCTIONS: List[SortFunction] = [
    insertion_sort, bubble_sort, merge_sort, quick_sort]


def test_numbers():
    for sort_function in SORT_FUNCTIONS:
        my_list: List[int] = [4, 5, 3, 1, 9, 8]
        my_sorted_list: List[int] = sort_function(
            my_list, primitive_compare)
        my_reversed_list: List[int] = sort_function(
            my_list, primitive_reverse_compare)

        logging.info("Integers: {}\nInput: {}\nSorted: {}\nReversed: {}".format(
            sort_function.__name__, my_list, my_sorted_list, my_reversed_list))
        assert [1, 3, 4, 5, 8, 9] == my_sorted_list
        assert [9, 8, 5, 4, 3, 1] == my_reversed_list


def test_empty_list():
    for sort_function in SORT_FUNCTIONS:
        my_list: List = []
        sorted_list = sort_function(my_list, lambda x, y: x < y)
        assert [] == sorted_list


def test_mixed_types():
    for sort_function in SORT_FUNCTIONS:
        my_list: List = [1, 2, 'joe', 'foobar']
        with raises(Exception) as context:
            sort_function(my_list, lambda x, y: x < y)
            assert 'not supported between instances' in str(context.exception)


def test_string():
    for sort_function in SORT_FUNCTIONS:
        my_list: List[str] = ["Bravo", "Delta", "Charlie",
                              "Alpha", "Echo", "Sierra", "Foxtrot"]
        my_sorted_list: List[str] = sort_function(
            my_list, primitive_compare)
        my_reversed_list: List[str] = sort_function(
            my_list, primitive_reverse_compare)
        logging.info("Strings: {}\nInput: {}\nSorted: {}\nReversed: {}".format(
            sort_function.__name__, my_list, my_sorted_list, my_reversed_list))
        assert ["Alpha", "Bravo", "Charlie", "Delta",
                "Echo", "Foxtrot", "Sierra"] == my_sorted_list
        assert ["Sierra", "Foxtrot", "Echo", "Delta",
                "Charlie", "Bravo", "Alpha"] == my_reversed_list


def test_random():
    for sort_function in SORT_FUNCTIONS:
        my_list: List[int] = [randint(0, 100) for i in range(100)]
        my_sorted_list: List[int] = sort_function(
            my_list, primitive_compare)

        logging.info("Random Numbers: {}\nInput: {}\nSorted: {}".format(
            sort_function.__name__, my_list, my_sorted_list))

        last: Optional[int] = None
        num_checks: int = 0
        for s in my_sorted_list:
            if last is not None:
                num_checks += 1
                assert last <= s
            last = s
        assert num_checks == len(my_list) - 1


def test_objects():
    for sort_function in SORT_FUNCTIONS:
        my_list: List[Person] = [
            Person("Frodo", 55),
            Person("Sam", 35),
            Person("Bilbo", 111),
            Person("Sauron", 3000),
            Person("Gollum", 500)
        ]
        by_name: List[Person] = sort_function(my_list, compare_name)
        by_age: List[Person] = sort_function(my_list, compare_age)

        by_name_names = [x.get_name() for x in by_name]
        by_age_names = [x.get_name() for x in by_age]

        logging.info("Objects: {}\nInput: {}\nBy Name: {}\nBy Age: {}".format(
            sort_function.__name__, my_list, by_name, by_age))
        assert ["Bilbo", "Frodo", "Gollum", "Sam", "Sauron"] == by_name_names
        assert ["Sam", "Frodo", "Bilbo", "Gollum", "Sauron"] == by_age_names
