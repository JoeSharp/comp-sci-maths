from typing import Set

even_numbers: Set[int] = {n for n in range(20) if (n % 2 == 0)}

print("Even Numbers: {}".format(",".join([str(i) for i in even_numbers]
                                         )))
