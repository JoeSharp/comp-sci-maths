import LinkedList from "./LinkedList";

test("Linked List", () => {
  const myList = new LinkedList<string>();
  myList.append("Joe"); // Joe
  myList.append("Kate"); // Joe, Kate
  myList.insert(1, "Indigo"); // Joe, Indigo, Kate
  myList.insert(1, "Tom"); // Joe, Tom, Indigo, Kate
  myList.append("Kirsten"); // Joe, Tom, Indigo, Kate, Kirsten

  const at0 = myList.get(0);
  const at1 = myList.get(1);
  const at2 = myList.get(2);
  const at3 = myList.get(3);
  const at4 = myList.get(4);
  expect(at0).toBe("Joe");
  expect(at1).toBe("Tom");
  expect(at2).toBe("Indigo");
  expect(at3).toBe("Kate");
  expect(at4).toBe("Kirsten");
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
