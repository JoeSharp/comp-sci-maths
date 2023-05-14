export type NetworkMessageConsumer = (message: NetworkMessage) => boolean;
export type NodeMessageSender = (
  destination: NetworkSocket,
  content: string
) => void;

export interface NetworkSocket {
  address: string;
  port: number;
}

export interface NetworkMessage {
  source: NetworkSocket;
  destination: NetworkSocket;
  content: string;
}
