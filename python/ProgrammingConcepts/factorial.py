def factorial(a: int) -> int:
    """
    Calculate the factorial of the input number.
    :param a: The number to use to calculate the factorial
    :return: The calculated factorial
    """
    if a < 1:
        raise Exception("Must be positive integer")
    if not isinstance(a, int):
        raise Exception("Must be number")
    answer: int = 1
    for x in range(a, 1, -1):
        answer *= x
    return answer
