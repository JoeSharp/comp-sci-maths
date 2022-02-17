from typing import Set, Tuple
from TheoryOfComputation.SetDemo.capture_csv import capture_string_csv
from TheoryOfComputation.SetDemo.get_cartesian_product import get_cartesian_product

first: Set[str] = capture_string_csv('Please type the first set')
second: Set[str] = capture_string_csv('Please type the second set')
c_product: Set[Tuple[str, str]] = get_cartesian_product(first, second)

print("Cartesian Product of {} and {}: \n\t{}".format(
    first,
    second,
    "\n\t".join([str(x) for x in c_product])
))
