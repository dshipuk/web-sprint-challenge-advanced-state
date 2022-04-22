import React from "react";
import { connect } from "react-redux";
import * as actionCreators from "../state/action-creators";

export function Form(props) {
  const onChange = (evt) => {
    evt.preventDefault();
    props.inputChange(evt.target.id, evt.target.value);
  };

  const onSubmit = (evt) => {
    evt.preventDefault();
    const newQuiz = {
      question_text: props.form.newQuestion,
      true_answer_text: props.form.newTrueAnswer,
      false_answer_text: props.form.newFalseAnswer,
    };
    props.postQuiz(newQuiz, "submittedQuiz");
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
      {props.form.newFalseAnswer &&
      props.form.newTrueAnswer &&
      props.form.newQuestion ? (
        <button id="submitNewQuizBtn" onSubmit={onSubmit}>
          Submit new quiz
        </button>
      ) : (
        <button id="submitNewQuizBtn" onSubmit={onSubmit} disabled>
          Submit new quiz
        </button>
      )}
    </form>
  );
}

export default connect((st) => st, actionCreators)(Form);
