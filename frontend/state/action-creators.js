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
      t: target,
    },
  };
}

export function setMessage(message, type) {
  return {
    type: actions.SET_INFO_MESSAGE,
    payload: {
      msg: message,
      context: type,
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
    dispatch(resetForm());
    // First, dispatch an action to reset the quiz state (so the "Loading next quiz..." message can display)
    // On successful GET:
    // - Dispatch an action to send the obtained quiz to its state
    axios
      .get("http://localhost:9000/api/quiz/next/")
      .then((res) => {
        dispatch(setQuiz(res.data));
      })
      .catch((err) => {
        dispatch(setMessage(err.response.data.message, "error"));
      });
  };
}
export function postAnswer(data, type) {
  return function (dispatch) {
    axios
      .post("http://localhost:9000/api/quiz/answer/", data)
      .then((res) => {
        dispatch(setMessage(res.data.message, type));
      })
      .catch((err) => {
        dispatch(setMessage(err.response.data.message, "error"));
      });
    // On successful POST:
    // - Dispatch an action to reset the selected answer state

    // - Dispatch an action to set the server message to state
    // - Dispatch the fetching of the next quiz
    dispatch(fetchQuiz());
  };
}
export function postQuiz(quizInfo, type) {
  return function (dispatch) {
    // On successful POST:
    axios
      .post("http://localhost:9000/api/quiz/new/", quizInfo)
      .then((res) => {
        dispatch(setMessage(res.data.question, type));
      })
      .catch((err) => {
        dispatch(setMessage(err.response.data.message, "error"));
      });
    // - Dispatch the correct message to the the appropriate state
    // - Dispatch the resetting of the form
    dispatch(inputChange("newQuestion", ""));
    dispatch(inputChange("newTrueAnswer", ""));
    dispatch(inputChange("newFalseAnswer", ""));
  };
}
// ❗ On promise rejections, use log statements or breakpoints, and put an appropriate error message in state
