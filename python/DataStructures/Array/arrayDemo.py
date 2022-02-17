from typing import List

scores: List[int] = [76, 34, 56, 90, 44, 53]

print("Item [0] Zero is the First: {}".format(scores[0]))
print("Item [3] Three is the Fourth: {}".format(scores[3]))

print("Printing All Items in List")
for s in scores:
    print(s, end=", ")
print("")
