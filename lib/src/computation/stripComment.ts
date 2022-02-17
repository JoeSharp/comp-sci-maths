const COMMENT_STARTS = ['//', '/**', '*', ' *',];

const stripComment = (input: string): string => {
    for (const c of COMMENT_STARTS) {
        const commentIndex = input.indexOf(c);

        if (commentIndex !== -1) {
            return input.substr(0, commentIndex).trim();
        }
    }

    return input.trim();
}

export default stripComment;