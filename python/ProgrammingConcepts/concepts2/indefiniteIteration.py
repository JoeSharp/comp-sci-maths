done: bool = False

while not done:
    print("1. Say Hello")
    print("2. Count to 10")
    print("X. Exit Program")
    option: chr = input("Choose an option: ")

    if option == '1':
        print("Hello")
    elif option == '2':
        for i in range(10):
            print(i)
    elif option == 'X':
        done = True
    else:
        print("Did not understand {}".format(option))
