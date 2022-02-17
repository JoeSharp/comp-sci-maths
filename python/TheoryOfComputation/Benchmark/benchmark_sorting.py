import time
from random import randint
from typing import List, Callable

from TheoryOfComputation.Benchmark.TickPrinter import TickPrinter
from Algorithms.Sorting.bubble_sort import bubble_sort
from Algorithms.Sorting.merge_sort import merge_sort
from Algorithms.Sorting.common import primitive_compare, SortFunction


def generate_benchmark_csv(filename: str,
                           list_size_range: range,
                           tick: Callable[[], None]) -> None:
    """
    Run timed sorting algorithms, outputting results to a CSV.
    :param filename: The filename to write the CSV to
    :param list_size_range: The range of list sizes to use
    :param tick: A function to receive keep alive ticks from the process after every sort
    :return: None
    """
    sort_functions: List[SortFunction] = [bubble_sort, merge_sort]

    # Open the file
    with open(filename, 'w') as f:
        # Write the CSV header
        f.write("Count,{}\n".format(",".join([s.__name__ for s in sort_functions])))

        # For each list size in the given range
        for list_size in list_size_range:
            # Generate a random list of numbers, same list for both sort functions
            the_list: List[int] = [randint(0, 1000) for x in range(list_size)]
            times_taken: List[float] = []

            # For each sort function, take time at start, subtract from time at end
            for sort_function in sort_functions:
                start_time = time.process_time_ns()
                sort_function(the_list, primitive_compare)
                times_taken.append(time.process_time_ns() - start_time)
                tick()

            # Write entry into the CSV
            f.write("{},{}\n".format(list_size,",".join([str(f) for f in times_taken])))


tick_printer: TickPrinter = TickPrinter()
generate_benchmark_csv('sorting_benchmark.csv', range(250, 10000, 250), lambda: tick_printer.tick())
