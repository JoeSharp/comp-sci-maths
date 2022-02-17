import Message from './Message';
import NetworkNode from './NetworkNode'

class InMemoryNetworkNode extends NetworkNode {
    messages: Message[];

    constructor(id: string) {
        super(id);

        this.messages = [];
    }

    receiveMessage(message: Message): Promise<boolean> {
        this.messages.push(message);
        return Promise.resolve(true);
    }

    popMessage(): Message | undefined {
        return this.messages.shift();
    }
}

export default InMemoryNetworkNode;