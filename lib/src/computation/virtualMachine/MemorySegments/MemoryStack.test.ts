import { RAMSimulator } from "../../assemblyLanguage";
import MemoryStack from "./MemoryStack";

describe('Hack VM Memory Stack', () => {
    test('Basic Stack Operation', () => {
        const memory: RAMSimulator = new RAMSimulator();
        const myStack = new MemoryStack(memory);
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

    test('Stack Memory Correct', () => {
        const stackPointerAddress = 8;
        const stackPointerValue = 64;
        const memory: RAMSimulator = new RAMSimulator();
        const myStack = new MemoryStack(memory, stackPointerAddress, stackPointerValue);

        const sp0 = memory.get(stackPointerAddress);
        expect(sp0).toBe(stackPointerValue);

        myStack.push(78);
        myStack.push(91);

        const sp1 = memory.get(stackPointerAddress);
        const e78 = memory.get(stackPointerValue);
        const e91 = memory.get(stackPointerValue + 1);

        expect(sp1).toBe(stackPointerValue + 2);
        expect(e78).toBe(78);
        expect(e91).toBe(91);

        const p1 = myStack.pop();
        const sp2 = memory.get(stackPointerAddress);
        expect(sp2).toBe(stackPointerValue + 1);
        expect(p1).toBe(91);

    })
})