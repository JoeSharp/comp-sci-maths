from typing import List, Optional, Dict, Tuple, Set

from TheoryOfComputation.FiniteStateMachine.FiniteStateMachine import FiniteStateMachine
from TheoryOfComputation.FiniteStateMachine.TuringMachine import Direction, TuringTransition


# These are the conversions from the strings to enumerated directions
directions: Dict[str, Direction] = {
    ">": Direction.MOVE_RIGHT,
    "<": Direction.MOVE_LEFT,
    "-": Direction.NO_MOVE
}


def get_alphabet_value(raw: str) -> Optional[str]:
    """

    :param raw: The raw string from the definition
    :return: Either that string, or None if the special None character seen
    """
    return raw if raw != "_" else None


def parse_turing_machine(definition: List[str]) -> FiniteStateMachine[str, str, TuringTransition]:
    """"
    This function parses Turing Machine Definitions from
    https://turingmachinesimulator.com/
    :param definition: The definition as a list of strings
    :return: The FSM Config for this Turing Machine
    """

    # Keep track of all the rules we see
    rules: List[Tuple[Tuple[str, str], Tuple[str, str, Direction]]] = []
    
    # Keep track of all the states we see
    all_states: Set[str] = set()
    
    # Keep track of all the alphabet characters we see
    alphabet: Set[str] = {None}

    # Input state and transition are defined on separate lines
    # so keep track of 'unclosed' input states
    temp_input_state: Optional[Tuple[str, str]] = None

    # Global configuration items for the machine
    name: Optional[str] = None
    start_state: Optional[str] = None
    accept: Optional[str] = None

    # Work through each line, strip any white space from either end (newlines etc)
    for line in [l.strip() for l in definition]:
        if line.startswith("//"):
            # Skip comments
            continue

        # Parse out any of the globals
        if line.startswith("name: "):
            name = line.replace("name: ", "")
        elif line.startswith("init: "):
            start_state = line.replace("init: ", "")
        elif line.startswith("accept: "):
            accept = line.replace("accept: ", "")
        elif len(line) > 0:
            # A non empty line
            parts: List[str] = line.split(",")
            if temp_input_state is not None:
                # Should be in format state,value,move e.g. "halve,0,<"
                if len(parts) == 3:
                    next_state: str = parts[0]
                    write_value: str = get_alphabet_value(parts[1])
                    direction: Direction = directions[parts[2]]
                    rules.append((temp_input_state, (next_state, write_value, direction)))
                    temp_input_state = None
                    all_states.add(next_state)
                    alphabet.add(write_value)
                else:
                    raise Exception("Unexpected transition info format {}".format(parts))
            else:
                # Should be in format state,value e.g. "halve,0"
                if len(parts) == 2:
                    current_state: str = parts[0]
                    read_value: str = get_alphabet_value(parts[1])
                    temp_input_state = current_state, read_value
                    all_states.add(current_state)
                    alphabet.add(read_value)
                else:
                    raise Exception("Unexpected start_state format {}".format(parts))

    # Validate the global configuration items
    if name is None:
        raise Exception("Name Missing")
    if start_state is None:
        raise Exception("Initial State Missing")
    if accept is None:
        raise Exception("Accept State Missing")
    if temp_input_state is not None:
        raise Exception("Unfinished start state: {}".format(temp_input_state))

    # Build the Config with the global attributes
    # and accumulated knowledge of alphabet and states
    fsm: FiniteStateMachine = FiniteStateMachine(
        start_state=start_state,
        all_states=all_states,
        alphabet=alphabet,
        is_complete=False,
        valid_end_states={accept}
    )

    # Work through adding all the rules
    for rule in rules:
        fsm.with_transition(rule[0][0], rule[0][1], rule[1][0], (rule[1][1], rule[1][2]))

    return fsm
