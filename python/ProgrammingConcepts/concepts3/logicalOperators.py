# This code demonstrates the use of all the logical operators
PRIMARY_EDUCATION_START_AGE: int = 5
SECONDARY_EDUCATION_START_AGE: int = 11
COMPULSORY_EDUCATION_AGE: int = 18
DRIVING_TEST_MIN_AGE = 17
TEENAGER_FIRST_YEAR: int = 13
TEENAGER_LAST_YEAR: int = 19
CONSIDERED_MATURE_STUDENT: int = 30
DOUBLE_FIGURES: int = 10
COOLEST_AGE: int = 21

age = int(input("Enter Your Age: "))

# Less Than
print("Education Age Range:")
if age < PRIMARY_EDUCATION_START_AGE:
    print("You haven't started school yet")
elif age < SECONDARY_EDUCATION_START_AGE:
    print("You are in Primary School")
elif age < COMPULSORY_EDUCATION_AGE:
    print("You must be in Secondary Education")
# Greater than
elif age > CONSIDERED_MATURE_STUDENT:
    print("You would be considered a mature student")

# Greater than or equal to, Less than or Equal to (with bonus AND)
if age >= TEENAGER_FIRST_YEAR and age <= TEENAGER_LAST_YEAR:
    print("You are a teenager")

# Greater than or equal to
if age >= DRIVING_TEST_MIN_AGE:
    print("You are old enough to learn to drive")

# Equal
if age == DOUBLE_FIGURES:
    print("You hit double figures this year!")

if age != COOLEST_AGE:
    print("Alas, you are not the coolest age")