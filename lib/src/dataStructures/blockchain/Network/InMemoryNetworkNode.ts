import Message from "./Message";
import NetworkNode from "./NetworkNode";

class InMemoryNetworkNode<T> extends NetworkNode<T> {
  messages: Message<T>[];

  constructor(id: string) {
    super(id);

    this.messages = [];
  }

  receiveMessage(message: Message<T>): Promise<boolean> {
    this.messages.push(message);
    return Promise.resolve(true);
  }

  popMessage(): Message<T> | undefined {
    return this.messages.shift();
  }
}

export default InMemoryNetworkNode;
