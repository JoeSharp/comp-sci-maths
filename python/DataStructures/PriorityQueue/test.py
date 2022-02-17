import unittest
import logging
from DataStructures.PriorityQueue.PriorityQueue import PriorityQueue


class TestStringMethods(unittest.TestCase):

    def test_priority_queue(self):
        my_queue: PriorityQueue[str] = PriorityQueue()
        my_queue.enqueue('Indigo', 10)
        my_queue.enqueue('Joe', 4)
        my_queue.enqueue('Kate', 7)
        a = my_queue.dequeue()
        my_queue.enqueue('Tom', 9)
        my_queue.enqueue('Kirsten', 3)
        b = my_queue.dequeue()
        my_queue.enqueue('Nina', 4)
        c = my_queue.dequeue()
        my_queue.enqueue('Gaz', 5)
        d = my_queue.dequeue()
        my_queue.enqueue('Steve', 1)
        e = my_queue.dequeue()
        my_queue.enqueue('Louise', 8)
        my_queue.enqueue('Chris', 7)
        f = my_queue.dequeue()
        g = my_queue.dequeue()
        h = my_queue.dequeue()

        logging.info("My Priority Queue: {}".format(my_queue))

        self.assertEqual(a, ('Indigo', 10))
        self.assertEqual(b, ('Tom', 9))
        self.assertEqual(c, ('Kate', 7))
        self.assertEqual(d, ('Gaz', 5))
        self.assertEqual(e, ('Joe', 4))
        self.assertEqual(f, ('Louise', 8))
        self.assertEqual(g, ('Chris', 7))
        self.assertEqual(h, ('Nina', 4))
        logging.info("Tested Priority Queue {}".format(my_queue))


if __name__ == '__main__':
    unittest.main()
