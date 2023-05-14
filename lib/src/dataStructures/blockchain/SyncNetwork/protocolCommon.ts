/**
 * Structure to represent a message sent over our simple network
 */
export interface GenericMessage {
  type: string;
  content: string;
}

/**
 * Decodes a raw message into it's indicated protocol and content.
 * The protocol is a word followed by colon, the content is whatever is remaining.
 *
 * @param rawMessage The raw message received over network
 * @returns
 */
export function decodeColonIndicatedType(rawMessage: string): GenericMessage {
  const extractionRegex = /(?<type>\w*)[:](?<content>[\s\S]*)/m;

  const match = rawMessage.match(extractionRegex);

  if (!match || !match.groups) {
    throw new Error(`Could not extract groups from raw message ${rawMessage}`);
  }

  return {
    type: match.groups.type,
    content: match.groups.content,
  };
}
