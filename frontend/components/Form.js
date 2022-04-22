import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import * as actionCreators from '../state/action-creators'

export function Form(props) {
  console.log(props)
  
  const onChange = evt => {
    props.inputChange(evt.target.id, evt.target.value)
  }

  const onSubmit = evt => {
    evt.preventDefault();

  }

  // useEffect( () => {
  //   const button = document.getElementById("submitNewQuizBtn")
  //   const questionInput = props.form.newQuestion != ""
  //   const trueAnswerInput = props.form.newTrueAnswer != ""
  //   const falseAnswerInput = props.form.newFalseAnswer != ""

  //   if (questionInput && trueAnswerInput && falseAnswerInput) {
  //     button.disabled = false
  //   } else {
  //     button.disabled = true
  //   }
  // }, [props.form])

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
