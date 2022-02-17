const FREQ_A4 = 440;

/**
 * Get the pitch frequency in herzs (with custom concert tuning) from a midi number
 *
 * @param {Integer} midi - the midi number
 * @return {Float} the frequency of the note
 *
 * @example
 * // 69 midi is A4
 * freq(null, 69) // => 440
 * freq(444, 69) // => 444
 *
 * @example
 * // partially applied
 * var freq = require('midi-freq')(440)
 * freq(69) // => 440
 */
const midiToFreq = (m: number): number => {
    return m === 0 || (m > 0 && m < 128) ? Math.pow(2, (m - 69) / 12) * FREQ_A4 : FREQ_A4
}

export default midiToFreq;