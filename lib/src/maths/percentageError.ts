/**
 * Calculate percentage error
 *
 * @param intended The value we are expecting
 * @param measured The measured value
 * @returns The percentage error, rounded to 2 decimal places
 */
const percentageError = (intended: number, measured: number): number => {
    return Math.floor(10000 * Math.abs(intended - measured) / intended) / 100;
}

export default percentageError;