from unittest import TestCase
from typing import List
import logging
from ProgrammingConcepts.factorial import factorial
from ProgrammingConcepts.reverse_list import reverse_list


class TestFactorial(TestCase):

    def test_simple(self):
        self.assertEqual(6, factorial(3))
        self.assertEqual(120, factorial(5))
        self.assertEqual(6, factorial(3))
        self.assertEqual(3628800, factorial(10))

    def test_negative(self):
        self.assertRaises(Exception, lambda _: factorial(-5))

    def test_wrong_type(self):
        self.assertRaises(Exception, lambda _: factorial('a'))

    def test_reverse_ints(self):
        my_list: List = list(range(10))
        my_reversed = reverse_list(my_list)
        logging.info(f'Input: {my_list}\nReversed: {my_reversed}')

    def test_reverse_letters(self):
        my_list: List = [chr(x) for x in range(ord('a'), ord('z') + 1)]
        my_reversed = reverse_list(my_list)
        logging.info(f'Input: {my_list}\nReversed: {my_reversed}')
