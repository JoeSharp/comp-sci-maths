# Demonstrate use of date/time
from datetime import datetime

now: datetime = datetime.now()
now_string: str = now.strftime("%A the %d of %B in the year %Y")
print("The time Mr Wolf is: {}".format(now_string))

this_date: datetime = datetime.strptime(
    "23 of October in year 2001",
    "%d of %B in year %Y")
print(this_date)

year: int = 2012
month: int = 6
day: int = 23
hour: int = 11
minute: int = 34
second: int = 6
some_date = datetime(year, month, day, hour, minute, second)
print(some_date)
