import { useGlobalContext } from "./context";
import Loading from "./Loading";
import SetupForm from "./SetupForm";
import Modal from "./Modal";

import "./main.css";

const Main = () => {
  const { isSettingUp, isLoading, questions, index, correct, nextQuestion, checkAnswer } = useGlobalContext();

  if (isSettingUp) {
    return <SetupForm />;
  }

  if (isLoading) {
    return <Loading />;
  }

  const { question, incorrect_answers, correct_answer } = questions[index];

  let answers = [...incorrect_answers];
  const tempIndex = Math.floor(Math.random() * 4);

  if (tempIndex === 3) {
    answers.push(correct_answer);
  } else {
    answers.push(answers[tempIndex]);
    answers[tempIndex] = correct_answer;
  }

  return (
    <main>
      <Modal />
      <section className="quiz">
        <p className="correct-answers">
          correct answer: {correct}/{index}
        </p>
        <article className="container">
          <h2 dangerouslySetInnerHTML={{ __html: question }} />
          <div className="btn-container">
            {answers.map((answer, index) => {
              return (
                <button
                  key={index}
                  className="answer-btn"
                  onClick={() => checkAnswer(correct_answer === answer)}
                  dangerouslySetInnerHTML={{ __html: answer }}
                ></button>
              );
            })}
          </div>
        </article>
        <button className="next-question" onClick={nextQuestion}>
          next
        </button>
      </section>
    </main>
  );
};

export default Main;
