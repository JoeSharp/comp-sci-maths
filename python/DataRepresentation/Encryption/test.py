from typing import List
from unittest import TestCase

from DataRepresentation.Encryption.VernamCipher import VernamCipher, generate_one_time_pad
from DataRepresentation.Encryption.CaesarCipher import CaesarCipher
from DataRepresentation.Encryption.crack_caesar import crack_cipher

WORDS_FILENAME: str = './DataRepresentation/Encryption/words_alpha.txt'


class Test(TestCase):

    def __test_caesar_cipher(self, key: int, test_cases: List[str]):
        """
        General form of tests that encrypt and decrypt some data using Caesar Cipher.
        This test checks that the decryption successfully recovers the data.
        :param key: The key to use
        :param test_cases: A list of strings to encrypt and decrypt
        """

        # Create a cipher with this key
        my_cipher: CaesarCipher = CaesarCipher(key)
        for plain_text in test_cases:
            # Call upon the cipher to encrypt then decrypt that plain text
            cipher_text: str = my_cipher.encrypt(plain_text)
            recovered_plain_text: str = my_cipher.decrypt(cipher_text)

            # Does the recovered plain text match the given plain text?
            self.assertEqual(plain_text.lower(), recovered_plain_text)

    def test_caesar_cipher(self):
        self.__test_caesar_cipher(5, ["hello", "goodbye", "somewhere"])
        self.__test_caesar_cipher(15, ["there once was a fellow called hank"])
        self.__test_caesar_cipher(-3, ["over the rainbow"])

    def __test_vernam_cipher(self, key: List[int], test_cases: List[str]):
        """
        General form of tests that encrypt and decrypt some data using Vernam Cipher.
        This test checks that the decryption successfully recovers the data.
        :param key: The key to use
        :param test_cases: A list of strings to encrypt and decrypt
        """

        # Create a cipher with this key
        my_cipher: VernamCipher = VernamCipher(key)
        for plain_text in test_cases:

            # Call upon the cipher to encrypt then decrypt that plain text
            cipher_text: str = my_cipher.encrypt(plain_text)
            recovered_plain_text: str = my_cipher.decrypt(cipher_text)

            # Does the recovered plain text match the given plain text?
            self.assertEqual(plain_text.lower(), recovered_plain_text)

    def test_vernam_cipher(self):
        self.__test_vernam_cipher(generate_one_time_pad(60),
                                  ["hello",
                                   "it was the best of times, it was the worst of times"])
        self.__test_vernam_cipher(generate_one_time_pad(60),
                                  ["tie a yellow ribbon around the old oak tree",
                                   "are you gonna bark all day little doggy?"])

    def __test_break_caesar(self, key: int, test_cases: List[str]):
        """
        General form of a brute force attack test.
        :param key: The key to use
        :param test_cases: Strings to encrypt and then attempt decrypt
        """
        # Create a cipher for this key
        my_cipher: CaesarCipher = CaesarCipher(key)

        for plain_text in test_cases:
            # Call upon the cipher to encrypt our string
            my_cipher_text: str = my_cipher.encrypt(plain_text)

            # Attempt to find a key
            found_key, score = crack_cipher(my_cipher_text, WORDS_FILENAME)

            # Try to decrypt with that found key
            my_found_cipher: CaesarCipher = CaesarCipher(found_key)
            my_found_plain_text: str = my_found_cipher.decrypt(my_cipher_text)

            # Does the found plain text match the give plain text?
            self.assertEqual(plain_text.lower(), my_found_plain_text)

    def test_brute_force_caesar(self):
        self.__test_break_caesar(7,
                                 ['how now brown cow',
                                  'the rain in spain falls mainly on the plain'
                                  ])
        self.__test_break_caesar(-7,
                                 ['there once was a fellow called Fred',
                                  'who invented a new kind of bread'
                                  ])
        self.__test_break_caesar(9,
                                 ['by the power of grey skull',
                                  'how many beans make five?'
                                  ])
