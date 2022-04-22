import * as actions from "./action-types";
import axios from "axios";

// ❗ You don't need to add extra action creators to achieve MVP
export function moveClockwise() {
  return {
    type: actions.MOVE_CLOCKWISE,
  };
}

export function moveCounterClockwise() {
  return {
    type: actions.MOVE_COUNTERCLOCKWISE,
  };
}

export function selectAnswer(target) {
  return {
    type: actions.SET_SELECTED_ANSWER,
    payload: {
      t: target
    }
  };
}

export function setMessage(message) {
  return {
    type: actions.SET_INFO_MESSAGE,
    payload: {
      msg: message,
      context: "submittedQuiz",
    },
  };
}

export function setQuiz(data) {
  return {
    type: actions.SET_QUIZ_INTO_STATE,
    payload: {
      quizData: data,
    },
  };
}

export function inputChange(inputToChange, inputValue) {
  return {
    type: actions.INPUT_CHANGE,
    payload: {
      id: inputToChange,
      value: inputValue.trim(),
    },
  };
}

export function resetForm() {
  return {
    type: actions.RESET_FORM,
  };
}

// ❗ Async action creators
export function fetchQuiz() {
  return function (dispatch) {
    dispatch(resetForm())
    // First, dispatch an action to reset the quiz state (so the "Loading next quiz..." message can display)
    // On successful GET:
    // - Dispatch an action to send the obtained quiz to its state
    axios.get("http://localhost:9000/api/quiz/next")
      .then(res => {
        console.log(res.data)
        dispatch(setQuiz(res.data))
      })
      .catch(err => {
        console.error(err)
      })

  };
}
export function postAnswer() {
  return function (dispatch) {
    // On successful POST:
    // - Dispatch an action to reset the selected answer state
    // - Dispatch an action to set the server message to state
    // - Dispatch the fetching of the next quiz
  };
}
export function postQuiz() {
  return function (dispatch) {
    // On successful POST:
    // - Dispatch the correct message to the the appropriate state
    // - Dispatch the resetting of the form
  };
}
// ❗ On promise rejections, use log statements or breakpoints, and put an appropriate error message in state
