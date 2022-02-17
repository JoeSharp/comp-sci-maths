function factorial(x: number): number {
    // Start with one
    let answer = 1;

    // Multiply by each number until we reach the 'x'
    // Take note of the bounds, start at 1 and go up to (and including) x
    for (let i = 1; i <= x; i++) {
        answer *= i; // shorthand arithmetic operator, equivalent to answer = answer * i
    }

    // It should now be the factorial
    return answer;
}

export {
    factorial
}