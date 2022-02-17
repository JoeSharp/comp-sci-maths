import unittest
import logging
from DataStructures.Graph.WeightedGraph import WeightedGraph


class TestStringMethods(unittest.TestCase):

    def test_adj_list_graph(self):
        my_graph: WeightedGraph[str] = WeightedGraph()
        my_graph.add_relationship('J', 'K', 5)
        my_graph.add_relationship('J', 'T', 3)
        my_graph.add_relationship('T', 'I', 7)
        logging.info("My Graph:{}".format(my_graph))
        my_adj_matrix = my_graph.generate_adjacency_matrix()
        logging.info("Adjacency Matrix", my_adj_matrix)

        known_items = my_graph.get_known_items()
        logging.info("-", end="\t")
        for heading in known_items:
            logging.info("{}".format(heading), end="\t")
        logging.info("|")
        for outer_index, outer in enumerate(known_items):
            logging.info("{}".format(outer), end="\t")
            for inner_index, inner in enumerate(known_items):
                logging.info("{}".format(
                    my_adj_matrix[outer_index][inner_index]), end="\t")
            logging.info("|")

        j_k: float = my_graph.get_relationship_weight('J', 'K')
        self.assertEqual(5.0, j_k)
        j_t: float = my_graph.get_relationship_weight('J', 'T')
        self.assertEqual(3.0, j_t)
        t_i: float = my_graph.get_relationship_weight('T', 'I')
        self.assertEqual(7.0, t_i)
