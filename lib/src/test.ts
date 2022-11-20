import { simpleSwap, numberComparator, stringComparator } from "./common";

test("Swap (numbers)", () => {
  const data = [5, 6, 9, 1, 3];
  simpleSwap(data, 2, 4);

  expect(data[2]).toBe(3);
  expect(data[4]).toBe(9);
});

test("Swap (objects)", () => {
  const data = [
    { name: "Joe", age: 37 },
    { name: "Steve", age: 23 },
    { name: "Eloise", age: 31 },
  ];

  simpleSwap(data, 0, 2);

  const names = data.map((n) => n.name);
  expect(names).toStrictEqual(["Eloise", "Steve", "Joe"]);
});

test("Compare (numbers)", () => {
  const inOrder = numberComparator(5, 6);
  const outOfOrder = numberComparator(8, 3);
  const isEqual = numberComparator(4, 4);

  expect(inOrder).toBeLessThan(0);
  expect(outOfOrder).toBeGreaterThan(0);
  expect(isEqual).toBe(0);
});

test("Compare (strings)", () => {
  const inOrder = stringComparator("alan", "zoe");
  const outOfOrder = stringComparator("tom", "dave");
  const isEqual = stringComparator("zephyr", "zephyr");

  expect(inOrder).toBeLessThan(0);
  expect(outOfOrder).toBeGreaterThan(0);
  expect(isEqual).toBe(0);
});
