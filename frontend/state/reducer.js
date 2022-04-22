// ❗ You don't need to add extra reducers to achieve MVP
import { combineReducers } from "redux";
import * as actions from "./action-types";

const initialWheelState = 0;
function wheel(state = initialWheelState, action) {
  switch (action.type) {
    case actions.MOVE_CLOCKWISE:
      if (state === 5) {
        return (state = 0);
      } else {
        return state + 1;
      }
    case actions.MOVE_COUNTERCLOCKWISE:
      if (state === 0) {
        return (state = 5);
      } else {
        return state - 1;
      }
    default:
      return state;
  }
}

const initialQuizState = null;
function quiz(state = initialQuizState, action) {
  switch (action.type) {
    case actions.SET_QUIZ_INTO_STATE:
      return (state = action.payload.quizData);
    default:
      return state;
  }
}

const initialSelectedAnswerState = null;
function selectedAnswer(state = initialSelectedAnswerState, action) {
  switch (action.type) {
    case actions.SET_SELECTED_ANSWER:
      return (state = action.payload.answer);
    default:
      return state;
  }
}

const initialMessageState = "";
function infoMessage(state = initialMessageState, action) {
  switch (action.type) {
    case actions.SET_INFO_MESSAGE:
      return (state = action.payload.message);
    default:
      return state;
  }
}

const initialFormState = {
  newQuestion: "",
  newTrueAnswer: "",
  newFalseAnswer: "",
};
function form(state = initialFormState, action) {
  switch (action.type) {
    case actions.INPUT_CHANGE:
      switch (action.payload.target) {
        case "newQuestion":
          return Object.assign({}, state, {
            newQuestion: action.payload.value,
          });
        case "newTrueAnswer":
          return Object.assign({}, state, {
            newTrueAnswer: action.payload.value,
          });
        case "newFalseAnswer":
          return Object.assign({}, state, {
            newFalseAnswer: action.payload.value,
          });
        default:
          return state;
      }
    case actions.RESET_FORM:
      return (state = {
        newQuestion: "",
        newTrueAnswer: "",
        newFalseAnswer: "",
      });
    default:
      return state;
  }
}

export default combineReducers({
  wheel,
  quiz,
  selectedAnswer,
  infoMessage,
  form,
});
