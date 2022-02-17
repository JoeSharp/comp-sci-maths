from typing import List

noughts_crosses: List[List[str]] = [['X', 'X', 'O'],
                                    ['O', 'X', 'O'],
                                    ['X', 'O', 'X']]


ground_height: List[List[int]] = [[45, 50, 55, 49],
                                  [51, 58, 56, 47],
                                  [52, 59, 60, 30]]

row: int = 1
col: int = 2
print("The ground height at {}, {} is {}".format(row, col, ground_height[row][col]))

for row_data in ground_height:
    for cell_value in row_data:
        print(cell_value, end=", ")
