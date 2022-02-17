interface Guess {
  x: number;
  answer: number;
}

interface Solutions {
  guesses: Guess[];
}

const solver = (
  f: (x_in: number) => number,
  number_guesses: number
): Solutions => {
  let guesses: Guess[] = [];

  let x = 2.0;
  let lowest = NaN;
  let highest = NaN;

  for (let i = 0; i < number_guesses; i += 1) {
    let answer = f(x);
    guesses.push({ x, answer });
    if (answer > 0) {
      highest = x;
      if (isNaN(lowest)) {
        x -= 1;
      } else {
        x -= (x - lowest) / 2;
      }
    } else if (answer < 0) {
      lowest = x;
      if (isNaN(highest)) {
        x += 1;
      } else {
        x += (highest - x) / 2;
      }
    } else {
      break;
    }
  }

  return {
    guesses: guesses.reverse()
  };
};

export default solver;
