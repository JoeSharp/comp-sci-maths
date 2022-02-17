import Message from './Message';
import NetworkNode from './NetworkNode';

interface NodesById {
    [id: string]: NetworkNode;
}

class Network {
    nodes: NodesById

    constructor() {
        this.nodes = {};
    }

    sendMessage(message: Message): Promise<boolean> {
        return new Promise<boolean>((resolve, reject) => {
            const destination = this.nodes[message.destinationId];

            if (destination === undefined) {
                reject('Destination not found');
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
        this.nodes[node.id] = node;
        node.connectToNetwork(this.sendMessage.bind(this));
        return this;
    }
}

export default Network;