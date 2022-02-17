from typing import List

# Declare all the note names in a list that we can rotate through
NOTE_NAMES: List[str] = ["C", "C#/Db", "D", "D#/Eb", "E", "F", "F#/Gb", "G", "G#/Ab", "A", "A#/Bb", "B"]

# Do, Ra, Mi, Fah, So, Lah, Ti, Do
MAJOR_SCALE_OFFSET: List[int] = [0, 2, 4, 5, 7, 9, 11, 12]


def capture_user_note() -> str:
    """
    Capture the note that user wishes to see the scale for, it will loop until a valid selection is made.
    :return: Name of the note as a string, it will be one of the notes in NOTE_NAMES
    """
    user_note: str = NOTE_NAMES[0]
    while True:
        print("The Known Musical Notes are")
        for n in NOTE_NAMES:
            print("\t{}".format(n), end = " ")
        print("")
        user_note = input("Please type in your selection: ")
        if user_note in NOTE_NAMES:
            print("Thanks")
            break
        else:
            print("Invalid selection, have another go")
    return user_note


def get_major_scale_notes(starting_note: str) -> List[str]:
    notes: List[str] = []
    # Find the starting note, defaults to C if the given note is invalid
    starting_index: int = 0
    try:
        starting_index: int = NOTE_NAMES.index(starting_note)
    except ValueError:
        print("Invalid note given '{}'".format(starting_note))

    for relative_offset in MAJOR_SCALE_OFFSET:
        offset_index: int = (starting_index + relative_offset) % len(NOTE_NAMES)
        notes.append(NOTE_NAMES[offset_index])

    return notes


my_note: str = capture_user_note()
major_scale = get_major_scale_notes(my_note)
print("{} Major is {}".format(my_note, major_scale))

invalid_major_scale = get_major_scale_notes("fish")
print("Fish Major? {}".format(invalid_major_scale))
