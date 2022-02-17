from math import sin, cos, pi


def convert_polar_to_cartesian(magnitude: float, angle: float) -> (float, float):
    """
    This function accepts a magnitude and angle (in radians)
    It returns a value (a Tuple containing x,y coordinates)
    """
    x: float = magnitude * sin(angle)
    y: float = magnitude * cos(angle)

    return x, y


def print_coordinate(name: str, coord: (float, float)):
    """
    This is a procedure that prints a coordinate, it doesn't return anything
    """
    print("Coordinate {} is x: {:0.2f}, y: {:0.2f}".format(name, coord[0], coord[1]))


coord1: (float, float) = convert_polar_to_cartesian(50, pi / 4)
coord2: (float, float) = convert_polar_to_cartesian(100, 2 * pi / 3)

print_coordinate("First", coord1)
print_coordinate("Second", coord2)

