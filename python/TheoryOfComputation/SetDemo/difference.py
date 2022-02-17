from typing import Set
from TheoryOfComputation.SetDemo.capture_csv import capture_string_csv

first: Set[str] = capture_string_csv('Please type the first list')
second: Set[str] = capture_string_csv('Please type the second subset')
first_diff_second: Set[str] = first.difference(second)
second_diff_first: Set[str] = second.difference(first)
symetric_diff: Set[str] = first.symmetric_difference(second)

print("Difference of \n\t{} and \n\t{}".format(first, second))
print("First Diff Second:{}".format(first_diff_second))
print("Second Diff First:{}".format(second_diff_first))
print("Symmetric Diff:{}".format(symetric_diff))

