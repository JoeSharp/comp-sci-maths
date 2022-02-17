import unittest
import logging
from Algorithms.Queue.Queue import Queue
from Algorithms.Queue.QueueImpl import QueueImpl


class TestStringMethods(unittest.TestCase):

    def test_queue(self):
        my_queue: Queue[int] = QueueImpl()
        my_queue.enqueue(5)
        my_queue.enqueue(7)
        my_queue.enqueue(10)
        a = my_queue.dequeue()
        my_queue.enqueue(13)
        my_queue.enqueue(54)
        b = my_queue.dequeue()
        my_queue.enqueue(2)
        c = my_queue.dequeue()
        my_queue.enqueue(6)
        d = my_queue.dequeue()
        my_queue.enqueue(19)
        e = my_queue.dequeue()
        my_queue.enqueue(27)
        my_queue.enqueue(28)
        f = my_queue.dequeue()
        g = my_queue.dequeue()
        h = my_queue.dequeue()

        self.assertEqual(a, 5)
        self.assertEqual(b, 7)
        self.assertEqual(c, 10)
        self.assertEqual(d, 13)
        self.assertEqual(e, 54)
        self.assertEqual(f, 2)
        self.assertEqual(g, 6)
        self.assertEqual(h, 19)
        logging.info("Tested Queue {}".format(my_queue))


if __name__ == '__main__':
    unittest.main()
