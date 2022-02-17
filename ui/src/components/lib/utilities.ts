export const choose = <T>(arr: T[], exclude: T[] = []): T => {
  const chooseFrom: T[] = arr.filter((a) => !exclude.includes(a));
  return chooseFrom[Math.floor(Math.random() * chooseFrom.length)];
};

export const generateRandomInteger = (from: number, to: number) =>
  from + Math.floor((to - from) * Math.random())
