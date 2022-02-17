from typing import Set
from TheoryOfComputation.SetDemo.capture_csv import capture_string_csv

first: Set[str] = capture_string_csv('Please type the first list')
second: Set[str] = capture_string_csv('Please type the second subset')
union: Set[str] = first.union(second)

print("Union of \n{} and \n{}:\n\t{}".format(
    first,
    second,
    "\n\t".join([str(x) for x in union])
))

