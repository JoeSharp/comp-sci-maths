from typing import List
from enum import Enum

"""
the list of characters that we can encrypt. Any encryption will find the index
in this list, then rotate that index forward by the key and read off the output char.
"""
ALPHABET: List[str] = [chr(x) for x in range(ord('a'), ord('z'))]


class Direction(Enum):
    """
    Used internally to indicate which direction we are processing a message.
    """
    DECRYPT = -1
    ENCRYPT = 1


def process_character(p: str, key: int, direction: Direction) -> str:
    """
    Encrypt/Decrypt a single letter given a key, and direction.
    Performs a rotating substitution.
    This can be used for both Caesar and Vernam Ciphers

    :param p: The plain/cipher text character to encrypt/decrypt.
    :param key: The key to use
    :param direction: Is this encryption or decryption?
    :return: The appropriate cipher/plain text character
    """
    if len(p) != 1:
        raise Exception("Invalid attempt to encrypt character of length: {}".format(p))
    try:
        # Find the index of the given character
        index: int = ALPHABET.index(p.lower())

        # Move it on by the key, and make sure we rotate around the end and start
        index += len(ALPHABET)
        index += (direction.value * key)
        index %= len(ALPHABET)

        # Write the ALPHABET character at the shifted index to the output
        return ALPHABET[index]

    except ValueError:
        # If the character is not in the alphabet, just shove it as-is into the output
        return p
