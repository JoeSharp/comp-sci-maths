from abc import ABC, abstractmethod


class Animal(ABC):
    def __init__(self, species):
        self.species = species

    def get_species(self):
        return self.species

    @abstractmethod
    def speak(self):
        pass

    def __str__(self):
        return f"Animal {self.species}"

    @staticmethod
    def do_something():
        return "What"


class Dog(Animal):
    def __init__(self):
        super().__init__('Dog')

    def speak(self):
        print("Woof")


class Cat(Animal):
    def __init__(self):
        super().__init__('Cat')

    def speak(self):
        print("Miaow")


myDog = Dog()
print(myDog)
myDog.speak()

myCat = Cat()
print(myCat)
myCat.speak()
