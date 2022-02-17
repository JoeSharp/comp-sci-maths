import unittest
from typing import List, Tuple, Dict
from Algorithms.ReversePolishNotation.ReversePolishNotation import ReversePolishNotation


class TestReversePolishNotation(unittest.TestCase):
    def __generic_test(self,
                       expression_str: str,
                       cases: List[Tuple[Dict[str, float], float]]):
        # Create an expression
        expression: ReversePolishNotation = ReversePolishNotation(expression_str)

        # For each test case of values and expected answer...
        for values, expected_answer in cases:
            # Give the expression the values to evaluate
            ans1: float = expression.evaluate(values)
            # check the answer
            self.assertEqual(expected_answer, ans1)

    def test_sum(self):
        self.__generic_test(
            "AB+",  # Expression
            [  # List of values and expected answers
                ({"A": 4, "B": 5}, 4 + 5),
                ({"A": 342, "B": 53}, 342 + 53)
            ]
        )

    def test_subtract(self):
        self.__generic_test(
            "AB-",  # Expression
            [  # List of values and expected answers
                ({"A": 4, "B": 5}, 4 - 5),
                ({"A": 342, "B": 53}, 342 - 53)
            ]
        )

    def test_divide(self):
        self.__generic_test(
            "AB/",  # Expression
            [  # List of values and expected answers
                ({"A": 4, "B": 5}, 4 / 5),
                ({"A": 342, "B": 53}, 342 / 53)
            ]
        )

    def test_multiply(self):
        self.__generic_test(
            "AB*",  # Expression
            [  # List of values and expected answers
                ({"A": 4, "B": 5}, 4 * 5),
                ({"A": 342, "B": 53}, 342 * 53)
            ]
        )

    def test_complex_1(self):
        self.__generic_test(
            "AB+CD-*",  # Expression
            [  # List of values and expected answers
                ({"A": 9, "B": 2, "C": 15, "D": 7}, (9 + 2) * (15 - 7)),
                ({"A": 91, "B": 12, "C": 7, "D": 45}, (91 + 12) * (7 - 45))
            ]
        )

    def test_complex_2(self):
        self.__generic_test(
            "ABCD+/*",  # Expression
            [  # List of values and expected answers
                ({"A": 45, "B": 3, "C": 6, "D": 17}, (3 / (6 + 17)) * 45),
                ({"A": 13, "B": 4, "C": 61, "D": 2}, (4 / (61 + 2)) * 13)
            ]
        )

