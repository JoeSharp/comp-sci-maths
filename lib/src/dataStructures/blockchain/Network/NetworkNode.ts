import Message from "./Message";

type MessageReceiverFn<T> = (message: Message<T>) => Promise<boolean>;

abstract class NetworkNode<T> {
  id: string;
  outboundNetwork: MessageReceiverFn<T>;

  constructor(id: string) {
    this.id = id;
    this.outboundNetwork = () => Promise.reject("Not connected to network");
  }

  sendMessage(message: Message<T>): Promise<boolean> {
    return this.outboundNetwork(message.from(this.id));
  }

  connectToNetwork(outboundNetwork: MessageReceiverFn<T>): void {
    this.outboundNetwork = outboundNetwork;
  }

  abstract receiveMessage(message: Message<T>): Promise<boolean>;
}

export default NetworkNode;
