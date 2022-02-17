# Shows use of the maths library
import math

# Exponentiation with operator
print("Exponentiation with Operator (power / index) {}".format(2 ** 4))

# This is the same operation, but using the maths library
print("Exponentation with Math Library {}".format(math.pow(2, 4)))

# Taking a square root requires the maths library, no operator for this
print("Taking a square root {}".format(math.sqrt(36)))

# Show long decimal print
print("Show Rounding using math.round")
print("Recurring Decimal {}".format(1 / 3))
print("Rounding Same Calculation to 2d.p {}".format(round(1 / 3, 2)))

print("Show Rounding using String Formatting")
print("Recurring Decimal {}".format(5 / 6))
print("Rounding with string format {0:.2f}".format(5 / 6))

# Show truncation
print("Full recurring decimal {}".format(7 / 9))
print("Full recurring decimal {}".format(str(7 / 9)[:4]))
