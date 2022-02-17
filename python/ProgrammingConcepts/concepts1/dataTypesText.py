myName = "Joe"

# These two lines are equivalent
print("Hello " + myName)
print("Hello {}".format(myName))

mySecondInitial = 'S'

myAge = 35
print("I am {:04d} years old".format(myAge))

print('My name is {} of type {}'.format(myName, type(myName)))
print('My Second Initial is {} of type {}'.format(mySecondInitial, type(mySecondInitial)))

# Let's try with double quotes to see if it's equivalent.
myOtherName = "RatraceX"
myFavouriteLetter = "X"

print("My Other name is {} of type {}".format(myOtherName, type(myOtherName)))
print("My Favourite Letter is {} of type {}".format(myFavouriteLetter, type(myFavouriteLetter)))

print('Now looping through characters in myName')
i=0
for c in myName:
    print('Letter {} is {}'.format(i, c))
    i += 1

