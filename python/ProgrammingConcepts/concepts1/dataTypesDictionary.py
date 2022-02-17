from typing import Dict

scoresByName: Dict[str, int] = {
    "Joe": 102,
    "Steve": 45,
    "Hannah": 345
}

for name, score in scoresByName.items():
    print("Player {} scored {} points".format(name, score))

