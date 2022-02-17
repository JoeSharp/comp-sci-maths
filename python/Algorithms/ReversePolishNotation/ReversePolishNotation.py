from typing import Dict, Callable
from DataStructures.Stack.StackImpl import Stack, StackImpl

"""
A lookup table for arithmetic operators supported by this class
If a character in an expression matches one of these keys
Then we know we have an operator
"""
operators: Dict[str, Callable[[float, float], float]] = {
    "+": lambda a, b: a + b,
    "-": lambda a, b: a - b,
    '*': lambda a, b: a * b,
    '/': lambda a, b: a / b
}


class ReversePolishNotation:
    """
    An instance of this class is created with an algebraic expression.
    It can then be called upon to evaluate expressions given dictionaries of values.
    The expressions must be well formed RPN using single letter algebraic substitutions
    """
    __expression: str

    def __init__(self, expression: str):
        self.__expression = expression

    def evaluate(self, values: Dict[str, float]):
        """
        Evaluate the value of an algebraic expression, given a lookup of variable values.
        :param values: Lookup of literal values to use in place of named variables
        :return: The evaluated answer
        """
        # Create a stack of evaluated expression parts
        my_stack: Stack[float] = StackImpl[float]()

        # For each character in the expression, assume variable names are single char
        for e in self.__expression:
            if e in operators:
                # We have found an operator,
                op: Callable[[float, float], float] = operators[e]
                # pull the top two items from our stack
                b: float = my_stack.pop()
                a: float = my_stack.pop()
                # Evaluate the operator with these two values
                ab = op(a, b)
                # Place that calculated value onto the stack
                my_stack.push(ab)
            else:
                # All other characters should refer to named values in our values dictionary
                if e not in values:
                    raise Exception(
                        "Could not find {} in values for expression {}".format(e, self.__expression))

                value: float = values.get(e)
                my_stack.push(value)

        # The last and only thing left on the stack should be the answer
        return my_stack.pop()
