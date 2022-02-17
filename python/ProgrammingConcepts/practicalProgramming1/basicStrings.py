my_name: str = "Joe"

print("How do you spell that?")
for i in my_name:
    print(i)

print("The first character is {}".format(my_name[0]))
print("The last character is {}".format(my_name[-1]))
print("The last character is also {}".format(my_name[len(my_name) - 1]))

print("The length of my name is {}".format(len(my_name)))

