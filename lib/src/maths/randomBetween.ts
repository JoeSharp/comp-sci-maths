const randomBetween = (lower: number, upper: number): number => {
    return lower + (Math.random() * (upper - lower));
}

export default randomBetween;