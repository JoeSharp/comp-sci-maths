import React from "react";
import useQuiz from "./useQuiz";
import ArithmeticOperationPicker, {
  usePicker,
} from "./ArithmeticOperationPicker";

import "./quizzes.css";

const Tick: React.FunctionComponent = () =>
  (<svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-check" fill="green" xmlns="http://www.w3.org/2000/svg">
    <path fill-rule="evenodd" d="M10.97 4.97a.75.75 0 0 1 1.071 1.05l-3.992 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.236.236 0 0 1 .02-.022z" />
  </svg>);

const Exclamation: React.FunctionComponent = () =>
  (<svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-exclamation-square" fill="red" xmlns="http://www.w3.org/2000/svg">
    <path fill-rule="evenodd" d="M14 1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
    <path d="M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0zM7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 4.995z" />
  </svg>)

const NegativeNumbers: React.FunctionComponent = () => {
  const { componentProps, operation } = usePicker("form-control");

  const quiz1 = useQuiz({
    partRange: 20,
    numberParts: 2,
    numberQuestions: 10,
    operation,
  });
  const quiz2 = useQuiz({
    partRange: 30,
    numberParts: 3,
    numberQuestions: 10,
    operation,
  });

  const quizzes = React.useMemo(() => [quiz1, quiz2], [quiz1, quiz2]);
  const regenerateQuizzes = React.useCallback(() =>
    quizzes.forEach(({ regenerateQuiz }) => regenerateQuiz())
    , [quizzes]);

  let [revealAnswers, toggleRevealAnswer] = React.useReducer((a) => !a, false);

  let onClickToggleReveal = React.useCallback(() => toggleRevealAnswer(), [
    toggleRevealAnswer,
  ]);

  return (
    <div>
      <form>
        <div className="form-group">
          <label>Arithmetic Operation</label>
          <ArithmeticOperationPicker {...componentProps} />
        </div>
      </form>

      <div className="quizzes">
        {quizzes.map((quiz, quizI) => (
          <div>
            <table>
              <tbody>
                {quiz.questions.map(({ question, givenAnswer = '0', answer }, questionI) => (
                  <tr>
                    <td className="questionIndex">
                      {quizI + 1}.{questionI + 1})
                    </td>
                    <td>{question}</td>
                    <td>=</td>
                    <td>{revealAnswers ? <span>{answer} {answer === givenAnswer ? <Tick /> : <Exclamation />}</span> :
                      <input type='number'
                        className='txtGiveAnswer'
                        value={givenAnswer}
                        onChange={e => quiz.giveAnswer(questionI, parseInt(e.target.value))} />}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))}
      </div>
      <button className="btn btn-primary" onClick={onClickToggleReveal}>
        {revealAnswers ? "Hide Answers" : "Reveal Answers"}
      </button>
      <button className="btn btn-warning" onClick={regenerateQuizzes}>
        Regenerate
      </button>
    </div>
  );
};

export default NegativeNumbers;
