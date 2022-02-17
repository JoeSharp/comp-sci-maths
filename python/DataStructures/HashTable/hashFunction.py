def hash_function(to_hash: str, max_range: int) -> int:
    the_hash: int = 103
    for i in to_hash:
        the_hash = (the_hash + ord(i)) % max_range
    return the_hash
