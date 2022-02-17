from typing import Dict

# Dictionary created as a literal
my_dictionary: Dict[int, str] = {
    10260: "Creator Expert - Diner",
    10769: "Extreme Adventure Truck",
    31313: "Mindstorms Home Kit"
}

print("Printing a specific value {}".format(my_dictionary.get(10260)))

print("All Values")
for key, value in my_dictionary.items():
    print("{}: {}".format(key, value))

