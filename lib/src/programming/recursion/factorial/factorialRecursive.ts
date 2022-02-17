function factorial(x: number): number {
    // Exit condition - have we reached 1?
    if (x === 1) {
        return x
    }

    // Recurse with the value minus one
    return x * factorial(x - 1);
}

export {
    factorial
}