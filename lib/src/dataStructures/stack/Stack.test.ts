import Stack from "./Stack";

test("Stacking Numbers", () => {
  const myStack = new Stack<number>();
  myStack.push(5);
  myStack.push(7);
  myStack.push(10);
  const a = myStack.pop();
  myStack.push(21);
  myStack.push(54);
  const b = myStack.pop();
  myStack.push(2);
  const c = myStack.pop();
  myStack.push(6);
  const d = myStack.pop();
  myStack.push(13);
  const e = myStack.pop();
  myStack.push(19);
  myStack.push(28);
  const f = myStack.pop();
  const g = myStack.pop();
  const h = myStack.pop();

  expect(a).toBe(10);
  expect(b).toBe(54);
  expect(c).toBe(2);
  expect(d).toBe(6);
  expect(e).toBe(13);
  expect(f).toBe(28);
  expect(g).toBe(19);
  expect(h).toBe(21);
});

test("Stacking Names", () => {
  const myStack2 = new Stack<string>();
  myStack2.push("Joe");
  myStack2.push("Kate");
  const x = myStack2.pop();
  myStack2.push("Tom");
  const y = myStack2.pop();
  const z = myStack2.pop();
  expect(x).toBe("Kate");
  expect(y).toBe("Tom");
  expect(z).toBe("Joe");
});

test('Get Items', () => {
  const myStack2 = new Stack<string>();
  myStack2.push("Joe");
  myStack2.push("Jenny");
  myStack2.push("Tom");
  myStack2.push("Quilty");
  myStack2.pop();

  expect(myStack2.getItems()).toEqual(['Joe', 'Jenny', 'Tom'])
})