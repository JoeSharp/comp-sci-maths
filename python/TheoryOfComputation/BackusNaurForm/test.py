from unittest import TestCase
import logging
from typing import Optional, List, Tuple
from TheoryOfComputation.BackusNaurForm.BackusNaurForm import BackusNaurForm, MatchPart
from TheoryOfComputation.BackusNaurForm.Tree import Tree


class TestBNF(TestCase):

    def test_digit(self):
        bnf: BackusNaurForm = BackusNaurForm()\
            .add_rule("<digit> ::= 0|1|2|3|4|5|6|7|8|9")
        logging.info("Test Digit: {}".format(bnf))
        test_cases: List[Tuple[str, Optional[str]]] = [
            ('6', 'digit'),
            ('458', None),
            ('X', None),
            ('JOE', None)
        ]

        for test_input, expected_output in test_cases:
            actual_output: Optional[Tree[MatchPart]
                                    ] = bnf.find_match(test_input)
            if expected_output is not None:
                logging.info("Input of {}, Output:\n{}".format(
                    test_input, actual_output))
                self.assertIsNotNone(actual_output)
                self.assertEqual(expected_output, actual_output.get_value()[0])
            else:
                self.assertIsNone(actual_output)

    def test_integer(self):
        bnf: BackusNaurForm = BackusNaurForm()\
            .add_rule("<digit> ::= 0|1|2|3|4|5|6|7|8|9")\
            .add_rule("<integer> ::= <digit> | <digit><integer>")
        logging.info("Test Integer: {}".format(bnf))

        test_cases: List[Tuple[str, Optional[str]]] = [
            ('6', 'digit'),
            ('458', 'integer'),
            ('X', None),
            ('JOE', None)
        ]

        for test_input, expected_output in test_cases:
            actual_output: Optional[str] = bnf.find_match(test_input)
            if expected_output is not None:
                logging.info("Input of {}, Output:\n{}".format(
                    test_input, actual_output))
                self.assertIsNotNone(actual_output)
                self.assertEqual(expected_output, actual_output.get_value()[0])
            else:
                self.assertIsNone(actual_output)

    def test_real(self):
        bnf: BackusNaurForm = BackusNaurForm()\
            .add_rule("<digit> ::= 0|1|2|3|4|5|6|7|8|9")\
            .add_rule("<integer> ::= <digit> | <digit><integer>")\
            .add_rule("<real> ::= <integer> | <integer>'.'<integer>")
        logging.info("Test Real: {}".format(bnf))

        test_cases: List[Tuple[str, Optional[str]]] = [
            ('6', 'digit'),
            ('457', 'integer'),
            ('3.567', 'real'),
            ('X', None),
            ('JOE', None)
        ]

        for test_input, expected_output in test_cases:
            actual_output: Optional[str] = bnf.find_match(test_input)
            if expected_output is not None:
                logging.info("Input of {}, Output:\n{}".format(
                    test_input, actual_output))
                self.assertIsNotNone(actual_output)
                self.assertEqual(expected_output, actual_output.get_value()[0])
            else:
                self.assertIsNone(actual_output)

    def test_expression(self):
        bnf: BackusNaurForm = BackusNaurForm()\
            .add_rule("<digit> ::= 0|1|2|3|4|5|6|7|8|9") \
            .add_rule("<integer> ::= <digit> | <digit><integer>")\
            .add_rule("<compare>::= < | > | <= | >= | == | !=")\
            .add_rule("<bool>::= <integer> <compare> <integer>")
        logging.info("Test Expression: {}".format(bnf))

        test_cases: List[Tuple[str, Optional[str]]] = [
            ('<', 'compare'),
            ('4 < 5', 'bool'),
            ('X', None),
            ('JOE', None)
        ]

        for test_input, expected_output in test_cases:
            actual_output: Optional[str] = bnf.find_match(test_input)
            if expected_output is not None:
                logging.info("Input of {}, Output:\n{}".format(
                    test_input, actual_output))
                self.assertIsNotNone(actual_output)
                self.assertEqual(expected_output, actual_output.get_value()[0])
            else:
                self.assertIsNone(actual_output)

    def test_html(self):
        bnf: BackusNaurForm = BackusNaurForm()\
            .add_rule("<tag_name> ::= html|head|body") \
            .add_rule("<document> ::= 'STUFF' | '<'<tag_name>'>'<document>'</'<tag_name>'>'")
        logging.info("Test HTML: {}".format(bnf))

        test_cases: List[Tuple[str, Optional[str]]] = [
            ('html', 'tag_name'),
            ('<html>STUFF</html>', 'document'),
            ('<html><head>STUFF</head></html>', 'document'),
        ]

        for test_input, expected_output in test_cases:
            actual_output: Optional[str] = bnf.find_match(test_input)
            logging.info("Input of {}, Output:\n{}".format(
                test_input, actual_output))
            if expected_output is not None:
                self.assertIsNotNone(actual_output)
                self.assertEqual(expected_output, actual_output.get_value()[0])
            else:
                self.assertIsNone(actual_output)
