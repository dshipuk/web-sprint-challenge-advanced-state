import React from "react";
import { connect } from "react-redux";
import * as actionCreators from "../state/action-creators";
import * as actionType from "../state/action-types";

export function Form(props) {
  const onChange = (evt) => {
    props.inputChange(actionType.INPUT_CHANGE, evt.target.id, evt.target.value);
  };

  const onSubmit = (evt) => {
    evt.preventDefault();
    const quizInfo = {
      question_text: props.form.newQuestion,
      true_answer_text: props.form.newTrueAnswer,
      false_answer_text: props.form.newFalseAnswer,
    };
    props.postQuiz(quizInfo);
  };

  return (
    <form id="form" onSubmit={onSubmit}>
      <h2>Create New Quiz</h2>
      <input
        maxLength={50}
        onChange={onChange}
        id="newQuestion"
        placeholder="Enter question"
        value={props.form.newQuestion}
      />
      <input
        maxLength={50}
        onChange={onChange}
        id="newTrueAnswer"
        placeholder="Enter true answer"
        value={props.form.newTrueAnswer}
      />
      <input
        maxLength={50}
        onChange={onChange}
        id="newFalseAnswer"
        placeholder="Enter false answer"
        value={props.form.newFalseAnswer}
      />
      {props.form.newQuestion.trim().length > 0 &&
      props.form.newTrueAnswer.trim().length > 0 &&
      props.form.newFalseAnswer.trim().length > 0 ? (
        <button id="submitNewQuizBtn">Submit new quiz</button>
      ) : (
        <button id="submitNewQuizBtn" disabled>
          Submit new quiz
        </button>
      )}
    </form>
  );
}

export default connect((st) => st, actionCreators)(Form);
