from typing import List
from random import randint
from DataRepresentation.Encryption.rotate_substitution import \
    process_character, ALPHABET, Direction


def generate_one_time_pad(length: int) -> List[int]:
    """
    Utility function for generating a new random one time pad.
    :param length: The length of the OTP to generate
    :return: A list of values that make up the OTP
    """
    return [randint(0, len(ALPHABET)) for _ in range(length)]


class VernamCipher:
    """
    Encapsulates the vernam cipher.
    """
    # The encryption key
    __one_time_pad: List[int]

    def __init__(self, one_time_pad: List[int]):
        """
        Construct a new Vernam Cipher processor object for a given key.
        :param one_time_pad: The OTP to use
        """
        self.__one_time_pad = one_time_pad

    def __process(self, message: str, direction: Direction) -> str:
        """
        Given a message, it calculates a shifted version. The direction means
        that this function can be used for decryption (-1) and encryption (+1).
        :param message: The message to encrypt or decrypt
        :param direction: Indicates if we are decrypting or encrypting
        :return:
        """
        # Make sure we are encrypting a message that fits within the OTP
        if len(message) > len(self.__one_time_pad):
            raise Exception("Cannot encrypt message of length {}, longer than the OTP: {}".format(
                len(message), len(self.__one_time_pad)))

        # Keep track of the output chars
        output_chars: List[str] = []

        # Iterate through the key, rotate to the start when we reach its end
        key_index = 0

        # Iterate through each character
        for p in message:
            # Lookup the key
            key_this_char: int = self.__one_time_pad[key_index]

            # Encrypt this letter and put onto the output
            c: str = process_character(p, key_this_char, direction)
            output_chars.append(c)

            # Move onto next key in OTP
            key_index += 1

        # Build the output string from the chars
        return "".join(output_chars)

    def encrypt(self, plain_text: str) -> str:
        """
        Encrypt some plain text with the key that belongs to this instance of the cipher
        :param plain_text: The plain text to encrypt
        :return: The cipher text
        """
        return self.__process(plain_text, Direction.ENCRYPT)

    def decrypt(self, cipher_text: str) -> str:
        """
        Decrypt some cipher text with the key that belongs to this instance of the cipher
        :param cipher_text: The cipher text to decrypt
        :return: The plain text
        """
        return self.__process(cipher_text, Direction.DECRYPT)
