from typing import Dict, Tuple, List

EncodedStr = List[int]
CodeToWordDict = Dict[int, str]
WordToCodeDict = Dict[str, int]

# Encapsulates the type for dictionary encoded text
DictionaryEncoding = Tuple[CodeToWordDict, EncodedStr]


def dictionary_encode(text: str) -> DictionaryEncoding:
    """
    Encodes a string of text using Dictionary Encoding
    :param text: The input string to encode
    :return: A tuple containing the dictionary of words by their ID,
    and a series of ID's which make up the original text
    """
    # Calculate a word dictionary, and it's inverse,
    code_dict: CodeToWordDict = dict()
    word_dict: WordToCodeDict = dict()
    output_str: List[int] = []

    # Codes will be assigned as simple one-up numbers
    next_code: int = 0
    for word in text.split(" "):
        # If we haven't seen this word before, add it to the dictionary
        if word not in word_dict:
            code_dict[next_code] = word
            word_dict[word] = next_code
            next_code += 1

        # Lookup the code using our inverse dictionary
        code: int = word_dict.get(word)

        # Write the code to the output stream
        output_str.append(code)

    # Return the code dictionary and the output string.
    return code_dict, output_str


def dictionary_decode(encoded: DictionaryEncoding) -> str:
    """
    Decode a dictionary encoded string into it's original form
    :param encoded: The dictionary encoded string
    :return: The original string
    """
    # Read the parts of the encoded info
    input_dict, input_str = encoded

    # Convert the list of integers to a list of words, using the dictionary lookup
    output_chars = [input_dict.get(x) for x in input_str]

    # Join all the output words into a single string
    return " ".join(output_chars)
