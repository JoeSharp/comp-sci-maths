import Queue from "dataStructures/queue/Queue";
import Tree from "dataStructures/tree";
import { Optional } from "types";
import { Rule, MatchPart, RulePart, matchPartToString } from "./types";

/*
    An instance of this class can be used to store a set of rules for a particular BNF definition.
    It can then be used to validate any number of strings against that definition.
*/
class BackusNaurForm {
    static TAG_START = '<';
    static TAG_END = '>';
    static SINGLE_QUOTE = "'";
    static GIVEN_BY: string = '::=';
    static OR: string = '|';

    rules: {
        [name: string]: Rule[]
    }

    constructor() {
        this.rules = {}
    }

    toString() {
        let asStr: string = 'Backus-Naur Form{}'

        Object.entries(this.rules).forEach(([name, alternativeRules]) => {
            alternativeRules.forEach(rule => {
                asStr += `\n\t${name}`
                rule.forEach(({ isTag, ruleValue }) => {
                    asStr += isTag ? `<${ruleValue}>` : ruleValue;
                })
            })
        })

        return asStr;
    }

    /**
     * Add multiple lines in one go
     * @param ruleStrings Lines containing rules to be added
     * @returns This object, to allow method chaining
     */
    addRules(ruleStrings: string[]): this {
        ruleStrings.forEach(r => this.addRule(r));
        return this;
    }

    /**
     * Add a line from a BNF definition to this definition
     * @param ruleStr The line containing the rule for a particular type
     * @returns This object, to allow method chaining
     */
    addRule(ruleStr: string): this {
        // Separate out the name of the definition from what it is given by
        const outerParts: string[] = ruleStr.split(BackusNaurForm.GIVEN_BY).map(x => x.trim());
        if (outerParts.length !== 2) {
            throw new Error(`Could not parse ${ruleStr}, unexpected number of parts divided by ${BackusNaurForm.GIVEN_BY}`)
        }

        const ruleName: string = outerParts[0].slice(1, -1);

        // Separate out all the alternatives using the OR delimiter
        const alternatives: Rule[] = outerParts[1]
            .split(BackusNaurForm.OR)
            .map(c => c.trim())
            .map(a => BackusNaurForm._parseAlternative(a));

        this.rules[ruleName] = alternatives

        return this;
    }

    /**
     * Given an input string, this attempts to find a named BNF meta tag that matches.
     * @param inputStr The string to validate
     * @returnsThe name of the matching data type, or None if there is no match
     */
    findMatch(inputStr: string): Optional<Tree<MatchPart>> {
        return Object.entries(this.rules)
            .map(([name, alternativeRules]) =>
                alternativeRules
                    .map(rule => this._checkValueAgainstRule(inputStr, 0, inputStr.length, name, rule))
                    .find(r => !!r)
            ).find(r => !!r);
    }

    /**
     * Given one of the expressions within a definition, parses the components of the rule.
     * @param alternativeStr The raw string
     * @returns The parsed Rule Parts list
     */
    static _parseAlternative(alternativeStr: string): Rule {
        // Work through character by character adding rule parts as various special chars are hit
        // This could probably be done better with RegEx...
        const form: RulePart[] = []

        let isBuildingTag: boolean = false
        let isBuildingLiteral: boolean = false
        let currentLiteral: string = ""
        Array.from(alternativeStr).forEach(c => {
            if (c === BackusNaurForm.TAG_START) {
                if (isBuildingLiteral) {
                    currentLiteral += c;
                } else {
                    // If we have any accumulated literal, just add as a literal part
                    if (currentLiteral.length > 0) {
                        form.push({ isTag: false, ruleValue: currentLiteral })
                        currentLiteral = ""
                    }

                    // Register the fact we are building a tag
                    isBuildingTag = true;
                }
            } else if (c === BackusNaurForm.TAG_END) {
                // If we aren't already building a tag, assume this close bracket is a literal
                if (!isBuildingTag) {
                    currentLiteral = '>'
                } else {
                    // Otherwise we can just close the tag and add the new tag rule part
                    isBuildingTag = false;
                    form.push({ isTag: true, ruleValue: currentLiteral })
                    currentLiteral = ""
                }
            } else if (c === BackusNaurForm.SINGLE_QUOTE) {
                // If we are not already within quotes, but have accumulated some literal value
                // Add whatever value is accumulated as a literal and start again
                if (!isBuildingLiteral) {
                    if (currentLiteral.length > 0) {
                        form.push({ isTag: false, ruleValue: currentLiteral })
                        currentLiteral = ""
                    }
                } else {
                    form.push({ isTag: false, ruleValue: currentLiteral })
                    currentLiteral = ""
                }
                isBuildingLiteral = !isBuildingLiteral

            } else {
                // Any other character just gets appended to current literal
                currentLiteral += c
            }
        })

        // Any hanging literal should be added
        if (currentLiteral.length > 0) {
            form.push({ isTag: false, ruleValue: currentLiteral })
        }

        // Assume unterminated opening tag is due to opening tag actually being literal
        if (isBuildingTag) {
            form.push({ isTag: false, ruleValue: "<" })
        }

        return form;
    }

    /**
     * Given some portion of the input string, this function attempts to match that portion
     * with a given Rule Part. The portion of string must entirely satisfy the rule part for
     * this function to return a tree.
     * If the given rule part is a meta-tag, it recurses into __check_value_against_rule to check the string against
     * that entire rule.
     *
     * @param inputStr The entire input string
     * @param fromIndex The index from which we are to try and match
     * @param toIndex The index up to which we are trying to match
     * @param ruleName The rule part we are attempting to satisfy
     * @param rulePart A tree containing all the sub matches thus far, if the matches consume the string
     * @returns A tree containing all the sub matches thus far, if the matches consume the string
     */
    _checkValueAgainstRulePart(
        inputString: string,
        fromIndex: number,
        toIndex: number,
        ruleName: string,
        { isTag, ruleValue }: RulePart): Optional<Tree<MatchPart>> {

        if (isTag) {
            // Locate the rule for the given meta-tag
            const subRuleAlternatives: Rule[] = this.rules[ruleValue];
            if (!subRuleAlternatives || subRuleAlternatives.length === 0) {
                throw new Error(`Cannot find any rules for ${ruleValue}`)
            }

            // Work through the alternatives, recursing into __check_value_against_rule
            return subRuleAlternatives.map(subRule => this._checkValueAgainstRule(inputString, fromIndex, toIndex, ruleValue, subRule)).find(s => !!s);
        } else if (ruleValue === inputString.slice(fromIndex, toIndex)) {
            return new Tree({ ruleName, inputString: inputString.slice(fromIndex, toIndex) })
        }


        return undefined;
    }

    /**
     * This function attempts to match a given portion of the input string against an entire rule.
     * It must iterate through all the parts of the rule, greedily attempting matches.
     * If the entire string portion is consumed by all of the rule parts, this is considered a match.
     *
     * @param inputStr The entire input string being validated
     * @param fromIndex The index from which to check
     * @param toIndex The end index to which we check
     * @param ruleName The rule we are trying to satisfy.
     * @returns A tree of the rule matches, if this rule has completely matched the string portion
     */
    _checkValueAgainstRule(
        inputString: string,
        fromIndex: number,
        toIndex: number,
        ruleName: string,
        rule: Rule
    ): Optional<Tree<MatchPart>> {
        const potentialReturn: Tree<MatchPart> = new Tree(
            { ruleName, inputString: inputString.slice(fromIndex, toIndex) });

        // Build a Queue of Rule Parts to satisfy
        const rulePartQueue: Queue<RulePart> = new Queue()
        rule.forEach(r => rulePartQueue.push(r));

        // While there are rule parts to satisfy...
        while (!rulePartQueue.isEmpty()) {
            const rulePart = rulePartQueue.pop()

            // Match the rule part against as much of the remaining string as possible
            let tempToIndex: number = toIndex
            let matchFound: boolean = false

            // While there is any remaining string to try and match
            while (tempToIndex > fromIndex && !matchFound) {
                // Attempt a match at this rule part
                const match: Optional<Tree<MatchPart>> =
                    this._checkValueAgainstRulePart(
                        inputString,
                        fromIndex,
                        tempToIndex,
                        ruleName,
                        rulePart)
                if (!!match) {
                    // If this is a sub tag rule part, add to the tree to return
                    // Otherwise its a literal match, and the tree created in this function will already serve
                    if (rulePart.isTag) {
                        potentialReturn.addChild(match)
                    }
                    // The next rule needs to match 'from' the end of the string we just matched against
                    fromIndex = tempToIndex
                    matchFound = true
                } else {
                    // Take one character off the end
                    tempToIndex -= 1
                }
            }

            if (!matchFound) {
                return undefined
            }
        }

        // If we satisfied all the rule parts AND consumed the whole string, this is a match
        return rulePartQueue.isEmpty() && fromIndex === toIndex ? potentialReturn : undefined;
    }
}

export default BackusNaurForm;