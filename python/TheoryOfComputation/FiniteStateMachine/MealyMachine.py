from typing import Generic, Iterable, Callable, Tuple
from TheoryOfComputation.FiniteStateMachine.FiniteStateMachine import FiniteStateMachine, Alphabet, State


class MealyMachine(Generic[State, Alphabet]):
    """
    An instance of this class is created to process an input with a given state machine.
    It tracks the state as input is processed.
    """
    __machine: FiniteStateMachine[State, Alphabet, Alphabet]  # The machine that governs our behaviour
    __state: State  # The current state of this instance
    __output_callback: Callable[[Alphabet], None]  # The callback for output alphabet as received

    def __init__(self,
                 machine: FiniteStateMachine[State, Alphabet, Alphabet],
                 output_callback: Callable[[Alphabet], None]):
        self.__machine = machine
        self.__state = machine.get_start_state()
        self.__output_callback = output_callback

    def process(self, input_str: Iterable[Alphabet]) -> None:
        """
        Given an input, it puts each character through the machine,
        iterating the state according to the transition rules.
        This function can be called repeatedly, which should allow it to work with streaming inputs.
        :param input_str: The next portion of the input string
        """
        for c in input_str:
            next_tuple: Tuple[State, Alphabet] = self.__machine.get_transition_info(self.__state, c)
            self.__state = next_tuple[0]
            self.__output_callback(next_tuple[1])

    def get_state(self) -> str:
        return self.__state


