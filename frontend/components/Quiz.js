import React, { useEffect } from "react";
import { connect } from "react-redux";
import { fetchQuiz, selectAnswer, postAnswer } from "../state/action-creators";

export function Quiz(props) {
  useEffect(() => {
    if (props.quiz === null) {
      props.fetchQuiz();
    }
  }, [props.quiz]);

  const handleSelect = (evt) => {
    const wrapper = evt.target.parentElement.parentElement.childNodes;
    wrapper.forEach((element) => {
      element.className = "answer";
      element.childNodes[1].textContent = "Select";
    });

    evt.target.textContent = "SELECTED";
    evt.target.parentElement.className = "answer selected";

    for (let count = 0; count < wrapper.length; count++) {
      if (wrapper[count].className === "answer selected") {
        props.selectAnswer(props.quiz.answers[count].answer_id);
      }
    }
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    const answerObj = {
      quiz_id: props.quiz.quiz_id,
      answer_id: props.selected,
    };
    props.postAnswer(answerObj);
  };

  return (
    <div id="wrapper">
      {
        // quiz already in state? Let's use that, otherwise render "Loading next quiz..."
        props.quiz != null ? (
          <>
            <h2>{props.quiz.question}</h2>

            <div id="quizAnswers">
              <div className="answer">
                {props.quiz.answers[0].text}
                <button onClick={handleSelect}>Select</button>
              </div>

              <div className="answer">
                {props.quiz.answers[1].text}
                <button onClick={handleSelect}>Select</button>
              </div>
            </div>

            {props.selected != null ? (
              <button id="submitAnswerBtn" onClick={handleSubmit}>
                Submit answer
              </button>
            ) : (
              <button id="submitAnswerBtn" disabled>
                Submit answer
              </button>
            )}
          </>
        ) : (
          "Loading next quiz..."
        )
      }
    </div>
  );
}
const mapState = (s) => {
  return {
    quiz: s.quiz,
    selected: s.selectedAnswer,
  };
};

export default connect(mapState, { fetchQuiz, selectAnswer, postAnswer })(Quiz);
