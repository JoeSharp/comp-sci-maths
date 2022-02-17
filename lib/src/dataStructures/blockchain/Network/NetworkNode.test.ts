import InMemoryNetworkNode from "./InMemoryNetworkNode";
import Message from "./Message";


describe("Network Node", () => {
    const NODE_ID_1 = 'bob';
    const NODE_ID_2 = 'alice';

    test("Simple Communication", () => {
        const TEST_CONTENT = 'hello';
        const node1 = new InMemoryNetworkNode(NODE_ID_1)
        const node2 = new InMemoryNetworkNode(NODE_ID_2)
        node1.connectToNetwork(node2.receiveMessage.bind(node2));
        node1.sendMessage(new Message().to(NODE_ID_2).containing(TEST_CONTENT));
        const received = node2.popMessage();
        expect(received).toBeDefined();
        expect(received?.content).toBe(TEST_CONTENT);
    })

    test("Disconnected Node Should Reject Promise", () => {
        expect.assertions(1);
        new InMemoryNetworkNode(NODE_ID_1)
            .sendMessage(new Message().to(NODE_ID_2))
            .catch((err) => expect(err).toBeDefined());
    })
});