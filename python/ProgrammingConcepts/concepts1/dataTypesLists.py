from typing import List

players: List[str] = ["Joe", "Steve", "Lucy"]

for p in players:
    print("Player {}".format(p))

playingGrid: List[List[str]] = [
    [" ", "X", " "],
    [" ", "X", "O"],
    [" ", "O", " "]
]

for row in playingGrid:
    print("[", end="")
    for column in row:
        print(column, end="")
    print("]")

