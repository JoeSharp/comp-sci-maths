import { P2PMessageType, decodeP2PMessage } from "./p2pProtocol";

describe("p2p", () => {
  it("decodes add node correctly", () => {
    const decoded = decodeP2PMessage("addNode:56784");

    expect(decoded).toBeDefined();
    expect(decoded?.type).toBe(P2PMessageType.addNode);
    expect(decoded?.address).toBe("56784");
  });

  it("decodes remove node correctly", () => {
    const decoded = decodeP2PMessage("removeNode:56784");

    expect(decoded).toBeDefined();
    expect(decoded?.type).toBe(P2PMessageType.removeNode);
    expect(decoded?.address).toBe("56784");
  });

  it("decodes nonsense correctly", () => {
    const decoded = decodeP2PMessage("throwNode:56784");

    expect(decoded).toBeUndefined();
  });
});
