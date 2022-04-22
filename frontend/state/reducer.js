// ❗ You don't need to add extra reducers to achieve MVP
import { combineReducers } from 'redux'
import * as actions from "./action-types"
import axios from 'axios'

const initialWheelState = 0
function wheel(state = initialWheelState, action) {
  switch (action.type) {
    case actions.MOVE_CLOCKWISE:
      console.log(state)
      if (state === 5) {
        return state = 0
      } else {
        return state + 1
      }
    case actions.MOVE_COUNTERCLOCKWISE:
      if (state === 0) {
        return state = 5
      } else {
        return state - 1
      }
    default:
      return state
  }
}

const initialQuizState = null
function quiz(state = initialQuizState, action) {
  switch(action.type) {
    
    
    default:
      return state
  }
}

const initialSelectedAnswerState = null
function selectedAnswer(state = initialSelectedAnswerState, action) {
  return state
}

const initialMessageState = ''
function infoMessage(state = initialMessageState, action) {
  return state
}

const initialFormState = {
  newQuestion: '',
  newTrueAnswer: '',
  newFalseAnswer: '',
}
function form(state = initialFormState, action) {
  switch (action.type) {
    case actions.INPUT_CHANGE:
      switch (action.payload.id) {
        case "newQuestion":
          return {
            ...state,
            newQuestion: action.payload.value
          }
        case "newTrueAnswer":
          return {
            ...state,
            newTrueAnswer: action.payload.value
          }
        case "newFalseAnswer":
          return {
            ...state,
            newFalseAnswer: action.payload.value
          }
        default:
          return state
      }
    default:
      return state
  }
}

export default combineReducers({ wheel, quiz, selectedAnswer, infoMessage, form })
