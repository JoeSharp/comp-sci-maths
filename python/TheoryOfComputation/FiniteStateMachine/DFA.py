from typing import Generic, Iterable, Tuple
from TheoryOfComputation.FiniteStateMachine.FiniteStateMachine import FiniteStateMachine, Alphabet, State


class DFA(Generic[State, Alphabet]):
    """
    Behaves as a Deterministic Finite Automata given a state machine config
    """
    __machine: FiniteStateMachine[State, Alphabet, None]  # The machine that governs our behaviour
    __state: State  # The current state of this instance

    def __init__(self, machine: FiniteStateMachine[State, Alphabet, None]):
        self.__machine = machine;
        self.__state = machine.get_start_state()

    def process(self, input_str: Iterable[Alphabet]) -> bool:
        """
        Given an input, it puts each character through the machine,
        iterating the state according to the transition rules.
        This function can be called repeatedly, which should allow it to work with streaming inputs.
        :param input_str: The next portion of the input string
        :return: Returns bool to indicate if the state at the end of this input is still valid.
        """
        for c in input_str:
            next_tuple: Tuple[Alphabet, None] = self.__machine.get_transition_info(self.__state, c)
            self.__state = next_tuple[0]

        return self.is_valid_end_state()

    def get_state(self) -> str:
        return self.__state

    def is_valid_end_state(self) -> bool:
        return self.__machine.is_valid_end_state(self.__state)

