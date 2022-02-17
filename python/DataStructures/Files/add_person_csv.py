from DataStructures.Files.Person import Person
import sys

if len(sys.argv) != 2:
    raise Exception("Invalid arguments {}, must provide filename".format(sys.argv))


database_filename: str = sys.argv[1]
print("Add a new person to the database in {}".format(database_filename))
name: str = input("Enter Name: ")
age: int = int(input("Enter Age: "))
favourite_colour: str = input("Enter Favourite Colour: ")

person: Person = Person(name, age, favourite_colour)

f = open(database_filename, "a")
f.write(person.to_csv())
f.close()
