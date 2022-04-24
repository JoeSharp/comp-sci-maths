import {
    toggleBitInBinary,
    createBinaryNumber,
    getDenaryFromTwosComplement,
    BinaryNumber,
    shiftLeft,
    shiftRight,
    binaryToString,
    createFloatingPoint,
    FloatingPointNumber,
    getDenaryFromFloatingPoint,
    binaryFromString,
    floatingPointToString,
    getFloatingPointFromDenary,
    getOnesComplement,
    or,
    and,
    xor,
    countOnes,
    halfAdder,
    fullAdder,
    binaryAddition,
    getTwosComplementFromDenary,
    getTwosComplement,
    FixedPointNumber,
    createFixedPointBinaryNumber,
    fixedPointToString,
    getDenaryFromFixedPoint,
    getDenaryFromBinaryInteger,
    getBinaryIntegerFromDenary,
} from "./floatingPointReducer";

interface BinaryIntegerTestCase {
    binary: BinaryNumber;
    denary: number;
}

const BINARY_INTEGER_TEST_CASES: BinaryIntegerTestCase[] = [
    {
        binary: binaryFromString('0000'),
        denary: 0
    },
    {
        binary: binaryFromString('1000'),
        denary: 8
    },
    {
        binary: binaryFromString('1100'),
        denary: 12
    },
    {
        binary: binaryFromString('0110'),
        denary: 6
    },
    {
        binary: binaryFromString('0101'),
        denary: 5
    },
    {
        binary: binaryFromString('1110'),
        denary: 14
    }
]

interface OnesComplementTestCase {
    input: BinaryNumber;
    output: BinaryNumber;
}

const ONES_COMPLEMENT_TEST_CASES: OnesComplementTestCase[] = [
    {
        input: binaryFromString('0000'),
        output: binaryFromString('1111')
    }, {
        input: binaryFromString('0001'),
        output: binaryFromString('1110')
    }, {
        input: binaryFromString('1000'),
        output: binaryFromString('0111')
    }, {
        input: binaryFromString('0110'),
        output: binaryFromString('1001')
    }, {
        input: binaryFromString('0101'),
        output: binaryFromString('1010')
    }
]

interface FixedPointTestCase {
    binary: FixedPointNumber;
    denary: number;
}

const FIXED_POINT_TEST_CASES: FixedPointTestCase[] = [
    {
        binary: {
            bits: binaryFromString('00111001'),
            bitsAfterPoint: 4
        },
        denary: 3.5625
    }
]

interface TwosComplementTestCase {
    binary: BinaryNumber,
    twosComplement: BinaryNumber,
    denary: number
}

const BI_DIRECTIONAL_TWOS_COMPLEMENT_TEST_CASES: TwosComplementTestCase[] = [
    {
        binary: binaryFromString('0000'),
        twosComplement: binaryFromString('0000'),
        denary: 0
    }, {
        binary: binaryFromString('0001'),
        twosComplement: binaryFromString('1111'),
        denary: 1
    }, {
        binary: binaryFromString('0010'),
        twosComplement: binaryFromString('1110'),
        denary: 2
    }, {
        binary: binaryFromString('1100'),
        twosComplement: binaryFromString('0100'),
        denary: -4
    }, {
        binary: binaryFromString('1111'),
        twosComplement: binaryFromString('0001'),
        denary: -1
    }
]

interface FloatingPointTestCase {
    floatingPoint: FloatingPointNumber,
    denary: number
}

const FLOATING_POINT_TEST_CASES: FloatingPointTestCase[] = [
    {
        floatingPoint: {
            mantissa: binaryFromString('01011010'),
            exponent: binaryFromString('0011'),
        },
        denary: 5.625
    }, {
        floatingPoint: {
            mantissa: binaryFromString('01000000'),
            exponent: binaryFromString('1110'),
        },
        denary: 0.125
    }, {
        floatingPoint: {
            mantissa: binaryFromString('10101101'),
            exponent: binaryFromString('0101'),
        },
        denary: -20.75
    }
]

interface ShiftTestCase {
    binary: BinaryNumber,
    result: BinaryNumber,
    flag: boolean;
}

const SHIFT_RIGHT_TEST_CASES: ShiftTestCase[] = [
    {
        binary: binaryFromString('0110'),
        result: binaryFromString('0011'),
        flag: false
    }, {
        binary: binaryFromString('0111'),
        result: binaryFromString('0011'),
        flag: true
    }, {
        binary: binaryFromString('1000'),
        result: binaryFromString('0100'),
        flag: false
    }, {
        binary: binaryFromString('1001'),
        result: binaryFromString('0100'),
        flag: true
    }
]

const SHIFT_LEFT_TEST_CASES: ShiftTestCase[] = [
    {
        binary: binaryFromString('0110'),
        result: binaryFromString('1100'),
        flag: false
    }, {
        binary: binaryFromString('0001'),
        result: binaryFromString('0010'),
        flag: false
    }, {
        binary: binaryFromString('1110'),
        result: binaryFromString('1100'),
        flag: true
    }, {
        binary: binaryFromString('1000'),
        result: binaryFromString('0000'),
        flag: true
    }, {
        binary: binaryFromString('1001'),
        result: binaryFromString('0010'),
        flag: true
    }
]

interface BinaryAdditiontTestCase {
    a: BinaryNumber;
    b: BinaryNumber;
    result: BinaryNumber;
    overflow: boolean;
}

const BINARY_ADDITION_TEST_CASES: BinaryAdditiontTestCase[] = [
    {
        a: binaryFromString("0000"),
        b: binaryFromString("0000"),
        result: binaryFromString("0000"),
        overflow: false
    },
    {
        a: binaryFromString("0001"),
        b: binaryFromString("0000"),
        result: binaryFromString("0001"),
        overflow: false
    },
    {
        a: binaryFromString("1010"),
        b: binaryFromString("0001"),
        result: binaryFromString("1011"),
        overflow: false
    },
    {
        a: binaryFromString("0001"),
        b: binaryFromString("0001"),
        result: binaryFromString("0010"),
        overflow: false
    },
    {
        a: binaryFromString("0011"),
        b: binaryFromString("0011"),
        result: binaryFromString("0110"),
        overflow: false
    },
    {
        a: binaryFromString("1011"),
        b: binaryFromString("0111"),
        result: binaryFromString("0010"),
        overflow: true
    },
    {
        a: binaryFromString("1111"),
        b: binaryFromString("1111"),
        result: binaryFromString("1110"),
        overflow: true
    }
]

describe("Logical Operators", () => {
    test("Count Ones", () => {
        expect(countOnes(false, false, true, true)).toBe(2);
        expect(countOnes(true, false, true, true)).toBe(3);
        expect(countOnes(false, false, false, false)).toBe(0);
        expect(countOnes(false, false, true, false)).toBe(1);
        expect(countOnes(true, true, true, true)).toBe(4);
    })

    test("OR", () => {
        expect(or(false, false)).toBe(false);
        expect(or(true, false)).toBe(true);
        expect(or(false, true)).toBe(true);
        expect(or(true, true)).toBe(true);
    })

    test("AND", () => {
        expect(and(false, false)).toBe(false);
        expect(and(true, false)).toBe(false);
        expect(and(false, true)).toBe(false);
        expect(and(true, true)).toBe(true);
    })

    test("XOR", () => {
        expect(xor(false, false)).toBe(false);
        expect(xor(true, false)).toBe(true);
        expect(xor(false, true)).toBe(true);
        expect(xor(true, true)).toBe(false);
    })
})

describe("Maths", () => {
    test("halfAdder", () => {
        expect(halfAdder(false, false)).toEqual({ sum: false, carry: false });
        expect(halfAdder(false, true)).toEqual({ sum: true, carry: false });
        expect(halfAdder(true, false)).toEqual({ sum: true, carry: false });
        expect(halfAdder(true, true)).toEqual({ sum: false, carry: true });
    })

    test("fullAdder", () => {
        expect(fullAdder(false, false, false)).toEqual({ sum: false, carry: false });
        expect(fullAdder(false, true, false)).toEqual({ sum: true, carry: false });
        expect(fullAdder(true, false, false)).toEqual({ sum: true, carry: false });
        expect(fullAdder(true, true, false)).toEqual({ sum: false, carry: true });

        expect(fullAdder(false, false, true)).toEqual({ sum: true, carry: false });
        expect(fullAdder(false, true, true)).toEqual({ sum: false, carry: true });
        expect(fullAdder(true, false, true)).toEqual({ sum: false, carry: true });
        expect(fullAdder(true, true, true)).toEqual({ sum: true, carry: true });
    });

    BINARY_ADDITION_TEST_CASES.forEach(({ a, b, result, overflow }) => {
        test(`binaryAddition: ${binaryToString(a)} + ${binaryToString(b)} = ${binaryToString(result)}`, () => {
            expect(binaryAddition(a, b)).toEqual({ result, flag: overflow });
        })
    })

    test("toggleBitInBinary", () => {
        let value: boolean[] = [false, true, true, false];

        value = toggleBitInBinary(value, 0);
        expect(value).toEqual([true, true, true, false]);

        value = toggleBitInBinary(value, 3);
        expect(value).toEqual([true, true, true, true]);

        expect(() => toggleBitInBinary(value, -1)).toThrowError();
        expect(() => toggleBitInBinary(value, 4)).toThrowError();
        expect(() => toggleBitInBinary(value, 67)).toThrowError();
    })

    SHIFT_RIGHT_TEST_CASES.forEach(({ binary, result, flag }) =>
        test(`shiftRight: ${binaryToString(binary)} -> ${binaryToString(result)} -> underflow: ${flag}`,
            () => expect(shiftRight(binary)).toEqual({ result, flag }))
    )

    SHIFT_LEFT_TEST_CASES.forEach(({ binary, result, flag }) =>
        test(`shiftLeft: ${binaryToString(binary)} -> ${binaryToString(result)} -> underflow: ${flag}`,
            () => expect(shiftLeft(binary)).toEqual({ result, flag }))
    )
})

describe('Fixed Point Numbers', () => {
    test('createFixedPointBinaryNumber', () => {
        expect(createFixedPointBinaryNumber(4, 2)).toEqual({
            bits: [false, false, false, false],
            bitsAfterPoint: 2
        });

        expect(() => createFixedPointBinaryNumber(4, 8)).toThrowError();
    })

    BINARY_INTEGER_TEST_CASES.forEach(({ binary, denary }) => {
        test(`getDenaryFromBinaryInteger ${binaryToString(binary)} -> ${denary}`, () =>
            expect(getDenaryFromBinaryInteger(binary)).toBe(denary))

        test(`getBinaryIntegerFromDenary ${denary} -> ${binaryToString(binary)}`, () =>
            expect(getBinaryIntegerFromDenary(denary, binary.length)).toEqual({ result: binary, flag: false }));

        test('Successive Addition', () => {
            const BITS = 8;
            const { result: one } = getBinaryIntegerFromDenary(1, BITS);
            let { result: value } = getBinaryIntegerFromDenary(0, BITS);

            for (let i = 0; i < Math.pow(2, BITS); i++) {
                let addResult = binaryAddition(value, one);
                expect(getDenaryFromBinaryInteger(value)).toBe(i);
                value = addResult.result;
            }
        })
    });

    FIXED_POINT_TEST_CASES.forEach(({ binary, denary }) => {
        test(`getDenaryFromFixedPoint ${fixedPointToString(binary)} -> ${denary}`, () => {
            expect(getDenaryFromFixedPoint(binary)).toBe(denary);
        })
    })
})

describe("Floating Point Numbers", () => {
    test("createBinaryNumber", () => {
        expect(createBinaryNumber(4)).toEqual([false, false, false, false]);
        expect(createBinaryNumber(4, true)).toEqual([true, true, true, true])
        expect(createBinaryNumber(6, false)).toEqual([false, false, false, false, false, false])

    });
    test('createFloatingPoint', () => {
        expect(createFloatingPoint()).toEqual({
            mantissa: [false, false, false, false, false, false, false, false],
            exponent: [false, false, false, false]
        })
        expect(createFloatingPoint(4, 2)).toEqual({
            mantissa: [false, false, false, false],
            exponent: [false, false]
        })
    });
    test('binaryFromString', () => {
        expect(binaryFromString('1111')).toEqual([true, true, true, true]);
        expect(binaryFromString('11 11')).toEqual([true, true, true, true]);
        expect(binaryFromString('0101')).toEqual([false, true, false, true]);
        expect(binaryFromString('01 01')).toEqual([false, true, false, true]);
        expect(binaryFromString('1 1 1 1')).toEqual([true, true, true, true]);
    })

    test('getTwosComplement (over limit)', () => {
        // Can't turn -8 around to  +8 in 4 bits
        expect(getTwosComplement(binaryFromString('1000')).flag).toBeTruthy();

        // Can't turn -128 around to +128 in 8 bits
        expect(getTwosComplement(binaryFromString('10000000')).flag).toBeTruthy();
    })

    test('getDenaryFromTwosComplement (at limit)', () => {
        expect(getDenaryFromTwosComplement(binaryFromString('1000'))).toBe(-8);
        expect(getDenaryFromTwosComplement(binaryFromString('1000 0000'))).toBe(-128);
    })

    test('getTwosComplementFromDenary (at limit)', () => {
        expect(getTwosComplementFromDenary(-8, 4)).toEqual({ result: binaryFromString('1000'), flag: false });
        expect(getTwosComplementFromDenary(-128, 8)).toEqual({ result: binaryFromString('1000 0000'), flag: false });

    })

    BI_DIRECTIONAL_TWOS_COMPLEMENT_TEST_CASES.forEach(({ binary, twosComplement, denary }) => {
        test(`getTwosComplement (forward): ${binaryToString(binary)} -> ${binaryToString(twosComplement)}`,
            () => {
                expect(getTwosComplement(binary)).toEqual({ result: twosComplement, flag: false });
            }
        );
        test(`getTwosComplement (reverse): ${binaryToString(twosComplement)} -> ${binaryToString(binary)}`,
            () => {
                expect(getTwosComplement(twosComplement)).toEqual({ result: binary, flag: false });
            }
        );
        test(`getDenaryFromTwosComplement (+ve): ${binaryToString(binary)} -> ${denary}`,
            () => {
                expect(getDenaryFromTwosComplement(binary)).toBe(denary);
            }
        )
        test(`getDenaryFromTwosComplement (-ve): ${binaryToString(twosComplement)} -> ${-denary}`,
            () => {
                expect(getDenaryFromTwosComplement(twosComplement) === -denary).toBeTruthy();
            }
        )
        test(`getTwosComplementFromDenary (+ve): ${binaryToString(binary)} -> ${denary}`,
            () => {
                expect(getTwosComplementFromDenary(denary, binary.length)).toEqual({ result: binary, flag: false });
            }
        );
        test(`getTwosComplementFromDenary (-ve): ${binaryToString(twosComplement)} -> ${-denary}`,
            () => {
                expect(getTwosComplementFromDenary(-denary, twosComplement.length)).toEqual({ result: twosComplement, flag: false });
            }
        );
    });

    FLOATING_POINT_TEST_CASES.forEach(({ floatingPoint, denary }) => {
        test(`getDenaryFromFloatingPoint ${denary} -> ${floatingPointToString(floatingPoint)}`, () => {
            expect(getDenaryFromFloatingPoint(floatingPoint)).toBe(denary)
        });
        // test(`getDenaryFromFloatingPoint ${floatingPointToString(floatingPoint)} -> ${denary}`, () => {
        //     expect(getFloatingPointFromDenary(denary)).toEqual(floatingPoint)
        // })
    });

    ONES_COMPLEMENT_TEST_CASES.forEach(({ input, output }) =>
        test(`getOnesComplement ${binaryToString(input)} -> ${binaryToString(output)}`, () => {
            expect(getOnesComplement(input)).toEqual(output);
        }));
})