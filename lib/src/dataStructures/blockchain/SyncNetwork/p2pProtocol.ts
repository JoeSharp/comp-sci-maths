import { decodeColonIndicatedType } from "./protocolCommon";

export const P2P_PROTOCOL = "p2p";

export enum P2PMessageType {
  addNode = "addNode",
  removeNode = "removeNode",
}

interface P2PAddNodeMessage {
  type: P2PMessageType.addNode;
  address: string;
}
interface P2PRemoveNodeMessage {
  type: P2PMessageType.removeNode;
  address: string;
}

type P2PMessage = P2PAddNodeMessage | P2PRemoveNodeMessage;

export function decodeP2PMessage(message: string): P2PMessage | undefined {
  const { type, content } = decodeColonIndicatedType(message);

  switch (type) {
    case P2PMessageType.addNode:
      return {
        type: P2PMessageType.addNode,
        address: content,
      };
    case P2PMessageType.removeNode:
      return {
        type: P2PMessageType.removeNode,
        address: content,
      };
  }

  return undefined;
}
