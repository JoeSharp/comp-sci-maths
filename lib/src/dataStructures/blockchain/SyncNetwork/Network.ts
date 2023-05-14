import NetworkNode from "./NetworkNode";
import { NetworkMessage } from "./types";

/**
 * A simplistic simulation of a network.
 * Nodes send messages to 'the network' and it routes them to the appropriate destination node.
 * Essentially combining the functionality of a switch/router.
 */
export default class Network {
  nodes: Map<string, NetworkNode>;

  constructor() {
    this.nodes = new Map();
  }

  withNode(node: NetworkNode): Network {
    this.nodes.set(node.address, node);
    node.withOutboundSocket(this.sendMessage.bind(this));
    return this;
  }

  sendMessage(message: NetworkMessage): boolean {
    // Locate the destination and forward on the message
    const destination = this.nodes.get(message.destination.address);

    if (!destination) {
      return false;
    }

    return destination.receiveMessage(message);
  }
}
