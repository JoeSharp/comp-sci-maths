from __future__ import annotations
from typing import Set, Dict, Generic, TypeVar, Tuple, Optional

State = TypeVar('State')
Alphabet = TypeVar('Alphabet')
Transition = TypeVar('Transition')
TransitionInfo = Tuple[State, Transition]
TransitionsByInputChar = Dict[Alphabet, TransitionInfo]


class FiniteStateMachine(Generic[State, Alphabet, Transition]):
    """
    Encapsulates the rules of a given state machine. Once the rules are established
    machine runners can be created to process inputs.
    State = The data type for the states
    Alphabet = The data type for the alphabet
    Transition = The data type for any additional transition info
    """
    __start_state: State  # the start state of a new instance of the machine
    __all_states: Set[State]  # All the known states for the machine
    __valid_end_states: Set[State]  # All the valid end states for the machine
    __alphabet: Set[Alphabet]  # The set of know input characters
    __is_complete: bool  # Indicates if the machine should be complete

    # The registry of all the transition rules, keyed by start state, sub key by input char
    __transitions: Dict[State, TransitionsByInputChar]

    def __init__(self,
                 start_state: State,
                 all_states: Set[State],
                 alphabet: Set[Alphabet],
                 is_complete: bool,
                 valid_end_states=None):
        # Validate that the start state is within the known states
        if start_state not in all_states:
            raise Exception("Start state not included in all states")

        # Validate that the end states are a subset of all the known states
        if valid_end_states is None:
            valid_end_states = set()
        if not valid_end_states.issubset(all_states):
            raise Exception("Valid end states {} is not a subset of all states {}".format(
                valid_end_states,
                all_states
            ))

        # Remember all the rules for this FSM
        self.__start_state = start_state
        self.__all_states = all_states
        self.__valid_end_states = valid_end_states
        self.__alphabet = alphabet
        self.__transitions = dict()
        self.__is_complete = is_complete

    def __repr__(self):
        transitions_str: str = ""
        for from_state, transitions in self.__transitions.items():
            for input_char, transition in transitions.items():
                transitions_str += "\n\t{}, {} -> {}".format(from_state, input_char, transition)

        return "FSM\n\tStates: {}\n\tStart: {}\n\tValid Ends: {}\n\tAlphabet: {}\n\tTransitions: {}".format(
            self.__all_states,
            self.__start_state,
            self.__valid_end_states,
            self.__alphabet,
            transitions_str
        )

    def with_transition(self,
                        start_state: State,
                        input_char: Alphabet,
                        end_state: State,
                        transition_info: Optional[Transition] = None) -> FiniteStateMachine:
        """
        Register transition rules with this Finite State Machine.
        All of the rules should be registered before runners are created and used.
        :param start_state: The start state for the transition being defined
        :param input_char: The alphabet character to look for
        :param end_state: The end state for the transition being defined
        :param transition_info: Additional information about the transition, used for Mealy Machines and Turing Machines
        :return: Instance of self, so we can use method chaining
        """
        # Validate the start and end states against the list of known states
        if not {start_state, end_state}.issubset(self.__all_states):
            raise Exception("One of states {}, {} not in set of known states {}".format(
                start_state,
                end_state,
                self.__all_states
            ))
        # Validate the input character against the alphabet
        if input_char not in self.__alphabet:
            raise Exception("Input Char {} not in alphabet {}".format(
                input_char,
                self.__alphabet
            ))
        # Create storage for transitions from this state if it doesn't already exist
        if start_state not in self.__transitions:
            self.__transitions[start_state] = dict()

        # Retrieve the transition rules for this start state
        transitions: Dict[Alphabet] = self.__transitions[start_state]

        # Validate that we do not already have a rule defined for this input char
        if input_char in transitions:
            raise Exception("Transition already defined for state {} alphabet {}, it is {}".format(
                start_state,
                input_char,
                transitions[input_char]
            ))

        # Register the end state for this combination
        transitions[input_char] = (end_state, transition_info)

        return self

    def get_start_state(self) -> str:
        """
        Getter for the start state of any new instance of the machine
        :return: The start state
        """
        return self.__start_state

    def get_transition_info(self,
                            start_state: State,
                            input_char: Alphabet) -> Optional[Tuple[State, Transition]]:
        """
        Given a start state and input character, this calculates the next tuple from our state transitions.

        :param start_state: The starting state for this transition
        :param input_char: The character to process
        :return: The tuple containing the next state and next output value
        :raise Exception:
            If the start state is not in list of known states
            If the input_char is not in the alphabet
            If there are no transitions defined for this start_state
            If there is no transition defined for this specific start_state/input_char combination
        """
        # Validate the start state is within all the known states
        if start_state not in self.__all_states:
            raise Exception("State {} not in list of known states {}".format(
                start_state,
                self.__all_states
            ))

        # Validate that the input character is within the alphabet
        if input_char not in self.__alphabet:
            raise Exception("Input Character {} not in alphabet {}".format(
                input_char,
                self.__alphabet
            ))

        # Validate that we have transitions defined for this start state
        if start_state not in self.__transitions:
            if self.__is_complete:
                raise Exception("No transitions defined for {}".format(start_state))
            else:
                return None

        # Locate those transitions
        transitions: Dict[State, Tuple[State, Alphabet]] = self.__transitions[start_state]

        # Validate that we have a transition rule defined for this specific input char
        if input_char not in transitions:
            if self.__is_complete:
                raise Exception("No transition defined for {} with character {}".format(
                    start_state,
                    input_char
                ))
            else:
                return None

        # Return the new state, just return the
        return transitions[input_char]

    def is_valid_end_state(self, state: State):
        """
        Validate a state against the list of valid end states.
        :param state: The state to validate
        :return: Boolean to indicate if the given state is in the valid list
        :raise Exception: If the state given is not even in the list of known states
        """
        if state not in self.__all_states:
            raise Exception("State for validating {} is not even in the known list of states {}".format(
                state,
                self.__all_states))
        return state in self.__valid_end_states

