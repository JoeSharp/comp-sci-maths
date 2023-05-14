import { decodeColonIndicatedType } from "./protocolCommon";

describe("Protocol", () => {
  it.each`
    input                  | expectedType | expectedContent
    ${"foo:bar"}           | ${"foo"}     | ${"bar"}
    ${`html:<html>
    <body>
    <h1>Hello</h1>
    </body>
    </html>`} | ${"html"} | ${`<html>
    <body>
    <h1>Hello</h1>
    </body>
    </html>`}
    ${"p2p:addNode:63729"} | ${"p2p"}     | ${"addNode:63729"}
  `(
    "decodes $input into protocol $expectedType with content $expectedContent",
    ({ input, expectedType, expectedContent }) => {
      const { type, content } = decodeColonIndicatedType(input);
      expect(type).toBe(expectedType);
      expect(content).toBe(expectedContent);
    }
  );

  it("throws error for invalid message correctly", () => {
    expect(() => decodeColonIndicatedType("foo.bar")).toThrowError();
  });
});
