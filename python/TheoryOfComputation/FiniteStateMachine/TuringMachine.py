from __future__ import annotations
from typing import Generic, Optional, List, Tuple, Callable
from enum import Enum
from TheoryOfComputation.FiniteStateMachine.FiniteStateMachine import FiniteStateMachine, Alphabet, State


class Direction(Enum):
    NO_MOVE = 0,
    MOVE_LEFT = 1,
    MOVE_RIGHT = 2

    def __repr__(self):
        if self is Direction.NO_MOVE:
            return "_"
        elif self is Direction.MOVE_LEFT:
            return "<"
        elif self is Direction.MOVE_RIGHT:
            return ">"
        else:
            return "X"


TuringTransition = Tuple[Alphabet, Direction]


class TuringMachine(Generic[State, Alphabet]):
    """
    An instance of this class is created to process a given starting state
    """
    __machine: FiniteStateMachine[State, Alphabet, TuringTransition]  # The machine that governs our behaviour
    __state: State  # The current state of this instance
    __data: List[Optional[Alphabet]]
    __index: int

    def __init__(self,
                 machine: FiniteStateMachine[State, Alphabet, TuringTransition],
                 initial_data: List[Alphabet],
                 starting_index: int = 0):
        self.__machine = machine
        self.__state = machine.get_start_state()
        self.__data = initial_data
        self.__index = starting_index

        # Make sure we have filled out the data to cover up to the index
        while self.__index > (len(self.__data) - 1):
            self.__data.append(None)

    def __repr__(self):
        return "State: {}, Data[{}]: {}".format(self.__state, self.__index, self.__data)

    def process(self,
                max_iterations: int = 1000,
                callback: Callable[[TuringMachine], None] = lambda x: None) -> Tuple[List[Alphabet], bool, int]:
        """
        Kick off the processing of the data.
        :param max_iterations: A limit to the number of allowed iterations, just in case
        :param callback: A callback for every iteration, allows the owner to observe the state at each stage
        """
        # Control the number of iterations
        iterations: int = 0
        while True:
            # Give the owner the visibility of the iteration
            callback(self)
            # If we take too many iterations, raise Exception
            iterations += 1
            if iterations > max_iterations:
                raise Exception("Too many iterations, max was {}".format(max_iterations))

            # Get the value of the data at the current index
            current_input: Alphabet = self.__data[self.__index]

            # Lookup the next transition information
            next_tuple: Tuple[State, Tuple[Alphabet, Direction]] = \
                self.__machine.get_transition_info(self.__state, current_input)

            # If we do not have any transition information for this state/data value
            # Return an indication of the validity of the current state
            if next_tuple is None:
                return self.__data, self.__machine.is_valid_end_state(self.__state), iterations

            # Pull out the various aspects of the transition information from the tuples
            next_state: State = next_tuple[0]
            to_write: Alphabet = next_tuple[1][0]
            direction: Direction = next_tuple[1][1]

            # If the next state is a valid end state, bail out
            if self.__machine.is_valid_end_state(next_state):
                return self.__data, True, iterations
            else:
                # Write the appropriate value to our data at the current index
                self.__data[self.__index] = to_write

                # Move the state on according the transition
                self.__state = next_state

                # Move the index according the the direction indicated by the transition info
                if direction is Direction.MOVE_LEFT:
                    if self.__index == 0:
                        # If we are moving left and already at the beginning, just pad the start with 'None'
                        self.__data.insert(0, None)
                    else:
                        # Otherwise just shove the index left
                        self.__index -= 1
                elif direction is Direction.MOVE_RIGHT:
                    # Move onto the next item, moving right
                    self.__index += 1
                    # If we have run out of data, append None
                    if self.__index == len(self.__data):
                        self.__data.append(None)




