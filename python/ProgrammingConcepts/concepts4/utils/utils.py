from typing import Optional


def check_number(user_entered_number: str) -> Optional[int]:
    try:
        as_number = int(user_entered_number)
        return as_number
    except ValueError:
        return None
