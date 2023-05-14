import { NetworkMessage, NetworkSocket, NodeMessageSender } from "./types";

export default abstract class Service {
  outbound: NodeMessageSender;

  constructor(outbound: NodeMessageSender) {
    this.outbound = outbound;
  }

  sendMessage(destination: NetworkSocket, content: string) {
    this.outbound(destination, content);
  }

  abstract receiveMessage(message: NetworkMessage): boolean;
}
