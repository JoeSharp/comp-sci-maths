import Message from "./Message";
import NetworkNode from "./NetworkNode";

class Network {
  nodes: Map<string, NetworkNode>;

  constructor() {
    this.nodes = new Map();
  }

  sendMessage(message: Message): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      const destination = this.nodes.get(message.destinationId);

      if (destination === undefined) {
        reject("Destination not found");
      }

      destination.receiveMessage(message).then(resolve, reject);
    });
  }

  /**
   * Add a node to this network.
   *
   * @param node The node to add
   * @returns This (method chaining)
   */
  addNode(node: NetworkNode): this {
    this.nodes.set(node.id, node);
    node.connectToNetwork(this.sendMessage.bind(this));
    return this;
  }
}

export default Network;
