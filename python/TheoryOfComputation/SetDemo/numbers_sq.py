from typing import Set
from TheoryOfComputation.SetDemo.capture_csv import capture_integer_csv

numbers: Set[int] = capture_integer_csv('Please type numbers to square')
numbers_sq: Set[str] = {x**2 for x in numbers}

print("Members of Set: {} -> {}".format(numbers, numbers_sq))

