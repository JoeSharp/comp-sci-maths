import { createPeerNode } from "./PeerNode";
import Network from ".";

describe("Peer Node", () => {
  it("generates keys", async () => {
    const me = await createPeerNode();

    expect(me.privateKey).toBeDefined();
    expect(me.publicKey).toBeDefined();
  });

  it("allows two parties to communicate", async () => {
    // Create two peers on a network
    const me = await createPeerNode();
    const you = await createPeerNode();

    // Connect them up to a network
    const network = new Network();
    network.addNode(me.networkNode);
    network.addNode(you.networkNode);

    // Tell them about each other
    me.withPeer(you.id, you.publicKey);
    you.withPeer(me.id, me.publicKey);

    // Send a message
    const TEST_MESSAGE = "Hello there from the other side";
    me.sendMessage(you.id, TEST_MESSAGE);

    const received = you.popMessage();
    expect(received.content.toString()).toBe(TEST_MESSAGE);
  });
});
