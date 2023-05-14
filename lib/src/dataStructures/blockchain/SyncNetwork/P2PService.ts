import { NetworkMessage, NetworkSocket, NodeMessageSender } from "./types";
import NetworkService from "./NetworkService";

export default class P2PService extends NetworkService {
  neighbours: Map<string, NetworkSocket>;

  constructor(outbound: NodeMessageSender) {
    super(outbound);
    this.neighbours = new Map();
  }

  receiveMessage(message: NetworkMessage): boolean {
    return false;
  }
}
