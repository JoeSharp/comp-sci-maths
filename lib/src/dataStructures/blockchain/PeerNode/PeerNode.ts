import {
  generateKeyPair,
  publicEncrypt,
  privateDecrypt,
  constants,
  sign,
  verify,
} from "crypto";
import { v4 as uuid } from "uuid";
import InMemoryNetworkNode from "../Network/InMemoryNetworkNode";
import Message from "../Network/Message";

const HASH_ALGORITHM = "sha256";
const ENCRYPTION_PADDING = constants.RSA_PKCS1_OAEP_PADDING;
const SIGNING_PADDING = constants.RSA_PKCS1_PSS_PADDING;

export function createPeerNode(): Promise<PeerNode> {
  const passphrase = uuid().toString();

  return new Promise((resolve, reject) => {
    generateKeyPair(
      "rsa",
      {
        modulusLength: 4096,
        publicKeyEncoding: {
          type: "spki",
          format: "pem",
        },
        privateKeyEncoding: {
          type: "pkcs8",
          format: "pem",
          cipher: "aes-256-cbc",
          passphrase,
        },
      },
      (err, publicKey, privateKey) => {
        if (err !== null) {
          reject(err);
        } else {
          resolve(new PeerNode(publicKey, privateKey, passphrase));
        }
      }
    );
  });
}

class PeerNode {
  id: string;
  publicKey: string;
  privateKey: string;
  passphrase: string;
  networkNode: InMemoryNetworkNode;

  others: Map<string, string>;

  constructor(publicKey: string, privateKey: string, passphrase: string) {
    this.id = uuid();
    this.networkNode = new InMemoryNetworkNode(this.id);
    this.publicKey = publicKey;
    this.privateKey = privateKey;
    this.passphrase = passphrase;
    this.others = new Map();
  }

  withPeer(peerId: string, peerPublicKey: string): PeerNode {
    this.others.set(peerId, peerPublicKey);
    return this;
  }

  popMessage(): Message {
    const msg = this.networkNode.popMessage();
    const otherPublicKey = this.others.get(msg.sourceId);

    const decryptedData = privateDecrypt(
      {
        key: this.privateKey,
        padding: ENCRYPTION_PADDING,
        oaepHash: HASH_ALGORITHM,
        passphrase: this.passphrase,
      },
      msg.content
    );

    const isVerified = verify(
      HASH_ALGORITHM,
      msg.content,
      {
        key: otherPublicKey,
        padding: SIGNING_PADDING,
      },
      msg.signature
    );

    if (!isVerified) {
      throw new Error("Message could not be verified");
    }

    return new Message()
      .containing(decryptedData)
      .from(msg.sourceId)
      .to(msg.destinationId);
  }

  sendMessage(destinationId: string, content: string) {
    const otherPublicKey = this.others.get(destinationId);

    const encryptedData = publicEncrypt(
      {
        key: otherPublicKey,
        padding: ENCRYPTION_PADDING,
        oaepHash: HASH_ALGORITHM,
      },
      // We convert the data string to a buffer using `Buffer.from`
      Buffer.from(content)
    );

    const signature = sign(HASH_ALGORITHM, Buffer.from(encryptedData), {
      key: this.privateKey,
      padding: SIGNING_PADDING,
      passphrase: this.passphrase,
    });

    const message: Message = new Message()
      .from(this.id)
      .to(destinationId)
      .containing(encryptedData)
      .signedWith(signature);

    this.networkNode.sendMessage(message);
  }
}

export default PeerNode;
