from unittest import TestCase
import logging
from DataRepresentation.DictionaryEncoding.dictionary_encode import \
    dictionary_encode, dictionary_decode


class TestDictionaryEncode(TestCase):
    def test_1(self):
        with open('./DataRepresentation/DictionaryEncoding/data/harry_potter.txt', 'r') as f:
            text = f.read()
            encoded = dictionary_encode(text)
            decoded = dictionary_decode(encoded)
            logging.info("Text: {}".format(text))
            encoded_dict, encoded_str = encoded
            logging.info("Encoded Dictionary")
            logging.info("\n".join(["{}: {}".format(k, v)
                                    for k, v in encoded_dict.items()]))
            logging.info("Encoded String: {}".format(encoded_str))
            logging.info("Decoded: {}".format(decoded))
            self.assertEqual(text, decoded)

    def test_2(self):
        with open('./DataRepresentation/DictionaryEncoding/data/repetitive.txt', 'r') as f:
            text = f.read()
            encoded = dictionary_encode(text)
            decoded = dictionary_decode(encoded)
            logging.info("Text: {}".format(text))
            encoded_dict, encoded_str = encoded
            logging.info("Encoded Dictionary")
            logging.info("\n".join(["{}: {}".format(k, v)
                                    for k, v in encoded_dict.items()]))
            logging.info("Encoded String: {}".format(encoded_str))
            logging.info("Decoded: {}".format(decoded))
            self.assertEqual(text, decoded)
