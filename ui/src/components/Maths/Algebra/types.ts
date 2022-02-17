export interface Answer {
  answer: React.ReactElement;
  correct: boolean;
  explanation: string;
}

export interface Question {
  question: React.ReactElement;
  possibleAnswers: Answer[];
}
