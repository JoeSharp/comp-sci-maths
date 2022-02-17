from random import choice
from typing import List, Optional

# This is a game that demonstrates the Monty Hall Problem
# https://www.montyhallproblem.com/

doors: List[str] = ['DOOR 1', 'DOOR 2', 'DOOR 3']
door_with_prize: str = choice(doors)
doors_without_prize: List[str] = [d for d in doors if d != door_with_prize]

user_choice: Optional[str] = None

# Pick a door in a loop (loop until valid choice made)
while True:
    print("Please type the name of the door you wish to open, choices are")
    for d in doors:
        print("\t * {}".format(d))

    user_choice = input("Enter name of door: ")

    if user_choice in doors:
        print("Thank You")
        break
    else:
        print("Invalid choice")

# The host now picks a door to open, it has to be one without a prize
host_opened_door: str = next(d for d in doors_without_prize if d != user_choice)
unopened_unchosen_door: str = next(d for d in doors if d != user_choice and d != host_opened_door)

print("You chose {}, The host has shown you that nothing is behind door {}".format(user_choice, host_opened_door))

switch_choice: str = input("Would you like to switch door to {}? (Y/N): ".format(unopened_unchosen_door))

if switch_choice == 'Y':
    user_choice = unopened_unchosen_door
    print("You switched doors to {}".format(user_choice))
else:
    print("I'll take that as a no, your choice remains {}".format(user_choice))

if user_choice == door_with_prize:
    print("You won! The prize was behind {}".format(door_with_prize))
else:
    print("I'm afraid you lost, the prize was in fact behind {}".format(door_with_prize))