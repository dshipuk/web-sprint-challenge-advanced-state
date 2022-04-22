import React from 'react'
import { connect } from 'react-redux'
import * as actionCreators from '../state/action-creators'
import axios from 'axios'

export function Form(props) {

  const onChange = evt => {
    props.inputChange(evt.target.id, evt.target.value)
  }

  const onSubmit = evt => {
    evt.preventDefault();
    evt.target.reset()
    const newQuiz = {
      "question_text": props.form.newQuestion,
      "true_answer_text": props.form.newTrueAnswer,
      "false_answer_text": props.form.newFalseAnswer
  }
    axios.post("http://localhost:9000/api/quiz/new", newQuiz)
      .then(res => {
        props.setMessage(res.data.question)
      })
      .catch(err => {
        console.log(err)
      })
      .finally(
        props.inputChange("newQuestion", ""),
        props.inputChange("newTrueAnswer", ""), 
        props.inputChange("newFalseAnswer", "")
      )
  }

  return (
    <form id="form" onSubmit={onSubmit}>
      <h2>Create New Quiz</h2>
      <input maxLength={50} onChange={onChange} id="newQuestion" placeholder="Enter question" />
      <input maxLength={50} onChange={onChange} id="newTrueAnswer" placeholder="Enter true answer" />
      <input maxLength={50} onChange={onChange} id="newFalseAnswer" placeholder="Enter false answer" />
      {props.form.newFalseAnswer && props.form.newTrueAnswer && props.form.newQuestion ? <button id="submitNewQuizBtn" onSubmit={onSubmit} >Submit new quiz</button> : <button id="submitNewQuizBtn" onSubmit={onSubmit} disabled>Submit new quiz</button>}
    </form>
  )
}

export default connect(st => st, actionCreators)(Form)
