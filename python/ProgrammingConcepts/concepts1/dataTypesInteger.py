myFirstInt = 5
mySecondInt = 13
myThirdInt = 67

print('My First Int {}'.format(myFirstInt))
print('My Second Int {}'.format(mySecondInt))
print('My Third Int {}'.format(myThirdInt))

myA1 = myFirstInt + mySecondInt
print('{} + {} = {} is {}'
      .format(myFirstInt,
              mySecondInt,
              myA1,
              type(myA1)))

myA2 = myFirstInt * myThirdInt
print('{} * {} = {} is {}'
      .format(myFirstInt,
              myThirdInt,
              myA2,
              type(myA2)))

myA3 = myThirdInt - mySecondInt;
print('{} - {} = {} is {}'
      .format(myThirdInt,
              mySecondInt,
              myA3,
              type(myA3)))

myA4 = myFirstInt + mySecondInt * myThirdInt + myFirstInt
print('{} + {} * {} + {} = {} is {}'
      .format(myFirstInt,
              mySecondInt,
              myThirdInt,
              myFirstInt,
              myA4,
              type(myA4)))

myA5 = myFirstInt - mySecondInt + myThirdInt * myFirstInt
print('{} - {} + {} * {} = {} is {}'
      .format(myFirstInt,
              mySecondInt,
              myThirdInt,
              myFirstInt,
              myA5,
              type(myA5)))
