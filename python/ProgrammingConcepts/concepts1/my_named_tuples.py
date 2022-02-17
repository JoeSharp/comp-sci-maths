from collections import namedtuple

coordinates = namedtuple('cartesion', 'x y');

coord1 = coordinates(10, 5)

print(coord1)

print(coord1.x)