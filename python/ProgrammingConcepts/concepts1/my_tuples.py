from typing import List
from collections import namedtuple

NameAndScore = namedtuple("nameAndScore", "name score")


def get_name_and_score(raw_csv: str) -> NameAndScore:
    parts: List[str] = raw_csv.split(",")
    name: str = parts[0]
    score: int = int(parts[1])
    return NameAndScore(name, score)


answer = get_name_and_score("Lucy,50")
print("The Name is {} with a score of {}".format(answer.name, answer.score))


# Parses a CSV such as 'Fred,10' into a tuple containing the name and the score
def get_name_and_sagain(raw_csv: str) -> (str, int):
    parts: List[str] = raw_csv.split(",")
    name: str = parts[0]
    score: int = int(parts[1])
    return name, score


name1, score1 = get_name_and_sagain("Fred,45")
print("1 - Name is {} and Score is {}".format(name1, score1))

nameScore2 = get_name_and_sagain("Sally,104")
print("2 - Name is {} and Score is {}".format(nameScore2[0], nameScore2[1]))


def get_floor_and_mod(a: int, b: int) -> (int, int):
    return a // b, a % b


print(get_floor_and_mod(77, 13))