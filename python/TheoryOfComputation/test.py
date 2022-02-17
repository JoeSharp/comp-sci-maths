import unittest
import logging
from typing import List
from TheoryOfComputation.generate_permutations import generate_permutations


class Test(unittest.TestCase):

    def test_generate_inputs(self):
        my_inputs: List[str] = []
        generate_permutations({"0", "1"}, lambda x: my_inputs.append(x), 3)
        logging.info("Inputs Generated: {}".format(my_inputs))
