# Demonstate the converstion to and from ASCII numerical representation
from typing import List

my_name: str = "Joe"
my_name_ASCII: List[int] = []

# Construct the ASCII array
for c in my_name:
    my_name_ASCII.append(ord(c))

# Print the ASCII array, hex code then converted back char
for a in my_name_ASCII:
    print("ASCII code {:02x} - {}".format(a, chr(a)))

