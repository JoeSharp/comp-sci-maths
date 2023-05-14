import NetworkNode from "./NetworkNode";
import NetworkService from "./NetworkService";

describe("NetworkNode", () => {
  it("creates a network node correctly", () => {
    // When
    const node = new NetworkNode("A");

    // Then
    expect(node.address).toBe("A");
  });

  it("throws error for non existent outbound socket", () => {
    const node = new NetworkNode("A");

    expect(() =>
      node.sendMessage({ address: "B", port: 45 }, "hello")
    ).toThrowError();
  });

  it("sends message to outbound socket correctly", () => {
    // Given
    const outbound = jest.fn();
    const node = new NetworkNode("A").withOutboundSocket(outbound);

    // When
    node.sendMessage({ address: "B", port: 45 }, "hello");

    // Then
    expect(outbound).toHaveBeenCalledWith({
      source: { address: "A", port: 0 },
      destination: { address: "B", port: 45 },
      content: "hello",
    });
  });

  it("receives messages to service correctly", () => {
    // Given
    const service = jest.fn();
    const node = new NetworkNode("A").withService(45, service);
    const msg = {
      source: {
        address: "B",
        port: 1,
      },
      destination: {
        address: "A",
        port: 45,
      },
      content: "Hello from B",
    };

    // When
    node.receiveMessage(msg);

    // Then
    expect(service).toHaveBeenCalledWith(msg);
  });
});
