import {
    DEFAULT_BITS_BEFORE_POINT,
} from "@comp-sci-maths/lib/dist/dataRepresentation/binaryNumbers/types";
import useBinaryInteger, { UseBinaryNumber } from './useBinaryInteger';

interface UseBinaryFixedPoint extends UseBinaryNumber {
    bitsBeforePoint: number
}

const useBinaryFixedPoint = (isTwosComplement: boolean, bitsBeforePoint = DEFAULT_BITS_BEFORE_POINT): UseBinaryFixedPoint => {
    const fixed = useBinaryInteger(isTwosComplement);

    return {
        bitsBeforePoint,
        ...fixed,
    }
}

export default useBinaryFixedPoint;