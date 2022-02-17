# Demonstrate basic maths operations
print("Addition {}".format(45 + 56))
print("Subtraction {}".format(65 - 19))
print("Multiplication {}".format(3 * 6))
print("Division {}".format(56 / 8))


# This function shows use of Floor and Modules combined
def calculate_floor_and_modulus(t_numerator: int, t_denominator: int) -> (int, int):
    t_floor: int = t_numerator // t_denominator
    t_mod: int = t_numerator % t_denominator
    return t_floor, t_mod


numerator: int = 46
denominator: int = 7
(floor, mod) = calculate_floor_and_modulus(numerator, denominator)
print("Dividing {} by {} yields floor={}, modules={}".format(numerator, denominator, floor, mod))
