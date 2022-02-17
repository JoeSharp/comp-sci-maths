from typing import List
from random import choice

COIN_CHOICES: List[str] = ["HEADS", "TAILS"]


def get_user_choice(available_choices: List[str]) -> str:
    while True:
        print("Choose one of the following")
        for c in available_choices:
            print("\t{}".format(c))
        user_prediction: str = input("Please make your choice: ")

        if user_prediction in COIN_CHOICES:
            return user_prediction
        else:
            print("Invalid choice, try again")


def play_game() -> None:
    print("Toss a coin VS the computer")
    actual_value: str = choice(COIN_CHOICES)
    user_prediction: str = get_user_choice(COIN_CHOICES)
    if actual_value == user_prediction:
        print("You correctly predicted {}".format(actual_value))
    else:
        print("Incorrect, the coin was {}".format(actual_value))


play_game()
