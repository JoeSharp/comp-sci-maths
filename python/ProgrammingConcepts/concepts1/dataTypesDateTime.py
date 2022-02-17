from datetime import date
import time

print("Today's Date {}".format(date.today()))
print("The Time Now: {}".format(time.asctime(time.localtime(time.time()))))
