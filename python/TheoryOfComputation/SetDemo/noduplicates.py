from typing import Set

hobbits: Set[str] = {w for w in ['Frodo', 'Bilbo', 'Bilbo', 'Sam', 'Frodo', 'Sam', 'Sam', 'Bilbo']}

print("Printing Hobbits, Should only be one of each")
for h in hobbits:
    print(h)
