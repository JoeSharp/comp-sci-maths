import P2PService from "./P2PService";

describe("P2PService", () => {
  it("constructs correctly", () => {
    const outbound = jest.fn();
    const service = new P2PService(outbound);

    expect(service).toBeDefined();
  });
});
