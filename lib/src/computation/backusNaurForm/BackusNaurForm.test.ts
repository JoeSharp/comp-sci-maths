import Tree from "dataStructures/tree";
import { Optional } from "types";
import BackusNaurForm from "./BackusNaurForm";
import { MatchPart } from "./types";

interface TestCase {
    name: string;
    bnf: BackusNaurForm;
    cases: {
        testInput: string,
        expectedOutput: Optional<string>
    }[]
}


describe('Backus-Naur Form', () => {
    const testCases: TestCase[] = [
        {
            name: 'Digit',
            bnf: new BackusNaurForm()
                .addRule("<digit> ::= 0|1|2|3|4|5|6|7|8|9"),
            cases: [
                {
                    testInput: '6',
                    expectedOutput: 'digit'
                }, {
                    testInput: '458',
                    expectedOutput: undefined
                }, {
                    testInput: 'X',
                    expectedOutput: undefined
                }, {
                    testInput: 'JOE',
                    expectedOutput: undefined
                }
            ]
        }, {
            name: 'Multi-line Numbers',
            bnf: new BackusNaurForm()
                .addRule("<digit> ::= 0|1|2|3|4|5|6|7|8|9")
                .addRule("<integer> ::= <digit> | <digit><integer>")
                .addRule("<line> ::= <integer> | <integer>\n<line>"),
            cases: [{
                testInput: `36
46`, expectedOutput: 'line'
            }]

        }, {
            name: 'Integer',
            bnf: new BackusNaurForm()
                .addRule("<digit> ::= 0|1|2|3|4|5|6|7|8|9")
                .addRule("<integer> ::= <digit> | <digit><integer>"),
            cases: [
                {
                    testInput: '6',
                    expectedOutput: 'digit'
                }, {
                    testInput: '458',
                    expectedOutput: 'integer'
                }, {
                    testInput: 'X',
                    expectedOutput: undefined
                }, {
                    testInput: 'JOE',
                    expectedOutput: undefined
                }
            ]
        }, {
            name: 'Real',
            bnf: new BackusNaurForm()
                .addRule("<digit> ::= 0|1|2|3|4|5|6|7|8|9")
                .addRule("<integer> ::= <digit> | <digit><integer>")
                .addRule("<real> ::= <integer> | <integer>'.'<integer>"),
            cases: [
                {
                    testInput: '6',
                    expectedOutput: 'digit'
                }, {
                    testInput: '458',
                    expectedOutput: 'integer'
                }, {
                    testInput: '3.567',
                    expectedOutput: 'real'
                }, {
                    testInput: 'X',
                    expectedOutput: undefined
                }, {
                    testInput: 'JOE',
                    expectedOutput: undefined
                }
            ]
        }, {
            name: 'Expression',
            bnf: new BackusNaurForm()
                .addRule("<digit> ::= 0|1|2|3|4|5|6|7|8|9")
                .addRule("<integer> ::= <digit> | <digit><integer>")
                .addRule("<compare>::= < | > | <= | >= | == | !=")
                .addRule("<bool>::= <integer> <compare> <integer>"),
            cases: [
                {
                    testInput: '<',
                    expectedOutput: 'compare'
                }, {
                    testInput: '4 < 5',
                    expectedOutput: 'bool'
                }, {
                    testInput: 'X',
                    expectedOutput: undefined
                }, {
                    testInput: 'JOE',
                    expectedOutput: undefined
                }
            ]
        }, {
            name: 'HTML',
            bnf: new BackusNaurForm()
                .addRule("<tag_name> ::= html|head|body")
                .addRule("<document> ::= 'STUFF' | '<'<tag_name>'>'<document>'</'<tag_name>'>'"),
            cases: [
                {
                    testInput: 'html',
                    expectedOutput: 'tag_name'
                }, {
                    testInput: '<html>STUFF</html>',
                    expectedOutput: 'document'
                }, {
                    testInput: '<html><head>STUFF</head></html>',
                    expectedOutput: 'document'
                }, {
                    testInput: 'JOE',
                    expectedOutput: undefined
                }
            ]
        }
    ];

    testCases.forEach(({ name, bnf, cases }) => {
        test(name, () => {
            cases.forEach(({ testInput, expectedOutput }) => {
                const actualOutput: Optional<Tree<MatchPart>> = bnf.findMatch(testInput);
                if (!!expectedOutput) {
                    expect(actualOutput).toBeDefined();
                    expect(actualOutput.getValue().ruleName).toEqual(expectedOutput)
                } else {
                    expect(actualOutput).toBeUndefined();
                }
            })
        })
    })
})
