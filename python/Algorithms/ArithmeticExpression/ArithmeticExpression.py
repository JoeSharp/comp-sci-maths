from __future__ import annotations
from typing import Optional
from Algorithms.TreeTraversal.BinaryTreeImpl import BinaryTree, BinaryTreeImpl
from Algorithms.ReversePolishNotation.ReversePolishNotation import operators
from Algorithms.Stack.StackImpl import Stack, StackImpl


class ArithmeticExpression:
    __raw_expression: str
    __expression_tree: BinaryTree[str]

    def __init__(self, expression: str):
        self.__raw_expression = expression
        my_stack: Stack[BinaryTree[str]] = StackImpl()
        my_tree: Optional[BinaryTree[str]] = BinaryTreeImpl[str]()
        for c in expression:
            if c == " ":
                pass  # Just ignore spaces
            elif c == "(":
                my_stack.push(my_tree)
                if my_tree.get_left() is None:
                    my_tree = my_tree.set_left(None)
                elif my_tree.get_right() is None:
                    my_tree = my_tree.set_right(None)
                else:
                    raise Exception("Could not parse {} in expression {}"
                                    .format(c, expression))
            elif c == ")":
                my_tree = my_stack.pop()
                pass
            elif c in operators:
                my_tree.set_value(c)
            else:
                if my_tree.get_left() is None:
                    my_tree.set_left(c)
                elif my_tree.get_right() is None:
                    my_tree.set_right(c)
                else:
                    raise Exception("Too many operands within brackets {} in expression {}"
                                    .format(c, expression))
        self.__expression_tree = my_tree.get_left()

    def __repr__(self):
        return "Raw Expression: {}, Prefix: {}, PostFix: {}\n\tTree: {}".format(
            self.__raw_expression,
            self.prefix(),
            self.postfix(),
            self.__expression_tree)

    def prefix(self) -> str:
        expression: str = ""
        for c in self.__expression_tree.pre_order():
            expression += c
        return expression

    def postfix(self) -> str:
        expression: str = ""
        for c in self.__expression_tree.post_order():
            expression += c
        return expression
