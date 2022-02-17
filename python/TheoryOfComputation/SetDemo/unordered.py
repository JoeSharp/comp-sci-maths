from typing import Set

weekdays: Set[str] = {w for w in ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']}

print("Printing Weekdays, Could be any order")
for w in weekdays:
    print(w)
