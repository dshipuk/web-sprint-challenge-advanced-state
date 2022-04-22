// ❗ You don't need to add extra action creators to achieve MVP
import * as actions from "./action-types";
import axios from "axios";

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

export function selectAnswer(selectedOption) {
  return {
    type: actions.SET_SELECTED_ANSWER,
    payload: {
      answer: selectedOption,
    },
  };
}

export function setMessage(data) {
  return {
    type: actions.SET_INFO_MESSAGE,
    payload: {
      message: data,
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

export function inputChange(type, inputToChange, inputValue) {
  switch (type) {
    case actions.INPUT_CHANGE:
      return {
        type: type,
        payload: {
          target: inputToChange,
          value: inputValue,
        },
      };
    case actions.RESET_FORM:
      return {
        type: type,
      };
    default:
      return {
        type: type,
      };
  }

  // return {
  //   type: type,
  //   payload: {
  //     target: inputToChange,
  //     value: inputValue.trim()
  //   }
  // }
}

export function resetForm() {
  return {
    type: actions.RESET_FORM,
  };
}

// ❗ Async action creators
export function fetchQuiz() {
  return function (dispatch) {
    // First, dispatch an action to reset the quiz state (so the "Loading next quiz..." message can display)
    // On successful GET:
    // - Dispatch an action to send the obtained quiz to its state
    dispatch(setQuiz(null));
    axios
      .get("http://localhost:9000/api/quiz/next")
      .then((res) => {
        dispatch(setQuiz(res.data));
      })
      .catch((err) => {
        dispatch(setMessage(err.response.data.message));
      });
  };
}
export function postAnswer(data) {
  return function (dispatch) {
    // On successful POST:
    // - Dispatch an action to reset the selected answer state
    // - Dispatch an action to set the server message to state
    // - Dispatch the fetching of the next quiz
    axios
      .post(" http://localhost:9000/api/quiz/answer", data)
      .then((res) => {
        dispatch(selectAnswer(null));
        dispatch(setMessage(res.data.message));
        dispatch(fetchQuiz());
      })
      .catch((err) => {
        dispatch(setMessage(err.response.data.message));
      });
  };
}
export function postQuiz(data) {
  return function (dispatch) {
    // On successful POST:
    // - Dispatch the correct message to the the appropriate state
    // - Dispatch the resetting of the form
    axios
      .post("http://localhost:9000/api/quiz/new", data)
      .then((res) => {
        dispatch(
          setMessage(`Congrats: "${res.data.question}" is a great question!`)
        );
        dispatch(inputChange(actions.RESET_FORM, null, null));
      })
      .catch((err) => {
        dispatch(setMessage(err.response.data.message));
      });
  };
}
// ❗ On promise rejections, use log statements or breakpoints, and put an appropriate error message in state
