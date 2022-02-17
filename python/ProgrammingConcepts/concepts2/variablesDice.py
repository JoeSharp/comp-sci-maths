import random
from typing import List

# This is a constant, by convention constants use upper case
# Python does not provide a means of officially making something constant
NUMBER_OF_ROLLS: int = 100

# This is a constant List that contains the
SIDES_OF_DICE: List[int] = list(range(1, 7))

# Declare a variable to count number of sixes rolled, type integer, set to zero.
numberOfSixes: int = 0

for roll in range(NUMBER_OF_ROLLS):
    thisRoll = random.choice(SIDES_OF_DICE)
    if thisRoll == 6:
        numberOfSixes += 1

# Print the sides of the dice so we can see the correct options were created
print("The Dice has the following sides {}".format(SIDES_OF_DICE))

# Print the number of sixes rolled, and total number of rolls
print("{} sixes were rolled out of {} rolls".format(numberOfSixes, NUMBER_OF_ROLLS))

