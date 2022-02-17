from typing import Set
from TheoryOfComputation.SetDemo.capture_csv import capture_string_csv

master: Set[str] = capture_string_csv('Please type the master list')
potential_subset: Set[str] = capture_string_csv('Please type the potential subset')

is_subset: bool = potential_subset.issubset(master)

print("Is {} a subset of {}? Answer: {}".format(
    potential_subset,
    master,
    "Yes" if is_subset else "No"
))
