import random

numberOfRolls = 100
sidesOfDice = list(range(1, 7))

numberOfSixes = 0

for roll in range(numberOfRolls):
    thisRoll = random.choice(sidesOfDice)
    if thisRoll == 6:
        numberOfSixes += 1

print("The Dice has the following sides {}".format(sidesOfDice))

print("{} sixes were rolled out of {} rolls".format(numberOfSixes, numberOfRolls))

