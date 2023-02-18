import { sign } from "crypto";

class Message {
  sourceId: string;
  destinationId: string;
  content: Buffer; // Base 64 encoded
  signature?: Buffer; // Base 64 encoded

  from(sourceId: string): this {
    this.sourceId = sourceId;
    return this;
  }

  to(destinationId: string): this {
    this.destinationId = destinationId;
    return this;
  }

  containing(contents: Buffer | string): this {
    this.content = Buffer.isBuffer(contents) ? contents : Buffer.from(contents);
    return this;
  }

  signedWith(signature: Buffer): this {
    this.signature = signature;
    return this;
  }
}

export default Message;
