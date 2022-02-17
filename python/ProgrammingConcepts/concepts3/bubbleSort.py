from typing import List
from random import randint


def bubble_sort(input_list: List[int]) -> List[int]:
    sorted_list: List[int] = [d for d in input_list]

    for top in range(len(sorted_list), 1, -1):
        for current in range(0, top - 1):
            if sorted_list[current] > sorted_list[current + 1]:
                swap: int = sorted_list[current]
                sorted_list[current] = sorted_list[current + 1]
                sorted_list[current + 1] = swap

    return sorted_list


# Generate 20 random numbers and append them to this list
numbers_to_sort: List[int] = []
for i in range(20):
    numbers_to_sort.append(randint(1, 100))

sorted_numbers = bubble_sort(numbers_to_sort)

# Print everything out so the user can see it worked
print("Random Unsorted Numbers: {}".format(numbers_to_sort))
print("After Sorting: {}".format(sorted_numbers))

