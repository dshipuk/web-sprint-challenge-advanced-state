import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { moveClockwise, moveCounterClockwise } from "../state/action-creators"

const Wheel = (props) => {
  console.log(props)

  useEffect(() =>{
    const wheelParent = document.getElementById("wheel")
    const wheelChildren = wheelParent.childNodes
    
    for (let i = 0; i < wheelChildren.length; i++) {
      if (i === props.wheel) {
        wheelChildren[i].textContent = "B"
        wheelChildren[i].className = "cog active"
      } else {
        wheelChildren[i].textContent = ""
        wheelChildren[i].className = "cog"
      }
    }
  }, [props.wheel])

  const goClockWise = () => {
    props.moveClockwise()
  }

  const goCounterClockWise = () => {
    props.moveCounterClockwise()
  }
  
  return (
    <div id="wrapper">
      <div id="wheel">
        <div className="cog active" style={{ "--i": 0 }}></div>
        <div className="cog" style={{ "--i": 1 }}></div>
        <div className="cog" style={{ "--i": 2 }}></div>
        <div className="cog" style={{ "--i": 3 }}></div>
        <div className="cog" style={{ "--i": 4 }}></div>
        <div className="cog" style={{ "--i": 5 }}></div>{/* --i is a custom CSS property, no need to touch that nor the style object */}
      </div>
      <div id="keypad">
        <button id="counterClockwiseBtn" onClick={goCounterClockWise}>Counter clockwise</button>
        <button id="clockwiseBtn" onClick={goClockWise}>Clockwise</button>
      </div>
    </div>
  )
}

const mapState = (s) => {
  return {
    wheel: s.wheel
  }
}

export default connect(mapState, { moveClockwise, moveCounterClockwise })(Wheel);
