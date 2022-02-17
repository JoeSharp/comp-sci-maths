from typing import Iterable, TypeVar, List, Tuple, Optional

T = TypeVar('T')

"""
Define a type to represent run-length encoded information.
It's a list of runs. Each run is a tuple of the number of occurrences, and the value itself.
"""
RunLengthEncoded = List[Tuple[int, T]]


def run_length_encode(input_str: Iterable[T]) -> RunLengthEncoded:
    """
    Given some iterable input, executes run length encoding
    :param input_str: The raw input to encode
    :return: A list of tuples,
    each of which describes the value to repeat and the number of repetitions
    """
    output: List[Tuple[int, T]] = []

    # Keep track of the value we last saw, and how many times we have seen it in a row
    current_run_length = 0
    current_run_value: Optional[T] = None
    for i in input_str:
        # If we are seeing the same value again, just iterate the run
        if current_run_value == i:
            current_run_length += 1
        else:
            # If we were tracking a value, add it to the output
            if current_run_value is not None:
                output.append((current_run_length, current_run_value))

            # Start a new run
            current_run_value = i
            current_run_length = 1

    # Add the last run of values
    if current_run_value is not None:
        output.append((current_run_length, current_run_value))

    return output


def run_length_decode(encoded: RunLengthEncoded) -> List[T]:
    """
    Given a Run Length Encoded string of data, expands it back into original form
    :param encoded: The encoded data
    :return: Decoded data
    """
    decoded: List[T] = []

    # For each RLE value, read the count and the value
    for count, value in encoded:
        # Append the value, 'count' times
        for c in range(count):
            decoded.append(value)

    return decoded
