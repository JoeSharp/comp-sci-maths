class Message<T> {
  sourceId: string;
  destinationId: string;
  content: T;

  from(sourceId: string): this {
    this.sourceId = sourceId;
    return this;
  }

  to(destinationId: string): this {
    this.destinationId = destinationId;
    return this;
  }

  containing(contents: T): this {
    this.content = contents;
    return this;
  }
}

export default Message;
