import PriorityQueue, { PrioritisedItem } from "./PriorityQueue";
import Queue from "./Queue";

describe("Queue (OOP)", () => {
  test("Queue", () => {
    const myQueue = new Queue<number>();
    myQueue.push(5);
    myQueue.push(7);
    myQueue.push(10);
    const a = myQueue.pop();
    myQueue.push(13);
    myQueue.push(54);
    const b = myQueue.pop();
    myQueue.push(2);
    const c = myQueue.pop();
    myQueue.push(6);
    const d = myQueue.pop();
    myQueue.push(19);
    const e = myQueue.pop();
    myQueue.push(27);
    myQueue.push(28);
    const f = myQueue.pop();
    const g = myQueue.pop();
    const h = myQueue.pop();

    expect(a).toBe(5);
    expect(b).toBe(7);
    expect(c).toBe(10);
    expect(d).toBe(13);
    expect(e).toBe(54);
    expect(f).toBe(2);
    expect(g).toBe(6);
    expect(h).toBe(19);
  });

  interface PrioritisedName extends PrioritisedItem {
    name: string;
  }

  test("Priority Queue", () => {
    const myQueue = new PriorityQueue<PrioritisedName>();

    myQueue.enqueue({ name: "Indigo", priority: 10 });
    myQueue.enqueue({ name: "Joe", priority: 4 });
    myQueue.enqueue({ name: "Kate", priority: 7 });
    const a = myQueue.dequeue();
    myQueue.enqueue({ name: "Tom", priority: 9 });
    myQueue.enqueue({ name: "Kirsten", priority: 3 });
    const b = myQueue.dequeue();
    myQueue.enqueue({ name: "Nina", priority: 4 });
    const c = myQueue.dequeue();
    myQueue.enqueue({ name: "Gaz", priority: 5 });
    const d = myQueue.dequeue();
    myQueue.enqueue({ name: "Steve", priority: 1 });
    const e = myQueue.dequeue();
    myQueue.enqueue({ name: "Louise", priority: 8 });
    myQueue.enqueue({ name: "Chris", priority: 7 });
    const f = myQueue.dequeue();
    const g = myQueue.dequeue();
    const h = myQueue.dequeue();

    expect(a).toEqual({ name: "Indigo", priority: 10 });
    expect(b).toEqual({ name: "Tom", priority: 9 });
    expect(c).toEqual({ name: "Kate", priority: 7 });
    expect(d).toEqual({ name: "Gaz", priority: 5 });
    expect(e).toEqual({ name: "Joe", priority: 4 });
    expect(f).toEqual({ name: "Louise", priority: 8 });
    expect(g).toEqual({ name: "Chris", priority: 7 });
    expect(h).toEqual({ name: "Nina", priority: 4 });
  });
})