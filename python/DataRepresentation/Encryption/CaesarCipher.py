from typing import List
from DataRepresentation.Encryption.rotate_substitution import \
    process_character, Direction


class CaesarCipher:
    """
    An instance can be used to encrypt/decrypt messages using the Caesar Cipher.
    """
    # The encryption key
    __key: int

    def __init__(self, key: int):
        """
        Construct a new Caesar Cipher processor object for a given key.
        :param key: The key to use
        """
        self.__key = key

    def __process(self, message: str, direction: Direction) -> str:
        """
        Given a message, it calculates a shifted version. The direction means
        that this function can be used for decryption (-1) and encryption (+1).
        :param message: The message to encrypt or decrypt
        :param direction: Indicates if we are decrypting or encrypting
        :return:
        """
        # Keep track of the output chars
        output_chars: List[str] = []

        # Iterate through each character
        for p in message:
            # Encrypt this letter and put onto the output
            c: str = process_character(p, self.__key, direction)
            output_chars.append(c)

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
