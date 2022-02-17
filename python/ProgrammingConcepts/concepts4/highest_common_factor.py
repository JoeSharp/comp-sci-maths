from Programming.concepts4.utils.utils import check_number


def highest_common_factor(x: int, y: int) -> int:
    print("{}\t{}".format(x, y))
    if y == 0:
        return x
    else:
        return highest_common_factor(y, x % y)


user_num_1_str: str = input("Please type the first number to find Highest Common Factor: ")
user_num_1: int = check_number(user_num_1_str)

user_num_2_str: str = input("And the other one? ")
user_num_2: int = check_number(user_num_2_str)

print("Calculating HCF between {} and {}".format(user_num_1, user_num_2))
hcf = highest_common_factor(user_num_1, user_num_2)
print("The Highest Common Factor Between {} and {} is {}".format(user_num_1, user_num_2, hcf))
