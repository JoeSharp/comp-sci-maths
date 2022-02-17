from typing import Callable, List

# Defines the function type we are using
LogicalOperator = Callable[[List[bool]], bool]


# General Purpose Function for Generating a truth table
def truth_table(name: str,
                input_values: List[List[bool]],
                operator: LogicalOperator) -> None:
    print(name)

    number_inputs: int = len(input_values)
    number_input_combinations: int = len(input_values[0])
    for i in range(number_input_combinations):
        this_input_values = []
        for j in range(number_inputs):
            this_input_value: bool = input_values[j][i]
            print("[{}]".format(int(this_input_value)), end="")
            this_input_values.append(this_input_value)
        output_value: bool = operator(this_input_values)
        print("=[{}]".format(int(output_value)))


INPUT_A: List[bool] = [False, False, True, True]
INPUT_B: List[bool] = [False, True, False, True]


truth_table("NOT", [INPUT_A], lambda inputs: not inputs[0])
truth_table("AND", [INPUT_A, INPUT_B], lambda inputs: inputs[0] and inputs[1])
truth_table("NAND", [INPUT_A, INPUT_B], lambda inputs: not (inputs[0] and inputs[1]))
truth_table("OR", [INPUT_A, INPUT_B], lambda inputs: inputs[0] or inputs[1])
truth_table("NOR", [INPUT_A, INPUT_B], lambda inputs: not(inputs[0] or inputs[1]))
truth_table("XOR", [INPUT_A, INPUT_B],
            lambda inputs: (inputs[0] and not inputs[1]) or (not inputs[0] and inputs[1]))
