import unittest
import logging
from typing import List, Tuple, Dict
from Algorithms.ArithmeticExpression.ArithmeticExpression import ArithmeticExpression
from Algorithms.ReversePolishNotation.ReversePolishNotation import ReversePolishNotation


class TestArithmeticExpression(unittest.TestCase):

    def __general_test(self,
                       expressions: List[str],
                       cases: List[Tuple[Dict[str, float], float]]):
        for e in expressions:
            my_expression: ArithmeticExpression = ArithmeticExpression(e)
            logging.info("My Expression: {}".format(my_expression))
            rpn: ReversePolishNotation = ReversePolishNotation(
                my_expression.postfix())

            for inputs, expected in cases:
                ans1: float = rpn.evaluate(inputs)
                self.assertEqual(expected, ans1)

    def test_complex_1(self):
        self.__general_test(
            # An expression in 3 forms
            ["((A + B) * (C - D))", "(*(+AB)(-CD))", "((AB+)(CD-)*)"],
            [
                # Dictionary of inputs, paired with expected answer
                ({"A": 9, "B": 2, "C": 15, "D": 7}, (9 + 2) * (15 - 7)),
                ({"A": 91, "B": 12, "C": 7, "D": 45}, (91 + 12) * (7 - 45))
            ]
        )

    def test_complex_2(self):
        self.__general_test(
            ["((B/(C+D))*A)", "(*(/B(+CD))A)", "((B(CD+)/)A*)"],
            [
                ({"A": 45, "B": 3, "C": 6, "D": 17}, (3 / (6 + 17)) * 45),
                ({"A": 13, "B": 4, "C": 61, "D": 2}, (4 / (61 + 2)) * 13)
            ]
        )
