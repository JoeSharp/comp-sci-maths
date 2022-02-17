const DEFAULT_CONTENT = 'NONE'

class Message {
    sourceId: string;
    destinationId: string;
    content: string;

    constructor() {
        this.sourceId = DEFAULT_CONTENT;
        this.destinationId = DEFAULT_CONTENT;
        this.content = DEFAULT_CONTENT;
    }

    from(sourceId: string): this {
        this.sourceId = sourceId;
        return this;
    }

    to(destinationId: string): this {
        this.destinationId = destinationId;
        return this;
    }

    containing(contents: string): this {
        this.content = contents;
        return this;
    }
}

export default Message;