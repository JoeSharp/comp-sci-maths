import unittest
import logging
from DataStructures.LinkedList.LinkedList import LinkedList


class TestStringMethods(unittest.TestCase):

    def test_linked_list(self):
        my_list = LinkedList[str]()
        my_list.append('Joe')  # Joe
        my_list.append('Kate')  # Joe, Kate
        my_list.insert(1, 'Indigo')  # Joe, Indigo, Kate
        my_list.insert(1, 'Tom')  # Joe, Tom, Indigo, Kate
        my_list.append('Kirsten')  # Joe, Tom, Indigo, Kate, Kirsten

        at0: str = my_list.get(0)
        at1: str = my_list.get(1)
        at2: str = my_list.get(2)
        at3: str = my_list.get(3)
        at4: str = my_list.get(4)
        self.assertEqual(at0, 'Joe')
        self.assertEqual(at1, 'Tom')
        self.assertEqual(at2, 'Indigo')
        self.assertEqual(at3, 'Kate')
        self.assertEqual(at4, 'Kirsten')
        logging.info("Tested Linked List {}".format(my_list))

        remove2: bool = my_list.remove(2)
        self.assertTrue(remove2)
        at2_again: str = my_list.get(2)
        logging.info("Tested Linked List after Remove {}".format(my_list))
        self.assertEqual(at2_again, 'Kate')

        logging.info("Iterating Items")
        for x, index in my_list:
            logging.info("{}: {}".format(index, x))


if __name__ == '__main__':
    unittest.main()
