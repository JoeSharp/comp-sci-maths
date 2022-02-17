/*
These are the definitions within this form.
The key here is the name of the meta-tag, each meta-tag will have a list of alternative rules (OR)
which count as a match.
Each rule consists of a series of parts, some are literal values and others are meta-tags which means
the validation has to recurse.
*/
export interface RulePart {
    isTag: boolean;
    ruleValue: string;
}

export type Rule = RulePart[];
export interface MatchPart {
    ruleName: string;
    inputString: string;
}

export const matchPartToString = ({ruleName, inputString}: MatchPart): string => `${ruleName}: ${inputString}`