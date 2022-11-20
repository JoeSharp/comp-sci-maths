import { generateLineRef, validateArrayIndices } from "./common";

describe("Common", () => {
  test("Line References", () => {
    const fromNothing = generateLineRef();
    expect(fromNothing.id).toBeDefined();

    const justString = generateLineRef("bob");
    expect(justString.originalLine).toBe("bob");
    expect(justString.id).toBeDefined();

    const noId = generateLineRef({
      originalLine: "monkey",
      originalLineNumber: 56,
      sourceFilename: "foo.bar",
      sourceId: "789",
    });
    expect(noId.id).toBeDefined();
    expect(noId.originalLine).toBe("monkey");
    expect(noId.sourceFilename).toBe("foo.bar");
    expect(noId.sourceId).toBe("789");

    const testId = "SOME-RANDOM-ID";
    const withId = generateLineRef({
      id: testId,
      originalLine: "foo",
    });
    expect(withId.id).toBe(testId);
    expect(withId.originalLine).toBe("foo");
    expect(withId.sourceFilename).toBeUndefined();
  });

  describe("validateArrayIndices", () => {
    it("Throws error for index too high", () => {
      expect(() => validateArrayIndices([1, 2, 3], 5)).toThrowError();
    });
    it("Throws error for index too high amongst valid", () => {
      expect(() => validateArrayIndices([1, 2, 3], 0, 5, 1)).toThrowError();
    });

    it("Throws error for negative index", () => {
      expect(() => validateArrayIndices([1, 2, 3], -1)).toThrowError();
    });

    it("Throws error for negative index amongst valid ones", () => {
      expect(() => validateArrayIndices([1, 2, 3], -1, 0, 1)).toThrowError();
    });

    it("Doesn`t throw error for valid index", () => {
      expect(() => validateArrayIndices([1, 2, 3], 2)).not.toThrowError();
    });

    it("Doesn`t throw error for valid indices", () => {
      expect(() => validateArrayIndices([1, 2, 3], 0, 1, 2)).not.toThrowError();
    });
  });
});
