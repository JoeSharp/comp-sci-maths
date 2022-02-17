class TickPrinter:
    """
    Class used to print ticks that wrap at a specified width.
    """
    __to_print: str  # What should be printed for each tick
    __width: int  # The number of ticks to print before wrapping
    __count: int  # The number of ticks printed since last wrap

    def __init__(self, to_print: str = ".", width: int = 40):
        self.__to_print = to_print
        self.__width = width
        self.__count = 0

    def tick(self):
        print(self.__to_print, end="")
        self.__count = (self.__count + 1) % self.__width
        if self.__count == 0:
            print("\n")