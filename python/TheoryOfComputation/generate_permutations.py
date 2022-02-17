from typing import Set, Callable


def generate_permutations(alphabet: Set[str],
                          callback: Callable[[str], None],
                          length_limit: int,
                          current: str = "") -> None:
    """
    Recursively generate all the possible inputs given a specific alphabet and a length limit.
    :param alphabet: The list of characters we have to play with
    :param callback: Called with all the inputs as they are generated
    :param length_limit: The longest inputs to generate, gives us the exit condition for recursion
    :param current: The current accumulated input
    """
    for a in alphabet:
        next_input: str = "{}{}".format(current, a)
        callback(next_input)
        if len(next_input) < length_limit:
            generate_permutations(alphabet, callback, length_limit, next_input)
