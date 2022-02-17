# https://docs.python.org/3/library/math.html
import math

myPower1 = 5
myExp1 = math.exp(myPower1)

print('e**{} = {}'.format(myPower1, myExp1))

myNum2 = 10000
myLog10Of2 = math.log10(myNum2);
print('log10 of {} = {}'.format(myNum2, myLog10Of2))

print('Printing values of sin(x)')
for angleDeg in range(0, 360, 10):
    angleRad = math.radians(angleDeg)
    print('\tsin({}) = {}'.format(angleDeg, math.sin(angleRad)))

