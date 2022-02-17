from typing import List
from random import randint

# Fixed Value
LOWER_BOUND: int = 0
UPPER_BOUND: int = 1000

# This is a 'Most Recent Holder'
sizeOfArrayStr: str = input('Please enter the size of the array to generate and sort: ')
sizeOfArray: int = int(sizeOfArrayStr)

# This is actually a 'Container' although the vidlearn doesn't mention these...
numbersToSort: List[int] = []

# These are both examples of 'Most Wanted Holder'
lowestNumber: int = UPPER_BOUND + 1
highestNumber: int = 0

# This is a gatherer
totalOfAllNumbers: int = 0

# i is a 'Stepper'
for i in range(sizeOfArray):
    newNumber: int = randint(LOWER_BOUND, UPPER_BOUND)
    if newNumber > highestNumber:
        highestNumber = newNumber
    if newNumber < lowestNumber:
        lowestNumber = newNumber
    totalOfAllNumbers += newNumber
    numbersToSort.append(newNumber)

print("Sorting {} numbers, the lowest is {} and highest is {}, sum is {}"
      .format(sizeOfArray, lowestNumber, highestNumber, totalOfAllNumbers))
print("Numbers to Sort = {}".format(numbersToSort))

# top and current are both 'steppers'
for top in range(sizeOfArray, 1, -1):
    for current in range(0, top-1):
        # This is a temporary variable
        needsSwapping: bool = numbersToSort[current] > numbersToSort[current + 1]

        if needsSwapping:
            swap: int = numbersToSort[current]
            numbersToSort[current] = numbersToSort[current + 1]
            numbersToSort[current + 1] = swap

print("Sorted Numbers = {}".format(numbersToSort))

