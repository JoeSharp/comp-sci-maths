import LinkedList from "./LinkedList";

describe("Linked List (OOP)", () => {
  test("Normal Use", () => {
    const myList = new LinkedList<string>();
    myList.append("Joe"); // Joe
    myList.append("Kate"); // Joe, Kate
    myList.insert(1, "Indigo"); // Joe, Indigo, Kate
    myList.insert(1, "Tom"); // Joe, Tom, Indigo, Kate
    myList.append("Kirsten"); // Joe, Tom, Indigo, Kate, Kirsten

    const items = Array(5).fill(null).map((_, i) => myList.get(i));
    expect(items).toStrictEqual(["Joe", "Tom", "Indigo", "Kate", "Kirsten"]);
    expect(myList.length).toBe(5);

    const remove2 = myList.remove(2);
    expect(remove2).toBe("Indigo");
    const get2 = myList.get(2);
    expect(get2).toBe("Kate");

    const remove1 = myList.removeMatch((i) => i === "Tom");
    expect(remove1).toBe("Tom");
    const get2Again = myList.get(2);
    expect(get2Again).toBe("Kirsten");

    // Check that iteration works
    const asArr = myList.toArray();
    expect(asArr).toEqual(["Joe", "Kate", "Kirsten"]);

    // Check that to string works
    const asStr = myList.toString();
    expect(asStr).toBe("Joe Kate Kirsten");
  });
})


