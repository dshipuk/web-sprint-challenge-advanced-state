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
      return action.payload.quizData;
    case actions.RESET_FORM:
      return (state = null);
    default:
      return state;
  }
}

const initialSelectedAnswerState = null;
function selectedAnswer(state = initialSelectedAnswerState, action) {
  switch (action.type) {
    case actions.SET_SELECTED_ANSWER:
      return (state = action.payload.t);
    case actions.RESET_FORM:
      return (state = null);
    default:
      return state;
  }
}

const initialMessageState = "";
function infoMessage(state = initialMessageState, action) {
  switch (action.type) {
    case actions.SET_INFO_MESSAGE:
      switch (action.payload.context) {
        case "submittedQuiz":
          return (state = `Congrats: "${action.payload.msg}" is a great question!`);
        case "postQuiz":
          return (state = action.payload.msg);
        case "error":
          return (state = action.payload.msg);
        case "":
          return (state = "");
        default:
          return state;
      }
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
      switch (action.payload.id) {
        case "newQuestion":
          return {
            ...state,
            newQuestion: action.payload.value,
          };
        case "newTrueAnswer":
          return {
            ...state,
            newTrueAnswer: action.payload.value,
          };
        case "newFalseAnswer":
          return {
            ...state,
            newFalseAnswer: action.payload.value,
          };
        case actions.RESET_FORM:
          return (state = {
            newQuestion: "",
            newTrueAnswer: "",
            newFalseAnswer: "",
          });
        default:
          return state;
      }
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
