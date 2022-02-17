# Demonstrate type casting and limits of string concatenation
my_integer: int = int(input("Please enter an integer: "))
my_float: float = float(input("Please enter a floating point number: "))

# Show different ways of composing string
# Notice that the format method doesn't require casting
print("My Integer is " + str(my_integer))
print("My Integer is {}".format(my_integer))

print("My Float is " + str(my_float))
print("My Float is {}".format(my_float))

