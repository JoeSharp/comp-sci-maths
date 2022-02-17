# Demonstrate string slicing
single_word: str = "Mathematical"
first_bit: str = single_word[:4]
last_bit: str = single_word[4:]
middle_bit: str = single_word[3:8]

print("Breaking up the word {} into First: {}, Middle: {}, Last: {}".format(
    single_word, first_bit, middle_bit, last_bit))

