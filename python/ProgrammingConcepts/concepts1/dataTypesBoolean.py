somethingTrue = 2 == 2
somethingFalse = 3 == 5

if somethingTrue:
    print('Something true was true') # Should print

if somethingFalse:
    print('Something false...was true?') # Should never print

if not somethingFalse:
    print('Something false was not true...goodo') # Should print

print("Starting Counting")
count = 0

while count < 5:
    print("Counting {}".format(count))
    count += 1

print("Finished Counting")

aNumberAsBool = 0
anotherNumberAsBool = 5

if aNumberAsBool:
    print('I guess \'{}\' is considered True'.format(aNumberAsBool))
else:
    print('Clearly \'{}\' is considered False'.format(aNumberAsBool))


if anotherNumberAsBool:
    print('I guess \'{}\' is considered True'.format(anotherNumberAsBool))
else:
    print('Clearly \'{}\' is considered False'.format(anotherNumberAsBool))

print('Trying a while loop')
while anotherNumberAsBool > 0:
    print('\tAnother Number is still more than zero \'{}\''.format(anotherNumberAsBool))
    anotherNumberAsBool -= 1
print('Done with the While Loop')