import { defaultEqualityCheck } from "common";
import PatternSearchTree from "./PatternSearchTree"



describe("Pattern Search Tree", () => {
    test("String - Brown Cow", () => {
        const patternTree = new PatternSearchTree<string>(defaultEqualityCheck, a => a, 10);
        patternTree.record(..."how now brown cow");

        const result = patternTree.count(..."ow");
        expect(result).toBe(4);
    });

    test("String - Rain in Spain", () => {
        const patternTree = new PatternSearchTree<string>(defaultEqualityCheck, a => a, 10);
        patternTree.record(..."the rain in spain falls mainly on the plain");

        const result = patternTree.count(..."ain");
        expect(result).toBe(4);
    });

    test("You will do lines for me today", () => {
        const patternTree = new PatternSearchTree<string>(defaultEqualityCheck, a => a, 25);
        patternTree.record(...`I must not tell lies
        I must not tell lies
        I must not tell lies
        I must not tell lies
        I must not tell lies
        I must not tell lies
        I must not tell lies
        I must not tell lies
        I must not tell lies
        I must not tell lies
        I must not tell lies
        I must not tell lies
        I must not tell lies
        I must not tell lies
        I must not tell lies
        I must not tell lies
        I must not tell lies
        I must not tell lies
        I must not tell lies
        I must not tell lies
        I must not tell lies
        I must not tell lies
        I must not tell lies
        I must not tell lies
        I must not tell lies
        I must not tell lies
        I must not tell lies
        I must not tell lies
        I must not tell lies
        I must not tell lies
        I must not tell lies
        I must not tell lies
        I must not tell lies
        I must not tell lies
        I must not tell lies
        I must not tell lies`);

        const result = patternTree.count(..."I must not tell lies");
        expect(result).toBe(36);

        const hits = patternTree.findTopHits();
    })
})