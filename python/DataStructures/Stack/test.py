import unittest
import logging
from DataStructures.Stack.Stack import Stack
from DataStructures.Stack.StackImpl import StackImpl


class TestStringMethods(unittest.TestCase):

    def test_stack(self):
        my_stack: Stack[int] = StackImpl()
        is_empty_at_start: bool = my_stack.is_empty()
        my_stack.push(5)
        my_stack.push(7)
        my_stack.push(10)
        a = my_stack.pop()
        my_stack.push(21)
        my_stack.push(54)
        b = my_stack.pop()
        my_stack.push(2)
        c = my_stack.pop()
        my_stack.push(6)
        d = my_stack.pop()
        my_stack.push(13)
        e = my_stack.pop()
        my_stack.push(19)
        my_stack.push(28)
        f = my_stack.pop()
        g = my_stack.pop()
        h = my_stack.pop()

        self.assertTrue(is_empty_at_start)
        self.assertEqual(a, 10)
        self.assertEqual(b, 54)
        self.assertEqual(c, 2)
        self.assertEqual(d, 6)
        self.assertEqual(e, 13)
        self.assertEqual(f, 28)
        self.assertEqual(g, 19)
        self.assertEqual(h, 21)
        logging.info("Tested Stack {}".format(my_stack))


if __name__ == '__main__':
    unittest.main()
