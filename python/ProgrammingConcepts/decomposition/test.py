from unittest import TestCase
import logging
from ProgrammingConcepts.decomposition.stickers \
    import harvest_duplicates, assign_duplicates, swap


class MyTest(TestCase):

    def test_harvest_duplicates(self):
        my_collection = ['red', 'green', 'red',
                         'red', 'blue', 'violet', 'blue']
        deduped, swaps = harvest_duplicates(my_collection)
        logging.info(f"Deduped {deduped}")
        logging.info(f"Swaps: {swaps}")
        self.assertEqual({'red', 'green', 'blue', 'violet'}, set(deduped))
        self.assertEqual(2, swaps.count('red'))
        self.assertEqual(1, swaps.count('blue'))

    def test_assign_duplicates(self):
        my_collection = ['red', 'green', 'indigo']
        all_duplicates = ['indigo', 'blue', 'violet',
                          'violet', 'blue', 'yellow', 'indigo']

        upd_collection, upd_duplicates = assign_duplicates(
            my_collection, all_duplicates)
        logging.info(f"My Collection: {my_collection}")
        logging.info(f"All Duplicates: {all_duplicates}")
        logging.info(f"Updated Collection: {upd_collection}")
        logging.info(f"Updated Duplicates: {upd_duplicates}")

        self.assertEqual({'red', 'green', 'indigo', 'violet',
                          'blue', 'yellow'}, set(upd_collection))
        self.assertEqual(2, upd_duplicates.count('indigo'))
        self.assertEqual(1, upd_duplicates.count('blue'))
        self.assertEqual(1, upd_duplicates.count('violet'))
        self.assertEqual(0, upd_duplicates.count('yellow'))

    def test_swap(self):
        album = {'red', 'green', 'blue'}
        my_collections = [
            ['red', 'green', 'green', 'red'],
            ['green', 'blue', 'blue', 'blue'],
            ['red']
        ]

        upd_collections = swap(my_collections)
        self.assertEqual(3, len(upd_collections))

        # All collections should be complete now
        for upd_collection in upd_collections:
            self.assertEqual(album, set(upd_collection))

        logging.info("Input Collections:")
        for c in my_collections:
            logging.info(f"\t{c}")
        logging.info("Swapped Collections:")
        for c in upd_collections:
            logging.info(f"\t{c}")
