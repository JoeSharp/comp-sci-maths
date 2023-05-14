import { NetworkMessage, NetworkSocket, NetworkMessageConsumer } from "./types";

/**
 * Simulate a node within a network.
 * It has an outbound connection to the network, and can receive messages
 * and route them to the appropriate services.
 */
export default class NetworkNode {
  address: string;
  outboundSocket?: NetworkMessageConsumer;
  services: Map<number, NetworkMessageConsumer>;

  constructor(address: string) {
    this.address = address;
    this.services = new Map();
  }

  withOutboundSocket(socket: NetworkMessageConsumer): NetworkNode {
    this.outboundSocket = socket;
    return this;
  }

  withService(port: number, service: NetworkMessageConsumer): NetworkNode {
    this.services.set(port, service);
    return this;
  }

  receiveMessage(message: NetworkMessage): boolean {
    // Locate an appropriate service
    const service = this.services.get(message.destination.port);

    if (!service) {
      return false;
    }

    return service(message);
  }

  sendMessage(destination: NetworkSocket, content: string) {
    if (!this.outboundSocket) {
      throw new Error(`No outbound socket given to ${this.address}`);
    }

    this.outboundSocket({
      source: {
        address: this.address,
        port: 0,
      },
      destination,
      content,
    });
  }
}
