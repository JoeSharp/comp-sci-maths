from math import pi


def calculate_area_circle(radius: float) -> float:
    """Return circle area
    This is a function that calculates the area of a circle and returns it
    """
    return pi * radius ** 2


def print_circle_details(radius_and_area: (float, float)):
    """
    This is a procedure that prints a value, and doesn't return anything
    """
    print("The circle with radius {} has an area {}"
          .format(radius_and_area[0], radius_and_area[1]))


my_radius: float = 10.0
my_area: float = calculate_area_circle(my_radius)
print_circle_details((my_radius, my_area))

