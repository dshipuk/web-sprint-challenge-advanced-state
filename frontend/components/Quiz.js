import React, { useEffect } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import * as actions from "../state/action-creators"

// props.TEMP_TAG.map( quiz => {
//   return (
//     <h2>Question 1</h2>
//     <div id="quizAnswers">
//       <div className="answer">
//         Answer 1
//         <button>
//           selected
//         </button>
//       </div>

//       <div className="answer">
//         Question 2
//         <button>
//           SELECTED
//         </button>
//       </div>
//     </div>
//   )
// })


export function Quiz(props) {
  useEffect(() => {
    if (props.quiz === null) {
      props.fetchQuiz();
    }
  }, [])

  const onClick = evt => {
    evt.preventDefault();
    const main = evt.target.parentElement.parentElement.childNodes
    for (let info of main) {
      info.className = "answer"
      info.childNodes[1].textContent = "Select"
    }
    evt.target.textContent = "SELECTED"
    evt.target.parentElement.className = "answer selected"
    for (let i = 0; i < main.length; i++) {
      if (main[i].className === "answer selected") {
        props.selectAnswer(props.quiz.answers[i].answer_id)
      }
    }
  }

  const onSubmit = evt => {
    evt.preventDefault();
    const info = {
      "quiz_id": props.quiz.quiz_id,
      "answer_id": props.selectedAnswer
    }
    console.log(info)
    props.postAnswer(info)
  }
  return (
    <div id="wrapper">
      {
        props.quiz === null 
        ? "Loading next quiz..."
        : (
          <>
            <h2>{props.quiz.question}</h2>

            <div id="quizAnswers" >
              <div className="answer">
                {props.quiz.answers[0].text}
                <button onClick={onClick}>
                  Select
                </button>
              </div>

              <div className="answer">
                {props.quiz.answers[1].text}
                <button onClick={onClick}>
                  Select
                </button>
              </div>
            </div>

            {props.selectedAnswer === null 
            ? <button id="submitAnswerBtn" onClick={onSubmit} disabled >Submit answer</button> 
            : <button id="submitAnswerBtn" onClick={onSubmit}>Submit answer</button>}
          </>
        )
      }
    </div>
  )
}

export default connect(s => s, actions)(Quiz)

        // // quiz already in state? Let's use that, otherwise render "Loading next quiz..."
        // true ? (
          // <>
          //   <h2>What is a closure?</h2>

          //   <div id="quizAnswers">
          //     <div className="answer selected">
          //       A function
          //       <button>
          //         SELECTED
          //       </button>
          //     </div>

          //     <div className="answer">
          //       An elephant
          //       <button>
          //         Select
          //       </button>
          //     </div>
          //   </div>

          //   <button id="submitAnswerBtn">Submit answer</button>
          // </>
        // ) : 'Loading next quiz...'