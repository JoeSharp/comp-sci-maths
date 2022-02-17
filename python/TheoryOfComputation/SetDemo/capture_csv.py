from typing import List, Set


def capture_string_csv(question: str) -> Set[str]:
    """
    Capture a set of string values as CSV from the terminal
    :param question: The prompt to the user
    :return: Set of strings
    """
    set_as_str: str = input("{} (csv): ".format(question))
    return set(set_as_str.split(","))


def capture_integer_csv(question: str):
    """
    Capture a set of integers as a CSV from the terminal
    :param question: The question to prompt for the integers
    :return: The set of integers converted
    """
    members_list: Set[str] = capture_string_csv(question)
    # Use set comprehension to convert members to integers
    return {int(x) for x in members_list}
