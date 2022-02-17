"""
Validate user entry as a number, using exception handling to catch any error
"""
user_input_str: str = input('Enter a number please: ')
try:
    user_input_num: int = int(user_input_str)
    print("It seems that you entered a valid number: {}".format(user_input_num))
except ValueError:
    print("Apparently you did not enter a valid number: {}".format(user_input_str))

print("But the show must go on!")
