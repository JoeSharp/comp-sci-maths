from Programming.concepts4.utils.utils import check_number


def get_fibonacci_at_index(index: int) -> int:
    if index == 0:
        return 1
    elif index == 1:
        return 1
    else:
        return get_fibonacci_at_index(index - 1) + get_fibonacci_at_index(index - 2)


user_num_as_str: str = input("Which Fibonacci number would you like? ")
user_number: int = check_number(user_num_as_str)

if user_number is not None and user_number > 0:
    fib: int = get_fibonacci_at_index(user_number)
    print("Calculating Fibonacci Number {} = {}".format(user_number, fib))
else:
    print("Your selection was invalid '{}'".format(user_num_as_str))

