import Message from "./Message";

export type MessageReceiverFn = (message: Message) => Promise<boolean>;

abstract class NetworkNode {
  id: string;
  outboundNetwork: MessageReceiverFn;

  constructor(id: string) {
    this.id = id;
    this.outboundNetwork = () => Promise.reject("Not connected to network");
  }

  sendMessage(message: Message): Promise<boolean> {
    return this.outboundNetwork(message.from(this.id));
  }

  connectToNetwork(outboundNetwork: MessageReceiverFn): void {
    this.outboundNetwork = outboundNetwork;
  }

  abstract receiveMessage(message: Message): Promise<boolean>;
}

export default NetworkNode;
