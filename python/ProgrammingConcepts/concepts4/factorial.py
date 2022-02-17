from Programming.concepts4.utils.utils import check_number


def factorial(the_number: int) -> int:
    if the_number == 1:
        return 1
    else:
        return the_number * factorial(the_number - 1)


user_num_as_str: str = input("Calculate Factorial of what? ")
user_number: int = check_number(user_num_as_str)

if user_number is not None and user_number > 0:
    fact: int = factorial(user_number)
    print("{}! = {}".format(user_number, fact))
else:
    print("Invalid Input '{}'".format(user_num_as_str))

