import Network from "./Network";
import NetworkNode from "./NetworkNode";

describe("Network", () => {
  it("creates simple network correctly", () => {
    // Given
    const nodeA = new NetworkNode("A");
    const nodeB = new NetworkNode("B");
    new Network().withNode(nodeA).withNode(nodeB);

    // When
    nodeA.sendMessage({ address: "B", port: 56 }, "hello from A");

    // Then
  });

  it("return false if no node exists", () => {
    // Given
    const nodeA = new NetworkNode("A");
    const nodeB = new NetworkNode("B");
    const network = new Network().withNode(nodeA).withNode(nodeB);
    const message = {
      source: { address: "A", port: 1 },
      destination: { address: "C", port: 45 },
      content: "hello from A",
    };

    // When
    const result = network.sendMessage(message);

    // Then
    expect(result).toBeFalsy();
  });

  it("return false if no service exists", () => {
    // Given
    const nodeA = new NetworkNode("A");
    const nodeB = new NetworkNode("B");
    const network = new Network().withNode(nodeA).withNode(nodeB);
    const message = {
      source: { address: "A", port: 1 },
      destination: { address: "B", port: 56 },
      content: "hello from A",
    };

    // When
    const result = network.sendMessage(message);

    // Then
    expect(result).toBeFalsy();
  });

  it("return false if service returns false", () => {
    // Given
    const service = jest.fn().mockReturnValue(false);
    const nodeA = new NetworkNode("A");
    const nodeB = new NetworkNode("B").withService(45, service);
    const network = new Network().withNode(nodeA).withNode(nodeB);
    const message = {
      source: { address: "A", port: 1 },
      destination: { address: "B", port: 45 },
      content: "hello from A",
    };

    // When
    const result = network.sendMessage(message);

    // Then
    expect(result).toBeFalsy();
    expect(service).toHaveBeenCalledWith(message);
  });

  it("return true if service processed correctly", () => {
    // Given
    const service = jest.fn().mockReturnValue(true);
    const nodeA = new NetworkNode("A");
    const nodeB = new NetworkNode("B").withService(45, service);
    const network = new Network().withNode(nodeA).withNode(nodeB);
    const message = {
      source: { address: "A", port: 1 },
      destination: { address: "B", port: 45 },
      content: "hello from A",
    };

    // When
    const result = network.sendMessage(message);

    // Then
    expect(result).toBeTruthy();
    expect(service).toHaveBeenCalledWith(message);
  });
});
