import InMemoryNetworkNode from "./InMemoryNetworkNode";
import Message from "./Message";
import Network from "./Network";

describe("Network", () => {
  const NODE_ID_1 = "bob";
  const NODE_ID_2 = "alice";
  const NODE_ID_3 = "mary";

  test("Simple One to One Communication", () => {
    const network = new Network();
    const bob = new InMemoryNetworkNode(NODE_ID_1);
    const alice = new InMemoryNetworkNode(NODE_ID_2);
    const mary = new InMemoryNetworkNode(NODE_ID_3);

    [bob, alice, mary].forEach((node) => network.addNode(node));

    const bobToMary = bob.sendMessage(
      new Message().to(mary.id).containing("Hello Mary From Bob")
    );
    const maryToAlice = mary.sendMessage(
      new Message().to(alice.id).containing("Hello Alice From Mary")
    );
    const aliceToMary = alice.sendMessage(
      new Message().to(mary.id).containing("Hello There Mary From Alice")
    );

    expect(bobToMary).resolves.toBeTruthy();
    expect(maryToAlice).resolves.toBeTruthy();
    expect(aliceToMary).resolves.toBeTruthy();

    const maryReceived1 = mary.popMessage();
    const maryReceived2 = mary.popMessage();
    const aliceReceived = alice.popMessage();

    [maryReceived1, maryReceived2, aliceReceived].forEach((r) =>
      expect(r).toBeDefined()
    );
    expect(maryReceived1?.content).toEqual("Hello Mary From Bob");
    expect(maryReceived2?.content).toEqual("Hello There Mary From Alice");
    expect(aliceReceived?.content).toEqual("Hello Alice From Mary");
  });
});
