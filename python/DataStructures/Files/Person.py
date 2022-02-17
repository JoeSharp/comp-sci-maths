class Person:
    name: str
    age: int
    favourite_colour: str

    def __init__(self, name: str, age: int, favourite_colour: str):
        self.name = name
        self.age = age
        self.favourite_colour = favourite_colour

    def to_csv(self) -> str:
        return "{},{},{}\n".format(self.name, self.age, self.favourite_colour)
