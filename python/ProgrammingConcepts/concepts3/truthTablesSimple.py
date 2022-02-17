def print_logical_and_entry(first, second):
    print("{:d} AND {:d} = {:d}".format(first, second, first and second))


print("Logical AND")
print_logical_and_entry(True, True)
print_logical_and_entry(True, False)
print_logical_and_entry(False, False)
print_logical_and_entry(False, True)
