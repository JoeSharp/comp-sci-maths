# Demonstrating variable scope
a_name: str = 'Joe'


def set_name(new_name: str):
    # This line indicates to Python that this subroutine wishes to use the existing global variable called a_name
    global a_name
    a_name = new_name

    print("a_name inside subroutine {}".format(a_name))


print("a_name before the call to set_name: {}".format(a_name))
set_name("Steve")
print("a_name after call to set_name: {}".format(a_name))
